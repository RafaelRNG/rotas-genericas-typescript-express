import { Schema, Types } from 'mongoose'
import { ProductInterface } from './Product.model'

export interface OrderItemInterface {
   quantity: number
   product: ProductInterface
}

export const orderItemSchema = new Schema({
   quantity: {
      type: Number,
      min: 1,
      default: 1
   },
   product: {
      type: Types.ObjectId,
      required: true,
      ref: 'products'
   }
})