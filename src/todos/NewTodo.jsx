import * as ui from '../ui';

export default class NewTodo extends ui.Component {

    async init() {

        const meta = await this.event('resource://get/CREATE_TODO').promiseAction();

        this.put('meta', meta);
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
            <ui.Form
                meta=':meta'
                dataChanged=':change'
            />
            <ui.Button
                caption='Create'
                click=':click'
            />
        </div>
    );

}