import {Plugin} from 'applugins';

export default class StoragePlugin extends Plugin {

    init() {}

    onStorage_list(ev, cb) {

        const list = [
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

        setTimeout(() => cb(undefined, list), 1000);

    }

}