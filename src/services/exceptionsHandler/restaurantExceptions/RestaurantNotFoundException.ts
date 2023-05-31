import { format } from 'date-fns';

export class RestaurantNotFoundException extends Error{

  status: number;
  title: string;
  type: string;
  instance: string;
  message: string;
  date: string;


  constructor(){
    super()
    this.message = 'Restaurant not found'
    this.name = 'RestaurantNotFoundException'
    this.status = 404
    this.title = 'Restaurant Not found'
    this.type = 'http://deliveryexpress.com.br/restaurant/Restaurant-Not-Found'
    this.instance = "http://deliveryexpress.com.br/restaurant/"
    const currentDate = new Date();
    this.date = format(currentDate, 'dd/MM/yyyy HH:mm:ss');
    
  }


}