import {BaseComponent, List, Button, Table, Input, Dropdown, Checkbox} from '../ui';

export class LearningComponent extends BaseComponent {

    render() {

        return (
            <div>
                <Dropdown
                    dataFrom='learning://list'
                    onValueChanged='onDropdownChanged'
                />
                <Checkbox
                    caption='Some checkbox caption'
                    onValueChanged='onCheckboxChanged'
                />
                <Input
                    onValueChanged='onInputChanged'
                />
                <Table
                    meta='TABLE_META'
                    dataFrom='learning://list'
                />
                <List
                    dataFrom='learning://list'
                    dataDependsOn='learning://changed'
                    meta='LIST_META'
                    caption='Tasks'
                />
                <Button
                    mode='primary'
                    caption='New'
                    onClick='learning://create'
                />
            </div>
        )

    }

    onDropdownChanged(value) {

        console.log('onDropdownChanged', value);

    }

    onCheckboxChanged(value) {

        console.log('onCheckboxChanged', value);

    }

    onInputChanged(value) {

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

}