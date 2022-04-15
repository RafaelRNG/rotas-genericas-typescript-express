import { Request, Response } from 'express'
import { Model, Document } from 'mongoose'

export default abstract class GenericRouter<T extends Document> {

   public constructor(public model: Model<T>) { }

   public async findOne(request: Request, response: Response, fields: string[]): Promise<Response> {
      try {
         const result = await this.model.findById(request.params._id)
            .select([...fields])

         return response.status(200).json(result)
      } catch (e) {
         return response.status(404).json({ message: 'Object not found!' })
      }
   }
}