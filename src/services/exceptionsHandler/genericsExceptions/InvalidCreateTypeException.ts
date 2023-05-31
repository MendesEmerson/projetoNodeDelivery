import { format } from 'date-fns';

export class InvalidCreateTypeException extends Error{

  status: number;
  title: string;
  type: string;
  instance: string;
  message: string;
  date: string;


  constructor(){
    super()
    this.message = 'check the all fields'
    this.name = 'InvalidCreateAccountException'
    this.status = 400
    this.title = 'All fields are mandatory'
    this.type = 'http://deliveryexpress.com.br/Invalid-Create-Type-Exception'
    this.instance = "http://deliveryexpress.com.br/"
    const currentDate = new Date();
    this.date = format(currentDate, 'dd/MM/yyyy HH:mm:ss');
    
  }


}