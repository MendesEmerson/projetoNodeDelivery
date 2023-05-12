interface ICreateClient {
  username: string;
  password: string;
}

export class CreateClientUSeCase {
  async execute({password, username}:ICreateClient) {

  }
}