import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Icon } from 'antd';
import echarts from 'echarts';

class OverviewSection extends Component {
    componentDidMount() {
        var timingDOM = ReactDOM.findDOMNode(this.refs.timingChart);
        var timingChart = echarts.init(timingDOM);

        var option = {
            title: {
                text: ''
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
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
                    data : ['周一','周二','周三','周四','周五','周六','周日','1','2','4','5','周一','周二','周三','周四','周五','周六','周日','1','2','4','5']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'邮件营销',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[120, 132, 101, 134, 90, 230, 210,134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,134, 90, 230, 210]
                }
            ]
        };

        timingChart.setOption(option);
    }

    render() {
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
                                <div className="number">10000</div>
                            </div>
                        </div>
                        <div className="box">
                            <div className="icon">
                                <Icon type="eye-o" />
                            </div>
                            <div className="data">
                                <div className="label">UV</div>
                                <div className="line"></div>
                                <div className="number">10000</div>
                            </div>
                        </div>
                        <div className="box">
                            <div className="icon">
                                <Icon type="eye-o" />
                            </div>
                            <div className="data">
                                <div className="label">平均时间(ms)</div>
                                <div className="line"></div>
                                <div className="number">10000</div>
                            </div>
                        </div>
                        <div className="box">
                            <div className="icon">
                                <Icon type="eye-o" />
                            </div>
                            <div className="data">
                                <div className="label">JS报错数</div>
                                <div className="line"></div>
                                <div className="number">10000</div>
                            </div>
                        </div>
                        <div className="box">
                            <div className="icon">
                                <Icon type="eye-o" />
                            </div>
                            <div className="data">
                                <div className="label">API报错数</div>
                                <div className="line"></div>
                                <div className="number">10000</div>
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
                            <h6 className="title">JS报错趋势</h6>
                            <div className="content">
                                <div className="m-chart">
                                    <div className="u-chart" ref="timingChart"></div>
                                </div>
                            </div>
                        </div>
                        <div className="m-subsection">
                            <h6 className="title">API报错趋势</h6>
                            <div className="content">
                                <div className="m-chart">
                                    <div className="u-chart" ref="timingChart"></div>
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
        overstat: state.stat.overview
    }
}

export default connect(mapStateToProps)(OverviewSection);
