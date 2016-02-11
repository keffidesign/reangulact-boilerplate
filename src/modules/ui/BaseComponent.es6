import {Component} from 'react';
import clone from 'clone';
import {event} from 'applugins';

let COUNTER = 0;

export default class BaseComponent extends Component {

    constructor() {

        super();

        console.log('BaseComponent');

        const _renderInternal = this.render;

        this.render = () => {

            console.log('render');

            console.log('renderInternal',_renderInternal.call(this));

            return this.prepareJsx(_renderInternal.call(this), this.state);

        }

        //this.state = {
        //
        //    data: [{id: '1'}, {id: '2'}]
        //
        //}

    }

    createElement(type, props, ...children) {

        console.log('createElement', type, props, children);

        return {type, props: props || {}, children};

    }

    prepareJsx({props, type, children}, state) {

        console.log('prepareJsx', props, type, children, state);

        if (props.ngFor) {

            const [scopeId, typeOf, dataId] = props.ngFor.split(' ');



            const data = state[dataId];


            if (!data) return null;

            return data.map((d) => {

                const newRoot = {type, props: clone(props), children: children.map((c) => clone(c))};

                state[scopeId] = d;

                this.resolveProps(newRoot, d, scopeId);

                console.log('newRoot', newRoot);

                return this.prepareJsx(newRoot, state);

            });

        } else if (props.ngIf) {

            if (state[props.ngIf]) return null;

        }

        console.log('children', children);

        return React.createElement(type, props, [].concat(...(children || []).map((c) => (!c || typeof c === 'string') ? c : this.prepareJsx(c, state))))


    }



    resolveProps({props, children}, d, scopeId) {

        Object.keys(props).forEach((p) => {

            const prop = props[p];

            console.log('prop', prop);

            if (p === 'ngFor') {

                props.ngFor = undefined;

            } else {

                props[p] = prop.startsWith(`${scopeId}.`) ? d[prop.substring(scopeId.length + 1)] : prop;

            }

        });

        if (children.length === 1 && typeof children[0] === 'string') {

            if (children[0].startsWith(`${scopeId}.`)) {

                children[0] = d[children[0].substring(scopeId.length + 1)];

            }


        } else {

            children.forEach((c) => this.resolveProps(c, d, scopeId));

        }


    }

    //////////////////////
    // Life-time
    /////////////////////

    componentWillMount() {}

    componentDidMount() {}

    //////////////////////
    // Routines
    /////////////////////

    /**
     * Gets display name of component.
     */
    getName() {

        return this.props.name || this._id;
    }


    /**
     * Gets string representation of component.
     */
    toString() {

        return this.getName();

    }

    getTypeName() {

        const fn = this.constructor;

        return fn.displayName || fn.name || /^function\s+([\w\$]+)\s*\(/.exec(fn.toString())[1];

    }


    callPropsHook(key, ...args) {

        const cb = this.props[key];

        return cb && cb.apply(this, args) || null;

    }

    uniqueKey() {

        return `C${COUNTER++}`;

    }


    /**
     * Adds event handlers with this ownership.
     *
     * @param ev
     */
    addEventListener(key, handler) {

        event.on(`${key}#${this.id}`, handler);

    }

    log(message, ...data) {

        //return event(`log://info`,{value: `${this.id}: ${message}`, data}).action();

    }

    event(...sources) {

        return event(...sources);

    }

    emit(key, params, cb) {

        event(key, {data: params}).action(cb);

    }

    promit(key, params) {

        return event(key, {data: params}).promise();

    }

}