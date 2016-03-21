import {Plugin} from 'applugins';
import {bootstrap} from  './React.es6';
import {bootstrapNg} from  './Angular.es6';

export default class UiPlugin extends Plugin {

    async init() {

        const pages = await this.event('ui://registerPages').promise();

        //bootstrap(pages);
        bootstrapNg(pages);

        return super.init();

    }

    onUi_navigate({path}, cb) {

        window.location.hash = '' + path.join('/');

        return true;

    }

}
