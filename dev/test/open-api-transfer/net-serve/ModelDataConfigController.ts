import { Delete, Get, Post, Put, vmsNet } from '@hyong8023/tool-box';

export class ModelDataConfigController {
  /** 复制模型 */
  @Post('/modelDataConfig/copyModel/{id}')
  static readonly copyModelPost: vmsNet.PostMapping<string, void, {id: string}>

  /** 删除模型基本信息 */
  @Delete('/modelDataConfig/deleteModelBasic/{id}')
  static readonly deleteModelBasicDelete: vmsNet.GetMapping<boolean, void, {id: string}>

  /** 删除模型数据配置 */
  @Delete('/modelDataConfig/deleteModelProtocolTemplate/{id}')
  static readonly deleteModelProtocolTemplateDelete: vmsNet.GetMapping<boolean, void, {id: string}>

  /** 删除设备报警配置 */
  @Delete('/modelDataConfig/deleteModelWarning/{id}')
  static readonly deleteModelWarningDelete: vmsNet.GetMapping<boolean, void, {id: string}>

  /** 根据型号查询模型配置列表 */
  @Get('/modelDataConfig/getConfigListByModeId/{modelId}')
  static readonly getConfigListByModeIdGet: vmsNet.GetMapping<entity.ModelConfigEntity, void, {modelId: string}>

  /** 获取模型列表 */
  @Get('/modelDataConfig/getListModelBasic')
  static readonly getListModelBasicGet: vmsNet.GetMapping<entity.PageResult<entity.ModelConfigEntity>, {asc: boolean, createTime: number, creator: string, current: number, dataShow: boolean, equipmentModel: string, equipmentType: string, historyShow: boolean, id: string, lastModifyTime: number, modelJson: string, name: string, orderBy: string, pages: number, picture: string, pictureShow: boolean, projectId: string, protocol: string, size: number, total: number, warningShow: boolean}, void>

  /** 获取模型数据配置列表 */
  @Get('/modelDataConfig/getListModelProtocolTemplate/{modelConfigId}')
  static readonly getListModelProtocolTemplateGet: vmsNet.GetMapping<entity.TModelProtocolTemplateEntity, void, {modelConfigId: string}>

  /** 获取设备报警配置列表 */
  @Get('/modelDataConfig/getListModelWarning/{modelConfigId}')
  static readonly getListModelWarningGet: vmsNet.GetMapping<entity.ModelWarningEntity, void, {modelConfigId: string}>

  /** 查询历史曲线图 */
  @Get('/modelDataConfig/getModelCurveHistory/{modelConfigId}')
  static readonly getModelCurveHistoryGet: vmsNet.GetMapping<entity.TModelCurveHistoryEntity, void, {modelConfigId: string}>

  /** 查询设备显示信息 */
  @Get('/modelDataConfig/getModelData/{modelConfigId}')
  static readonly getModelDataGet: vmsNet.GetMapping<entity.ModelDataVO, void, {modelConfigId: string}>

  /** 获取单个模型基本信息 */
  @Get('/modelDataConfig/getOneModelBasic/{id}')
  static readonly getOneModelBasicGet: vmsNet.GetMapping<entity.ModelConfigEntity, void, {id: string}>

  /** 删除一条历史曲线图 */
  @Delete('/modelDataConfig/removeOneModelCurveHistory/{id}')
  static readonly removeOneModelCurveHistoryDelete: vmsNet.GetMapping<boolean, void, {id: string}>

  /** 删除一条设备显示信息 */
  @Delete('/modelDataConfig/removeOneModelData/{id}')
  static readonly removeOneModelDataDelete: vmsNet.GetMapping<boolean, void, {id: string}>

  /** 保存/更新模型基本信息 */
  @Post('/modelDataConfig/saveModelBasic')
  static readonly saveModelBasicPost: vmsNet.PostMapping<string, void, void>

  /** 保存/更新历史曲线图 */
  @Post('/modelDataConfig/saveModelCurveHistory')
  static readonly saveModelCurveHistoryPost: vmsNet.PostMapping<boolean, void, void>

  /** 保存/更新设备显示信息 */
  @Post('/modelDataConfig/saveModelData')
  static readonly saveModelDataPost: vmsNet.PostMapping<boolean, void, void>

  /** 保存模型数据配置 */
  @Post('/modelDataConfig/saveModelProtocolTemplate')
  static readonly saveModelProtocolTemplatePost: vmsNet.PostMapping<string, void, void>

  /** 保存设备报警配置 */
  @Post('/modelDataConfig/saveModelWarning')
  static readonly saveModelWarningPost: vmsNet.PostMapping<string, void, void>

  /** 保存设备报警配置显示信息 */
  @Post('/modelDataConfig/saveModelWarningShow')
  static readonly saveModelWarningShowPost: vmsNet.PostMapping<boolean, void, void>

}
