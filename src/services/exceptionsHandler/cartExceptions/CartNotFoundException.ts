import { format } from 'date-fns';

export class CartNotFoundException extends Error{

  status: number;
  title: string;
  type: string;
  instance: string;
  message: string;
  date: string;


  constructor(){
    super()
    this.message = 'Cart not found'
    this.name = 'CartNotFoundException'
    this.status = 404
    this.title = 'Not found'
    this.type = 'http://deliveryexpress.com.br/cart/cart-not-found'
    this.instance = "http://deliveryexpress.com.br/cart/"
    const currentDate = new Date();
    this.date = format(currentDate, 'dd/MM/yyyy HH:mm:ss');
    
  }


}