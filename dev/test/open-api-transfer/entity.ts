export namespace entity {
  export interface BigScreenVO {
    /** 在线设备总数 */
    equipmentNums: number;

    /** 在线设备总数 */
    onlineEquipmentNums: number;

    /** 项目数量 */
    projectNums: number;

  }

  export interface EntityField {
    /** undefined */
    jdbcType: string;

    /** undefined */
    key: string;

    /** undefined */
    name: string;

    /** undefined */
    value: string;

  }

  export interface EnumGroupVO {
    /** 分组名 */
    group: string;

    /** 分组列表 */
    values: [];

  }

  export interface EnumValue {
    /** 枚举名称 */
    name: string;

    /** 枚举值 */
    value: string;

  }

  export interface EquipmentCollectDataEntity {
    /** 创建时间 */
    createTime: number;

    /** 字段列表 */
    fieldList: [];

    /** 主键ID */
    id: string;

  }

  export interface EquipmentWarningEntity {
    /** 创建时间 */
    createTime: number;

    /** 创建人 */
    creator: string;

    /** 设备id */
    equipmentId: string;

    /** 数据参数id */
    equipmentProtocolTemplateId: string;

    /** 历史 */
    history: boolean;

    /** 主键ID */
    id: string;

    /** 是否展示 */
    isShow: boolean;

    /** 最后修改时间 */
    lastModifyTime: number;

    /** 报警名 */
    name: string;

    /** 关联数据状态 */
    relevancyStatus: string;

    /** 关联数值 */
    relevancyValue: string;

    /** 备注 */
    remark: string;

    /** 有效状态 */
    type: string;

    /** 警报文本 */
    warningText: string;

  }

  export interface ModelConfigEntity {
    /** 创建时间 */
    createTime: number;

    /** 创建人 */
    creator: string;

    /** 设备数据信息展示 */
    dataShow: boolean;

    /** 设备型号 */
    equipmentModel: string;

    /** 设备类型 */
    equipmentType: string;

    /** 历史曲线展示 */
    historyShow: boolean;

    /** 主键ID */
    id: string;

    /** 最后修改时间 */
    lastModifyTime: number;

    /** 数据保留区 */
    modelJson: string;

    /** 模型名称 */
    name: string;

    /** 设备图片 */
    picture: string;

    /** 图片展示 */
    pictureShow: boolean;

    /** 项目id */
    projectId: string;

    /** 数据协议，ProtocolEnum */
    protocol: string;

    /** 报警列表展示 */
    warningShow: boolean;

  }

  export interface ModelDataVO {
    /** 模型配置id */
    modelConfigId: string;

    /** 参数id */
    modelProtocolTemplateIdList: [];

  }

  export interface ModelWaringVO {
    /** 模型配置id */
    modelConfigId: string;

    /** 参数id */
    warningIdList: [];

  }

  export interface ModelWarningEntity {
    /** 创建时间 */
    createTime: number;

    /** 创建人 */
    creator: string;

    /** 历史 */
    history: boolean;

    /** 主键ID */
    id: string;

    /** 是否展示 */
    isShow: boolean;

    /** 最后修改时间 */
    lastModifyTime: number;

    /** 模型配置id */
    modelConfigId: string;

    /** 数据参数id */
    modelProtocolTemplateId: string;

    /** 报警名 */
    name: string;

    /** 关联数据状态 */
    relevancyStatus: string;

    /** 关联数值 */
    relevancyValue: string;

    /** 备注 */
    remark: string;

    /** 有效状态 */
    type: string;

    /** 警报文本 */
    warningText: string;

  }

  export interface NewNameVO {
    /** undefined */
    newName: string;

  }

  export interface PicUploadResultEntity {
    /** 图片路径 */
    imgPath: string;

    /** 图片路径集合 */
    imgPaths: [];

    /** undefined */
    legal: boolean;

  }

  export interface ProjectEntity {
    /** 区/县 */
    area: string;

    /** 市 */
    city: string;

    /** 项目编号 */
    code: string;

    /** 创建时间 */
    createTime: number;

    /** 创建人 */
    creator: string;

    /** 设备数据展示 */
    dataShow: boolean;

    /** 设备数量 */
    equipmentNums: string;

    /** 数据组展示 */
    groupShow: boolean;

    /** 主键ID */
    id: string;

    /** 项目介绍 */
    introduce: string;

    /** 介绍展示 */
    introduceShow: boolean;

    /** 最后修改时间 */
    lastModifyTime: number;

    /** 纬度 */
    latitude: string;

    /** 生产线展示 */
    lineShow: boolean;

    /** 经度 */
    longitude: string;

    /** 项目名称 */
    name: string;

    /** 项目效果图 显示 */
    pictureShow: boolean;

    /** 省 */
    province: string;

    /** 备注 */
    remark: string;

    /** 状态 */
    status: string;

  }

  export interface Result {
    /** 响应码 */
    code: number;

    /** 数据 */
    data: object;

    /** 简要信息 */
    message: string;

    /** 是否处理成功 */
    success: boolean;

    /** 响应时间 */
    time: number;

  }

  export interface TEquipmentEntity {
    /** 设备编号 */
    code: string;

    /** 创建时间 */
    createTime: number;

    /** 创建人 */
    creator: string;

    /** 主键ID */
    id: string;

    /** IP */
    ip: string;

    /** 最后修改时间 */
    lastModifyTime: number;

    /** 模型配置id */
    modelConfigId: string;

    /** 设备型号名称 */
    modelId: string;

    /** 设备名称 */
    name: string;

    /** 是否在线 */
    online: boolean;

    /** 端口 */
    port: number;

    /** 所属项目 */
    projectId: string;

    /** 数据协议 */
    protocol: string;

    /** 备注 */
    remark: string;

    /** 状态 */
    status: string;

    /** 设备类型 */
    typeId: string;

  }

  export interface TEquipmentModelEntity {
    /** 创建时间 */
    createTime: number;

    /** 创建人 */
    creator: string;

    /** 主键ID */
    id: string;

    /** 最后修改时间 */
    lastModifyTime: number;

    /** 型号名称 */
    name: string;

    /** 设备类型 */
    type: string;

  }

  export interface TEquipmentProtocolTemplateEntity {
    /** 创建时间 */
    createTime: number;

    /** 创建人 */
    creator: string;

    /** 数据有效时长 */
    dataActiveTime: number;

    /** 数据位长度 */
    dataBitLength: number;

    /** 数据位偏移量 */
    dataBitOffset: number;

    /** 采集频率 */
    dataCollectFrequency: number;

    /** 历史 */
    dataHistory: boolean;

    /** 数据KEY */
    dataKey: string;

    /** 数据本地类型，DataLocalTypeEnum */
    dataLocalType: string;

    /** 数据名称 */
    dataName: string;

    /** 数据原生类型，DataNativeTypeEnum */
    dataNativeType: string;

    /** 数据比例，默认1 */
    dataRatio: number;

    /** 单位 */
    dataUnit: string;

    /** 设备ID */
    equipmentId: string;

    /** 主键ID */
    id: string;

    /** 最后修改时间 */
    lastModifyTime: number;

    /** 模型配置id */
    modelConfigId: string;

    /** 数据类型 比如定义 温度 模拟量 状态量 */
    modelProtocolDataType: string;

    /** 数据协议，ProtocolEnum */
    protocol: string;

    /** 寄存器id */
    registerId: number;

    /** 寄存器类型，RegisterTypeEnum */
    registerTypeEnum: string;

    /** 关联数据id t_model_protocol_template的id */
    relevancyDataId: string;

    /** 关联数据状态 */
    relevancyStatus: string;

    /** 关联数值 */
    relevancyValue: string;

    /** 备注 */
    remark: string;

  }

  export interface TEquipmentTypeEntity {
    /** 创建时间 */
    createTime: number;

    /** 创建人 */
    creator: string;

    /** 主键ID */
    id: string;

    /** 最后修改时间 */
    lastModifyTime: number;

    /** 类型名称 */
    name: string;

  }

  export interface TModelCurveHistoryEntity {
    /** 创建时间 */
    createTime: number;

    /** 创建人 */
    creator: string;

    /** 曲线图名称 */
    curveName: string;

    /** 数据量 */
    dataAmount: number;

    /** 默认展示 */
    defaultShow: boolean;

    /** 主键ID */
    id: string;

    /** 最后修改时间 */
    lastModifyTime: number;

    /** 模型配置id */
    modelConfigId: string;

    /** 参数id */
    modelProtocolTemplateId: string;

  }

  export interface TModelProtocolTemplateEntity {
    /** 创建时间 */
    createTime: number;

    /** 创建人 */
    creator: string;

    /** 数据有效时长 */
    dataActiveTime: number;

    /** 数据位长度 */
    dataBitLength: number;

    /** 数据位偏移量 */
    dataBitOffset: number;

    /** 采集频率 */
    dataCollectFrequency: number;

    /** 历史 */
    dataHistory: boolean;

    /** 数据KEY */
    dataKey: string;

    /** 数据本地类型，DataLocalTypeEnum */
    dataLocalType: string;

    /** 数据名称 */
    dataName: string;

    /** 数据原生类型，DataNativeTypeEnum */
    dataNativeType: string;

    /** 数据比例，默认1 */
    dataRatio: number;

    /** 单位 */
    dataUnit: string;

    /** 主键ID */
    id: string;

    /** 最后修改时间 */
    lastModifyTime: number;

    /** 模型配置id */
    modelConfigId: string;

    /** 数据类型 比如定义 温度 模拟量 状态量 */
    modelProtocolDataType: string;

    /** 寄存器id */
    registerId: number;

    /** 寄存器类型，RegisterTypeEnum */
    registerTypeEnum: string;

    /** 关联数据id t_model_protocol_template的id */
    relevancyDataId: string;

    /** 关联数据状态 */
    relevancyStatus: string;

    /** 关联数值 */
    relevancyValue: string;

    /** 备注 */
    remark: string;

  }

  export interface TProjectDataGroupEntity {
    /** 创建时间 */
    createTime: number;

    /** 创建人 */
    creator: string;

    /** 主键ID */
    id: string;

    /** 最后修改时间 */
    lastModifyTime: number;

    /** 数据组名称 */
    name: string;

    /** 项目id */
    projectId: string;

    /** 协议接口 */
    protocol: number;

  }

  export interface TProjectLineEntity {
    /** 创建时间 */
    createTime: number;

    /** 创建人 */
    creator: string;

    /** 主键ID */
    id: string;

    /** 最后修改时间 */
    lastModifyTime: number;

    /** 生产线图片 */
    linePicture: string;

    /** 备注 */
    remark: string;

    /** 状态 */
    status: number;

    /** undefined */
    tprojectId: number;

  }

  export interface TProjectProtocolEntity {
    /** 创建时间 */
    createTime: number;

    /** 创建人 */
    creator: string;

    /** 数据有效时长 */
    dataActiveTime: number;

    /** 数据位长度 */
    dataBitLength: number;

    /** 数据位偏移量 */
    dataBitOffset: number;

    /** 采集频率 */
    dataCollectFrequency: number;

    /** 历史 */
    dataHistory: boolean;

    /** 数据KEY */
    dataKey: string;

    /** 数据本地类型，DataLocalTypeEnum */
    dataLocalType: string;

    /** 数据名称 */
    dataName: string;

    /** 数据原生类型，DataNativeTypeEnum */
    dataNativeType: string;

    /** 数据比例，默认1 */
    dataRatio: number;

    /** 单位 */
    dataUnit: string;

    /** 主键ID */
    id: string;

    /** 最后修改时间 */
    lastModifyTime: number;

    /** 模型配置id */
    modelConfigId: string;

    /** 数据类型 比如定义 温度 模拟量 状态量 */
    modelProtocolDataType: string;

    /** 项目id */
    projectDataGroupId: string;

    /** 数据协议 */
    protocol: string;

    /** 寄存器id */
    registerId: number;

    /** 寄存器类型，RegisterTypeEnum */
    registerTypeEnum: string;

    /** 关联数据id t_model_protocol_template的id */
    relevancyDataId: string;

    /** 关联数据状态 */
    relevancyStatus: string;

    /** 关联数值 */
    relevancyValue: string;

    /** 备注 */
    remark: string;

  }

}
