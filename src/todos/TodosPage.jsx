import * as ui from '../ui';

export class TodosPage extends ui.BaseComponent {

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