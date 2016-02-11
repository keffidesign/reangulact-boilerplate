import DataDrivenComponent from './DataDrivenComponent.es6';

/**
 * Top-level component that mapped to the root.
 */
export default class ViewportPage extends DataDrivenComponent {

    render() {

        return (
            <div className='root'>
                <h1>Viewport Page</h1>
                <div className='content-wrapper'>
                    {
                        this.props.children
                    }
                </div>
            </div>
        );

    }

}