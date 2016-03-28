import {DataComponent} from 'reangulact';

export default class UiList extends DataComponent {

    static DEFAULTS = {
        emptyMessage: 'There is no data.',
        loadingMessage: 'Loading...'
    };

    static TEMPLATE = (
        <block if=':error'>
            <span>:(Error: (:error.message))</span>
            <else>
                <block if=':dataLoading'>
                    <span>:loadingMessage</span>
                    <else>
                        <ul class='list-group' if=':data'>
                            <li class='list-group-item' each='datum of :data' click=":updateOnClick" data-value=":datum.id">:datum.name</li>
                            <else>
                                <span>:emptyMessage</span>
                            </else>
                        </ul>
                    </else>
                </block>
            </else>
        </block>
    );

}