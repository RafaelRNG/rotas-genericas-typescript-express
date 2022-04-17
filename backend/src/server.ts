import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { userRouter } from './routes/User.router'
import { productRouter } from './routes/Product.router'

class Server {

   public server: express.Application

   public constructor() {
      this.server = express()
      this.middlewares()
      this.routes()
      this.database()
   }

   private middlewares(): void {
      this.server.use(express.json())
      this.server.use(cors())
   }

   private routes(): void {
      this.server.use('/users', userRouter)
      this.server.use('/products', productRouter)
   }

   private database(): Promise<typeof mongoose> {
      mongoose.Promise = global.Promise

      return mongoose.connect('mongodb://localhost/coffee')
   }
}

export const server = new Server().server