import { NestFactory } from "@nestjs/core"
import * as cookieParser from "cookie-parser"

import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(cookieParser())
  app.enableCors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
    exposedHeaders: "set-cookie",
  })

  const port = process.env.APP_PORT || 5000

  try {
    await app.listen(port)
    console.log(`🚀 Server is running at port: ${port}`)
  } catch (error: any) {
    console.error(`❌ Failed to start server: ${error.message}`, error)
    process.exit(1)
  }
}

bootstrap()
