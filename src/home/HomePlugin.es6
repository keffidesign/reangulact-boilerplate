import {Plugin} from 'applugins';
import HomePage from './HomePage.jsx';

export default class HomePlugin extends Plugin {

    onUi_registerPages() {

        return [
            {
                id: 'home' ,
                path:'/',
                isDefault: true,
                component: HomePage
            }
        ]
    }
}