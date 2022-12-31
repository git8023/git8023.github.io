import { Delete, Get, Post, Put, vmsNet } from '@hyong8023/tool-box';

export class ProjectLineController {
  /** 分页查询 */
  @Get('/projectLine')
  static readonly projectLineGet: vmsNet.GetMapping<entity.PageResult<entity.TProjectLineEntity>, {asc: boolean, createTime: number, creator: string, current: number, id: string, lastModifyTime: number, linePicture: string, orderBy: string, pages: number, remark: string, size: number, status: number, total: number, TProjectId: number}, void>

  /** 添加 */
  @Post('/projectLine')
  static readonly projectLinePost: vmsNet.PostMapping<entity.TProjectLineEntity, void, void>

  /** 指定ID获取数据 */
  @Get('/projectLine/{id}')
  static readonly projectLineGet: vmsNet.GetMapping<entity.TProjectLineEntity, void, {id: string}>

  /** 更新 */
  @Put('/projectLine/{id}')
  static readonly projectLinePut: vmsNet.PostMapping<entity.TProjectLineEntity, void, {id: string}>

  /** 指定ID删除 */
  @Delete('/projectLine/{id}')
  static readonly projectLineDelete: vmsNet.GetMapping<boolean, void, {id: string}>

}
