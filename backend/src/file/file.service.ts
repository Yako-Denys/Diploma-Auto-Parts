import { path } from "app-root-path"
import { Injectable } from "@nestjs/common"
import { ensureDir, writeFile } from "fs-extra"

@Injectable()
export class FileService {
  async saveFiles(photo: Express.Multer.File, folder: string = "products") {
    const uploadedFolder = `${path}/uploads/${folder}`

    await ensureDir(uploadedFolder)
    const originalName = `${Date.now()}-${photo.originalname}`

    // @ts-ignore
    await writeFile(`${uploadedFolder}/${originalName}`, photo.buffer)

    return {
      url: `/uploads/${folder}/${originalName}`,
      name: originalName,
    }
  }
}
