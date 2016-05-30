/**
 * Js 报错数据表格
 *
 * @author : Sunkey
 */

import React, { Component } from 'react';
import { Table, Icon } from 'antd';

import { getJsErrorInfoList } from '../../actions/stat';

export default class JsErrorTable extends Component {
    componentDidMount() {

    }

    render() {
        const columns = [
            {
              title: 'ID',
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

        const data = [
            {
                key: '1',
                id: 1,
                msg: 'Uncaught ReferenceError: b is not defined',
                file_path: 'file:///Users/Sunkey/Projects/perMonitor/test.html',
                file_line: 14,
                file_column: 9,
                latest_time: '2012-10-10',
                qty: 100,
            },
            {
                key: '2',
                id: 2,
                msg: 'Uncaught ReferenceError: b is not defined',
                file_path: 'file:///Users/Sunkey/Projects/perMonitor/test.html',
                file_line: 14,
                file_column: 9,
                latest_time: '2012-10-10',
                qty: 100,
            },
            {
                key: '3',
                id: 3,
                msg: 'Uncaught ReferenceError: b is not defined',
                file_path: 'file:///Users/Sunkey/Projects/perMonitor/test.html',
                file_line: 14,
                file_column: 9,
                latest_time: '2012-10-10',
                qty: 100,
            },
            {
                key: '4',
                id: 4,
                msg: 'Uncaught ReferenceError: b is not defined',
                file_path: 'file:///Users/Sunkey/Projects/perMonitor/test.html',
                file_line: 14,
                file_column: 9,
                latest_time: '2012-10-10',
                qty: 100,
            },
            {
                key: '5',
                id: 5,
                msg: 'Uncaught ReferenceError: b is not defined',
                file_path: 'file:///Users/Sunkey/Projects/perMonitor/test.html',
                file_line: 14,
                file_column: 9,
                latest_time: '2012-10-10',
                qty: 100,
            },
            {
                key: '6',
                id: 6,
                msg: 'Uncaught ReferenceError: b is not defined',
                file_path: 'file:///Users/Sunkey/Projects/perMonitor/test.html',
                file_line: 14,
                file_column: 9,
                latest_time: '2012-10-10',
                qty: 100,
            },
            {
                key: '7',
                id: 7,
                msg: 'Uncaught ReferenceError: b is not defined',
                file_path: 'file:///Users/Sunkey/Projects/perMonitor/test.html',
                file_line: 14,
                file_column: 9,
                latest_time: '2012-10-10',
                qty: 100,
            },
            {
                key: '8',
                id: 8,
                msg: 'Uncaught ReferenceError: b is not defined',
                file_path: 'file:///Users/Sunkey/Projects/perMonitor/test.html',
                file_line: 14,
                file_column: 9,
                latest_time: '2012-10-10',
                qty: 100,
            },
            {
                key: '9',
                id: 9,
                msg: 'Uncaught ReferenceError: b is not defined',
                file_path: 'file:///Users/Sunkey/Projects/perMonitor/test.html',
                file_line: 14,
                file_column: 9,
                latest_time: '2012-10-10',
                qty: 100,
            },
            {
                key: '10',
                id: 10,
                msg: 'Uncaught ReferenceError: b is not defined',
                file_path: 'file:///Users/Sunkey/Projects/perMonitor/test.html',
                file_line: 14,
                file_column: 9,
                latest_time: '2012-10-10',
                qty: 100,
            },
        ];        
        return (
            <div><Table columns={columns} dataSource={data} /></div>
        );
    }
}
