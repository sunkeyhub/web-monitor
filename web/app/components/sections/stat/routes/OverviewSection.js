import React, { Component } from 'react';
import { connect } from 'react-redux';

class OverviewSection extends Component {
    render() {
        return (
            <h5>OverviewSection</h5>
        );
    }
}

function mapStateToProps(state) {
    return {
        overstat: state.stat.overview
    }
}

export default connect(mapStateToProps)(OverviewSection);
