import * as ui from '../ui';

console.log('ui', ui.Component);

export default class TodosPage extends ui.Component {

    click() {

        this.event('todos://create').emit();

    }

    static TEMPLATE = (
        <div>
            <ui.Header
                caption='Todos'
                />
            <ui.Content>
                <ui.List
                    dataFrom='todos://list'
                    />
                <ui.Button
                    caption='Create'
                    click=':click'
                    />
            </ui.Content>
            <ui.Footer
               // caption='Copyright'
            />
        </div>
    );

}