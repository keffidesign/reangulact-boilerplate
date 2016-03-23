import {Plugin} from 'applugins';
import Resources from './Resources.es6';
import TodosPage from './TodosPage.jsx';

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
            }
        ]

    }

    onTodos_list() {

        return this.event('api://get/todos').promise();

    }

    onTodos_create({data}) {

        this.event('api://create/todos').withData(data).emit(() => this.event('todos://changed').emit());

    }

}