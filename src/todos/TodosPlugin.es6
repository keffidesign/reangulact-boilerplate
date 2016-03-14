import {Plugin} from 'applugins';
import TodosPage from './TodosPage.jsx';

console.log('Plugin');

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

        return this.event('api://create/todos').withData(ev.data).promise();

    }

}