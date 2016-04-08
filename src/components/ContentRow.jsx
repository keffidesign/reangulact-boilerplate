import {Component} from 'reangulact';

export default class UiContentRow extends Component {

    static TEMPLATE = (
        <div class='row'>
            <children/>
        </div>
    );
}