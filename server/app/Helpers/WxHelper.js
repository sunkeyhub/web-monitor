/**
 * 微信助手
 *
 * @author : Sunkey
 */

const requestPromise = require('request-promise');
const crypto = require('crypto');
const wxApi = require(GLB.CONS.CONFIG_PATH + '/wxApi');

class WxHelper {
	/**
	 * 构造函数
	 * @param  String appId     应用id
	 * @param  String appSecret 应用secret
	 * @param  String scope     授权范围
	 * @return null
	 */
	constructor(appId, appSecret, scope='snsapi_base') {
		// 提前过期时间
		this.AHEAD_EXPIRE_TIME = 100;
		this.TICKET_JS_API = 'jsapi';
		this.TICKET_CARD = 'wx_card';
		this.appId = appId.trim();
		this.appSecret = appSecret.trim();
		this.scope = scope.trim();	
	}

	/**
	 * 获取jsApi签名
	 * @param  String url       页面地址
	 * @param  Number timestamp 时间戳
	 * @param  String nonceStr  随机字符串
	 * @return Promise
	 */
	getJsApiSignature(pageUrl, timestamp, nonceStr) {
		return co(function *() {
			let jsTicket = yield this.getGlobalJsTicket(this.TICKET_JS_API);
			if (!jsTicket) {
				return false;
			}

			let params = {
				'jsapi_ticket': jsTicket,
				'noncestr': nonceStr,
				'timestamp': timestamp,
				'url': pageUrl,
			};

            let srcArr = [];
			_.forEach(_.sortBy(_.keys(params)), function(key) {
				srcArr.push(key + '=' + params[key]);
			});

            let srcStr = srcArr.join('&');

			let sha1 = crypto.createHash('sha1');
			sha1.update(srcStr);
			let signature = sha1.digest('hex');

			return signature;
		}.bind(this));
	}

	/**
	 * 获取全局jsTicket
	 * @param  String  ticketType ticket类型
	 * @param  Boolean replay     是否是重试
	 * @return Promise
	 */
	getGlobalJsTicket(ticketType, replay=false) {
		return co(function *() {
			let cacheKey = 'js_ticket_' + ticketType + '_' + this.appId;
			let jsTicket = '';
			try {
				jsTicket = yield GLB.app.cache.getAsync(cacheKey);
			} catch (err) {
			}

			if (!!jsTicket) {
				return jsTicket;
			}

			try {
				var accessToken = yield this.getGlobalAccessToken(replay);
			} catch (err) {
				return false;
			}

			if (!accessToken) {
				return false;
			}

			let requestOptions = {
				url: wxApi['cgi-bin']['jsticket'],
				qs: {
					'access_token': accessToken,
					'type': ticketType,
				},
				json: true,
			};

			try {
				var resData = yield requestPromise(requestOptions);
			} catch (err) {
				GLB.app.logger.error(err);
				throw err;
			}

			if (!resData) {
				return false;
			}

			if (!!resData.errcode) {
				// access_token过期
				if (resData == '40001' && !replay) {
					jsTicket = yield this.getGlobalJsTicket(true);
					return jsTicket;
				} else {
					GLB.app.logger.error('js_ticket获取失败|' + JSON.stringify(resData));
					return false;
				}
			}

			jsTicket = resData.ticket;

			try {
				yield GLB.app.cache.setAsync(cacheKey, jsTicket);
				GLB.app.cache.expire(cacheKey, +resData.expires_in - this.AHEAD_EXPIRE_TIME);
			} catch (err) {
				GLB.app.logger.error(err);
			}

			return jsTicket;
		}.bind(this));
	}

	/**
	 * 获取全局accessToken
	 * @param  Boolean refresh 是否是刷新
	 * @return Promise
	 */
	getGlobalAccessToken(refresh=false) {
		return co(function *() {
			const cacheKey = 'access_token_' + this.appId;
			let accessToken = '';

			if (!!refresh) {
				GLB.app.cache.expire(cacheKey, 0);
			} else {
				try {
					accessToken = yield GLB.app.cache.getAsync(cacheKey);
				} catch (err) {
				}

				if (!!accessToken) {
					return accessToken;
				}
			}

			let requestOptions = {
				uri: wxApi['cgi-bin']['access_token'],
				qs: {
					'grant_type': 'client_credential',
					'appid': this.appId,
					'secret': this.appSecret,
				},
				json: true,
			};

			try {
				var resData = yield requestPromise(requestOptions);
			} catch (err) {
				throw err;
			}

			if (!resData || resData.errcode) {
				GLB.app.logger.error('access_token获取失败|' + JSON.stringify(resData));
				return false;
			}
			accessToken = resData.access_token;

			try {
				yield GLB.app.cache.setAsync(cacheKey, accessToken);
				GLB.app.cache.expire(cacheKey, +resData.expires_in - this.AHEAD_EXPIRE_TIME);
			} catch (err) {
				GLB.app.logger.error(err);
			}

			return accessToken;
		}.bind(this));
	}

	/**
	 * 清除缓存
	 * @return Promise
	 */
	clearCache() {
		return co(function *() {
			const jsTicketCacheKey = 'js_ticket_jsapi_' + this.appId;
			const accessTokenCacheKey = 'access_token_' + this.appId;

			const cacheKeys = [
				jsTicketCacheKey,
				accessTokenCacheKey,
			]

			_.forEach(cacheKeys, (cacheKey) => GLB.app.cache.expire(cacheKey, 0));

			return cacheKeys;
		}.bind(this));
	}
}

module.exports = WxHelper;
