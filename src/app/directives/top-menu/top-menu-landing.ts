import { Component } from '@angular/core';
import { AppComponent } from './../../app.component';
  import { RouterModule, Routes, Router,RouterLink } from '@angular/router';
  import { globalService } from './../../services/global.service';

declare var $:any;
@Component({
  	selector: 'top-menu-landing',
  	styles:[`
    	/* Navigation */
    /*	#menu {
    		padding: 20px;
    		transition: all 0.8s;
    	} */
	#menu {
      background-color:/* #6c7476 */ /*#6b878c*/  /** #009aee*/ /* #00a79d #607d8b */rgba(255, 255, 255, 0) !important;
          padding: 3px;
          opacity: 0.9;
          transition: all 0.8s;
          box-shadow:none;
        }

    	#menu.navbar-default {
    		background-color: rgba(248, 248, 248, 0);
    		border-color: rgba(231, 231, 231, 0);
        opacity:1;
    	}
      #menu.navbar-default.scrolled {
    		background-color: white !important;
    		border-color: rgba(231, 231, 231, 0);
        box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);
    	}
      #menu.navbar-default.loggedin-header {
    		background-color: white !important;
    		border-color: rgba(231, 231, 231, 0);
        box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);
    	}
      #menu.navbar-default.loggedin-header .navbar-brand {
    		color: #595959;
    	}
      #menu.navbar-default.loggedin-header .navbar-nav > li > a {
    		color: #595959;
    	}

      #menu.navbar-default.scrolled .navbar-nav > li > a {
    		color: #595959;
    	}
      #menu.navbar-default.scrolled .navbar-brand {
    		color: #595959;
    	}

    	#menu a.navbar-brand {
    		/*font-family: 'Dancing Script', cursive;*/
    		font-size: 20px;
    		color: #fff;
        /*font-weight:normal;*/
    		font-weight: 700;
    		letter-spacing: 1px;
    	}
    	#menu.navbar-default .navbar-nav > li > a {
    		// text-transform: uppercase;
    		color: #fff;
        font-size: 15px;
        font-weight: normal;
        padding: 10px 15px;
    		/* font-weight: 500;
    		font-size: 15px;
    		padding: 5px 0;
        margin: 10px 15px 0 15px;
        */
    		border: 2px solid transparent;
    		letter-spacing: 0.5px;

    	}

    	#menu.navbar-default .navbar-nav > li > a:hover {
    	/*	color: #8eb640;  color: #c2ceff */;
    	}
    	.on {
    		background-color: #262626 !important;
    		padding: 0 !important;
    		padding: 2px 0 !important;
    	}
    	.navbar-default .navbar-nav > .active > a, .navbar-default .navbar-nav > .active > a:hover, .navbar-default .navbar-nav > .active > a:focus {
    		color: #8eb640 !important;
    		background-color: transparent;
    	}
    	.navbar-toggle {
    		border-radius: 0;
    	}
    	.navbar-default .navbar-toggle:hover, .navbar-default .navbar-toggle:focus {
    		background-color: #8eb640;
    		border-color: #8eb640;
    	}
    	.navbar-default .navbar-toggle:hover>.icon-bar {
    		background-color: #FFF;
    	}
    	.section-title {
    		margin-bottom: 70px;
    	}
    	.section-title .overlay {
    		padding: 80px 0;
    		background: rgba(0, 0, 0, 0.7);
    	}
    	.section-title p {
    		font-size: 22px;
    		color: rgba(255,255,255,0.8);
    	}
    	.section-title hr {
    		margin: 0 auto;
    		margin-bottom: 40px;
    	}
    	.btn-custom {
    		text-transform: uppercase;
    		color: #fff;
    		background-color: #72a411;
    		border: 0;
    		padding: 14px 20px;
    		margin: 0;
    		font-size: 16px;
    		font-weight: 500;
    		letter-spacing: 0.5px;
    		border-radius: 0;
    		margin-top: 20px;
    		transition: all 0.5s;
    	}
    	.btn-custom:hover, .btn-custom:focus, .btn-custom.focus, .btn-custom:active, .btn-custom.active {
    		color: #fff;
    		background-color: #628d0f;
    	}

      .navbar-login
      {
          width: 220px;
          padding: 5px;
          padding-bottom: 0px;
      }

      .navbar-login-session
      {
          padding: 6px;
          padding-bottom: 0px;
          padding-top: 0px;
      }

      .icon-size
      {
          font-size: 50px;
      }
      //
      // .undLine li::after {
      //     background-color: #23527c;
      //     width: 0;
      //     height: 3px;
      //     left: 0;
      //     bottom: 0;
      //     transition: width 0.35s ease 0s;
      //     position: absolute;
      //   }
      //
      // .undLine li:hover::after {
      //     width: 100%;
      //   }

      .glow {
        cursor: pointer;
        -webkit-transition: 0.5s ease-in-out;
        -moz-transition: 0.5s ease-in-out;
        -ms-transition: 0.5s ease-in-out;
        -o-transition: 0.5s ease-in-out;
        transition: 0.5s ease-in-out;
        -webkit-text-shadow: 0 0 0 transparent, 0 0 0 transparent;
        -moz-text-shadow: 0 0 0 transparent, 0 0 0 transparent;
        -ms-text-shadow: 0 0 0 transparent, 0 0 0 transparent;
        -o-text-shadow: 0 0 0 transparent, 0 0 0 transparent;
        /*text-shadow: 0 0 0 transparent, 0 0 0 transparent;
        color: rgba(0, 0, 0, 0.1);*/
        overflow: visible;
      }
      .glow:hover {
        color: #333;
        -webkit-text-shadow: 0 0 10px #45526E, 0 0 50px #ff9b1a;
        -moz-text-shadow: 0 0 10px #45526E, 0 0 50px #ff9b1a;
        -ms-text-shadow: 0 0 10px #45526E, 0 0 50px #ff9b1a;
        -o-text-shadow: 0 0 10px #45526E, 0 0 50px #ff9b1a;
        text-shadow: 0 0 10px #45526E, 0 0 50px #ff9b1a;
      }


  	`],
  	template: `
  		<nav id="menu" class="navbar navbar-default navbar-fixed-top" [ngClass]="{'loggedin-header': token!='' && token!=null}">
  		  <div class="container">
  		    <!-- Brand and toggle get grouped for better mobile display -->
  		    <div class="navbar-header">
  		      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button>
  		      <a  *ngIf="token=='' || token==null" class="navbar-brand page-scroll  " href="#" (click)="clone_scrollToBody();">GBCI Product Database</a>

            <a  *ngIf="token!='' && token!=null " class="navbar-brand page-scroll " href="#page-landing" (click)="clone_scrollToBody();">GBCI Product Database</a>

            </div>



  		    <!-- Collect the nav links, forms, and other content for toggling -->
  		    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
  		      <ul class="nav navbar-nav navbar-right ">

            <!--  <li class="" *ngIf="accountType=='' || accountType==null"><a href="#page-about" class="page-scroll">About</a></li>

            <li class="" *ngIf="token!='' && token!=null"><a href="#page-ratings" class="page-scroll">Ratings</a></li>
  		        <li class="" *ngIf="token!='' && token!=null"><a href="#page-faq" class="page-scroll">FAQ</a></li>
  		        <li class="" *ngIf="token!='' && token!=null"><a href="#page-contact" class="page-scroll">Contact Us</a></li> -->

            <!--  <li *ngIf="token!='' && token!=null "><a (click)="logout();">Logout</a></li>-->
              <li class="" *ngIf="token=='' || token==null"><a href="#page-login">Login</a></li>
              <!-- <li><a href="#page-merchant-register">Register</a></li> -->
  		      </ul>

            <ul class="nav navbar-nav navbar-right" *ngIf="token!='' && token!=null " >
          <!--   <li *ngIf="token!='' && token!=null && accountType=='merchant'" ><a class='pointer' href="#page-merchant-dashboard"><i class="fa fa-desktop" aria-hidden="true"></i> Dashboard</a>&nbsp;</li>
            <li *ngIf="token!='' && token!=null && accountType=='merchant'" ><a class='pointer' href="#page-merchant-statistics-general"><i class="fa fa-bar-chart" aria-hidden="true"></i> Analytics</a>&nbsp;</li>

            <li *ngIf="token!='' && token!=null && userRoleType=='admin'" ><a class='pointer' href="#page-product-approval"><i class="fa fa-desktop" aria-hidden="true"></i> GBCI Dashboard</a>&nbsp;</li>
            <li *ngIf="token!='' && token!=null && accountType!='merchant'"><a class='pointer' href="#page-project">Projects</a></li>
             <li *ngIf="token!='' && token!=null "><a href="#page-listing" class="pointer">Database</a></li>
 -->
             <li *ngIf="token!='' && token!=null && accountType=='merchant'" ><a class='pointer ' href="#page-merchant-dashboard">Dashboard</a>&nbsp;</li>
             <li *ngIf="token!='' && token!=null "><a href="#page-listing" class="pointer">Database</a></li>
             <li *ngIf="token!='' && token!=null && accountType=='merchant'" ><a class='pointer ' href="#page-merchant-statistics-general">Analytics</a>&nbsp;</li>
             <li *ngIf="token!='' && token!=null && userRoleType=='admin'" ><a class='pointer ' href="#admin-analytics">Analytics</a>&nbsp;</li>
             <li *ngIf="token!='' && token!=null && userRoleType=='admin'" ><a class='pointer ' href="#page-product-approval">GBCI Dashboard</a>&nbsp;</li>
             <li *ngIf="token!='' && token!=null && accountType!='merchant'">
             <a class='pointer '
              href="#page-project/_"
              >Projects</a></li>
              <!-- href="#page-project" -->
            <!--  <li *ngIf="token!='' && token!=null "><a href="#page-listing" class="pointer ">Database</a></li>
-->

         <li class="dropdown">
             <a style="background-color: transparent;" href="#" class="dropdown-toggle " data-toggle="dropdown">
            <span class="glyphicon glyphicon-user"></span>
                 {{userInformation.firstName}}
                 <i class="fa fa-caret-down"></i>
             </a>
             <ul class="dropdown-menu" style="margin-top: 6px;margin-right: -60px;border-radius: 3px">
                    <li>
                        <div class="navbar-login">
                            <div class="row">
                                <div class="col-sm-4">
                                    <p class="text-center">
                                    <span class="glyphicon glyphicon-user icon-size"></span>
                                    </p>
                                </div>
                                <div class="col-sm-8">
                                    <p class="text-left"><strong> {{userInformation.firstName}}  {{userInformation.lastName}}</strong></p>
                                    <p class="text-left small"> {{userInformation.email}}</p>

                                </div>
                            </div>
                        </div>
                    </li>
                      <li class="divider navbar-login-session-bg"></li>
                        <li class="pointer"><a href="#page-mail-box"><span   style="float: right !important;"> <i class="fa fa-envelope" aria-hidden="true"></i> </span> Messages </a></li>
                        <li class="divider"></li>
                       <li class="pointer"><a href="#page-profile-info">
                       <span class="glyphicon glyphicon-cog" style="float: right !important;"></span>
                         Account Settings

                           </a>
                       </li>

                    <!--  <li class="pointer"><a href="#page-mail-box"><span class="badge" style="float: right !important;"> 0 </span> Notifications </a></li> -->

                      <li class="divider"></li>
                      <li class="pointer"><a (click)="logout();"><span class="glyphicon glyphicon-log-out" style="float: right !important;"></span> Log Out </a></li>
                </ul>
         </li>
     </ul>

  		    </div>
  		    <!-- /.navbar-collapse -->
  		  </div>
  		</nav>
  		<!-- TOP_menu -->

  	`,
})
export class TopMenuLanding extends AppComponent {

  public userInfo:any;public userInformation:any={};

  constructor( public router: Router , public globalService: globalService){
     super(router,globalService);
   }

  public token:string = localStorage.getItem('GBCItoken');
  public accountType=localStorage.getItem('GBCIaccountType');
  public userRoleType=localStorage.getItem('GBCIRole');

  public ProductCompareArry:any=[];
  public ProductCompareLength:number;


    ngOnInit(){


    $("body").css('background-image', 'none');
    if(this.accountType!='' && this.accountType!=null )
    {this.getMemberInfo();}
    // this.ProductCompareArry=this.globalService.getData().ComparProductId;
// console.log('this.ProductCompareArry',this.ProductCompareArry);
    }
    logout(){
      localStorage.removeItem('GBCItoken');
      localStorage.removeItem('GBCIaccountType');
      localStorage.removeItem('GBCIRole');

      this.token = '';
      this.globalService.removeData();
      //  localStorage.removeItem('globalServiceData');
       this.redirect('page-logout',{});
    }

    getMemberInfo(){
      let parent:any=this;
      $.post(this.ApiURL+'Merchant/merchant_information',{
         'data':{
             'key':parent.token,

             'extra':{
               'required': ['firstName','lastName','email']
             }
         }
         },function(res:any){
           if(res!=null){
            //  var existingGlobalService= parent.globalService.getData();
            //  existingGlobalService.userInfo=res.userInfo;
            //    parent.globalService.setData(existingGlobalService);
           parent.globalService.setData({
             'userInfo':res.userInfo
           });
          //  parent.globalService.setData({
          //    'projec': {
          //       'name':'test',
          //       'profile':'added'
          //    }
          //  });
//console.log('=====',parent.globalService.getData());
           //this.productsInfo = [1];
           parent.userInformation=res.userInfo;
            //  console.log(parent.userInformation,parent.userInformation.email);
            }
         });
    }

  clone_scrollToRatings(){
    $('html, body').animate({
        scrollTop: $("#ratings-info").offset().top
    }, 2000);
  }
  clone_scrollToBody(){
    $('html, body').animate({
          scrollTop: $("body").offset().top
    }, 2000);
  }

}
