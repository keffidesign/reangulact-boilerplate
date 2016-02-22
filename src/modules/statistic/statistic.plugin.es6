import {Plugin} from 'applugins';
import {InfoComponent} from './statistic.component.jsx';

export default class InfoPlugin extends Plugin {

    init() {}

    onUi_registerPages() {

        return [
            {
                id: 'statistic',
                component: InfoComponent
            }
        ]

    }

}