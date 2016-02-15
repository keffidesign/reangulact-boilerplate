import {Component as ReactComponent} from 'react';
import {event} from 'applugins';
//import clone from 'clone';

let COUNTER = 0;
//import ErrorView from './ErrorView.jsx'
//import LoadingIndicator from './LoadingIndicator.jsx'

class Component {

    constructor(type, props, children) {

        this.type = type;
        this.props = props || {};
        this.children = children;

    }

    //build() {
    //
    //    this.type = this.resolveType(this.type);
    //    this.props = this.resolveProps(this.props);
    //    this.children = this.resolveChildren(this.children);
    //
    //    return React.createElement(this.type, this.props, this.children);
    //
    //}
    //
    resolveType(type) {

        return type;

    }

    resolveDirective(id, value) {

        return this[`resolve${id}Directive`](value);

    }

    resolveIfDirective(value) {

        if (!this.getData) return null;

    }

    resolveEachDirective(value) {

        const [scopeId, dataId] = this.resolveEach(value);

        const data = this.getData(dataId);

        return data ? data.map(d => new Component(this.type, this.props, this.children)) : null;

    }

}

const EXCEPTIONAL_NOUNS = {
    data: 'datum',
    children: 'child'
};

/**
 * The base for all components.
 */
export default class DataDrivenComponent extends ReactComponent {

    constructor() {

        super();

        const _renderInternal = this.render;

        this.render = () => this.prepareJsx(_renderInternal.call(this), this.state);

    }

    createElement(type, props, ...children) {

        return {type, props: props || {}, children};

    }

    prepareJsx({type, props, children}, state) {

        props = Object.keys(props).reduce((r,k) => (r[k] = this.resolveProp(k, props[k]), r), {});

        if (props.if && state) {

            if (!this.resolveData(props.if)) {

                const ElseStatment = children.filter(({type}) => type === 'else').pop();

                if (ElseStatment) return this.prepareJsx(ElseStatment, state);


                return null;

            }

            children = children.filter(({type}) => type !== 'else');

        }

        if (props.each) {

            const [scopeId, dataId] = this.resolveEach(props.each);

            const data = this.resolveData(dataId);

            if (!data) return null;

            return data.map(d => {

                state[scopeId] = d;

                return this.cloneElement(type, props, children, state);

            });

        }

        return React.createElement(type, props, this.resolveChildren(children, state));

    }

    cloneElement(type, props, children, state) {

        props = this.resolveProps(props);

        //children = this.resolveChildren(children, state);

        return this.prepareJsx({type, props, children}, state);

    }

    resolveProps(props) {

        return Object.keys(props).reduce((r, p) => p !== 'each' ? (r[p] = this.resolvePlaceholders(props[p]), r) : r, {});

    }

    resolveChildren(children, state) {

        if (!children) return null;

        return children.map(c => (typeof c === 'string') ? this.resolvePlaceholders(c) : this.prepareJsx(c, state));

    }

    resolveProp(key, value) {

        if (/on[A-Z]/.test(key)) return () => this.event(this.resolvePlaceholders(value)).emit();

        return value;

    }

    resolvePlaceholders(str) {

        if (!str || typeof str !== 'string') return str;

        /**
         * Select with #[<...>] placeholder
         */
        const selector = /#\[(\w|[\(\)\,\s\.])+\]/g;

        return str.replace(selector, p => this.resolveData(p.substring(2, p.length - 1)));

    }

    resolveData(path, scope) {

        return path
            .split('.')
            .reduce((s, p) => {

                const value = this[p] || s[p];

                return (typeof value === 'function') ? value.call(s) : value;

            }, scope || this.state);

    }

    resolveEach(value) {

        let [scopeId, operator, dataId = scopeId] = value.split(' ');

        if (scopeId === dataId) {

            scopeId = scopeId.split('.').pop();

            scopeId = EXCEPTIONAL_NOUNS[scopeId] || scopeId.slice(0, -1);

        }

        return [scopeId, dataId];

    }

    resolveIfDirective({props, children}) {

        if (!this.resolveData(props.if)) {

            const elseStatement = children.filter(({type}) => type === 'else').pop();

            return elseStatement ? this.prepareJsx(elseStatement, state) : null;

        }

        children = children.filter(({type}) => type !== 'else');

    }

    //render() {
    //
    //    console.log('DataDrivenComponent', this);

    //const p = this.props;
    //const st = this.state;
    //let data = st.data;
    //
    //if (st.error) {
    //
    //    return this.renderError(st.error);
    //
    //} else if (st.dataLoading) {
    //
    //    return this.renderDataLoading();
    //
    //} else if (!data || data.length === 0) {
    //
    //    return this.renderEmptyData();
    //
    //} else {
    //
    //    if (p.filter) {
    //        data = data.filter(p.filter);
    //    }
    //
    //    if (p.sort) {
    //        data = data.sort(p.sort);
    //    }
    //
    //    return this.renderWithData(data);
    //
    //}

    //}
    //
    //renderWithData(data) {
    //
    //    return this.callPropsHook('template', data, this.state, this.props);
    //}
    //
    //renderError(error) {
    //
    //    return <ErrorView error={error}/>;
    //}
    //
    //renderDataLoading() {
    //
    //    return this.props.loadingView || <LoadingIndicator type={this.props.loadingIndicatorType}/>;
    //
    //}
    //
    //renderEmptyData() {
    //
    //    return this.props.emptyView || <div>{this.props.emptyDataMessage || `No data`}</div>;
    //}
    //
    componentWillMount() {

        (this.props.dataDependsOn || '').split(';').map(e => e.trim()).filter(e => e).forEach(
            (key) => this.addEventListener(key, (params, cb) => {
                this.reloadData();
                cb();
            })
        );

        if (!this.props.dataPreventInitialLoad) {

            this.reloadData();

        }

        //super.componentWillMount();

    }

    //
    setData(data, extraState) {

        if (!this.done) {

            this.setState({data, ...extraState, dataChanged: (this.state.dataChanged || 0) + 1});

            this.dataChanged(data)
        }

    }

    dataChanged(data) {

        this.callPropsHook('onDataChanged', data);
    }

    reloadData(key = this.props.dataFrom, payload = this.props.dataFromPayload || {}) {

        if (key) {

            const dataLoading = this.uniqueKey();

            this.setState({data: null, error: null, dataLoading});

            this.event(key).withData(payload).action((error, data) => {

                //this.log('data loaded', error, data, dataLoading, this.state.dataLoading);

                // !!! only the last sent emit is able to be applied.
                //if (dataLoading===this.state.dataLoading) {
                //this.log('data loaded', error, data);

                this.setData(data, {error, dataLoading: false});
                //}

            });
        }
    }

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