import * as ui from '../ui';

export default class TodoPage extends ui.Component {

    async init() {

        const meta = await this.event('resource://get/CREATE_TODO').promiseAction();

        this.put('meta', meta);

        super.init();

    }

    save() {

        const data = this.get('data');

        this.event('todos://create').withData(data).emit();

    }

    change(data) {

        console.log('change', data);

        this.put('data', data);

    }

    static TEMPLATE = (
        <div>
            <ui.Header caption=':data.name'/>
            <ui.Content>
                <div class='col col-md-12'>
                    <ui.Form
                        meta=':meta'
                        data=":data"
                        dataChanged=':change'
                        />
                    <ui.Button
                        caption='Save'
                        click=':save'
                        />
                </div>
            </ui.Content>
        </div>
    );

}