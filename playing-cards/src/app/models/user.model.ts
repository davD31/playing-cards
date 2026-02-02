export class User {
  id: number = -1;
  username: string = '';
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  
  constructor() {}
  
  copy(): User {
    return Object.assign(new User(), this);
  }
}