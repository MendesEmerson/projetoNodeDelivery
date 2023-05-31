import { format } from 'date-fns';

export class RestaurantAlreadyExistException extends Error{

  status: number;
  title: string;
  type: string;
  instance: string;
  message: string;
  date: string;


  constructor(){
    super()
    this.message = 'Restaurant already exists'
    this.name = 'RestaurantAlreadyExistException'
    this.status = 409
    this.title = 'Restaurant already exists'
    this.type = 'http://deliveryexpress.com.br/Restaurant/Restaurant-already-exist'
    this.instance = "http://deliveryexpress.com.br/Restaurant/"
    const currentDate = new Date();
    this.date = format(currentDate, 'dd/MM/yyyy HH:mm:ss');
    
  }


}