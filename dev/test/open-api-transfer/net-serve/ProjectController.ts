import { Delete, Get, Post, Put, vmsNet } from '@hyong8023/tool-box';

export class ProjectController {
  /** 分页查询 */
  @Get('/projects')
  static readonly projectsGet: vmsNet.GetMapping<entity.PageResult<entity.ProjectEntity>, {area: string, asc: boolean, city: string, code: string, createTime: number, creator: string, current: number, dataShow: boolean, equipmentNums: string, groupShow: boolean, id: string, introduce: string, introduceShow: boolean, lastModifyTime: number, latitude: string, lineShow: boolean, longitude: string, name: string, orderBy: string, pages: number, pictureShow: boolean, province: string, remark: string, size: number, status: string, total: number}, void>

  /** 添加 */
  @Post('/projects')
  static readonly projectsPost: vmsNet.PostMapping<entity.ProjectEntity, void, void>

  /** 删除数据组信息 */
  @Delete('/projects/deleteProjectDataGroup/{id}')
  static readonly deleteProjectDataGroupDelete: vmsNet.GetMapping<boolean, void, {id: string}>

  /** 删除数据组信息 */
  @Delete('/projects/deleteProjectDataProtocol/{id}')
  static readonly deleteProjectDataProtocolDelete: vmsNet.GetMapping<boolean, void, {id: string}>

  /** 获取数据组信息 */
  @Get('/projects/getProjectDataGroup/{projectId}')
  static readonly getProjectDataGroupGet: vmsNet.GetMapping<entity.TProjectDataGroupEntity, void, {projectId: string}>

  /** 获取数据组信息 */
  @Get('/projects/getProjectDataProtocol/{projectDataGroupId}')
  static readonly getProjectDataProtocolGet: vmsNet.GetMapping<entity.TProjectProtocolEntity, void, {projectDataGroupId: string}>

  /** 启用/禁用项目 */
  @Put('/projects/isEnable/{projectId}/{status}')
  static readonly isEnablePut: vmsNet.PostMapping<boolean, void, {projectId: string, status: boolean}>

  /** 保存/更新数据组信息 */
  @Post('/projects/saveProjectDataGroup')
  static readonly saveProjectDataGroupPost: vmsNet.PostMapping<boolean, void, void>

  /** 保存/更新数据参数 */
  @Post('/projects/saveProjectDataProtocol')
  static readonly saveProjectDataProtocolPost: vmsNet.PostMapping<boolean, void, void>

  /** 指定ID获取数据 */
  @Get('/projects/{id}')
  static readonly projectsGet: vmsNet.GetMapping<entity.ProjectEntity, void, {id: string}>

  /** 更新 */
  @Put('/projects/{id}')
  static readonly projectsPut: vmsNet.PostMapping<entity.ProjectEntity, void, {id: string}>

  /** 指定ID删除 */
  @Delete('/projects/{id}')
  static readonly projectsDelete: vmsNet.GetMapping<boolean, void, {id: string}>

}
