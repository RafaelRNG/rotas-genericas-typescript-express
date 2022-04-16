import { Schema, Document, model } from 'mongoose'
import { hash } from 'bcrypt'

export interface UserInterface extends Document {
   name: string
   age: number
   email: string
   password: string
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
   },
   password: {
      type: String,
      required: true
   }
})

userSchema.pre('save', function (next) {
   const user: UserInterface = this

   if (!user.isModified('password')) {
      next()
   } else {
      hash(user.password, 10)
         .then(hash => {
            user.password = hash
            next()
         })
      .catch(next)
   }
})

export const userModel = model<UserInterface>('users', userSchema)