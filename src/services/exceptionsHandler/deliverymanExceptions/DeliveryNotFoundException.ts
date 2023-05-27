import { format } from 'date-fns';

export class DeliveryNotFoundException extends Error{

  status: number;
  title: string;
  type: string;
  instance: string;
  message: string;
  date: string;


  constructor(){
    super()
    this.message = 'Delivery not found'
    this.name = 'DeliveryNotFoundException'
    this.status = 404
    this.title = 'Not found'
    this.type = 'http://deliveryexpress.com.br/delivery/updateDeliveryman/delivery-not-found'
    this.instance = "http://deliveryexpress.com.br/delivery/updateDeliveryman/"
    const currentDate = new Date();
    this.date = format(currentDate, 'dd/MM/yyyy HH:mm:ss');
    
  }


}