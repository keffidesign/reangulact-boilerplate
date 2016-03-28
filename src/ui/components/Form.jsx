import {DataComponent} from 'reangulact';
import Fieldset from './Field.jsx';

export default class UiForm extends DataComponent {

    change() {

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