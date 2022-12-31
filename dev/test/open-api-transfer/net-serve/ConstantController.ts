import { Delete, Get, Post, Put, vmsNet } from '@hyong8023/tool-box';

export class ConstantController {
  /** 查询全部枚举常量 */
  @Get('/constants/enums')
  static readonly enumsGet: vmsNet.GetMapping<entity.EnumGroupVO, void, void>

}
