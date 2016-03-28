import {Component} from 'reangulact';

export default class UiInput extends Component {

    change() {

        return (ev)=> {

            const value = ev.target.value;

            this.put('value', value);

        }
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