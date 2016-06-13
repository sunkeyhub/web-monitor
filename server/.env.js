/**
 * 不同环境的配置默认值
 *
 * @author : Sunkey
 */
module.exports = {
    /* App默认配置 */
    APP_HOST: '127.0.0.1',
    APP_PORT: 8002,

    /* 数据库默认配置 */
    DB_DRIVER: 'mongo',
    DB_HOST: '127.0.0.1',
    DB_PORT: 27017,
    DB_USERNAME: '',
    DB_PASSWORD: '',
    DB_DATABASE: 'jedi_monitor',

    CACHE_DRIVER: 'redis',
    /* redis默认配置 */
    REDIS_HOST: '127.0.0.1',
    REDIS_PORT: 6379,
    REDIS_PASSWORD: null,
    REDIS_DB: 1,

    /* 邮件默认配置 */
    MAIL_DRIVER: 'smtp',
    MAIL_HOST: 'smtp.163.com',
    MAIL_USERNAME: 'sunkey@163.com',
    MAIL_PASSWORD: '123456',

    WX_APP_ID: '',
    WX_APP_SECRET: '',
};
