import {DataComponent} from 'reangulact';
import Fieldset from './Fieldset.jsx';

export default class UiForm extends DataComponent {

    getChange() {

        const key = this.get('m.id');

        return (value) => {

            const data = this.get('data') || {};

            this.put('data', {...data, [key]: value});

        }

    }

    static TEMPLATE = (
        <form>
            <Fieldset
                each='m of :meta'
                meta=':m'
                valueChanged=':change'
                />
        </form>
    );
}