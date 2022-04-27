import { Schema, Document, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import { OrderItemInterface, orderItemSchema } from './OrderItem.model'

export interface OrderInterface extends Document {
   orderItem: OrderItemInterface[]
   date: Date
   status: 'WAITING' | 'PATH' | 'DELIVERED'
}

const orderSchema = new Schema({
   orderItem: {
      type: [orderItemSchema],
      required: true,
      default: []
   },
   date: {
      type: Date,
      required: true
   },
   status: {
      type: String,
      required: true,
      default: 'WAITING',
      enum: [ 'WAITING', 'PATH', 'DELIVERED']
   }
})

orderSchema.plugin(mongoosePaginate)

export const orderModel = model<OrderInterface>('orders', orderSchema)