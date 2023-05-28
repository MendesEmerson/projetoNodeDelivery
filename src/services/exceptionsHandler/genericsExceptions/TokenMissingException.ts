import { format } from 'date-fns';

export class TokenMissingException extends Error{

  status: number;
  title: string;
  type: string;
  instance: string;
  message: string;
  date: string;


  constructor(){
    super()
    this.message = 'Token Missing'
    this.name = 'TokenMissingException'
    this.status = 401
    this.title = 'Token Missing'
    this.type = 'http://deliveryexpress.com.br/login/Token-Missing-Exception'
    this.instance = "http://deliveryexpress.com.br/login/"
    const currentDate = new Date();
    this.date = format(currentDate, 'dd/MM/yyyy HH:mm:ss');
    
  }


}