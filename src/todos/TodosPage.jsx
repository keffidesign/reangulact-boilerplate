import * as ui from '../ui';
import NewTodo from './NewTodo.jsx';

export default class TodosPage extends ui.Component {

    static TEMPLATE = (
        <article>
            <ui.Header caption='Todo List'/>
            <ui.Content>
                <ui.ContentRow>
                    <div class='col col-md-8'>
                        <ui.List
                            dataFrom='todos://list'
                            dataDependsOn='todos://changed'
                            valueChanged=":itemClick"
                        />
                    </div>
                    <div class='col col-md-4'>
                        <NewTodo/>
                    </div>
                </ui.ContentRow>
            </ui.Content>
        </article>
    );

    itemClick(id){

        this.log('itemClick',id);

        this.event(`ui://navigate/todo/${id}`).action()
    }
}