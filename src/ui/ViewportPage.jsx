import {BaseComponent} from './index.es6';

/**
 * Top-level component that mapped to the root.
 */
export default class ViewportPage extends BaseComponent {

    render() {

        return (
            <div className='root'>
                <h1>Viewport</h1>
                <div className='content-wrapper'>children</div>
            </div>
        );

    }

}