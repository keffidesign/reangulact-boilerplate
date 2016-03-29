import * as ui from '../ui';

export default class TodoPage extends ui.Component {

    doUpdate() {

        const data = this.get('data');

        this.event(['todos://update', {data}]).action();
    }

    getIsDisabled() {

        const data = this.get('data');

        return !data || !data.name;
    }

    changed(data) {

        this.put('data', data);
    }

    static TEMPLATE = (

        <div>
            <ui.Header caption='Todo'/>
            <ui.Content>
                <ui.Row>
                    <ui.Col size='12'>
                        <ui.Form
                            metaFrom='resource://get/TODO_FORM'
                            dataFrom=":(todos://doc/(:params.docId))"
                            dataChanged=':changed'
                        />
                        <ui.Button
                            caption='Update'
                            disabled=":isDisabled"
                            click=':doUpdate'
                        />
                    </ui.Col>
                </ui.Row>
            </ui.Content>
        </div>
    );

}