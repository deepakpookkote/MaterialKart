import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Injectable }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

//import { CustExtBrowserXhr } from './core/cors/cust-ext-browser-xhr'

import { FormsModule }          from '@angular/forms';


import { RouterModule, Routes,
         CanActivate,
         ActivatedRouteSnapshot,
         RouterStateSnapshot
       } from '@angular/router';


import { AppComponent }  from './app.component';


import { ListingComponent }   from './pages/home/listing';
import { MerchantRegisterComponent }   from './pages/users/register';
import { MerchantLoginComponent }   from './pages/users/login';
//public memberdefault dashboard
import { DefaultPublicDashboardComponent } from './pages/publicMembers/dashboard/default-dashboard';

//merchant
import { MerchantDashboardComponent }   from './pages/merchant/dashboard/dashboard';
import { MerchantInfo }   from './pages/merchant/info/info';
import { MerchantStatisticsGeneral }    from './pages/merchant/statistics/general';
import { AdminAnalyticsGeneral }    from './pages/merchant/statistics/admin_analytics';



import { MerchantLeedCreditInfo }   from './pages/merchant/credits/list';
import { MerchantLeedCertificateInfo }   from './pages/merchant/certificates/list';
import { MerchantUsers } from './pages/merchant/users/merchant.users';
import { MerchantProductView }  from './pages/merchant/products/view';
import { MerchantProductAdd } from './pages/merchant/products/add';
import {MerchantProductEdit} from './pages/merchant/products/product-edit';
import { MerchantMemberView }   from './pages/merchant/members/view';
import { MerchantMemberAdd }   from './pages/merchant/members/add';
import { landingComponent } from './pages/landingPage/home';
import { ContactComponent } from './pages/contact/contact';
import { AboutComponent } from './pages/about/about';
import { FaqComponent } from './pages/faq/faq';
import { RatingsInfoComponent } from './pages/ratings/ratingsinfo';
import { RatingsHomeComponent } from './pages/ratings/ratings-home';
import { SingleProductComponent } from './pages/products/single';
import { CompareProductComponent } from './pages/compare/compare';
import { ProjectComponent } from './pages/projects/project-info';
import { ProductApprovalComponent } from './pages/products/approval';

import { MailboxPageComponent } from './pages/mailbox/mailbox-home';



import { TopMenu } from './directives/top-menu/top-menu';
import { TopMenuMerchant } from './directives/top-menu/top-menu-merchant';
import { LeftMenu } from './directives/left-menu/left-menu';
import { CommonFooter } from './directives/footer/footer';
import { TopMenuLanding } from './directives/top-menu/top-menu-landing';
import { AccountLeftMenu } from './directives/left-menu/account-left-menu';
import { LogOutComponent } from './directives/logout/logout';
import { TaggDirective } from './directives/tags/tags-input';
import { ChatboxDir } from './directives/chat-box/chat-box.dir';


//Services
import { globalService } from './services/global.service';
import { ApiService } from './services/ApiService';
import { RatingsService } from './services/ratings/ratings.service';
import { CountryDbService } from './services/countryDB/countrydb.service';

//Directives
import { MerchantUsersAddDir } from './directives/merchant/users/users.add.dir';

//Custom Pipes
import { SafeHtmlPipe } from './custom-pipes/safe-html';
//import { TestPipe } from './custom-pipes/test-pipes';


const appRoutes: Routes = [
  { path: 'page-listing', component: ListingComponent },
  { path: 'page-register', component: MerchantRegisterComponent },
  { path: 'page-login', component: MerchantLoginComponent },
  { path: 'page-merchant-dashboard', component: MerchantDashboardComponent },
  { path: 'page-merchant-statistics-general', component: MerchantStatisticsGeneral },
  { path: 'page-merchant-credits', component: MerchantLeedCreditInfo },
  { path: 'page-merchant-certificates', component: MerchantLeedCertificateInfo },
  { path: 'page-merchant-users-management', component: MerchantUsers },
  { path: 'page-merchant-products', component: MerchantProductView },
  { path: 'page-merchant-products-add', component: MerchantProductAdd },
  { path: 'page-merchant-product-edit', component: MerchantProductEdit},
  { path: 'page-merchant-member-view', component: MerchantMemberView },
  { path: 'page-merchant-member-add', component: MerchantMemberAdd },
  { path: 'page-profile-info', component: MerchantInfo },
  { path: 'page-landing' , component:landingComponent},
  { path: 'page-contact' , component:ContactComponent},
  { path: 'page-about' , component:AboutComponent },
  { path: 'page-faq' , component:FaqComponent },
  { path: 'page-ratingsinfo' , component:RatingsInfoComponent },
  { path: 'page-ratings', component:RatingsHomeComponent },
  { path: 'page-product', component:SingleProductComponent},
  { path: 'compare-product', component:CompareProductComponent},
  { path: 'page-project/:category', component:ProjectComponent},
  { path: 'page-product-approval', component:ProductApprovalComponent},
  { path: 'page-mail-box', component:MailboxPageComponent },
  { path: 'admin-analytics', component:AdminAnalyticsGeneral },


  //public
  { path: 'page-default-member-dashboard', component:DefaultPublicDashboardComponent},
  { path: 'page-logout', component:LogOutComponent },
  { path: '', redirectTo: '/page-landing', pathMatch: 'full' },

  // { path: '**', component: ListingComponent }
];


@NgModule({
  imports: [
    BrowserModule,BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes,{ useHash: true }),
      HttpModule, JsonpModule
  ],
  exports: [ TopMenu,LeftMenu,TopMenuMerchant,CommonFooter,LogOutComponent,TaggDirective ],
  declarations: [
    AppComponent,landingComponent,ContactComponent,AboutComponent,FaqComponent,
    RatingsInfoComponent,RatingsHomeComponent,
    ListingComponent,MerchantRegisterComponent,MerchantLoginComponent,
    DefaultPublicDashboardComponent,
    MerchantDashboardComponent,MerchantInfo,MerchantStatisticsGeneral,
    MerchantLeedCreditInfo,MerchantLeedCertificateInfo,MerchantUsers,MerchantUsersAddDir,
    MerchantProductView,MerchantProductAdd,MerchantProductEdit,
    MerchantMemberView,MerchantMemberAdd,
    TopMenu,LeftMenu,TopMenuMerchant,CommonFooter,TopMenuLanding,AccountLeftMenu,
    ChatboxDir,
    LogOutComponent,CompareProductComponent,TaggDirective,
    SingleProductComponent,ProjectComponent,ProductApprovalComponent,
    SafeHtmlPipe,AdminAnalyticsGeneral,
    MailboxPageComponent
  ],
  providers: [globalService,ApiService,RatingsService,CountryDbService],
  bootstrap: [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})



export class AppModule { }
