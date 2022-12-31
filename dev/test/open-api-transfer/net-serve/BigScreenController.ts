import { Delete, Get, Post, Put, vmsNet } from '@hyong8023/tool-box';

export class BigScreenController {
  /** 获取数据统计 */
  @Get('/bigScreen/getCount')
  static readonly getCountGet: vmsNet.GetMapping<entity.BigScreenVO, void, void>

}
