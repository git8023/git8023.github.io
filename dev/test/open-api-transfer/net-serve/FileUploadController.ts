import { Delete, Get, Post, Put, vmsNet } from '@hyong8023/tool-box';

export class FileUploadController {
  /** 图片预览 */
  @Get('/fileUpload/showPicture/{pictureName}')
  static readonly showPictureGet: vmsNet.GetMapping<entity.Result, void, {pictureName: string}>

  /** 单张图片上传 */
  @Post('/fileUpload/uploadImg')
  static readonly uploadImgPost: vmsNet.PostMapping<entity.Result<entity.PicUploadResultEntity>, void, void>

  /** 多张图片上传 */
  @Post('/fileUpload/uploadManyImg')
  static readonly uploadManyImgPost: vmsNet.PostMapping<entity.Result<entity.PicUploadResultEntity>, void, void>

}
