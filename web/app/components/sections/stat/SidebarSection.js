import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class SidebarSection extends Component {
    render() {
        return (
            <section className="g-sidebar">
                <ul className="m-menu-list">
                    <li className="item">
                        <Link activeClassName="active" to="/stat/overview">数据概览</Link>
                    </li>
                    <li className="item">
                        <Link activeClassName="active" to="/stat/timing">性能分析</Link>
                    </li>
                    <li className="item">
                        <Link activeClassName="active" to="/stat/err">报错分析</Link>
                    </li>
                </ul>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        sidebar: state.page.stat.sidebar
    }
}

export default connect(mapStateToProps)(SidebarSection);
