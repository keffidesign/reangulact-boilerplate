import {Plugin} from 'applugins';
import {LearningComponent} from './learning.component.jsx';

export default class LearningPlugin extends Plugin {

    init() {}

    onUi_registerPages() {

        return [
            {
                id: 'learning',
                isDefault: true,
                component: LearningComponent
            }
        ]

    }

    onLearning_list() {

        return this.event(`storage://list`).promiseAction();

    }

    onLearning_create({data}) {

        return this.event(`storage://add`).withData(data).promiseAction();

    }

}