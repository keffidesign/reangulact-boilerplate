import {DataComponent} from 'reangulact';

export default class UiList extends DataComponent {

    static DEFAULTS = {
        emptyMessage: 'Empty'
    };

    static TEMPLATE = (
        <div>
            <ul class='list-group' if=':data'>
                <li class='list-group-item' each='datum of :data'>
                    :datum.name
                </li>
                <else if=':error'>
                    <span>:Error: :error.message</span>
                </else>
            </ul>
        </div>
    );

}