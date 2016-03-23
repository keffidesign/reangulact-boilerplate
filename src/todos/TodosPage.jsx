import * as ui from '../ui';

export default class TodosPage extends ui.Component {

    async init() {

        const meta = await this.event('resource://get/CREATE_TODO').promiseAction();

        this.put('meta', meta);

        super.init();

    }

    click() {

        const data = this.get('data');

        this.event('todos://create').withData(data).emit();

    }

    change(data) {

        console.log('change', data);

        this.put('data', data);

    }

    static TEMPLATE = (
        <div>
            <ui.Header
                caption='Todos'
                />
            <ui.Content>
                <div class='col col-md-8'>
                    <ui.List
                        dataFrom='todos://list'
                        dataDependsOn='todos://changed'
                        />
                </div>
                <div class='col col-md-4' if=':meta'>
                    <ui.Form
                        meta=':meta'
                        dataChanged=':change'
                        />
                    <ui.Button
                        caption='Create'
                        click=':click'
                        />
                </div>
            </ui.Content>
        </div>
    );

}