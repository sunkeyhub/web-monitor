/**
 * 微信接口配置
 *
 * @author : Sunkey
 */

module.exports = {
	/**
	 * 用户授权接口
	 */
    'oauth': {
        'authorize': 'https://open.weixin.qq.com/connect/oauth2/authorize',
        'access_token': 'https://api.weixin.qq.com/sns/oauth2/access_token',
        'refresh_token': 'https://api.weixin.qq.com/sns/oauth2/refresh_token',
    },
    /**
     * 用户信息接口
     */
    'sns': {
        'userinfo': 'https://api.weixin.qq.com/sns/userinfo',
    },
    /**
     * 网关接口
     */
    'cgi-bin': {
        'access_token': 'https://api.weixin.qq.com/cgi-bin/token',
        'jsticket': 'https://api.weixin.qq.com/cgi-bin/ticket/getticket',
    },
};
