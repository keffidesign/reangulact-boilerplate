import {Plugin} from 'applugins';
import Resources from './Resources.es6';
import TodosPage from './TodosPage.jsx';
import TodoPage from './TodoPage.jsx';

export default class TodosPlugin extends Plugin {

    init() {

        this.addResources(Resources);

        super.init();
    }

    onUi_registerPages() {

        return [
            {
                id: '/',
                isDefault: true,
                component: TodosPage
            }
            ,
            {
                id: 'todo/:docId',
                component: TodoPage
            }
        ]
    }

    onTodos_list(ev, cb) {

        this.event('api://list/todos').action(cb);
    }

    onTodos_doc({path:[docId]}, cb) {

        this.event(`api://doc/todos/${docId}`).action(cb);
    }

    onTodos_update({data}, cb) {

        const now = Date.now();

        data = {...data, updatedAt: now.toString()};

        this.event(['api://upsert/todos',{data}]).action((err) => {

            this.event('todos://changed').emit();

            cb(err);
        });
    }

    onTodos_create({data}, cb) {

        const now = Date.now();

        data = {...data, status:'todo', createdAt: now.toString()};

        this.event(['api://upsert/todos',{data}]).action((err) => {

            this.event('todos://changed').emit();

            cb(err);
        });
    }
}