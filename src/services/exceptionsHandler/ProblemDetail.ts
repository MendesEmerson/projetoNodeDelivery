/*
Classe para instanciar um tipo de problema
*/

interface ProblemDetailOptions {
  status: number;
  title: string;
  detail: string;
  instance: string;
  type: string;
  message: string;
  date: string;

}

export class ProblemDetail{
  status: number;
  title: string;
  detail: string;
  instance: string;
  type: string;
  message: string;
  date: string;

  constructor(options: ProblemDetailOptions) {
    this.status = options.status;
    this.title = options.title;
    this.detail = options.detail;
    this.type = options.type;
    this.instance = options.instance;
    this.type = options.type;
    this.message = options.message;
    this.date = options.date;
  }

  toJson(){
    return{
      status: this.status,
      title: this.title,
      detail: this.detail,
      type: this.type,
      instance: this.instance,
      message: this.message,
      date: this.date,
      
    };
  }

}