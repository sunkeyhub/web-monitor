import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Select, Icon } from 'antd';
import echarts from 'echarts';

import { getSubSectionData, changeTimingSection } from '../../../../actions/stat';

const Option = Select.Option;

class TimingSection extends Component {
    componentDidMount() {
        var lineChartTpl = {
            title: {
                text: ''
            },
            tooltip : {
                trigger: 'axis',
            },
            legend: {
                data:['系列名称'],
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : []
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
            ],
        };

        var barChartTpl = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
            },
            legend: {
                data: [],
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
            xAxis: [
                {
                    type: 'category',
                    data: [],
                }
            ],
            yAxis: [
                {
                    type: 'value',
                },
            ],
            series: []
        };

        this.trendOption = _.cloneDeep(lineChartTpl);
        this.periodOption = _.cloneDeep(barChartTpl);
        this.performanceOption = _.cloneDeep(barChartTpl);

        if (this.props.factorKey !== '-') {
            this.props.dispatch(getSubSectionData(this.props.factorKey));
        }
    }

    componentWillUpdate(nextProps) {
        if (this.props.factorKey !== nextProps.factorKey) {
            this.props.dispatch(getSubSectionData(nextProps.factorKey));
        }
    }

    componentDidUpdate() {
        this.refreshChart(this.props);
        console.log('didupdate');
    }

    refreshChart(props) {
        var trendDOM = ReactDOM.findDOMNode(this.refs.trendChart);
        var periodDOM = ReactDOM.findDOMNode(this.refs.periodChart);
        var performanceDOM = ReactDOM.findDOMNode(this.refs.performanceChart);

        this.trendChart = echarts.init(trendDOM);
        this.periodChart = echarts.init(periodDOM);
        this.performanceChart = echarts.init(performanceDOM);

        this.trendOption.legend.data = _.keys(props.trend);
        this.trendOption.series = [];

        if (this.props.factorKey === 'all') {
            let seriesItemTpl = this.trendOption.series.shift();
            _.forEach(this.trendOption.legend.data, (name) => {
                let pushItem = {
                    name: name,
                    type: 'line',
                    label: {
                        normal: {
                            show: true,
                        }
                    },
                    data: _.values(props.trend[name]),
                };
                this.trendOption.xAxis[0].data = _.keys(props.trend[name]);
                this.trendOption.series.push(pushItem);
            });
        } else {
            let dateList = [];
            _.forEach(_.values(this.props.trend), (val, index) => {
                dateList = _.concat(dateList, _.keys(val));
            });
            dateList = _.uniq(dateList);
            this.trendOption.xAxis[0].data = dateList;

            _.forEach(this.trendOption.legend.data, (name) => {
                let pushItem = {
                    name: name,
                    type: 'line',
                    label: {
                        normal: {
                            show: true,
                        }
                    },
                    data: [],
                };
                let data = [];
                _.forEach(dateList, (date, index) => {
                    let val = 0;
                    if (!_.isUndefined(this.props.trend[name][date])) {
                        val = this.props.trend[name][date];
                    }
                    data.push(val);
                });

                if (!_.every(data, (item) => item === 0)) {
                    data = _.map(data, (val, index) => {
                        if (val === 0) {
                            let noZeroIndex = _.findIndex(data, (item) => item > 0);
                            return data[noZeroIndex];
                        }
                        return val;
                    });
                }
                pushItem.data = data;

                this.trendOption.series.push(pushItem);
            });
        }

        this.trendChart.setOption(this.trendOption);

        if (props.factorKey == 'all') {
            this.periodOption.legend.data = _.keys(props.period.all);
            this.periodOption.series = [];
            _.forOwn(props.period.all, (value, key) => {
                let pushItem = {
                    name: key,
                    type: 'bar',
                    stack: 'period',
                    data: _.values(value),
                };
                this.periodOption.xAxis[0].data = _.keys(value);
                this.periodOption.series.push(pushItem);
            });

            this.performanceOption.legend.data = _.keys(props.performance.all);
            this.performanceOption.series = [];
            _.forOwn(props.performance.all, (value, key) => {
                let pushItem = {
                    name: key,
                    type: 'bar',
                    stack: 'performance',
                    data: _.values(value),
                };
                this.performanceOption.xAxis[0].data = _.keys(value);
                this.performanceOption.series.push(pushItem);
            });           
        } else {
            this.periodOption.xAxis[0].data = _.keys(props.period);
            this.periodOption.series = [];
            _.forOwn(props.period, (value, key) => {
                this.periodOption.legend.data = _.keys(value);
                _.forOwn(value, (subValue, subKey) => {
                    var index = _.findIndex(this.periodOption.series, ['name', subKey]);
                    if (index < 0) {
                        let pushItem = {
                            name: subKey,
                            type: 'bar',
                            stack: 'period',
                            data: [subValue],
                        };
                        this.periodOption.series.push(pushItem);
                    } else {
                        this.periodOption.series[index].data.push(subValue);
                    }
                });
            });

            this.performanceOption.xAxis[0].data = _.keys(props.performance);
            this.performanceOption.series = [];
            _.forOwn(props.performance, (value, key) => {
                this.performanceOption.legend.data = _.keys(value);
                _.forOwn(value, (subValue, subKey) => {
                    var index = _.findIndex(this.performanceOption.series, ['name', subKey]);
                    if (index < 0) {
                        let pushItem = {
                            name: subKey,
                            type: 'bar',
                            stack: 'period',
                            data: [subValue],
                        };
                        this.performanceOption.series.push(pushItem);
                    } else {
                        this.performanceOption.series[index].data.push(subValue);
                    }
                });
            });
        }

        this.periodChart.setOption(this.periodOption);
        this.performanceChart.setOption(this.performanceOption);
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
                                    _.map(factorList, (val, index) => {
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
        performance: state.stat.timing.performance,
    };
}

export default connect(mapStateToProps)(TimingSection);
