import React, { Component } from 'react';

import TopbarSection from '../sections/stat/TopbarSection';
import SidebarSection from '../sections/stat/SidebarSection';

export default class StatPage extends Component {
    render() {
        return (
            <div className="g-body">
                <TopbarSection />
                <div className="g-content">
                    <SidebarSection />
                    {this.props.children}
                </div>
            </div>
        );
    }
}
