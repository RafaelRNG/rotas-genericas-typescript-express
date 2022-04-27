import { Router, Request, Response } from 'express'
import { OrderInterface, orderModel } from '../models/order.model'
import GenericRouter from '../utils/Generic.router'

class OrderRouter extends GenericRouter<OrderInterface>{

   public router: Router

   public constructor() {
      super(orderModel)
      this.router = Router()
      this.applyRouter()
   }

   private applyRouter(): void {
      this.router.get('', (request: Request, response: Response) => this.find(response))
      this.router.get('/:_id', (request: Request, response: Response) => this.findById(request, response, []))
      this.router.post('', (request: Request, response: Response) => this.save(request, response))
      this.router.delete('/:_id', (request: Request, response: Response) => this.deleteById(request, response))
   }
}

export const orderRouter = new OrderRouter().router