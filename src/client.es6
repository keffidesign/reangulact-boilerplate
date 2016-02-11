import {create} from 'applugins';
import config from './client.config.es6';

create(config)
    .init()
    .then(() => console.log('App started'))
    .catch(() => console.error('App failed'));
