import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Select, Icon } from 'antd';
import echarts from 'echarts';

import { getSubSectionData, changeTimingSection } from '../../../../actions/stat';

const Option = Select.Option;

class TimingSection extends Component {
    componentDidMount() {
        var trendDOM = ReactDOM.findDOMNode(this.refs.trendChart);
        var periodDOM = ReactDOM.findDOMNode(this.refs.periodChart);
        var performanceDOM = ReactDOM.findDOMNode(this.refs.performanceChart);

        this.trendChart = echarts.init(trendDOM);
        this.periodChart = echarts.init(periodDOM);
        this.performanceChart = echarts.init(performanceDOM);
    }

    componentWillUpdate(nextProps) {
        if (this.props.factorKey !== nextProps.factorKey) {
            this.props.dispatch(getSubSectionData(nextProps.factorKey));
        }
    }

    componentDidUpdate() {
        this.refreshChart(this.props);
    }

    refreshChart(props) {

    }

    onFactorChange(val) {
        this.props.dispatch(changeTimingSection({factorKey: val}));
    }

    render() {
        var {
            factorKey,
            factorList,
        } = this.props;

        return (
            <div>
                <section className="m-section m-section-timing">
                    <h5 className="title">
                        <span>性能分析</span>
                        <div className="m-select-factor">
                            <label>相关因子：</label>
                            <Select size="small" className="u-select" value={factorKey} onChange={this.onFactorChange.bind(this)}>
                                { 
                                    _.map(factorList, function(val, index) {
                                        return (<Option key={val.key} value={val.key}>{val.name}</Option>);
                                    })
                                }
                            </Select>
                        </div>
                    </h5>
                    <div className="content">
                        <div className="m-subsection">
                            <h6 className="title">趋势分析</h6>
                            <div className="content">
                                <div className="m-chart">
                                    <div className="u-chart" ref="trendChart"></div>
                                </div>
                            </div>
                        </div>
                        <div className="m-subsection">
                            <h6 className="title">阶段分析</h6>
                            <div className="content">
                                <div className="m-chart">
                                    <div className="u-chart" ref="periodChart"></div>
                                </div>
                            </div>
                        </div>
                        <div className="m-subsection">
                            <h6 className="title">体验分析</h6>
                            <div className="content">
                                <div className="m-chart">
                                    <div className="u-chart" ref="performanceChart"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        factorKey: state.stat.timing.factorKey,
        factorList: state.stat.timing.factorList,
        trend: state.stat.timing.trend,
        period: state.stat.timing.period,
        performance: state.stat.timing.period,
    };
}

export default connect(mapStateToProps)(TimingSection);
