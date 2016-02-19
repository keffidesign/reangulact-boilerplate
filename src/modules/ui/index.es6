import {Component as ReactComponent} from 'preact';

export {List, Button} from 'ui-components';

import {BaseComponent as _BaseComponent} from 'ui-components';
import ReactPrototype from './ReactPrototype';


Object.assign(_BaseComponent.prototype, ReactComponent.prototype, ReactPrototype);

_BaseComponent.prototype.constructor = ReactComponent;

_BaseComponent.prototype.internalConstructor = function() {

    this._renderInternal = this.render;

    this.render = ReactPrototype.render;

    this.state = this.state || {};

};

export const BaseComponent = _BaseComponent;
