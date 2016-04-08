import {EventingPlugin, LoggerPlugin, ResourcesPlugin, StoragePlugin} from 'applugins-commons';
import UiPlugin from './ui/UiPlugin.es6';
import TodosPlugin from './todos/TodosPlugin.es6';
import HomePlugin from './home/HomePlugin.es6';
import ApiPlugin from './api/ApiPlugin.es6';

const queryParams = (location.href.split('#')[0].split('?')[1] || '').split('&').reduce((p, q, i, arr, kv = q.split('='))=>(p[kv[0]] = kv[1], p), {});

export default {
    mode:'develop',
    logLevel:'info',
    ...queryParams,
    storagePersistence: window.localStorage,
    plugins: [
        EventingPlugin,
        LoggerPlugin,
        ResourcesPlugin,
        StoragePlugin,
        UiPlugin,
        TodosPlugin,
        HomePlugin,
        ApiPlugin
    ]
}
