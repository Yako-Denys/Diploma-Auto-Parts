import { FilesInterceptor } from "@nestjs/platform-express"
import { Controller, HttpCode, Post, Query, UploadedFiles, UseInterceptors } from "@nestjs/common"

import { FileService } from "./file.service"
import { Auth } from "src/auth/decorators/auth.decorator"

@Controller("files")
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @HttpCode(200)
  @UseInterceptors(FilesInterceptor("photo"))
  @Auth()
  @Post()
  async saveFiles(@UploadedFiles() photo: Express.Multer.File[], @Query("folder") folder?: string) {
    return this.fileService.saveFiles(photo[0], folder)
  }
}
