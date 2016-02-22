import UiPlugin from './modules/ui/ui.plugin.es6';
import StatisticPlugin from './modules/statistic/statistic.plugin.es6';
import LearningPlugin from './modules/learning/learning.plugin.es6';
import StoragePlugin from './modules/storage/storage.plugin.es6';

export default {
    plugins: [
        {
            pluginConstructor: UiPlugin
        }
        ,
        {
            pluginConstructor: StatisticPlugin
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
