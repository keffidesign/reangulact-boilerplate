import BaseComponent from './BaseComponent.es6';

/**
 * Top-level component that mapped to the root.
 */
export default class ViewportPage extends BaseComponent {

    render() {

        return (
            <div className='root'>
                <div className='content-wrapper'>
                    {
                        this.props.children
                    }
                </div>
            </div>
        );

    }

}