import { Delete, Get, Post, Put, vmsNet } from '@hyong8023/tool-box';

export class EquipmentTypeController {
  /** 分页查询 */
  @Get('/equipmentType')
  static readonly equipmentTypeGet: vmsNet.GetMapping<entity.PageResult<entity.TEquipmentTypeEntity>, {asc: boolean, createTime: number, creator: string, current: number, id: string, lastModifyTime: number, name: string, orderBy: string, pages: number, size: number, total: number}, void>

  /** 添加 */
  @Post('/equipmentType')
  static readonly equipmentTypePost: vmsNet.PostMapping<entity.TEquipmentTypeEntity, void, void>

  /** 指定ID获取数据 */
  @Get('/equipmentType/{id}')
  static readonly equipmentTypeGet: vmsNet.GetMapping<entity.TEquipmentTypeEntity, void, {id: string}>

  /** 更新 */
  @Put('/equipmentType/{id}')
  static readonly equipmentTypePut: vmsNet.PostMapping<entity.TEquipmentTypeEntity, void, {id: string}>

  /** 指定ID删除 */
  @Delete('/equipmentType/{id}')
  static readonly equipmentTypeDelete: vmsNet.GetMapping<boolean, void, {id: string}>

}
