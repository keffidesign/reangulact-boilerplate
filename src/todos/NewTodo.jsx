import * as ui from '../ui';

export default class NewTodo extends ui.Component {

    static DEFAULTS = {
        data: {name: ''}
    }

    static TEMPLATE = (
        <div>

            <ui.Form
                metaFrom='resource://get/NEW_TODO_FORM'
                data=":data"
                dataChanged=':changed'
            />

            <ui.Button
                caption='Create'
                disabled=":isDisabled"
                click=':createNew'
            />

            <div if=":error" class="alert alert-danger">:(Error: (:error.message))</div>

        </div>
    );

    createNew() {

        const data = this.get('data');

        this.update({error: null});

        this.event(['todos://create', {data}]).action((error)=> {

            if (error) {
                this.update({error});
            } else {
                this.put('data', {name: ''});
            }

        });
    }

    getIsDisabled() {

        const data = this.get('data');

        return !data || !data.name;
    }

    changed(data) {

        this.put('data', data);
    }
}