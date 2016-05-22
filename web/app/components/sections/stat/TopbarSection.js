import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, DatePicker } from 'antd';
import _ from 'lodash';
var moment = require('moment');

const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

import { getPageList, getSectionData } from '../../../actions/stat';

export default class TopbarSection extends Component {
    componentDidMount() {
        this.props.dispatch(getPageList());
    }

    componentDidUpdate() {
        var {
            startDate,
            endDate,
            pageList,
            isInit,
        } = this.props;
        if (isInit) {
            var defaultPage = pageList && pageList.length && pageList[0]; 
            if (defaultPage) {
                this.props.dispatch(getSectionData(defaultPage.page_id, startDate, endDate))
            }
        }
    }

    render() {
        var {
            startDate,
            endDate,
            pageList,
        } = this.props;

        var defaultDate = [startDate, endDate];
        var defaultPage = pageList && pageList.length && pageList[0]; 

        return (
            <header className="g-topbar">
                <div className="g-left">
                    <div className="m-logo">

                    </div>
                </div>
                <div className="g-right">
                    <div className="u-select-page">
                        <Select className="u-select" value={defaultPage && defaultPage.name} onChange={this.onPageChange}>
                            { 
                                _.map(pageList, function(val, index) {
                                    return (<Option key={val.page_id} value={val.page_id}>{val.name}</Option>);
                                })
                            }
                        </Select>
                    </div>
                    <div className="u-select-date">
                        <RangePicker className="u-date-picker" format="yyyy-MM-dd" defaultValue={defaultDate} />
                    </div>
                </div>
            </header>
        );
    }

    /**
     * 页面下拉回调
     * @return null
     */
    onPageChange() {
        
    }

    /**
     * 日期下拉回调
     * @return null
     */
    onDateChange() {

    }
}

function mapStateToProps(state) {
    var topbar = state.stat.topbar;
    return {
        startDate: topbar.startDate,
        endDate: topbar.endDate,
        pageList: topbar.pageList,
        isInit: topbar.isInit,
    }        
}

export default connect(mapStateToProps)(TopbarSection);
