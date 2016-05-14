/**
 * 数据库配置文件
 *
 * @author : Sunkey
 */

module.exports = {
    driver: GLB.FUNC.env('DB_DRIVER'),
    connections: {
        'mongo': {
            host: GLB.FUNC.env('DB_HOST'),
            port: GLB.FUNC.env('DB_PORT'),
            user: GLB.FUNC.env('DB_USERNAME'),
            pass: GLB.FUNC.env('DB_PASSWORD'),
            db: GLB.FUNC.env('DB_DATABASE'),
            server: {
                auto_reconnect: true,
                poolSize: 10,
                keepAlive: 1,
                connectTimeoutMS: 3000,
            },
        }
    }
}