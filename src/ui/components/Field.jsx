import {Component} from 'reangulact';
import Input from './Input.jsx';

export default class UiField extends Component {

    change(value) {
        this.put('value', value);
    }

    static TEMPLATE = (
        <fieldset class='form-group'>
            <label if=':meta.caption'>:meta.caption</label>
            <Input
                caption=':meta.caption'
                value=":value"
                valueChanged=':change'
                />
            <small class='text-muted' if=':meta.note'>:meta.note</small>
        </fieldset>
    );
}