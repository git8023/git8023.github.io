import { Delete, Get, Post, Put, vmsNet } from '@hyong8023/tool-box';

export class TestController {
  /** test */
  @Get('/test/throw')
  static readonly throwGet: vmsNet.GetMapping<boolean, void, void>

}
