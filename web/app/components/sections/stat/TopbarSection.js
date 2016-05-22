import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, DatePicker } from 'antd';
import _ from 'lodash';
var moment = require('moment');

const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

import { getPageList, getSectionData, changeTopbar } from '../../../actions/stat';

export default class TopbarSection extends Component {
    componentDidMount() {
        this.props.dispatch(getPageList());
    }

    componentDidUpdate() {
        var {
            startDate,
            endDate,
            pageList,
            pageId,
        } = this.props;
        this.props.dispatch(getSectionData(pageId, startDate, endDate));
    }

    render() {
        var {
            startDate,
            endDate,
            pageList,
            pageId,
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
                        <Select className="u-select" value={pageId} onChange={this.onPageChange.bind(this)}>
                            { 
                                _.map(pageList, function(val, index) {
                                    return (<Option key={val.id} value={val.id}>{val.name}</Option>);
                                })
                            }
                        </Select>
                    </div>
                    <div className="u-select-date">
                        <RangePicker className="u-date-picker" 
                                     format="yyyy-MM-dd" 
                                     defaultValue={defaultDate}
                                     onChange={this.onDateChange.bind(this)} />
                    </div>
                </div>
            </header>
        );
    }

    /**
     * 页面下拉回调
     * @return null
     */
    onPageChange(pageId) {
        this.props.dispatch(changeTopbar({pageId: pageId}));
    }

    /**
     * 日期下拉回调
     * @return null
     */
    onDateChange(date) {
        this.props.dispatch(changeTopbar({startDate: date[0], endDate: date[1]}));
    }
}

function mapStateToProps(state) {
    var topbar = state.stat.topbar;
    return {
        startDate: topbar.startDate,
        endDate: topbar.endDate,
        pageList: topbar.pageList,
        pageId: topbar.pageId,
        isInit: topbar.isInit,
    }        
}

export default connect(mapStateToProps)(TopbarSection);
