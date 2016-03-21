import * as ui from '../ui';

export default class TodosPage extends ui.Component {

    click() {

        const name = this.get('todoName');

        this.event('todos://create').withData({name}).emit();

    }

    changed(value) {

        this.put('todoName', value);

    }

    static TEMPLATE = (
        <div>
            <ui.Header
                caption='Todos'
                />
            <ui.Content>
                <ui.List
                    dataFrom='todos://list'
                    dataDependsOn='todos://changed'
                    caption='My list'
                    />
                <ui.Input
                    valueChanged=':changed'
                    />
                <ui.Button
                    caption='Create'
                    click=':click'
                    />
            </ui.Content>
        </div>
    );

}