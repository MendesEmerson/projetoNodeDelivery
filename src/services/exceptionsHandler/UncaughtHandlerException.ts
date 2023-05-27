import { format } from 'date-fns';

export class UncaughtHandlerException extends Error{

  status: number;
  title: string;
  type: string;
  instance: string;
  message: string;
  date: string;


  constructor(){
    super()
    this.message = 'Contact the administrator for solve this problem'
    this.name = 'Uncaught Exception'
    this.status = 500
    this.title = 'Internal Server Error'
    this.type = 'http://deliveryexpress.com.br/'
    this.instance = "http://deliveryexpress.com.br/"
    const currentDate = new Date();
    this.date = format(currentDate, 'dd/MM/yyyy HH:mm:ss');
    
  }


}