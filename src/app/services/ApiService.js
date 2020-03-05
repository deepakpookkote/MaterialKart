"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/Rx");
var ApiService = (function () {
    function ApiService(http) {
        this.http = http;
        //public base = 'http://localhost/Group10/GBCI/Gitlab/API/v1/app/index.php?path=';
        //public base = 'http://localhost/Group10/GBCI/Gitlab/API/v1/app/index.php?path=';
        this.base = 'https://product.gbci.org/green-building/dev-1/api/app/index.php?path=';
    }
    //Organization
    /*
        orgCreate(data){ var result:any;
          return  this.post('organization/create',data)
       }
    
    /*
    
     Client Side
    
     this.orgCreate({---data---}).then(response => {
                     result=response
                   })
                   .catch(error => {
                       console.log('Error while logging in', error)
                   });
    
    
       */
    //users account add
    ApiService.prototype.accountInfoAdd = function (data) {
        return this.post('users/accountInfo_add', data);
    };
    //users account info
    ApiService.prototype.accountInfoView = function (data) {
        return this.post('users/account_info', data);
    };
    //users account edit
    ApiService.prototype.accountInfoEdit = function (data) {
        return this.post('users/accountInfo_edit', data);
    };
    // Product Image add
    ApiService.prototype.productImageAdd = function (data) {
        return this.post('images/push', data);
    };
    //wishlistData
    ApiService.prototype.productInWishlist = function (data) {
        return this.post('wishlist/productInWishlist', data);
    };
    ApiService.prototype.availableWishlists = function (data) {
        return this.post('wishlist/viewwishlistcategory', data);
    };
    ApiService.prototype.viewWishlists = function (data) {
        return this.post('wishlist/viewwishlists', data);
    };
    //Merchant product add
    ApiService.prototype.merchantProductAdd = function (data) {
        return this.post('Merchant/merchant_product_add', data);
    };
    ApiService.prototype.merchantProductView = function (data) {
        return this.post('Merchant/merchant_product_view', data);
    };
    //Merchant product edit
    ApiService.prototype.merchantProductEdit = function (data) {
        return this.post('Merchant/merchant_product_update', data);
    };
    //articles
    ApiService.prototype.publicArticleView = function (data) {
        return this.post('articles/public_article_view', data);
    };
    ApiService.prototype.recentActivity = function (data) {
        return this.post('api/recentActivity', data);
    };
    ApiService.prototype.publicProductView = function (data) {
        return this.post('products/public_product_view', data);
    };
    ApiService.prototype.ComproductPageAdd = function (data) {
        return this.post('communication/productpageadd', data);
    };
    ApiService.prototype.ComproductPageView = function (data) {
        return this.post('communication/productpageview', data);
    };
    ApiService.prototype.ComParticularMemberMessage = function (data) {
        return this.post('communication/particularmembermessage', data);
    };
    ApiService.prototype.ComMailboxInbox = function (data) {
        return this.post('communication/mailboxinbox', data);
    };
    ApiService.prototype.projectsShareUsers = function (data) {
        return this.post('projects/shareUsers', data);
    };
    ApiService.prototype.projectsShareProjects = function (data) {
        return this.post('projects/shareProjects', data);
    };
    ApiService.prototype.projectsRemoveUsers = function (data) {
        return this.post('projects/removeSharedUsers', data);
    };
    ApiService.prototype.usersPublic_users_list = function (data) {
        return this.post('users/public_users_list', data);
    };
    /*
       getThread(id) {
           return this.get(`getThread?id=${id}`)
       }
   
       waitForEvent(lastEventId) {
           return this.get(`waitForEvent?lastEventId=${lastEventId}`)
       }
   
       getMarkedPosts(username) {
           return this.get('clientData/getMarkedPosts?username=' + encodeURIComponent(username))
       }
       */
    ApiService.prototype.get = function (url) {
        return this.http.get(this.base + url)
            .map(function (res) { return res.json(); });
    };
    ApiService.prototype.post = function (url, params) {
        var data = JSON.stringify(params);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }
        // { 'Content-Type': 'Access-Control-Allow-Headers' }
        // { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        );
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.base + url, data, options)
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(function (res) { return res.json(); });
    };
    ApiService.prototype.test = function (params) {
        var data = JSON.stringify(params);
        var headers = new http_1.Headers();
        var options = new http_1.RequestOptions({ headers: headers });
        console.log(data);
        return this.http.post('http://localhost:13615/users/test/', data, options)
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(function (res) { return res.json(); });
    };
    ApiService.prototype.socketConnectionTest = function () {
        var data = JSON.stringify({ name: 'aaaa' });
        var headers = new http_1.Headers();
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post('http://localhost:2483', data, options)
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(function (res) { return res.json(); });
    };
    ApiService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], ApiService);
    return ApiService;
}());
exports.ApiService = ApiService;
