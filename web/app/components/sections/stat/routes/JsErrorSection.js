import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Select, Icon } from 'antd';
import echarts from 'echarts';

import { getSubSectionData, changeJsErrorSection } from '../../../../actions/stat';
import JsErrorTable from '../../../blocks/JsErrorTable';

class JsErrorSection extends Component {
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

        this.trendOption = _.cloneDeep(lineChartTpl);

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
    }

    refreshChart(props) {
        var trendDOM = ReactDOM.findDOMNode(this.refs.trendChart);

        this.trendChart = echarts.init(trendDOM);

        this.trendOption.legend.data = _.keys(props.trend);
        var seriesItemTpl = this.trendOption.series.shift();
        var self = this;
        self.trendOption.series = [];
        if (this.factorKey === 'all') {
            _.forEach(this.trendOption.legend.data, function(name) {
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
                self.trendOption.xAxis[0].data = _.keys(props.trend[name]);
                self.trendOption.series.push(pushItem);
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
    }

    onFactorChange(val) {
        this.props.dispatch(changeJsErrorSection({factorKey: val}));
    }

    render() {
        var {
            factorKey,
            factorList,
        } = this.props;

        return (
            <div>
                <section className="m-section m-section-js-error">
                    <h5 className="title">
                        <span>Js 报错分析</span>
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
                        <div className="m-subsection m-subsection-detail-list">
                            <h6 className="title">报错详情</h6>
                            <div className="content">
                                <JsErrorTable infoList={this.props.infoList} />
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
        factorKey: state.stat.jsError.factorKey,
        factorList: state.stat.jsError.factorList,
        trend: state.stat.jsError.trend,
        infoList: state.stat.jsError.infoList,
    }
}

export default connect(mapStateToProps)(JsErrorSection);
