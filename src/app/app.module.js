"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var animations_1 = require("@angular/platform-browser/animations");
//import { CustExtBrowserXhr } from './core/cors/cust-ext-browser-xhr'
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
var listing_1 = require("./pages/home/listing");
var register_1 = require("./pages/users/register");
var login_1 = require("./pages/users/login");
//public memberdefault dashboard
var default_dashboard_1 = require("./pages/publicMembers/dashboard/default-dashboard");
//merchant
var dashboard_1 = require("./pages/merchant/dashboard/dashboard");
var info_1 = require("./pages/merchant/info/info");
var general_1 = require("./pages/merchant/statistics/general");
var admin_analytics_1 = require("./pages/merchant/statistics/admin_analytics");
var list_1 = require("./pages/merchant/credits/list");
var list_2 = require("./pages/merchant/certificates/list");
var merchant_users_1 = require("./pages/merchant/users/merchant.users");
var view_1 = require("./pages/merchant/products/view");
var add_1 = require("./pages/merchant/products/add");
var product_edit_1 = require("./pages/merchant/products/product-edit");
var view_2 = require("./pages/merchant/members/view");
var add_2 = require("./pages/merchant/members/add");
var home_1 = require("./pages/landingPage/home");
var contact_1 = require("./pages/contact/contact");
var about_1 = require("./pages/about/about");
var faq_1 = require("./pages/faq/faq");
var ratingsinfo_1 = require("./pages/ratings/ratingsinfo");
var ratings_home_1 = require("./pages/ratings/ratings-home");
var single_1 = require("./pages/products/single");
var compare_1 = require("./pages/compare/compare");
var project_info_1 = require("./pages/projects/project-info");
var approval_1 = require("./pages/products/approval");
var mailbox_home_1 = require("./pages/mailbox/mailbox-home");
var top_menu_1 = require("./directives/top-menu/top-menu");
var top_menu_merchant_1 = require("./directives/top-menu/top-menu-merchant");
var left_menu_1 = require("./directives/left-menu/left-menu");
var footer_1 = require("./directives/footer/footer");
var top_menu_landing_1 = require("./directives/top-menu/top-menu-landing");
var account_left_menu_1 = require("./directives/left-menu/account-left-menu");
var logout_1 = require("./directives/logout/logout");
var tags_input_1 = require("./directives/tags/tags-input");
var chat_box_dir_1 = require("./directives/chat-box/chat-box.dir");
//Services
var global_service_1 = require("./services/global.service");
var ApiService_1 = require("./services/ApiService");
var ratings_service_1 = require("./services/ratings/ratings.service");
var countrydb_service_1 = require("./services/countryDB/countrydb.service");
//Directives
var users_add_dir_1 = require("./directives/merchant/users/users.add.dir");
//Custom Pipes
var safe_html_1 = require("./custom-pipes/safe-html");
//import { TestPipe } from './custom-pipes/test-pipes';
var appRoutes = [
    { path: 'page-listing', component: listing_1.ListingComponent },
    { path: 'page-register', component: register_1.MerchantRegisterComponent },
    { path: 'page-login', component: login_1.MerchantLoginComponent },
    { path: 'page-merchant-dashboard', component: dashboard_1.MerchantDashboardComponent },
    { path: 'page-merchant-statistics-general', component: general_1.MerchantStatisticsGeneral },
    { path: 'page-merchant-credits', component: list_1.MerchantLeedCreditInfo },
    { path: 'page-merchant-certificates', component: list_2.MerchantLeedCertificateInfo },
    { path: 'page-merchant-users-management', component: merchant_users_1.MerchantUsers },
    { path: 'page-merchant-products', component: view_1.MerchantProductView },
    { path: 'page-merchant-products-add', component: add_1.MerchantProductAdd },
    { path: 'page-merchant-product-edit', component: product_edit_1.MerchantProductEdit },
    { path: 'page-merchant-member-view', component: view_2.MerchantMemberView },
    { path: 'page-merchant-member-add', component: add_2.MerchantMemberAdd },
    { path: 'page-profile-info', component: info_1.MerchantInfo },
    { path: 'page-landing', component: home_1.landingComponent },
    { path: 'page-contact', component: contact_1.ContactComponent },
    { path: 'page-about', component: about_1.AboutComponent },
    { path: 'page-faq', component: faq_1.FaqComponent },
    { path: 'page-ratingsinfo', component: ratingsinfo_1.RatingsInfoComponent },
    { path: 'page-ratings', component: ratings_home_1.RatingsHomeComponent },
    { path: 'page-product', component: single_1.SingleProductComponent },
    { path: 'compare-product', component: compare_1.CompareProductComponent },
    { path: 'page-project/:category', component: project_info_1.ProjectComponent },
    { path: 'page-product-approval', component: approval_1.ProductApprovalComponent },
    { path: 'page-mail-box', component: mailbox_home_1.MailboxPageComponent },
    { path: 'admin-analytics', component: admin_analytics_1.AdminAnalyticsGeneral },
    //public
    { path: 'page-default-member-dashboard', component: default_dashboard_1.DefaultPublicDashboardComponent },
    { path: 'page-logout', component: logout_1.LogOutComponent },
    { path: '', redirectTo: '/page-landing', pathMatch: 'full' },
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule, animations_1.BrowserAnimationsModule,
                forms_1.FormsModule,
                router_1.RouterModule.forRoot(appRoutes, { useHash: true }),
                http_1.HttpModule, http_1.JsonpModule
            ],
            exports: [top_menu_1.TopMenu, left_menu_1.LeftMenu, top_menu_merchant_1.TopMenuMerchant, footer_1.CommonFooter, logout_1.LogOutComponent, tags_input_1.TaggDirective],
            declarations: [
                app_component_1.AppComponent, home_1.landingComponent, contact_1.ContactComponent, about_1.AboutComponent, faq_1.FaqComponent,
                ratingsinfo_1.RatingsInfoComponent, ratings_home_1.RatingsHomeComponent,
                listing_1.ListingComponent, register_1.MerchantRegisterComponent, login_1.MerchantLoginComponent,
                default_dashboard_1.DefaultPublicDashboardComponent,
                dashboard_1.MerchantDashboardComponent, info_1.MerchantInfo, general_1.MerchantStatisticsGeneral,
                list_1.MerchantLeedCreditInfo, list_2.MerchantLeedCertificateInfo, merchant_users_1.MerchantUsers, users_add_dir_1.MerchantUsersAddDir,
                view_1.MerchantProductView, add_1.MerchantProductAdd, product_edit_1.MerchantProductEdit,
                view_2.MerchantMemberView, add_2.MerchantMemberAdd,
                top_menu_1.TopMenu, left_menu_1.LeftMenu, top_menu_merchant_1.TopMenuMerchant, footer_1.CommonFooter, top_menu_landing_1.TopMenuLanding, account_left_menu_1.AccountLeftMenu,
                chat_box_dir_1.ChatboxDir,
                logout_1.LogOutComponent, compare_1.CompareProductComponent, tags_input_1.TaggDirective,
                single_1.SingleProductComponent, project_info_1.ProjectComponent, approval_1.ProductApprovalComponent,
                safe_html_1.SafeHtmlPipe, admin_analytics_1.AdminAnalyticsGeneral,
                mailbox_home_1.MailboxPageComponent
            ],
            providers: [global_service_1.globalService, ApiService_1.ApiService, ratings_service_1.RatingsService, countrydb_service_1.CountryDbService],
            bootstrap: [app_component_1.AppComponent],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
