import { Request, Response } from 'express'
import { Model, Document, isValidObjectId } from 'mongoose'

export default abstract class GenericRouter<T extends Document> {

   public constructor(protected model: Model<T>) { }

   //all documents
   public async find(response: Response, fields: string[]): Promise<Response> {
      const result = await this.model.find()
         .select([...fields])

      return response.status(200).json(result)
   }

   //find document by id
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

   //create a document
   public async save(request: Request, response: Response): Promise<Response> {
      try {
         await this.model.create(request.body)
         return response.status(201).json({ message: 'created!' })

      } catch (e) {
         return response.status(400).json({message: 'Cannot create! '})
      }
   }
   
   //update a document
   public async update(request: Request, response: Response) {
      try {
         const _id = request.params._id
         
         if (_id === null || _id === undefined || !isValidObjectId(_id)) {
            return response.status(404).json({ message: 'Object not found!' })
         }
         
         await this.model.findByIdAndUpdate(_id, request.body)
         return response.status(204).send()
      } catch (e) {
         return response.status(400).json({message: 'Cannot update! '})
      }
   }

   //delete document by id
   public async deleteById(request: Request, response: Response): Promise<Response> {
      try {
         await this.model.findByIdAndDelete(request.params._id)
         return response.status(204).send()
      } catch (e) {
         return response.status(404).json({ message: 'Object not found!' })
      }
   }
}