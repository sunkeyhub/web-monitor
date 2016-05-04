import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Foo extends Component {
    render() {
        console.log(this.props);
        return (
            <p>Foo</p>
        );
    }
}