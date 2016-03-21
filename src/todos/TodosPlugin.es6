import {Plugin} from 'applugins';
import TodosPage from './TodosPage.jsx';

export default class TodosPlugin extends Plugin {

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

    onTodos_create(ev) {

        this.event('api://create/todos').withData(ev.data).emit(() => this.event('todos://changed').emit());

    }

}