import {Component} from 'reangulact';

export default class UiInput extends Component {

    change(e) {

        const value = e.target.value;

        this.put('value', value);

    }

    static TEMPLATE = (
        <input
            class='form-control'
            placeholder=':caption'
            value=':value'
            change=':change'
            />
    );
}