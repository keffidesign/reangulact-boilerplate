import {Plugin} from 'applugins';

export default class ApiPlugin extends Plugin {

    get(key, cb) {
        return this.event(`storage://get/${key}`).action((err, r)=>cb(err, (r || {}).list || []));
    }

    put(key, data, cb) {
        return this.event(`storage://set/${key}`).withData(data).action(cb)
    }

    onApi_list({path:[kind]}, cb) {

        this.get(kind, cb);
    }

    onApi_doc({path:[kind, docId]}, cb) {

        this.get(kind, (err, list) => {

            const doc = list.find((d)=>(d.id == docId));

            this.log('doc', docId, err, list, doc);

            cb(err, doc);

        });
    }

    onApi_upsert({data, path:[kind, docId]}, cb) {

        this.get(kind, (err, list) => {

            this.log('upsert', err, list, data);

            docId = data.id || docId;

            if (docId) {

                const doc = list.find((d)=>d.id == docId)
                if (doc) {

                    Object.assign(doc, data);

                } else {

                    list.unshift({id:docId, ...data});
                }

            } else {

                const id = list.length+1;

                list.unshift({id, ...data});
            }


            this.put(kind, {list}, cb);
        });
    }

}