import {Component} from 'reangulact';

export default class UiButton extends Component {

    static DEFAULTS = {mode: 'primary'};

    static TEMPLATE = (
        <button
            class=':(btn btn-(:mode))'
            disabled=':disabled'
            click=':click'
            >
            <i if=':icon' class=':(fa fa-(:icon))'></i>
            <block if=':caption'>:caption</block>
            <children/>
        </button>
    );
}