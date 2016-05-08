import React, { Component } from 'react';
import { connect } from 'react-redux';

class TimingSection extends Component {
    render() {
        return (
            <h5>TimingViewSection</h5>
        );
    }
}

function mapStateToProps(state) {
    return {
        timing: state.page.stat.timing
    }
}

export default connect(mapStateToProps)(TimingSection);
