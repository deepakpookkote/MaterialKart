"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var router_1 = require("@angular/router");
var app_component_1 = require("./../../app.component");
var global_service_1 = require("./../../services/global.service");
var ApiService_1 = require("./../../services/ApiService");
var landingComponent = (function (_super) {
    __extends(landingComponent, _super);
    function landingComponent(router, globalService, apiService) {
        var _this = _super.call(this, router, globalService) || this;
        _this.router = router;
        _this.globalService = globalService;
        _this.apiService = apiService;
        _this.apiKey = localStorage.getItem('GBCItoken');
        _this.products = [];
        _this.articles = [];
        _this.forrange = [];
        _this.scrollPos = 0;
        _this.hintContainer = false;
        _this.searchObject = "";
        _this.hintProducts = [];
        _this.getApiUrl = _this.ApiURL;
        _this.accountType = localStorage.getItem('GBCIaccountType');
        _this.currentProductpage = 0;
        _this.loadMoreProductBtn = false;
        _this.totalProducts = 0;
        _this.loadMorefinish = [];
        return _this;
    }
    landingComponent.prototype.ngOnInit = function () {
        this.searchObject = this.globalService.getData().productSearch;
        this.getPublicProducts();
        this.scrollToRatings();
        this.getArticles();
        for (var i = 0; i <= 20; i++) {
            this.forrange.push('aa');
        }
        localStorage.removeItem('activeProductId');
        this.productCompareCategory = this.globalService.getData().ComparProductCat;
        // console.log('this.productCompareCategory',this.productCompareCategory);
        if (this.accountType == "user" || this.accountType == "gbcistaff") {
            this.getWishlistCategory();
            this.getWishlistData('');
        }
        if (this.accountType == "merchant") {
            this.getRecentActivity();
        }
    };
    landingComponent.prototype.getRecentActivity = function () {
        var _this = this;
        this.apiService.recentActivity({
            'data': {
                'key': this.apiKey,
                'orderByDateCreated': -1
            }
        }).then(function (res) {
            _this.totalProducts = res.totalProducts;
        }).catch(function (error) {
            console.log('API response error ', error);
        });
    };
    landingComponent.prototype.hintFilter = function (val) {
        var _this = this;
        var parent = this;
        parent.hintProducts = [];
        // this.globalService.setData({});
        this.globalService.setData({
            'productId': '',
            'productSearch': ''
        });
        if (this.searchObject.length > 1) {
            this.hintContainer = true;
            this.apiService.publicProductView({
                'data': {
                    'filter': {},
                    'extra': {
                        'pageJump': 0,
                        //'orderByDateCreated':-1 /* Descending order , Not mandatory order by date created */
                        'required': ['name']
                    }
                }
            }).then(function (res) {
                if (res.products != null) {
                    _this.hintProducts = res.products;
                }
            }).catch(function (err) {
                console.log('Unable to process API', err);
            });
        }
        else {
            this.hintContainer = false;
        }
    };
    landingComponent.prototype.hintPull = function (val, id) {
        this.searchObject = val;
        this.globalService.setData({
            'productId': id,
            'productSearch': val
        });
    };
    landingComponent.prototype.doScroll = function (pos) {
        if (pos == "R") {
            this.scrollPos = this.scrollPos + 300;
            if (this.scrollPos < 0) {
                this.scrollPos = 0;
            }
            $('.product-slider').animate({
                scrollLeft: this.scrollPos
            }, 500);
        }
        if (pos == "L") {
            this.scrollPos = this.scrollPos - 300;
            if (this.scrollPos < 0) {
                this.scrollPos = 0;
            }
            $('.product-slider').animate({
                scrollLeft: this.scrollPos
            }, 500);
        }
    };
    landingComponent.prototype.getPublicProducts = function () {
        var _this = this;
        this.apiService.publicProductView({
            'data': {
                'filter': {},
                'extra': {
                    'pageJump': 0,
                    'orderByDateCreated': -1 // Descending order , Not mandatory order by date created
                }
            }
        }).then(function (res) {
            if (res.products != null) {
                _this.products = res.products;
            }
        }).catch(function (err) {
            console.log('Unable to process API', err);
        });
    };
    landingComponent.prototype.closeSearchBoxHintContainer = function () {
        var parent = this;
        setTimeout(function () {
            parent.hintContainer = false;
        }, 500);
    };
    landingComponent.prototype.loadMoreProducts = function () {
        var _this = this;
        var parent = this;
        parent.loadMoreProductBtn = true;
        this.currentProductpage++;
        this.apiService.publicProductView({
            'data': {
                'filter': {},
                'extra': {
                    'pageJump': this.currentProductpage,
                    'orderByDateCreated': -1 /* Descending order , Not mandatory order by date created */
                }
            }
        }).then(function (res) {
            if (res.products != null) {
                Array.prototype.push.apply(_this.products, res.products);
                parent.loadMoreProductBtn = true;
                parent.loadMorefinish = res.products;
                setTimeout(function () { parent.loadMoreProductBtn = false; }, 1000);
            }
            if (res.products == null) {
                parent.loadMorefinish = res.products;
            }
            console.log('parent.loadMorefinish', parent.loadMorefinish);
        }).catch(function (err) {
            console.log('Unable to process API', err);
        });
    };
    landingComponent.prototype.productPage = function (val) {
        var token = localStorage.getItem('GBCItoken');
        var service = this.globalService.getData();
        // console.log(service,val);
        //  service.productSearch=val;
        this.globalService.setData({
            'productSearch': val
        });
        //this.globalService.setData(service);
        //console.log(this.globalService.getData());
        if (token == '' || token == null) {
            this.redirect('page-login', {});
        }
        else {
            this.redirect('page-product', {});
        }
        //#page-product
    };
    landingComponent.prototype.productPageSlider = function (productId) {
        var token = localStorage.getItem('GBCItoken');
        var service = this.globalService.getData();
        // console.log(service,val);
        this.globalService.setData({
            'productId': productId
        });
        //console.log(this.globalService.getData());
        if (token == '' || token == null) {
            this.redirect('page-login', {});
        }
        else {
            this.redirect('page-product', {});
        }
        //#page-product
    };
    landingComponent.prototype.getArticles = function () {
        var _this = this;
        this.apiService.publicArticleView({}).then(function (res) {
            _this.articles = res.articles;
        }).catch(function (error) {
            console.log('Unable to process API', error);
        });
    };
    landingComponent.prototype.redirectToArticle = function (articleurl) {
        window.location.href = articleurl;
    };
    landingComponent = __decorate([
        core_1.Component({
            //selector: 'my-app',
            styleUrls: ['./app/pages/landingPage/home.template.css'],
            templateUrl: './app/pages/landingPage/home.template.html',
        }),
        __metadata("design:paramtypes", [router_1.Router, global_service_1.globalService, ApiService_1.ApiService])
    ], landingComponent);
    return landingComponent;
}(app_component_1.AppComponent));
exports.landingComponent = landingComponent;
