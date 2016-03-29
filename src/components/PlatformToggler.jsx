import {Component} from 'reangulact';

function platform() {

    return localStorage.getItem('platform') || 'react';
}

function  isReact() {

    return platform() === 'react';
}

export default class UiPlatformToggler extends Component {

    static TEMPLATE = (

        <button style=':style' click=':click'>
            <span>:platformName</span>
        </button>
    );

    getStyle() {

        return {
            'z-index': 9999,
            'top': '5px',
            'right': '10px',
            'position': 'absolute',
            'border': 'none',
            'border-radius': '5px',
            'padding': '6px',
            'width': '100px',
            'color': (isReact() ? '#61dafb' : '#fff'),
            'text-transform': 'uppercase',
            'background': (isReact() ? '#2D2D2D' : '#e03237')
        };
    }

    getPlatformName() {

        return platform();
    }

    click() {

        localStorage.setItem('platform', isReact() ? 'angular2' : 'react');

        window.location.reload();
    }


}