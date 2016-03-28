import {Component} from 'reangulact';

export default class UiContentCol extends Component {

    static DEFAULTS = {
        size: `12`
    };

    static TEMPLATE = (
        <div class=':(col col-md-(:size))'>
            <children/>
        </div>
    );
}