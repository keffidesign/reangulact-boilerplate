const {provide, Component, DynamicComponentLoader} = ng.core;
const {RouterOutlet, RouteConfig, LocationStrategy, HashLocationStrategy, ROUTER_PROVIDERS} = ng.router;
const {bootstrap} = ng.platform.browser;

import {capitalize} from 'reangulact/utils.es6';
import {initialize, prepare} from 'reangulact-ng';

const ROUTE_MAPPER = ({id,path, component}) => ({
    path: path || `/${id}`,
    as: capitalize(id),
    component: prepare(component)
});

const AngularViewport = Component({
    selector: '.root',
    directives: [RouterOutlet],
    template: `<router-outlet></router-outlet>`
}).Class({
    constructor: [DynamicComponentLoader, function (dcl) {}]
});

export function bootstrapNg(pages) {

    initialize();

    const routes = pages.map(ROUTE_MAPPER);

    const routeConfig = RouteConfig(routes);

    const providers = [
        ROUTER_PROVIDERS,
        provide(LocationStrategy, {useClass: HashLocationStrategy})
    ];

    document.addEventListener('DOMContentLoaded', function() {
        bootstrap(routeConfig(AngularViewport), providers);
    });
}