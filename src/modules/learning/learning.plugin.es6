import {Plugin} from 'applugins';
import {LearningComponent} from './learning.component.jsx';

export default class LearningPlugin extends Plugin {

    init() {}

    onUi_registerPages() {

        return [
            {
                id: 'learning',
                component: LearningComponent
            }
        ]

    }

}