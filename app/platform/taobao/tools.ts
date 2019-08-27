/*
 * @Author: oudingyin
 * @Date: 2019-07-12 15:48:14
 * @LastEditors: oudingy1in
 * @LastEditTime: 2019-08-26 19:21:04
 */
import request = require("request-promise-native");
import { newPage } from "../../../utils/page";
import { logFileWrapper, getCookie } from "../../../utils/tools";
import signData from "./h";
import bus_global from "../../common/bus";
import setting from "./setting";

export async function resolveTaokouling(text: string) {
  var data: string = await request.post(
    "http://www.taokouling.com/index/taobao_tkljm",
    {
      form: {
        text
      },
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      },
      gzip: true
    }
  );
  return <string>JSON.parse(data).data.url;
}

export async function resolveUrl(url: string) {
  if (!url.startsWith("http")) {
    return resolveTaokouling(url);
  }
  if (/^https?:\/\/s.click.taobao.com\/t/.test(url) || url.includes("t.cn/")) {
    var page = await newPage();
    await page.goto(url);
    url = page.url();
    page.close();
  } else if (url.startsWith("https://m.tb.cn/")) {
    let html: string = await request.get(url);
    return /var url = '([^']+)/.exec(html)![1];
  }
  return url;
}

export var logFile = logFileWrapper("taobao");

export function getItemId(url: string) {
  if (url.startsWith("https://a.m.taobao.com")) {
    return /(\d+)\.htm/.exec(url)![1];
  }
  return /id=(\d+)/.exec(url)![1];
}
export function getGoodsUrl(itemId: string) {
  return `https://detail.m.tmall.com/item.htm?id=${itemId}`;
}

export function setReq(req: request.RequestPromiseAPI, _cookie: string) {
  setting.cookie = _cookie;
  setting.req = req.defaults({
    headers: {
      "user-agent":
        "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"
    }
  });
}

bus_global.on("taobao:cookie", setReq);

export async function requestData(
  api: string,
  data: any,
  method: "get" | "post" = "get",
  version = "6.0",
  ttid = "#b#ad##_h5"
) {
  var t = Date.now();
  var data_str = JSON.stringify(data);
  var form: any;
  var token = getCookie("_m_h5_tk", setting.cookie);
  token = token && token.split("_")![0];
  var qs: any = {
    jsv: "2.4.7",
    appKey: setting.appKey,
    api,
    v: version,
    type: "originaljson",
    ecode: 1,
    dataType: "json",
    t,
    ttid,
    AntiFlood: true,
    LoginRequest: true,
    H5Request: true
  };
  var sign = signData([token, t, setting.appKey, data_str].join("&"));
  qs.sign = sign;
  if (method === "get") {
    qs.data = data_str;
  } else {
    form = {
      data: data_str
    };
  }
  var text: string = await setting.req(
    `https://h5api.m.taobao.com/h5/${api}/${version}/`,
    {
      method,
      qs,
      form
    }
  );
  var { data, ret } = JSON.parse(text);
  var arr_msg = ret[ret.length - 1].split("::");
  var code = arr_msg[0];
  var msg = arr_msg[arr_msg.length - 1];
  if (code !== "SUCCESS") {
    let err = new Error(msg);
    err.name = code;
    logFile(text, "_err-" + api);
    throw err;
  }
  return data;
}
