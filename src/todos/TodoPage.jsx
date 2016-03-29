import * as ui from '../ui';

export default class TodoPage extends ui.Component {

    doUpdate() {

        const data = this.get('data');

        this.event(['todos://update', {data}]).action((error)=> {

            if (error) {
                this.update({error});
            }

        });
    }

    getIsDisabled() {

        const data = this.get('data');

        return !data || !data.name;
    }

    getDocId() {

        const params = this.getRouteParams();

        return params.docId;
    }

    changed(data) {

        this.put('data', data);
    }

    static TEMPLATE2 = ( <ui.Form
        metaFrom='resource://get/TODO_FORM'
        dataFrom=":(todos://doc/(:docId))"
        dataChanged=':changed'
    />);

    static TEMPLATE = (

        <div>
            <ui.Header caption='Todo'/>
            <ui.Content>
                <ui.Row>
                    <ui.Col size='12'>
                        <ui.Form
                            metaFrom='resource://get/TODO_FORM'
                            dataFrom=":(todos://doc/(:docId))"
                            dataChanged=':changed'
                            error=":error"
                        />
                        <ui.Button
                            caption='Update'
                            disabled2=":isDisabled"
                            click=':doUpdate'
                        />
                    </ui.Col>
                </ui.Row>
            </ui.Content>
        </div>
    );

}