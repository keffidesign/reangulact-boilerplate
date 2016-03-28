import {LoggerPlugin, ResourcesPlugin, StoragePlugin} from 'applugins-commons';
import UiPlugin from './ui/UiPlugin.es6';
import TodosPlugin from './todos/TodosPlugin.es6';
import ApiPlugin from './api/ApiPlugin.es6';

export default {
    plugins: [
        {
            plugin: LoggerPlugin
        }
        ,
        {
            plugin: ResourcesPlugin
        }
        ,
        {
            plugin: StoragePlugin,
            persistence: window.localStorage
        }
        ,
        {
            plugin: UiPlugin
        }
        ,
        {
            plugin: TodosPlugin
        }
        ,
        {
            plugin: ApiPlugin
        }
    ]
}
