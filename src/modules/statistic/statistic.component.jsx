import {BaseComponent, List, NavBar, Form} from '../ui';

export class InfoComponent extends BaseComponent {

    render() {

        return (
            <div>
                <NavBar
                    dataFrom='navigation://list'
                />
                <Form
                    meta='FORM_META'
                    onDataChanged='onFormDataChanged'
                />
            </div>
        )

    }

    onFormDataChanged(...args) {

        console.log('onFormDataChanged', ...args);

    }

    FORM_META() {

        return [
            {
                id: 'name',
                caption: 'Name',
                type: 'string'
            }
            ,
            {
                id: 'age',
                caption: 'Age',
                type: 'number'
            }
            ,
            {
                id: 'gender',
                caption: 'Gender',
                type: 'enum'
            }
            ,
            {
                id: 'public',
                caption: 'Public',
                type: 'boolean',
                hint: 'Public profile allows other to see detailed info.'
            }
        ]

    }

}