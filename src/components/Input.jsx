import {Component} from 'reangulact';

export default class UiInput extends Component {

    static TEMPLATE = (
        <input
            class='form-control'
            placeholder=':placeholder'
            value=':value'
            change=':change'
        />
    );

    change(ev) {

        const value = ev.target.value;

        this.put('value', value);

    }
}