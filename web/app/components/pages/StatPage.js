import React, { Component } from 'react';

import TopbarSection from '../sections/stat/TopbarSection';
import SidebarSection from '../sections/stat/SidebarSection';

export default class StatPage extends Component {
    render() {
        var minHeight = window.innerHeight - 110;
        return (
            <div className="g-body">
                <TopbarSection location={this.props.location} />
                <div className="g-content">
                    <SidebarSection location={this.props.location}/>
                    <div className="g-main">
                        <div className="g-container" style={{minHeight: minHeight+'px'}}>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
