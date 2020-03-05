import { Component,style, state, animate, transition, trigger,
     ElementRef,
     AfterViewInit,
     OnDestroy,
     ViewChild,
     Input,HostListener
 } from '@angular/core';
  import { RouterModule, Routes, Router,ActivatedRoute } from '@angular/router';
import { AppComponent } from './../../app.component';
import { globalService } from './../../services/global.service';
import { ApiService } from './../../services/ApiService';
declare var swal :any;
declare var $:any;

@Component({
//  selector: ' ',
  //styles:[` `],
  styleUrls : ['./app/pages/mailbox/messageBox-home.style.css'],
//  template: `  `,
templateUrl: './app/pages/mailbox/messageBox-home-template.html'
})
export class MailboxPageComponent  extends AppComponent  {

  private inboxLists:any=[];
  private messageDetail:any='';
  private messageType:string="";
  public InboxCnt:any="";
  public SentCnt:any="";
    public userInfo:any;
    public showErr:boolean=false;
    public showsuccssMsg:boolean=false;
    public showErrMsg:any="";
    public deleteMsgArr:any=[];

    public userhintContainer:boolean=false;
    public UserListErr:boolean=false;
    public messageUnread:boolean=true;
    public UserListErrMsg:any="";
    public userhintEmail:any=[];
    public selectedMessageUser:any="";
    public usersearchObject:any="";
    public emailLists:any=[];
    public writeMsgProjectFilterModel:string='';
    public writeMsgWishlistCategories:string='';
    public writeMsgProjHintContainer:boolean=true;



  // @HostListener('click', ['$event'])
  // onClick(e:any) {
  // //  console.log(e.target.id);
  //   if(e.target.id=="msgboxInbox"){
  //     this.getInbox('inbox');
  //   }else if(e.target.id=="msgboxSent"){
  //     this.getInbox('sent');
  //   }
  // }

  constructor( public router: Router , public globalService: globalService, public apiService: ApiService,private route: ActivatedRoute){
     super(router,globalService,apiService);
     this.apiService.base=this.ApiURL;
   }

   pageContent = '';

   ngOnInit(){
      this.updateMemberInfo();
      // this.getInbox('sent');
     this.getInbox('inbox');



    // this.route
    //        .params
    //        .subscribe(params => { console.log(Math.random(),params);
    //            // Récupération des valeurs de l'URL
    //            this.msgBoxType = params['type']; // --> Name must match wanted paramter
    //    });


   }

   getInboxSendData(TypeCheck:any){
     if(TypeCheck=="inbox"){
       this.getInbox('inbox');
     }else if(TypeCheck=="sent"){
       this.getInbox('sent');
     }
     $('#ckall').prop('checked', false);
       this.deleteMsgArr=[];
   }


   updateMemberInfo(){
     let parent:any=this;
     setTimeout(function(){
       parent.userInfo= (parent.globalService.getData()).userInfo;
      //  console.log('parent.userInfo',parent.userInfo);
     },500)


   }

   getInbox(type:any){  this.messageDetail=''; this.messageType=type;
     this.apiService.ComMailboxInbox({
       data:{
         key:this.apiKey,
         filter:{
           type:type
         }
       }
     }).then( response => {
       if(response!=null){
         this.inboxLists=response.results;
         if(type=='inbox')
         {this.InboxCnt=Object.keys(this.inboxLists).length;}

         if(type=='sent')
         {this.SentCnt=Object.keys(this.inboxLists).length;}
         console.log('this.inboxLists',this.inboxLists);

         this.inboxLists.forEach((item:any,key:any) => {
        this.mouseOverDelete[key]=false;
          });
       }

     }).catch( error => {
      //  console.log('Error while logging in', error)
     });
   }

   ClearData(){
     $('#ReplyMSG').val();
   }


   makeActive(selectActiveID:any){
    //  console.log('selectActiveID',selectActiveID);
     $('.inbox-nav li').removeClass('active');

$('#'+selectActiveID+"1").addClass('active');
   }


   SendPress(val:any){

 let parent:any=this;
 parent.showsuccssMsg=false;
 parent.showErr=false;
 parent.showErrMsg="";

     let tagenter1:any=document.getElementById("ReplyMSG");
     if(tagenter1.value!=''){
       let toID    = val.from;
       let fromID  = val.to;
       let message = tagenter1.value;

      //  console.log('val',val);
      //   console.log('toID',toID,'fromID',fromID,'message',message,'productTracker',val.productTracker);

   this.apiService.ComproductPageAdd({
     data:{
        key:this.apiKey,
        form:{
          from      :fromID,
          to        :toID,
          message   :message,
          productId :val.productTracker,
          replyId   :val.messageTracker
        }
     }
   }).then(response=>{
        if(response){
         if(response.status=="success"){
           parent.showsuccssMsg=true;
           parent.showErrMsg="Message Sent to "+val.fromName;
           setTimeout( function(){

             parent.showsuccssMsg=false;
             $("#ReplyMSG").val('');
             parent.getInbox('inbox');
              $('#replyModal').modal('hide');
           }, 2000);
         }else{

         }
        }
   }).catch(error=>{
     console.log('Error while logging in', error)
   });





 }else{

    parent.showErr=true;
    parent.showErrMsg="Message is empty !"
    setTimeout( function(){ parent.showErr=false;}, 2000);

 }

   }


   checkAll(ev:any) {

    if(ev.target.checked==true)
    {
      this.inboxLists.forEach((item:any) => {
        this.deleteMsgArr.push(item.messageTracker);

        item.checked = true;
      })
    }else{
      this.inboxLists.forEach((item:any) => {
        item.checked = false;
        this.deleteMsgArr=[];
      })
    }
    console.log('this.deleteMsgArr',this.deleteMsgArr);

}

SingleMsgSelect(checkedSts:boolean,msgid:any){

  // console.log('checkedSts',checkedSts,'msgid',msgid);
  if(checkedSts==true){
    this.deleteMsgArr.push(msgid);
  }else{
    var Pindex=this.deleteMsgArr.indexOf(msgid);
    if (Pindex > -1) {
          this.deleteMsgArr.splice(Pindex, 1);
                  }
  }
  console.log('this.deleteMsgArr',this.deleteMsgArr);

}
public mouseOverDelete:any=[];
MouseOverDelete(val:any,idx:any){
  // console.log('idx',idx);
   let parent:any=this;

     setTimeout( function(){
  if(val=='1'){
    parent.mouseOverDelete[idx]=true;
  }
  else{
    parent.mouseOverDelete[idx]=false;
  }
}, 300);

}


getUserListInfo(val:any,indx:any){
         this.userhintContainer=true;

this.apiService.usersPublic_users_list({
     'data':{
        'key':this.apiKey,
        'filter':{
           'email':val
                 },
         'extra':{
               'required':['firstName','email','lastName']
                }

     }
}).then(res=>{
  if(res.users!=null) {
          this.userhintContainer=true;
          this.userhintEmail=res.users;
      }
    }).catch(error=>{
        console.log('Error !',error);
    });


}

getProductListInfo(){

}

closeUserListContainer(){

  //  setTimeout(()=>{
  //    this.userhintContainer=false;
  //  },800);
}


writeMsgProjectFilter(){
   this.apiService.availableWishlists({
     data:{
       key:this.apiKey,
       filter:{
         category:this.writeMsgProjectFilterModel
       }
     }
   }).then( res => {
       this.writeMsgWishlistCategories=res.categories;
   }).catch(err=>{
     console.log('Error while fetching wishlist category ! ',err );
   });
}

writeMessageUpdateProjectList(){
  this.apiService.viewWishlists({
    data:{
      key:this.apiKey,
      filter:{
        category:this.writeMsgProjectFilterModel
      }
    }
  }).then( res => {
      this.writeMsgWishlistCategories=res.categories;
  }).catch(err=>{
    console.log('Error while fetching wishlist category ! ',err );
  });
}

UserhintPull(val:any){

// console.log('val',val);
this.usersearchObject=val.email;
this.addEmail(val.email);
this.usersearchObject="";


// this.hideMenu1=false;
// console.log('selectedMessageUser',parent.selectedMessageUser);
      // parent.usersearchObject=val;
}

addEmail(eMAIL:any){

//console.log('eMAIL',eMAIL);

  // if(this.emailLists.length<3 && eMAIL!='')
  // {
    this.emailLists.push(eMAIL);
    // localStorage.setItem('GBCItoken',res.key);
    // this.globalService.setData({
    //   'ProjectTags':parent.emailLists
    // });
//console.log('this.emailLists',this.emailLists);

  // }
}


removeEmail(indx:any){

      let parent=this;

  // var Pindex=parent.tags.indexOf(indx);
  // console.log('indx',indx,'Pindex',Pindex,parent.tags);
        parent.emailLists.splice(indx, 1);
        // this.globalService.setData({
        //   'ProjectTags':parent.tags
        // });
//console.log('parent.emailLists',parent.emailLists);
}











 }
