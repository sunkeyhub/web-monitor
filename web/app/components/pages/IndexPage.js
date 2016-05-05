import React, { Component } from 'react';
import TopbarSection from '../sections/index/TopbarSection';
import SidebarSection from '../sections/index/SidebarSection';
import GeneralSection from '../sections/index/GeneralSection';

export default class IndexPage extends Component {
    render() {
        return (
            <div>
                <TopbarSection />
                <SidebarSection />
                {this.props.children}
            </div>
        );
    }
}