import {Component} from 'reangulact';

export default class UiContent extends Component {

    static TEMPLATE = (
        <div class='container'>
            <children/>
        </div>
    );
}