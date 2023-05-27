import { format } from 'date-fns';

export class DeliverymanNotFoundException extends Error{

  status: number;
  title: string;
  type: string;
  instance: string;
  message: string;
  date: string;


  constructor(){
    super()
    this.message = 'Deliveryman not found'
    this.name = 'DeliverymanNotFoundException'
    this.status = 404
    this.title = 'Not found'
    this.type = 'http://deliveryexpress.com.br/deliveryman/deliveryman-not-found'
    this.instance = "http://deliveryexpress.com.br/deliveryman/"
    const currentDate = new Date();
    this.date = format(currentDate, 'dd/MM/yyyy HH:mm:ss');
    
  }


}