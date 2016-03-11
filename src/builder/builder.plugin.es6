import {Plugin} from 'applugins';
import BuilderComponent from './builder.component.jsx';

export default class LearningPlugin extends Plugin {

    init() {}

    onUi_registerPages() {

        return [
            {
                id: 'builder',
                isDefault: true,
                component: BuilderComponent
            }
        ]

    }

    onBuilder_list() {

        return this.event(`storage://list`).promiseAction();

    }

    onBuilder_create({data}, cb) {

        data = {
            id: '3',
            name: 'Task #3'
        };

        this
            .event(`storage://add`)
            .withData(data)
            .action(err => err ? cb(err) : this.event('learning://changed').action());

    }

}