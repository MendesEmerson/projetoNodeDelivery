import { format } from 'date-fns';

export class InvalidTokenException extends Error{

  status: number;
  title: string;
  type: string;
  instance: string;
  message: string;
  date: string;


  constructor(){
    super()
    this.message = 'Invalid Token'
    this.name = 'InvalidTokenException'
    this.status = 401
    this.title = 'Invalid Token'
    this.type = 'http://deliveryexpress.com.br/login/Invalid-Token-Exception'
    this.instance = "http://deliveryexpress.com.br/login/"
    const currentDate = new Date();
    this.date = format(currentDate, 'dd/MM/yyyy HH:mm:ss');
    
  }


}