import { Request, Response } from 'express'
import { Model, Document, isValidObjectId } from 'mongoose'

export default abstract class GenericRouter<T extends Document> {

   public constructor(protected model: Model<T>) { }

   public async find(response: Response, fields: string[]): Promise<Response> {
      const result = await this.model.find()
         .select([...fields])

      return response.status(200).json(result)
   }

   public async findById(request: Request, response: Response, fields: string[]): Promise<Response> {
      try {
         const _id = request.params._id
         const result = await this.model.findById(_id)
            .select([...fields])
         
         if (result === null || _id === null || !isValidObjectId(_id)) {
            return response.status(404).json({ message: 'Object not found!' })
         }

         return response.status(200).json(result)
      
      } catch (e) {
         return response.status(404).json({ message: 'Object not found!' })
      }
   }

   public async deleteById(request: Request, response: Response) {
      try {
         await this.model.findByIdAndDelete(request.params._id)
         return response.status(204).send()
      } catch (e) {
         return response.status(404).json({ message: 'Object not found!' })
      }
   }
}