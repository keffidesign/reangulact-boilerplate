import {BaseComponent, List, Button, Table, Input, Dropdown, Checkbox, NavBar, Article, Form, Footer} from '../ui';

export class LearningComponent extends BaseComponent {

    render() {

        return (
            <div>
                <NavBar
                    caption='Reangulact'
                    dataFrom='navigation://list'
                />
                <Form
                    meta='FORM_META'
                    dataChanged='formDataChanged'
                />
                <List
                    dataFrom='learning://list'
                    dataDependsOn='learning://changed'
                    meta='LIST_META'
                    caption='Tasks'
                />
                <Dropdown
                    dataFrom='learning://list'
                    valueChanged='dropdownChanged'
                />
                <Checkbox
                    caption='Some checkbox caption'
                    valueChanged='checkboxChanged'
                />
                <Input
                    valueChanged='inputChanged'
                />
                <Table
                    meta='TABLE_META'
                    dataFrom='learning://list'
                />
                <Button
                    mode='primary'
                    caption='New'
                    onClick='learning://create'
                />
                <Footer />
            </div>
        )

    }

    formDataChanged(...args) {

        console.log('formDataChanged', this, ...args);

    }

    dropdownChanged(value) {

        console.log('onDropdownChanged', value);

    }

    checkboxChanged(value) {

        console.log('onCheckboxChanged', value);

    }

    inputChanged(value) {

        console.log('onInputChanged', value);

    }

    TABLE_META() {

        return [
            {
                id: 'name',
                caption: 'Name'
            }
            ,
            {
                id: 'load',
                caption: 'Load'
            }
        ]

    }

    LIST_META() {

        return [
            {
                id: 'name',
                caption: 'Name'
            }
        ]

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
                //caption: 'Gender',
                dataFrom: 'learning://list',
                type: 'enum'
            }
            ,
            {
                id: 'public',
                caption: 'Public',
                type: 'boolean'
            }
        ]

    }

}