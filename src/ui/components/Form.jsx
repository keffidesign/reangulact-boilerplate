import {DataComponent} from 'reangulact';
import Field from './Field.jsx';

export default class UiForm extends DataComponent {

    init() {

        super.init();

        const metaFrom = this.get('metaFrom');
        if (metaFrom) {

            this.action(metaFrom, (err, meta)=>{
                if (err){

                    this.log(err);
                }
                this.put('meta', meta);
            });
        }
    }

    getFieldInitialValue() {

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
                value=":fieldInitialValue"
                valueChanged=':fieldChanged'
            />
        </form>
    );
}