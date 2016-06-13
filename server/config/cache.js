/**
 * 数据库配置文件
 *
 * @author : Sunkey
 */

module.exports = {
    driver: GLB.FUNC.env('CACHE_DRIVER'),
    connections: {
        redis: {
            host: GLB.FUNC.env('REDIS_HOST'),
            port: GLB.FUNC.env('REDIS_PORT'),
            password: GLB.FUNC.env('REDIS_PASSWORD'),
            db: GLB.FUNC.env('REDIS_DB'),
        },
    },
}