import { Delete, Get, Post, Put, vmsNet } from '@hyong8023/tool-box';

export class EquipmentProtocolTemplateController {
  /** 分页查询 */
  @Get('/equipmentProtocol')
  static readonly equipmentProtocolGet: vmsNet.GetMapping<entity.PageResult<entity.TEquipmentProtocolTemplateEntity>, {asc: boolean, createTime: number, creator: string, current: number, dataActiveTime: number, dataBitLength: number, dataBitOffset: number, dataCollectFrequency: number, dataHistory: boolean, dataKey: string, dataLocalType: string, dataName: string, dataNativeType: string, dataRatio: number, dataUnit: string, equipmentId: string, id: string, lastModifyTime: number, modelConfigId: string, modelProtocolDataType: string, orderBy: string, pages: number, protocol: string, registerId: number, registerTypeEnum: string, relevancyDataId: string, relevancyStatus: string, relevancyValue: string, remark: string, size: number, total: number}, void>

  /** 添加 */
  @Post('/equipmentProtocol')
  static readonly equipmentProtocolPost: vmsNet.PostMapping<entity.TEquipmentProtocolTemplateEntity, void, void>

  /** 设备数据配置查询 */
  @Get('/equipmentProtocol/{equipmentId}')
  static readonly equipmentProtocolGet: vmsNet.GetMapping<entity.TEquipmentProtocolTemplateEntity, void, {equipmentId: string}>

  /** 设备模板修改 */
  @Post('/equipmentProtocol/{equipmentId}/updateEquipmentProtocol')
  static readonly updateEquipmentProtocolPost: vmsNet.PostMapping<boolean, {createTime: number, creator: string, dataActiveTime: number, dataBitLength: number, dataBitOffset: number, dataCollectFrequency: number, dataHistory: boolean, dataKey: string, dataLocalType: string, dataName: string, dataNativeType: string, dataRatio: number, dataUnit: string, equipmentId: string, id: string, lastModifyTime: number, modelConfigId: string, modelProtocolDataType: string, protocol: string, registerId: number, registerTypeEnum: string, relevancyDataId: string, relevancyStatus: string, relevancyValue: string, remark: string}, {equipmentId: string}>

  /** 指定ID获取数据 */
  @Get('/equipmentProtocol/{id}')
  static readonly equipmentProtocolGet: vmsNet.GetMapping<entity.TEquipmentProtocolTemplateEntity, void, {id: string}>

  /** 更新 */
  @Put('/equipmentProtocol/{id}')
  static readonly equipmentProtocolPut: vmsNet.PostMapping<entity.TEquipmentProtocolTemplateEntity, void, {id: string}>

  /** 指定ID删除 */
  @Delete('/equipmentProtocol/{id}')
  static readonly equipmentProtocolDelete: vmsNet.GetMapping<boolean, void, {id: string}>

}
