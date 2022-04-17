import { Schema, Document, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

export interface ProductInterface extends Document {
   name: string
   description: string
   price: number
   discount: number
}

const productSchema = new Schema({
   name: {
      type: String,
      required: true,
      min: 5,
      max: 100
   },
   description: {
      type: String,
      required: true
   },
   price: {
      type: Number,
      required: true      
   },
   discount: {
      type: Number,
      max: 1
   }
})

productSchema.plugin(mongoosePaginate)

export const productModel = model<ProductInterface>('products', productSchema)