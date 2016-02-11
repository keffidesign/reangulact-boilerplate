import {DataDrivenComponent, List, Button} from '../ui';

export class LearningComponent extends DataDrivenComponent {

    render() {

        console.log('LearningComponent');

        return (
            <div>
                <h1>Tasks</h1>
                <List
                    dataFrom='learning://list'
                />
                <Button
                    caption='New'
                    onClick='@create'
                />
            </div>
        )

    }

}