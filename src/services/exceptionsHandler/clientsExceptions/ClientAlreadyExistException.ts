import { format } from 'date-fns';

export class ClientAlreadyExistException extends Error{

  status: number;
  title: string;
  type: string;
  instance: string;
  message: string;
  date: string;


  constructor(){
    super()
    this.message = 'Client already exists'
    this.name = 'ClientAlreadyExistException'
    this.status = 409
    this.title = 'Client already exists'
    this.type = 'http://deliveryexpress.com.br/client/client-already-exist'
    this.instance = "http://deliveryexpress.com.br/client/"
    const currentDate = new Date();
    this.date = format(currentDate, 'dd/MM/yyyy HH:mm:ss');
    
  }


}