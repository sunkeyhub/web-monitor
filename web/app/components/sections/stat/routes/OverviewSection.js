import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Icon } from 'antd';
import echarts from 'echarts';

class OverviewSection extends Component {
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
                {
                    name:'系列名称',
                    type:'line',
                    data:[],
                }
            ]
        };

        this.timingOption = _.cloneDeep(lineChartTpl);
        this.jsErrorOption = _.cloneDeep(lineChartTpl);
        this.apiErrorOption = _.cloneDeep(lineChartTpl);

        var timingDOM = ReactDOM.findDOMNode(this.refs.timingChart);
        var jsErrorDOM = ReactDOM.findDOMNode(this.refs.jsErrorChart);
        var apiErrorDOM = ReactDOM.findDOMNode(this.refs.apiErrorChart);

        this.timingChart = echarts.init(timingDOM);
        this.jsErrorChart = echarts.init(jsErrorDOM);
        this.apiErrorChart = echarts.init(apiErrorDOM);
    }

    componentWillUpdate(nextProps) {
        this.refreshChart(nextProps);
    }

    refreshChart(nextProps) {
        this.timingOption.legend.data[0] = '页面加载时间（ms）';
        this.timingOption.series[0].name = '页面加载时间（ms）';
        this.timingOption.series[0].data = _.values(nextProps.timing);
        this.timingOption.xAxis[0].data = _.keys(nextProps.timing);
        this.timingChart.setOption(this.timingOption);

        this.jsErrorOption.legend.data[0] = 'Js 报错数';
        this.jsErrorOption.series[0].name = 'Js 报错数';
        this.jsErrorOption.series[0].data = _.values(nextProps.jsError);
        this.jsErrorOption.xAxis[0].data = _.keys(nextProps.jsError);
        this.jsErrorChart.setOption(this.jsErrorOption);

        this.apiErrorOption.legend.data[0] = 'Api 报错数';
        this.apiErrorOption.series[0].name = 'Api 报错数';
        this.apiErrorOption.series[0].data = _.values(nextProps.apiError);
        this.apiErrorOption.xAxis[0].data = _.keys(nextProps.apiError);
        this.apiErrorChart.setOption(this.apiErrorOption);
    }

    render() {
        var {
            visit,
        } = this.props;

        return (
            <div>
                <section className="m-section m-section-visit">
                    <h5 className="title">访问概览</h5>
                    <div className="content">
                        <div className="box">
                            <div className="icon">
                                <Icon type="eye-o" />
                            </div>
                            <div className="data">
                                <div className="label">PV</div>
                                <div className="line"></div>
                                <div className="number">{visit.pv}</div>
                            </div>
                        </div>
                        <div className="box">
                            <div className="icon">
                                <Icon type="eye-o" />
                            </div>
                            <div className="data">
                                <div className="label">UV</div>
                                <div className="line"></div>
                                <div className="number">{visit.uv}</div>
                            </div>
                        </div>
                        <div className="box">
                            <div className="icon">
                                <Icon type="eye-o" />
                            </div>
                            <div className="data">
                                <div className="label">平均时间（ms）</div>
                                <div className="line"></div>
                                <div className="number">{visit.timing}</div>
                            </div>
                        </div>
                        <div className="box">
                            <div className="icon">
                                <Icon type="eye-o" />
                            </div>
                            <div className="data">
                                <div className="label">Js 报错数</div>
                                <div className="line"></div>
                                <div className="number">{visit.jsError}</div>
                            </div>
                        </div>
                        <div className="box">
                            <div className="icon">
                                <Icon type="eye-o" />
                            </div>
                            <div className="data">
                                <div className="label">Api 报错数</div>
                                <div className="line"></div>
                                <div className="number">{visit.apiError}</div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="m-section m-section-timing">
                    <h5 className="title">性能概览</h5>
                    <div className="content">
                        <div className="m-subsection">
                            <h6 className="title">性能趋势</h6>
                            <div className="content">
                                <div className="m-chart">
                                    <div className="u-chart" ref="timingChart"></div>
                                </div>
                            </div>
                        </div>
                    </div>                    
                </section>
                <section className="m-section m-section-err">
                    <h5 className="title">报错概览</h5>
                    <div className="content">
                        <div className="m-subsection">
                            <h6 className="title">Js 报错趋势</h6>
                            <div className="content">
                                <div className="m-chart">
                                    <div className="u-chart" ref="jsErrorChart"></div>
                                </div>
                            </div>
                        </div>
                        <div className="m-subsection">
                            <h6 className="title">Api 报错趋势</h6>
                            <div className="content">
                                <div className="m-chart">
                                    <div className="u-chart" ref="apiErrorChart"></div>
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
    var overview = state.stat.overview;
    return {
        visit: overview.visit,
        timing: overview.timing,
        jsError: overview.jsError,
        apiError: overview.apiError,
    }
}

export default connect(mapStateToProps)(OverviewSection);
