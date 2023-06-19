import { format } from 'date-fns';

export class ItemNotFoundException extends Error{

  status: number;
  title: string;
  type: string;
  instance: string;
  message: string;
  date: string;


  constructor(){
    super()
    this.message = 'Item not found'
    this.name = 'ItemNotFoundException'
    this.status = 404
    this.title = 'Item Not found'
    this.type = 'http://deliveryexpress.com.br/item/item-Not-Found'
    this.instance = "http://deliveryexpress.com.br/item/"
    const currentDate = new Date();
    this.date = format(currentDate, 'dd/MM/yyyy HH:mm:ss');
    
  }


}