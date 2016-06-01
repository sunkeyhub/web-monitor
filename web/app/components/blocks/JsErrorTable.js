/**
 * Js 报错数据表格
 *
 * @author : Sunkey
 */

import React, { Component } from 'react';
import { Table, Icon } from 'antd';

import { getJsErrorInfoList } from '../../actions/stat';

export default class JsErrorTable extends Component {
    constructor() {
        super();

        this.state = {
            per: 20,
        };
    }

    render() {
        const columns = [
            {
              title: '序号',
              dataIndex: 'id',
              key: 'id',
            },
            {
              title: '信息',
              dataIndex: 'msg',
              key: 'msg',
              render: (text) => <span className="error-msg">{text}</span>
            },
            {
              title: '路径',
              dataIndex: 'file_path',
              key: 'file_path',
            },
            {
              title: '行',
              dataIndex: 'file_line',
              key: 'file_line',
            },
            {
              title: '列',
              dataIndex: 'file_column',
              key: 'file_column',                
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
