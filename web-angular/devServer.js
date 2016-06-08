/**
 * express 静态开发服务器
 *
 * @author : Suneky
 */

const express = require('express');
const app = express();

app.use(express.static('./')).listen(8008);

console.log('server listen on 8008');
