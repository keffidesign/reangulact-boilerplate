import {Plugin} from 'applugins';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, hashHistory, browserHistory} from 'react-router';

import ui from  './index.es6';

import ViewportPage from './ViewportPage.jsx';

// !!! publish to global scope
window.React = React;

const PAGES = {};

const document = window.document;

class Test extends React.Component {

    render() {
        return (<div>dddddd</div>);
    }

}

/**
 * Web Client Plugin that adds a React Router facility.
 */
export default class extends Plugin {

    constructor(id, app, config) {

        super(id, app, config);

        const rootComponent = ViewportPage;

        this.rootRoute = {name: 'viewport', path: '/', component: rootComponent};

        this.rootRoute.childRoutes = getRoutes([], this.rootRoute);

        React.getRootPageFactory = id => React.createFactory(rootComponent);

    }

    registerPage ({id, path, component, isDefault}){

        PAGES[id] = component;

        if (isDefault || path === "/") {

            this.rootRoute.indexRoute = {component};

        } else {

            this.rootRoute.childRoutes.push({name: id, path: path || `/${id}`, component, isDefault});

        }

    }

    async init() {

        const pages = await this.event('ui://registerPages').promise();

        //this.log('registerPage', pages);

        pages.forEach((page) => this.registerPage(page));

        //const fieldTypes = await this.event('ui://registerFieldType').promise();
        //ui.Form.registerFieldType(id, component);

        // for browser history navigation: < history={createBrowserHistory()}>
        const rootElement = document.getElementById('root') || document.body;

        //this.log(this.rootRoute.childRoutes);

        ReactDOM.render(<Router routes={this.rootRoute} history={hashHistory}/>, rootElement);

        //super.init();

    }

}

/**
 * Page component factory.
 *
 * @param pageId id of page to be create
 */
const createPage = (pageId) => {

    const page = PAGES[pageId];

    page.contextTypes = {
        router: React.PropTypes.func
    };

    return page;

};


const getRoutes = (pages = [], parent = null) => pages.map(page => {

    var id = page.id;

    var component = createPage(page.pageId || id);

    var path = page.path || id;

    let route = {path, component};

    if (page.pages) {
        route.childRoutes = getRoutes(page.pages, route);
    }

    if (page.isDefault || pages.length === 1) {
        parent.indexRoute = {component};
    }

    return route;

});
