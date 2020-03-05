import {Component,Output,EventEmitter}from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ApiService } from './../../services/ApiService';

@Component({
  selector:'chat-box',
  styleUrls:[`./app/directives/chat-box/chat-box-style.css`],
//  templateUrl: `./app/directives/chat-box/chat-box-template.html`,
template:``,
  animations: [
  trigger('chatState', [
    state('inactive', style({
         height: '40px'
    })),
    state('void',   style({
       opacity:0,
      //transform: 'scale(1.1)'
    })),
    state('active',   style({
       opacity:1,
       height: '400px',
       transition: 'height 5s'
      //transform: 'scale(1.1)'
    })),

      transition('void => active', animate('500ms ease-in')),
    transition('active => inactive', animate('800ms ease-in', style({ opacity: 0 }) ) ),
    transition('inactive => active', animate('400ms')  ),
  //  transition('active => inactive', animate('100ms ease-out'))
  ])
]
})

export class ChatboxDir {
  private state:string;
  private fileAttachment:boolean=false;
  private imageAttachment:boolean=false;
  constructor( public apiService : ApiService ){
    this.state='inactive';
  }

  @Output()
  message: EventEmitter<string>=new EventEmitter();

  messageChnage(str:string){
    this.message.emit(str);
  }

  actionActive(){
    this.state='void';setTimeout( ()=>{ this.state='active'; },5 );
  }
  handShake(){
    //  this.apiService.socketConnectionTest().then(res=>{
    //    console.log('chat box handshake',res);
    //  }).catch(err=>{
     //
    //  });

this.apiService.test({
  name:'admin'
}).then(res=>{
  console.log(res);
});

  }
}
