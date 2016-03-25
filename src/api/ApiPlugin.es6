import {Plugin} from 'applugins';

const LIST = [
    {
        id: '1',
        name: 'Task #1'
    }
    ,
    {
        id: '2',
        name: 'Task #2'
    }
];

export default class ApiPlugin extends Plugin {

    onApi_getList(ev, cb) {

        setTimeout(() => cb(undefined, LIST), 1500);
    }

    onApi_get({path:[docId]}, cb) {

        setTimeout(() => cb(undefined, LIST.find((d)=>d.id==docId)), 500);
    }

    onApi_create(ev, cb) {

        const id = (+LIST[LIST.length - 1].id) + 1;

        setTimeout(() => cb(undefined, LIST.push({id, ...ev.data})), 500);
    }

}