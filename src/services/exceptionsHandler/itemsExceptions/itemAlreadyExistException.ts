import { format } from 'date-fns';

export class ItemAlreadyExistException extends Error{

  status: number;
  title: string;
  type: string;
  instance: string;
  message: string;
  date: string;


  constructor(){
    super()
    this.message = 'Item already exists'
    this.name = 'ItemAlreadyExistException'
    this.status = 409
    this.title = 'Item already exists'
    this.type = 'http://deliveryexpress.com.br/item/item-already-exist'
    this.instance = "http://deliveryexpress.com.br/item/"
    const currentDate = new Date();
    this.date = format(currentDate, 'dd/MM/yyyy HH:mm:ss');
    
  }


}