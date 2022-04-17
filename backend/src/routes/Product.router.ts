import { Router, Request, Response } from 'express'
import { ProductInterface, productModel } from '../models/Product.model'
import GenericRouter from '../utils/Generic.router'

class ProductRouter extends GenericRouter<ProductInterface>{

   public router: Router

   public constructor() {
      super(productModel)
      this.router = Router()
      this.applyRouter()
   }

   private applyRouter(): void {
      this.router.get('', (request: Request, response: Response) => this.find(response, []))
      this.router.get('/:_id', (request: Request, response: Response) => this.findById(request, response, []))
      this.router.post('', (request: Request, response: Response) => this.save(request, response))
      this.router.put('/:_id', (request: Request, response: Response) => this.update(request, response))
      this.router.delete('/:_id', (request: Request, response: Response) => this.deleteById(request, response))
   }
}

export const productRouter = new ProductRouter().router