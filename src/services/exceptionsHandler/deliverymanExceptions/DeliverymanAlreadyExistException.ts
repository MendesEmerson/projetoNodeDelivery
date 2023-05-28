import { format } from 'date-fns';

export class DeliverymanAlreadyExistException extends Error{

  status: number;
  title: string;
  type: string;
  instance: string;
  message: string;
  date: string;


  constructor(){
    super()
    this.message = 'Deliveryman already exists'
    this.name = 'DeliverymanAlreadyExistException'
    this.status = 409
    this.title = 'Deliveryman already exists'
    this.type = 'http://deliveryexpress.com.br/deliveryman/deliveryman-already-exist'
    this.instance = "http://deliveryexpress.com.br/deliveryman/"
    const currentDate = new Date();
    this.date = format(currentDate, 'dd/MM/yyyy HH:mm:ss');
    
  }


}