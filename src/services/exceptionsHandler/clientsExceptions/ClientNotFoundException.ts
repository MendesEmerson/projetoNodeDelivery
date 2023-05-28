import { format } from 'date-fns';

export class ClientNotFoundException extends Error{

  status: number;
  title: string;
  type: string;
  instance: string;
  message: string;
  date: string;


  constructor(){
    super()
    this.message = 'Client not found'
    this.name = 'ClientNotFoundException'
    this.status = 404
    this.title = 'Not found'
    this.type = 'http://deliveryexpress.com.br/client/client-not-found'
    this.instance = "http://deliveryexpress.com.br/client/"
    const currentDate = new Date();
    this.date = format(currentDate, 'dd/MM/yyyy HH:mm:ss');
    
  }


}