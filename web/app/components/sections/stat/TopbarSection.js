import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, DatePicker } from 'antd';

const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

export default class TopbarSection extends Component {
    render() {
        var today = new Date();
        var defaultDate = [today, today];
        return (
            <header className="g-topbar">
                <div className="g-left">
                    <div className="m-logo">

                    </div>
                </div>
                <div className="g-right">
                    <div className="u-select-page">
                        <Select className="u-select" value="页面一">
                            <Option value="页面一">页面一</Option>
                            <Option value="页面二">页面二</Option>
                            <Option value="页面三">页面三</Option>
                            <Option value="页面四">页面四</Option>
                        </Select>
                    </div>
                    <div className="u-select-date">
                        <RangePicker className="u-date-picker" format="yyyy-MM-dd" defaultValue={defaultDate} />
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
