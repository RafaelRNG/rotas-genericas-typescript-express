import { Request, Response, Router } from 'express'
import { UserInterface, userModel } from '../models/User.model'
import GenericRouter from '../utils/Generic.router'

class UserRouter extends GenericRouter<UserInterface> {

   public router: Router

   public constructor() {
      super(userModel)
      this.router = Router()
      this.applyRoutes()
   }

   public applyRoutes(): void {
      this.router.get('/:_id', async (request: Request, response: Response) => {
         return await this.findOne(request, response, [])
      })
   }
}

export const userRouter = new UserRouter().router