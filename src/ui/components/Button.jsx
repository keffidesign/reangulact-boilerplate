import {Component} from 'reangulact';

export default class UiButton extends Component {

    static DEFAULTS = {mode: 'main'};

    static TEMPLATE = (
        <button
            class=':(button button--(:mode))'
            disabled=':disabled'
            click=':click'
            >
            <i if=':icon' class=':(fa fa-(:icon))'></i>
            <block if=':caption'>:caption</block>
            <children/>
        </button>
    );
}