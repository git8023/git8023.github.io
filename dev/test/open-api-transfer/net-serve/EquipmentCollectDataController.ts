import { Delete, Get, Post, Put, vmsNet } from '@hyong8023/tool-box';

export class EquipmentCollectDataController {
  /** 分页查询 */
  @Get('/equipments/{equipmentId}/collectData')
  static readonly collectDataGet: vmsNet.GetMapping<entity.PageResult<entity.EquipmentCollectDataEntity>, {asc: boolean, createTime: number, current: number, id: string, orderBy: string, pages: number, size: number, total: number}, {equipmentId: string}>

  /** 设备采集最新数据 */
  @Get('/equipments/{equipmentId}/collectData/latest')
  static readonly latestGet: vmsNet.GetMapping<entity.EquipmentCollectDataEntity, void, {equipmentId: string}>

  /** 删除指定ID数据 */
  @Delete('/equipments/{equipmentId}/collectData/{id}')
  static readonly collectDataDelete: vmsNet.GetMapping<boolean, void, {equipmentId: string, id: string}>

}
