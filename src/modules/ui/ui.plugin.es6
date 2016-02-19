import Router from 'preact-router';
import preact from 'preact';
import {Plugin} from 'applugins';

import ui from  './index.es6';

import ViewportPage from './ViewportPage.jsx';


const PAGES = {};

const document = window.document;

/**
 * Web Client Plugin that adds a React Router facility.
 */
export default class extends Plugin {

    registerPage ({id, path, component, isDefault}){

        return preact.h(component, {path: isDefault ? '/' : path || `/${id}`});

    }

    async init() {

        const pages = await this.event('ui://registerPages').promise();

        const rootElement = document.getElementById('root') || document.body;

        const Main = () => (<Router>{pages.map(p => this.registerPage(p))}</Router>);

        preact.render(<Main />, rootElement);

        //super.init();

    }

}