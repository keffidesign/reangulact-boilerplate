import {DataComponent} from 'reangulact';
import Field from './Field.jsx';

export default class UiForm extends DataComponent {

    init() {

        super.init();

        const metaFrom = this.get('metaFrom');
        if (metaFrom) {

            this.event(metaFrom).action((error, meta)=> {

                this.update({error, meta});
            });
        }
    }

    getFieldValue() {

        const key = this.get('m.id');
        const data = this.get('data');

        return data ? data[key] : null;
    }

    getFieldChanged() {

        const key = this.get('m.id');

        return (value) => {

            const data = this.get('data');

            this.put('data', {...data, [key]: value});

        }
    }

    static TEMPLATE = (
        <form>

            <Field
                each='m of :meta'
                meta=':m'
                value=":fieldValue"
                valueChanged=':fieldChanged'
            />

            <div if=":error" class="alert alert-danger">:(Error: (:error.message))</div>

        </form>
    );
}