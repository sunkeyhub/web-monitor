import React, { Component } from 'react';
import { connect } from 'react-redux';

class JsErrSection extends Component {
    render() {
        return (
            <h5>ErrorViewSection</h5>
        );
    }
}

function mapStateToProps(state) {
    return {
        jsError: state.stat.jsError
    }
}

export default connect(mapStateToProps)(JsErrSection);
