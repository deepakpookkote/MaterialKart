import { Component,Input,Output } from '@angular/core';
import { AppComponent } from './../../app.component';
  import { RouterModule, Routes, Router } from '@angular/router';
  import { globalService } from './../../services/global.service';
declare var $:any;

@Component({
  selector: 'account-left-menu',
  styles:[`

    .acc-left-profile-image{
      background: #e7e7e7;
    /*  background-image:url('./webroot/images/profile-image/profile-bg.jpg'); */
      /*background-size: 100%;*/
      background-size: 100% 80px;
      background-repeat: no-repeat;

    border-bottom: 1px solid #aeb7b6;
    /*
    -webkit-box-shadow: 0 6px 4px -4px grey;
    -moz-box-shadow: 0 6px 4px -4px grey;
    box-shadow: 0 6px 4px -4px grey;
    */
    }
    .acc-left-profile-image img{
      border-radius: 50%;
      margin:10%;
      height: 85px; width: 85px;
      background-color:#ffffff;
    /* box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23); */
    }
    .acc-left-profile-image label{
    /*  background-image:url('./webroot/images/profile-image/trans-white-2.png');*/
      width: 100%; padding: 5px;
      position: relative;
      top: -5px;
      color: black;

    }
    .acc-left-nav{
      border-top: 1px solid #ffffff;
    }
    .acc-left-nav ul{
      list-style: none;
    }
    .acc-left-nav ul li{
      font-size: 14px;
      padding: 10px;
      padding-left:20px;
      border-bottom: 1px solid #dfdfdf;
      transition:  background-color 1s;
    }
    .acc-left-nav ul li:hover{
      background-color:#dfdfdf;
      border-bottom: 1px solid #ffffff; cursor: pointer;
      /* animation: animationSmooth 1s; */
    }
    .acc-left-nav ul li i{ padding-right:10px; }


.acc-left-profile-image .social-icons{
  position:relative;
  top: -8px;
  cursor:pointer;
  color: #6c6d71;
  /*animation: animationSmooth 2s;*/
}
@media(max-width: 700px){
  .account-left-menu1{
    width: 60px;
  }
  .acc-left-profile-image img{
    height: 30px; width: 30px;
  }
  .acc-left-profile-image label{ display: none;}
}

  `],
  template: `
  <div class="acc-left-profile-image text-center" >
<a href="#page-profile-info">

     <div style="height: 10px;"></div>
     <!--<img style=" " src="webroot/images/dashboard/profile-awatar.png"  />-->
     <img src="webroot/images/profile-image/Icon-user.jpg" style="width: 80px;height: 80px;padding:10px;"/>
 <!-- <label> {{'John Smith iguy ukgfukf ukf udy' | slice:0:25}}</label> -->
    </a>

<div class="social-icons animated rubberBand">
<!--  <i class="fa fa-facebook-square fa-lg" aria-hidden="true"></i>
  <i class="fa fa-twitter-square fa-lg" aria-hidden="true"></i>
  <i class="fa fa-linkedin-square fa-lg" aria-hidden="true"></i> -->
  <div style="min-height: 25px;font-size:16px;">
    <div *ngIf="userInfo!='' && userInfo!=undefined ">{{userInfo.firstName}} {{userInfo.lastName}} </div>
  </div>
</div>

  </div>
  <div class="acc-left-nav">
   <ul *ngIf="_dir_data!='message-box'">
    <!--<li>
      <a> <i class="fa fa-bell" aria-hidden="true"></i> <span class="hidden-xs">Notifications - <b style="color: #00a79d;">0</b> </span></a>
    </li>-->
    <!-- <li>
      <a href="#page-merchant-dashboard "> <i class="fa fa-life-ring" aria-hidden="true"></i> <span class="hidden-xs">Dashboard</span></a>
    </li> -->

    <li *ngIf="accountType=='merchant'">
      <a href="#page-merchant-products"> <i class="fa fa-database" aria-hidden="true"></i> <span class="hidden-xs" style="font-size:16px;">Your Products</span></a>
    </li>
    <li *ngIf="accountType=='merchant'">
      <a href="#page-merchant-users-management"> <i class="fa fa-database" aria-hidden="true"></i> <span class="hidden-xs" style="font-size:16px;">Users Management</span></a>
    </li>
  <!--  <li *ngIf="accountType=='merchant'">
      <a  href="#page-merchant-statistics-general"> <i class="fa fa-line-chart" aria-hidden="true"></i> <span class="hidden-xs">Statistics</span></a>
    </li> -->
     <!--<li *ngIf="accountType=='merchant'">
      <a href="#page-merchant-member-view"> <i class="fa fa-users" aria-hidden="true"></i> <span class="hidden-xs">Team Members</span></a>
    </li>-->
   </ul>
   <ul *ngIf="_dir_data=='message-box'">

    <li id="msgboxInbox">  <a id="msgboxInbox"> <i class="fa fa-envelope" aria-hidden="true"></i> <span id="msgboxInbox" class="hidden-xs">Inbox</span></a></li>
      <li id="msgboxSent">  <a  id="msgboxSent"  > <i  class="fa fa-share-square-o" aria-hidden="true"></i> <span id="msgboxSent" class="hidden-xs">Sent</span></a> </li>
    <!--    <li>  <a href="#"> <i class="fa fa-bell" aria-hidden="true"></i> <span class="hidden-xs">Others</span></a> </li> -->

   </ul>
   <div>
  <!-- <img class="hidden-xs" src="webroot/images/dashboard/database-icon.png"  style="opacity:0.6; width: 150px; position: fixed; bottom: 0px; left: 2%;" /> -->
   </div>
 </div>
  `,
})
export class AccountLeftMenu {
   @Input('myParameters') _dir_data:any;

  public token = localStorage.getItem('GBCItoken');
       public accountType:any=localStorage.getItem('GBCIaccountType');
  public userInfo:any;

  constructor( public router: Router , public globalService: globalService){
     //super(router,globalService);
   }

   ngOnInit(){
    this.updateMemberInfo();
   }

   updateMemberInfo(){
     let parent:any=this;
     setTimeout(function(){
       parent.userInfo= (parent.globalService.getData()).userInfo;

     },500)
   }

 }
