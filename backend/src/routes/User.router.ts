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

   private applyRoutes(): void {

      this.router.get('', (request: Request, response: Response) => this.find(response))
      this.router.get('/:_id', (request: Request, response: Response) => this.findById(request, response, []))
      this.router.post('', (request: Request, response: Response) => this.save(request, response))
      this.router.put('/:_id', (request: Request, response: Response) => this.update(request, response))
      this.router.delete('/:_id', (request: Request, response: Response) => this.deleteById(request, response))
   }
}

export const userRouter = new UserRouter().router