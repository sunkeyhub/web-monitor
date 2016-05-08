import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class TopbarSection extends Component {
    render() {
        return (
            <header className="g-topbar">
                <div className="g-left">
                    <div className="m-logo">

                    </div>
                </div>
                <div className="g-right">
                    <div className="m-select-page">

                    </div>
                    <div class="m-select-date">

                    </div>
                </div>
            </header>
        );
    }
}

function mapStateToProps(state) {
    return {
        overstat: state.page.stat.topbar
    }
}

export default connect(mapStateToProps)(TopbarSection);
