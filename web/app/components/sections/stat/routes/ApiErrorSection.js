import React, { Component } from 'react';
import { connect } from 'react-redux';

class ApiErrorSection extends Component {
    render() {
        return (
            <h5>ErrorViewSection</h5>
        );
    }
}

function mapStateToProps(state) {
    return {
        apiError: state.stat.apiError
    }
}

export default connect(mapStateToProps)(ApiErrorSection);
