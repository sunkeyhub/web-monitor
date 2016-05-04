import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Bar extends Component {
    render() {
        return (
            <Link to='/'>Bar</Link>
        );
    }
}