import {Component} from 'react';
import {event} from 'applugins';
import clone from 'clone';

let COUNTER = 0;
//import ErrorView from './ErrorView.jsx'
//import LoadingIndicator from './LoadingIndicator.jsx'

/**
 * The base for all components.
 */
export default class DataDrivenComponent extends Component {

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

        if (props.ngIf && state && !state[props.ngIf]) return null;

        if (props.ngFor) {

            const [scopeId, dataId] = this.resolveNgFor(props.ngFor);

            const data = state[dataId];

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

        return Object.keys(props).reduce((r, p) => p !== 'ngFor' ? (r[p] = this.resolvePlaceholders(props[p]), r) : r, {});

    }

    resolveChildren(children, state) {

        if (!children) return null;

        return children.map(c => (typeof c === 'string') ? this.resolvePlaceholders(c) : this.prepareJsx(c, state));

    }

    resolveProp(key, value) {

        if (/on[A-Z]/.test(key)) {

            return () => this.event(this.resolvePlaceholders(value)).emit();

        }

        return value;

    }

    resolvePlaceholders(str) {

        return str.replace(/#\[(\w|\.)+\]/g, p => {

            return p
                .substring(2, p.length - 1)
                .split('.')
                .reduce((link, p) => (link && link[p]) ? link[p] : this[p], this.state)

        });

    }

    resolveNgFor(value) {

        const [scopeId, operator, dataId] = value.split(' ');

        return [scopeId, dataId];

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