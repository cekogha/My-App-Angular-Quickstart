import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messages : String[] = [];
  serviceName : string;

  constructor() { }

  add(name : string, message : String){
    this.serviceName = name;
    this.messages.push(message);
  }

  clear(){
    this.messages = [];
  }
}
