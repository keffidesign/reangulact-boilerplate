import {Plugin} from 'applugins';

export default class ApiPlugin extends Plugin {

    get(cb) {
        return this.event('storage://get/todos').action((err, r)=>cb(err, (r || {}).list || []));
    }

    put(data, cb) {
        return this.event('storage://set/todos').withData(data).action(cb)
    }

    onApi_getList(ev, cb) {

        this.get(cb);
    }

    onApi_get({path:[docId]}, cb) {

        this.get((err, list) => cb(err, list.find((d)=>d.id == docId)));
    }

    onApi_create({data}, cb) {

        this.get((err, list) => {

            this.log('create', err, list);

            const id = list.length + 1;

            list.unshift({id, ...data});

            this.put({list}, cb);
        });
    }

}