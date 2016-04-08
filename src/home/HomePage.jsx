import {Component, Header} from '../components';

/**
 * Top-level component that mapped to the root.
 */
export default class HomePlugin extends Component {

    render() {

        return (
            <div>

                <Header caption='Home'/>

                <aside style="padding:20px">
                    <a href='#/todos'>Todo List</a>
                </aside>

            </div>
        );

    }

}