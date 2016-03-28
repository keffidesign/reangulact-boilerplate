//import React from 'react';
//import ReactDOM from 'react-dom';
const {Router, hashHistory, browserHistory} = ReactRouter;//from 'react-router';

import {initialize} from 'reangulact-r';

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

const PAGES = {};

const document = window.document;

const rootComponent = 0;

const rootRoute = {name: 'viewport', path: '/', component: rootComponent};

rootRoute.childRoutes = getRoutes([], rootRoute);

React.getRootPageFactory = id => React.createFactory(rootComponent);

function registerPage ({id, path, component, isDefault}){

    PAGES[id] = component;

    if (isDefault || path === "/") {

        rootRoute.indexRoute = {component};

    } else {

        rootRoute.childRoutes.push({name: id, path: path || `/${id}`, component, isDefault});

    }
}

export function bootstrap(pages) {

    initialize();

    //this.log('registerPage', pages);

    pages.forEach((page) => registerPage(page));

    //const fieldTypes = await this.event('ui://registerFieldType').promise();
    //ui.Form.registerFieldType(id, component);

    // for browser history navigation: < history={createBrowserHistory()}>
    const rootElement = document.getElementById('root') || document.body;

    //this.log(this.rootRoute.childRoutes);

    ReactDOM.render(React.createElement(Router,{routes:rootRoute, history:hashHistory}), rootElement);
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