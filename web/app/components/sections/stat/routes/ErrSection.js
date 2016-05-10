import React, { Component } from 'react';
import { connect } from 'react-redux';

class ErrSection extends Component {
    render() {
        return (
            <h5>ErrorViewSection</h5>
        );
    }
}

function mapStateToProps(state) {
    return {
        err: state.stat.err
    }
}

export default connect(mapStateToProps)(ErrSection);
