import {DataComponent} from 'reangulact';

export default class Todos extends DataComponent {

    static DEFAULTS = {
        emptyMessage: 'There is nothing to do.',
        loadingMessage: 'Procrastinate a bit...'
    };

    static TEMPLATE = (
        <block if=':error'>
            <span>:(Error: (:error.message))</span>
            <else>
                <block if=':dataLoading'>
                    <span>:loadingMessage</span>
                    <else>
                        <ul class='list-group' if=':data'>
                            <li class='list-group-item' each='datum of :data' click=":updateOnClick" data-value=":datum.id">
                                <h3>:datum.name</h3>
                                <em>:( Status: (:datum.status))</em>
                            </li>
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