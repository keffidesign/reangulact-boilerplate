import {Plugin} from 'applugins';
import {InfoComponent} from './info.component.jsx';

export default class InfoPlugin extends Plugin {

    init() {}

    onUi_registerPages() {

        return [
            {
                id: 'info',
                component: InfoComponent
            }
        ]

    }

}