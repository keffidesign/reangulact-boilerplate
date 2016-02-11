import {BaseComponent, List, Button} from '../ui';

export class LearningComponent extends BaseComponent {

    render() {

        return (
            <div>
                <h1>Learning Component</h1>
                <List
                    dataFrom='storage://list'
                />
                <Button
                    caption='Add new'
                />
            </div>
        )

    }

}