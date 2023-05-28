import { format } from 'date-fns';

export class InvalidClientLoginException extends Error{

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
    this.type = 'http://deliveryexpress.com.br/client/invalid-email-or-password'
    this.instance = "http://deliveryexpress.com.br/client/"
    const currentDate = new Date();
    this.date = format(currentDate, 'dd/MM/yyyy HH:mm:ss');
    
  }


}