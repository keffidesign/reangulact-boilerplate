import UiPlugin from './modules/ui/ui.plugin.es6';
import InfoPlugin from './modules/info/info.plugin.es6';
import LearningPlugin from './modules/learning/learning.plugin.es6';
import StoragePlugin from './modules/storage/storage.plugin.es6';

export default {
    plugins: [
        {
            pluginConstructor: UiPlugin
        }
        ,
        {
            pluginConstructor: InfoPlugin
        }
        ,
        {
            pluginConstructor: LearningPlugin
        }
        ,
        {
            pluginConstructor: StoragePlugin
        }
    ]
}
