import { format } from 'date-fns';

export class InvalidDeliverymanLoginException extends Error{

  status: number;
  title: string;
  type: string;
  instance: string;
  message: string;
  date: string;


  constructor(){
    super()
    this.message = 'Invalid email or password'
    this.name = 'InvalidEmailOrPasswordException'
    this.status = 400
    this.title = 'Bad Request'
    this.type = 'http://deliveryexpress.com.br/deliveryman/invalid-email-or-password'
    this.instance = "http://deliveryexpress.com.br/deliveryman/"
    const currentDate = new Date();
    this.date = format(currentDate, 'dd/MM/yyyy HH:mm:ss');
    
  }


}