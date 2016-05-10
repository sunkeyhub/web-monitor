import React, { Component } from 'react';
import { connect } from 'react-redux';

class TimingSection extends Component {
    render() {
        return (
            <div>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
                <h5>TimingViewSection</h5>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        timing: state.stat.timing
    }
}

export default connect(mapStateToProps)(TimingSection);
