import { EventEmitter } from "events";

/*
 * @Author: oudingyin
 * @Date: 2019-07-22 08:53:50
 * @LastEditors: oudingy1in
 * @LastEditTime: 2019-08-16 10:34:23
 */
export interface ArgBuyDirect {
  url: string;
  quantity: number;
  other: any;
  expectedPrice?: number;
  skuId?: string;
  jianlou?: number;
  from_cart?: boolean;
  from_pc?: boolean;
  diejia?: number;
  ignoreRepeat?: boolean;
  no_interaction?: boolean;
  addressId?: string;
}

export interface ArgOrder<T> {
  data: T;
  other: Record<string, string>;
  expectedPrice?: number;
  noinvalid?: boolean;
  seckill?: boolean;
  jianlou?: number;
  title: string;
  qq?: string;
  bus?: EventEmitter;
  no_interaction?: boolean;
  addressId?: string;
  autopay?: boolean;
}

export interface ArgCartBuy {
  items: any[];
}

export type ArgSearch = {
  name: string;
  page: number;
  keyword: string;
  start_price?: string;
  coupon_tag_id?: string;
} & Record<string, any>;

export type ArgCoudan = {
  quantities: number[];
  urls: string[];
  expectedPrice: number;
  addressId?: string;
  other: any;
};
