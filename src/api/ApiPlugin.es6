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

    onApi_get(ev, cb) {

        setTimeout(() => cb(undefined, LIST), 1000);

    }

    onApi_create(ev, cb) {

        const id = (+LIST[LIST.length - 1].id) + 1;

        setTimeout(() => cb(undefined, LIST.push({id, ...ev.data})), 1000);

    }

}