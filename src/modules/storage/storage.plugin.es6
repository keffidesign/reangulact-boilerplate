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



export default class StoragePlugin extends Plugin {

    init() {}

    onStorage_list(ev, cb) {

        setTimeout(() => cb(undefined, LIST), 1000);

    }

    onStorage_add(ev, cb) {

        setTimeout(() => cb(undefined, LIST.push(ev.data)), 1000);

    }

}