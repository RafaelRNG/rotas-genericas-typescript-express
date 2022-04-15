import { Schema, Document, model } from 'mongoose'

export interface UserInterface extends Document {
   name: string
   age: number
   email: string
}

const userSchema = new Schema({

   name: {
      type: String,
      required: true
   },
   age: {
      type: Number,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   }
})

export const userModel = model<UserInterface>('users', userSchema)