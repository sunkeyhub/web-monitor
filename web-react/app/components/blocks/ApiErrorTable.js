/**
 * Js 报错数据表格
 *
 * @author : Sunkey
 */

import React, { Component } from 'react';
import { Table, Icon } from 'antd';

export default class ApiErrorTable extends Component {
    render() {
        const columns = [
            {
              title: '序号',
              dataIndex: 'id',
              key: 'id',
            },
            {
              title: '状态码',
              dataIndex: 'status_code',
              key: 'msg',
              render: (text) => <span className="error-msg">{text}</span>
            },
            {
              title: '请求方法',
              dataIndex: 'request_method',
              key: 'request_method',
            },
            {
              title: '请求链接',
              dataIndex: 'request_url',
              key: 'request_url',
            },
            {
              title: '最近出现',
              dataIndex: 'latest_time',
              key: 'latest_time',                  
            },
            {
              title: '次数',
              dataIndex: 'qty',
              key: 'qty',                  
            },          
        ];

        let index = 1;
        const infoList = _.map(this.props.infoList, function(item) {
            item.id = item.key = index++;
            return item;
        });

        const pagination = {
            total: infoList.length,
            pageSize: 5,
        };     
        return (
            <div>
                <Table columns={columns} dataSource={infoList} pagination={pagination} />
            </div>
        );
    }
}
