"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_promise_native_1 = __importDefault(require("request-promise-native"));
const fs_1 = require("fs");
const cookie = fs_1.readFileSync(__dirname + "/cookie.txt");
var STATUS;
(function (STATUS) {
    STATUS["NOT_LOGIN"] = "3";
    STATUS["SIGNED"] = "2";
    STATUS["NOT_SIGN"] = "1";
})(STATUS || (STATUS = {}));
exports.req = request_promise_native_1.default.defaults({
    headers: {
        "Accept-Encoding": "br, gzip, deflate",
        Cookie: cookie,
        // Accept: '*/*',
        "User-Agent": "jdapp;iPhone;8.1.0;12.3.1;38276cc01428d153b8a9802e9787d279e0b5cc85;network/wifi;ADID/3D52573B-D546-4427-BC41-19BE6C9CE864;supportApplePay/3;hasUPPay/0;pushNoticeIsOpen/0;model/iPhone9,2;addressid/1091472708;hasOCPay/0;appBuild/166315;supportBestPay/0;pv/259.6;pap/JA2015_311210|8.1.0|IOS 12.3.1;apprpd/Home_Main;psn/38276cc01428d153b8a9802e9787d279e0b5cc85|1030;usc/pdappwakeupup_20170001;jdv/0|pdappwakeupup_20170001|t_335139774|appshare|CopyURL|1561092574799|1561092578;umd/appshare;psq/1;ucp/t_335139774;app_device/IOS;adk/;ref/JDMainPageViewController;utr/CopyURL;ads/;Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"
        // Referer: 'https://bean.m.jd.com/continuity/index',
        // 'Accept-Language': 'en-us'
    },
    gzip: true,
    jar: true,
    transform(body) {
        console.log(body);
        if (typeof body === "string") {
            if (body.startsWith("jsonp")) {
                body = body.replace(/^\w+\((.*)\);?/, "$1");
            }
            let { code, data } = JSON.parse(body);
            if (code !== "0") {
                throw body;
            }
            return data;
        }
        return body;
    }
});
// ----------签到---------------
/**
 * 签到
 */
function signIn() {
    return exports.req.post("https://api.m.jd.com/client.action", {
        qs: {
            functionId: "signBeanIndex"
        },
        form: {
            adid: "3D52573B-D546-4427-BC41-19BE6C9CE864",
            area: "12_988_40034_51587",
            body: JSON.stringify({
                jda: "-1",
                monitor_source: "bean_app_bean_index",
                shshshfpb: "",
                fp: "-1",
                eid: "",
                shshshfp: "-1",
                monitor_refer: "",
                userAgent: "-1",
                rnVersion: "4.0",
                shshshfpa: "-1",
                referUrl: "-1"
            }),
            build: "166315",
            client: "apple",
            clientVersion: "8.1.0",
            d_brand: "apple",
            d_model: "iPhone9,2",
            isBackground: "N",
            joycious: "277",
            lang: "zh_CN",
            networkType: "wifi",
            networklibtype: "JDNetworkBaseAF",
            openudid: "38276cc01428d153b8a9802e9787d279e0b5cc85",
            osVersion: "12.3.1",
            partner: "apple",
            scope: "01",
            screen: "1242*2208",
            sign: "6d78be68bd08ad9e6eea153ea362cbd8",
            st: "1561685238868",
            sv: "100",
            uuid: "hjudwgohxzVu96krv/T6Hg==",
            wifiBssid: "unknown"
        }
    });
}
exports.signIn = signIn;
function getSignStatus() {
    return exports.req.get(`https://api.m.jd.com/client.action`, {
        qs: {
            functionId: "findBeanIndex",
            body: JSON.stringify({
                source: "apphome",
                monitor_refer: "",
                rnVersion: "3.9",
                rnClient: "1",
                monitor_source: "bean_m_bean_index"
            }),
            appid: "ld",
            client: "apple",
            clientVersion: "8.1.0",
            networkType: "wifi",
            osVersion: "12.3.1",
            uuid: "38276cc01428d153b8a9802e9787d279e0b5cc85",
            jsonp: "jsonp_1561462819024_25606"
        }
    });
}
exports.getSignStatus = getSignStatus;
// ------------------转盘-------------------
function getZhuanpanInfo() {
    return exports.req.get(`https://api.m.jd.com/client.action`, {
        qs: {
            functionId: "wheelSurfIndex",
            body: JSON.stringify({ actId: "jgpqtzjhvaoym", appSource: "jdhome" }),
            appid: "ld",
            client: "apple",
            clientVersion: "8.1.0",
            networkType: "wifi",
            osVersion: "12.3.1",
            uuid: "38276cc01428d153b8a9802e9787d279e0b5cc85",
            jsonp: "jsonp_1561549904178_23463"
        }
    });
}
exports.getZhuanpanInfo = getZhuanpanInfo;
function getZhuanpan() {
    return exports.req.get(`https://api.m.jd.com/client.action`, {
        qs: {
            functionId: "lotteryDraw",
            body: JSON.stringify({
                actId: "jgpqtzjhvaoym",
                appSource: "jdhome",
                lotteryCode: "mwsevpvqu3t57je23kq7pva3wb6e2sbuc4ihzru63p5pso7sqeq5fz65ajnlm2llhiawzpccizuck"
            }),
            appid: "ld",
            client: "apple",
            clientVersion: "8.1.0",
            networkType: "wifi",
            osVersion: "12.3.1",
            uuid: "38276cc01428d153b8a9802e9787d279e0b5cc85",
            jsonp: "jsonp_1561550234465_31307"
        }
    });
}
exports.getZhuanpan = getZhuanpan;
// -------------豆子--------------
// export function getBeanInfo(): RequestPromise<{
//   timeNutrientsRes: { state: string; bottleState: string; nutrCount: string };
// }> {
//   return req.post(
//     "http://api.m.jd.com/client.action?functionId=plantBeanIndex",
//     {
//       form: {
//         adid: "3D52573B-D546-4427-BC41-19BE6C9CE864",
//         area: "12_988_40034_51587",
//         body:
//           '{"shareUuid":"","monitor_refer":"","wxHeadImgUrl":"","followType":"1","monitor_source":"plant_app_plant_index"}',
//         build: "166315",
//         client: "apple",
//         clientVersion: "8.1.0",
//         d_brand: "apple",
//         d_model: "iPhone9,2",
//         isBackground: "N",
//         joycious: "277",
//         lang: "zh_CN",
//         networkType: "wifi",
//         networklibtype: "JDNetworkBaseAF",
//         openudid: "38276cc01428d153b8a9802e9787d279e0b5cc85",
//         osVersion: "12.3.1",
//         partner: "apple",
//         scope: "01",
//         screen: "1242*2208",
//         sign: "f0f0e5e0f1e35a1facfcb9917046c23f",
//         st: "1561548694482",
//         sv: "100",
//         uuid: "hjudwgohxzVu96krv/T6Hg==",
//         wifiBssid: "unknown"
//       }
//     }
//   );
// }
// export function getBean(): RequestPromise<{
//   timeNutrientsRes: {};
// }> {
//   return req.post(
//     "http://api.m.jd.com/client.action?functionId=receiveNutrients",
//     {
//       form: {
//         adid: "3D52573B-D546-4427-BC41-19BE6C9CE864",
//         area: "12_988_40034_51587",
//         body:
//           '{"shareUuid":"","monitor_refer":"","wxHeadImgUrl":"","followType":"1","monitor_source":"plant_app_plant_index"}',
//         build: "166315",
//         client: "apple",
//         clientVersion: "8.1.0",
//         d_brand: "apple",
//         d_model: "iPhone9,2",
//         isBackground: "N",
//         joycious: "277",
//         lang: "zh_CN",
//         networkType: "wifi",
//         networklibtype: "JDNetworkBaseAF",
//         openudid: "38276cc01428d153b8a9802e9787d279e0b5cc85",
//         osVersion: "12.3.1",
//         partner: "apple",
//         scope: "01",
//         screen: "1242*2208",
//         sign: "f0f0e5e0f1e35a1facfcb9917046c23f",
//         st: "1561548694482",
//         sv: "100",
//         uuid: "hjudwgohxzVu96krv/T6Hg==",
//         wifiBssid: "unknown"
//       }
//     }
//   );
// }
/**
 * 查询商品优惠券信息
 * @param id
 */
function queryCouponInfo(id) {
    return exports.req
        .post("https://ms.jr.jd.com/gw/generic/hyqy/h5/m/queryCouponCenterDetail", {
        qs: {
            _: Date.now()
        },
        form: {
            reqData: JSON.stringify({ id, couponListType: "4" })
        }
    })
        .then(({ resultData: { couponDetailDeto } }) => couponDetailDeto);
}
exports.queryCouponInfo = queryCouponInfo;
/**
 * 获取优惠券
 * @param id
 */
function getCoupon(id) {
    return exports.req
        .post(`https://ms.jr.jd.com/gw/generic/hyqy/h5/m/drawCouponCente`, {
        qs: {
            _: Date.now()
        },
        form: {
            reqData: JSON.stringify({ id, couponListType: "4" })
        }
    })
        .then(({ resultData: { drawCouponDto } }) => drawCouponDto);
}
exports.getCoupon = getCoupon;
/**
 * 获取每日看视频选答案红包
 */
async function getVideoHongbao() {
    var url = "https://h5.m.jd.com/babelDiy/Zeus/2QJAgm3fJGpAkibejRi36LAQaRto/index.html";
    var text = await exports.req.get(url, {
        qs: {
            _ts: Date.now(),
            utm_source: "iosapp",
            utm_medium: "appshare",
            utm_campaign: "t_335139774",
            utm_term: "Wxfriends",
            ad_od: "share",
            utm_user: "plusmember"
        }
    });
    var { advertInfos } = JSON.parse(/\w+\((.*)\)/.exec(text)[1]);
    var { list: [{ comment, desc }] } = advertInfos.find(({ groupId, groupName }) => groupId === "03303165" || groupName === "题目/选项/答案");
    await exports.req.get("https://api.m.jd.com/client.action", {
        qs: {
            appid: "answer_20190513",
            t: "1561943106751",
            functionId: "answerSendHb",
            body: {
                activityId: "10042",
                pageId: "873571",
                reqSrc: "mainActivity",
                platform: "APP/m",
                answer: 1,
                select: "在开机键上"
            },
            client: "wh5",
            clientVersion: "1.0.0",
            uuid: "15617018266251592388825"
        }
    });
}
exports.getVideoHongbao = getVideoHongbao;
/**
 * 获取店铺奖励
 */
async function getShopJindou() {
    await exports.req.get("https://bean.jd.com/myJingBean/list");
    var text = await exports.req.post("https://bean.jd.com/myJingBean/getPopSign");
    console.log(text);
    var { data } = JSON.parse(text);
    data.forEach(async ({ shopUrl, signed }) => {
        if (!signed) {
            let id;
            if (/mall\.jd\.com\/index-(\w+)/.test(shopUrl)) {
                id = RegExp.$1;
            }
            else {
                let html = await exports.req.get(shopUrl);
                id = /var shopId = "(\d+)"/.exec(html)[1];
            }
            await exports.req.get(`https://mall.jd.com/shopSign-${id}.html`);
        }
    });
}
exports.getShopJindou = getShopJindou;
// var ins = new JinDong();
// 1694276
// getGoodsInfo(3857389).then(console.log);
// queryGoodsCoupon(3857389).then(console.log);
// ins.resolveUrl("https://u.jd.com/cvPKW6").then(console.log);
// 领优惠券
// get https://coupon.m.jd.com/coupons/show.action?key=aec58667c0c14d7bae2422b73b83ef0f&roleId=20889698
// click .btn
// xhr: get https://s.m.jd.com/activemcenter/mfreecoupon/getcoupon?key=aec58667c0c14d7bae2422b73b83ef0f&roleId=20889698&to=&verifycode=&verifysession=&_=1561266410625&sceneval=2&g_login_type=1&callback=jsonpCBKA&g_ty=ls
