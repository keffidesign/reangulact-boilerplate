import {Component} from 'reangulact';
import PlatformToggler from './PlatformToggler.jsx';

export default class UiHeader extends Component {

    static TEMPLATE = (
        <nav class='navbar navbar-dark bg-primary navbar-full'>
            <PlatformToggler/>

            <span class='navbar-brand' if=':caption'>:caption</span>
            <ul class='nav navbar-nav'>
                <li class='nav-item' each='datum of :data'>
                    <a class='nav-link' href='#'>:datum.caption <span class='sr-only'>(current)</span></a>
                </li>
            </ul>
        </nav>
    );

}