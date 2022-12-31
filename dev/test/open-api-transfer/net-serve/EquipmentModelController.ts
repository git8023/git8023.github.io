import { Delete, Get, Post, Put, vmsNet } from '@hyong8023/tool-box';

export class EquipmentModelController {
  /** 分页查询 */
  @Get('/equipmentModel')
  static readonly equipmentModelGet: vmsNet.GetMapping<entity.PageResult<entity.TEquipmentModelEntity>, {asc: boolean, createTime: number, creator: string, current: number, id: string, lastModifyTime: number, name: string, orderBy: string, pages: number, size: number, total: number, type: string}, void>

  /** 添加 */
  @Post('/equipmentModel')
  static readonly equipmentModelPost: vmsNet.PostMapping<entity.TEquipmentModelEntity, void, void>

  /** 指定ID获取数据 */
  @Get('/equipmentModel/{id}')
  static readonly equipmentModelGet: vmsNet.GetMapping<entity.TEquipmentModelEntity, void, {id: string}>

  /** 更新 */
  @Put('/equipmentModel/{id}')
  static readonly equipmentModelPut: vmsNet.PostMapping<entity.TEquipmentModelEntity, void, {id: string}>

  /** 指定ID删除 */
  @Delete('/equipmentModel/{id}')
  static readonly equipmentModelDelete: vmsNet.GetMapping<boolean, void, {id: string}>

}
