import { Delete, Get, Post, Put, vmsNet } from '@hyong8023/tool-box';

export class EquipmentController {
  /** 分页查询 */
  @Get('/equipment')
  static readonly equipmentGet: vmsNet.GetMapping<entity.PageResult<entity.TEquipmentEntity>, {asc: boolean, code: string, createTime: number, creator: string, current: number, id: string, ip: string, lastModifyTime: number, modelConfigId: string, modelId: string, name: string, online: boolean, orderBy: string, pages: number, port: number, projectId: string, protocol: string, remark: string, size: number, status: string, total: number, typeId: string}, void>

  /** 添加 */
  @Post('/equipment')
  static readonly equipmentPost: vmsNet.PostMapping<entity.TEquipmentEntity, void, void>

  /** 删除设备报警配置 */
  @Delete('/equipment/deleteWarning/{id}')
  static readonly deleteWarningDelete: vmsNet.GetMapping<boolean, void, {id: string}>

  /** 查询设备报警 */
  @Get('/equipment/getWarning/{id}')
  static readonly getWarningGet: vmsNet.GetMapping<entity.EquipmentWarningEntity, void, {id: string}>

  /** 设备启用/禁用 */
  @Put('/equipment/isEnable/{id}/{status}')
  static readonly isEnablePut: vmsNet.PostMapping<boolean, void, {id: string, status: boolean}>

  /** 设备列表 */
  @Get('/equipment/listByProject/{projectId}')
  static readonly listByProjectGet: vmsNet.GetMapping<entity.PageResult<entity.TEquipmentEntity>, {asc: boolean, current: number, orderBy: string, pages: number, size: number, total: number}, {projectId: string}>

  /** 保存/更新 设备报警配置 */
  @Post('/equipment/saveWarning')
  static readonly saveWarningPost: vmsNet.PostMapping<string, void, void>

  /** 指定ID获取数据 */
  @Get('/equipment/{id}')
  static readonly equipmentGet: vmsNet.GetMapping<entity.TEquipmentEntity, void, {id: string}>

  /** 更新 */
  @Put('/equipment/{id}')
  static readonly equipmentPut: vmsNet.PostMapping<entity.TEquipmentEntity, void, {id: string}>

  /** 指定ID删除 */
  @Delete('/equipment/{id}')
  static readonly equipmentDelete: vmsNet.GetMapping<boolean, void, {id: string}>

}
