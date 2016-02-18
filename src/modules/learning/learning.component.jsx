import {BaseComponent, List, Button} from '../ui';

export class LearningComponent extends BaseComponent {

    render() {

        return (
            <div>
                <List
                    dataFrom='learning://list'
                    dataDependsOn='learning://changed'
                    caption='Tasks'
                />
                <Button
                    caption='New'
                    action='learning://create'
                />
            </div>
        )

    }

}