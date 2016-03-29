import * as ui from '../ui';
import NewTodo from './NewTodo.jsx';
import Todos from './Todos.jsx';

export default class TodosPage extends ui.Component {

    static TEMPLATE = (
        <article>
            <ui.Header caption='Todo List'/>
            <ui.Content>
                <ui.Row>
                    <ui.Col size='8'>
                        <Todos
                            dataFrom='todos://list'
                            dataDependsOn='todos://changed'
                            valueChanged=":itemClick"
                        />
                    </ui.Col>
                    <ui.Col size='4'>
                        <NewTodo/>
                    </ui.Col>
                </ui.Row>
            </ui.Content>
        </article>
    );

    itemClick(id){

        if (id) {
            this.event(`ui://navigate/todo/${id}`).action();
        }
    }
}