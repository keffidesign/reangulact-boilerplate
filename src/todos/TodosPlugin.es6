import {Plugin} from 'applugins';
import Resources from './Resources.es6';
import TodosPage from './TodosPage.jsx';
import TodoPage from './TodoPage.jsx';

export default class TodosPlugin extends Plugin {

    init() {

        this.event('resource://add').withData(Resources).action();

        super.init();

    }

    onUi_registerPages() {

        return [
            {
                id: 'todos',
                component: TodosPage
            },
            {
                id: 'todo/:docId',
                component: TodoPage
            }
        ]

    }

    onTodos_list() {

        return this.event('api://getList').promise();

    }

    onTodos_get(ev) {

        return this.event(`'api://get/${ev.docId}`).promise();

    }

    onTodos_create({data}) {

        this.event('api://create/todos').withData(data).emit(() => this.event('todos://changed').emit());

    }

}