import * as ui from '../ui';

export default class NewTodo extends ui.Component {

    doCreateNew() {

        const data = this.get('data');

        this.action(['todos://create',{data}], (err)=>{
            if (err){
                this.log(err);
            }
            this.put('data',{name:''});
        });
    }

    getIsDisabled() {

        const data = this.get('data');

        return !data || !data.name;
    }

    changed(data) {

        this.put('data', data);
    }

    static DEFAULTS={
        data:{}
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
                click=':doCreateNew'
            />
        </div>
    );

}