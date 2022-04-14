import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

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
      this.server.get('/ola', (request, response) => {
         return response.status(200).json({message: 'ola mundo'})
      })
   }

   private database(): Promise<typeof mongoose> {
      mongoose.Promise = global.Promise

      return mongoose.connect('mongodb://localhost/coffee')
   }
}

export const server = new Server().server