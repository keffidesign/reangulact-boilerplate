import * as ui from '../ui';

export default class NewTodo extends ui.Component {

    async init() {

        const meta = await this.event('resource://get/CREATE_TODO').promiseAction();

        this.put('meta', meta);
    }

    click() {

        return ()=> {

            const data = this.get('data');

            this.event('todos://create').withData(data).emit();
        }
    }

    disabled() {

        const data = this.get('data');
        this.log(data);
        return !data || !data.name;
    }

    change() {

        return (data)=> {

            console.log('change', data);

            this.put('data', data);
        }
    }

    static TEMPLATE = (
        <div>
            <ui.Form
                meta=':meta'
                dataChanged=':change'
            />
            <ui.Button
                caption='Create'
                disabled4=":disabled"
                click=':click'
            />
        </div>
    );

}