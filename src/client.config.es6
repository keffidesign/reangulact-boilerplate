import {LoggerPlugin} from 'applugins-commons';
import UiPlugin from './ui/UiPlugin.es6';
import TodosPlugin from './todos/TodosPlugin.es6';
import ApiPlugin from './api/ApiPlugin.es6';

export default {
    plugins: [
        {
            pluginConstructor: LoggerPlugin
        }
        ,
        {
            pluginConstructor: UiPlugin
        }
        ,
        {
            pluginConstructor: TodosPlugin
        }
        ,
        {
            pluginConstructor: ApiPlugin
        }
    ]
}
