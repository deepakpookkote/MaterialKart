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
var core_2 = require("@angular/core");
var router_1 = require("@angular/router");
var app_component_1 = require("./../../app.component");
var global_service_1 = require("./../../services/global.service");
var core_3 = require("@angular/core");
core_3.enableProdMode();
var ListingComponent = (function (_super) {
    __extends(ListingComponent, _super);
    function ListingComponent(router, globalService, lc) {
        var _this = _super.call(this, router, globalService) || this;
        _this.router = router;
        _this.globalService = globalService;
        _this.apiKey = localStorage.getItem('GBCItoken');
        _this.products = [];
        _this.forrange = [];
        _this.scrollPos = 0;
        _this.hintContainer = false;
        _this.searchObject = "";
        _this.hintProducts = [];
        _this.orginalHintProducts = [];
        _this.getApiUrl = _this.ApiURL;
        _this.accountType = localStorage.getItem('GBCIaccountType');
        _this.wishListWindow = false;
        _this.wishListmanage = false;
        _this.wishlistSuccessMsg = "";
        _this.wishListCategObj = "";
        _this.productCategories = ['Adhesive', 'Ceiling', 'Concrete', 'EVSE', 'Exterior',
            'Flooring', 'Faucet', 'Green Vehicles', 'Glazing External', 'Insulation', 'Indoor Furniture', 'Internal Paint', 'Pavers',
            'Roof Paint', 'Laminate', 'WC'];
        _this.categoryFilterItem = [];
        _this.wishlistCategory = [];
        _this.searchHintLocked = [];
        _this.JumpCnt = 0;
        _this.Product4Compare = "";
        _this.Product4ComparePID = [];
        _this.creditsFilterItem = [];
        _this.ratingsFiterItem = [];
        window.onscroll = function () {
            var windowHeight = "innerHeight" in window ? window.innerHeight
                : document.documentElement.offsetHeight;
            var body = document.body, html = document.documentElement;
            var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
            var windowBottom = windowHeight + window.pageYOffset;
            if (windowBottom >= docHeight) {
                _this.LoadMore();
            }
        };
        return _this;
    }
    ListingComponent.prototype.ngOnInit = function () {
        this.searchObject = this.globalService.getData().productSearch;
        this.getPublicProducts();
        this.scrollToRatings();
        // this.categoryFilterItem=this.globalService.getData().categoryFilterItem;
        // if(this.categoryFilterItem==undefined){ this.categoryFilterItem=[]; }
        //
        // this.creditsFilterItem=this.globalService.getData().creditsFilterItem;
        // if(this.creditsFilterItem==undefined){ this.creditsFilterItem=[]; }
        //
        // this.ratingsFiterItem=this.globalService.getData().ratingsFiterItem;
        // if(this.ratingsFiterItem==undefined){ this.ratingsFiterItem=[]; }
        this.productCompareCategory = this.globalService.getData().ComparProductCat;
        //  console.log('this.productCompareCategory',this.productCompareCategory);
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.scrollToTop').fadeIn();
            }
            else {
                $('.scrollToTop').fadeOut();
            }
        });
        for (var i = 0; i <= 20; i++) {
            this.forrange.push('aa');
        }
        localStorage.removeItem('activeProductId');
        this.getWishlistCategory();
    };
    ListingComponent.prototype.checkTickBoxCategory = function (item) {
        var pos = (this.categoryFilterItem).indexOf(item);
        if (pos >= 0) {
            return 1;
        }
        else {
            return 0;
        }
    };
    ListingComponent.prototype.checkTickBoxCredits = function (item) {
        var pos = (this.creditsFilterItem).indexOf(item);
        if (pos >= 0) {
            return 1;
        }
        else {
            return 0;
        }
    };
    ListingComponent.prototype.checkTickBoxRatings = function (item) {
        var pos = (this.ratingsFiterItem).indexOf(item);
        if (pos >= 0) {
            return 1;
        }
        else {
            return 0;
        }
    };
    ListingComponent.prototype.combineFilterCategories = function (item) {
        var pos = (this.categoryFilterItem).indexOf(item);
        if (pos >= 0) {
            delete this.categoryFilterItem[pos];
            this.categoryFilterItem.splice(pos, 1); //alert(pos);
        }
        else {
            (this.categoryFilterItem).push(item);
        }
        this.globalService.setData({
            'categoryFilterItem': this.categoryFilterItem
        });
        this.getPublicProducts();
        // console.log('filtercategory',this.categoryFilterItem);
        //categoryFilterItem
    };
    ListingComponent.prototype.combineFilterCredits = function (item) {
        var pos = (this.creditsFilterItem).indexOf(item);
        if (pos >= 0) {
            delete this.creditsFilterItem[pos];
        }
        else {
            (this.creditsFilterItem).push(item);
        }
        this.globalService.setData({});
        this.getPublicProducts();
        // console.log('filtercategory',this.categoryFilterItem);
        //categoryFilterItem
    };
    ListingComponent.prototype.combineFilterRatings = function (item) {
        var pos = (this.ratingsFiterItem).indexOf(item);
        if (pos >= 0) {
            delete this.ratingsFiterItem[pos];
        }
        else {
            (this.ratingsFiterItem).push(item);
        }
        this.globalService.setData({});
        this.getPublicProducts();
        // console.log('filtercategory',this.categoryFilterItem);
        //categoryFilterItem
    };
    ListingComponent.prototype.hintFilter = function (val) {
        var parent = this;
        parent.hintProducts = [];
        parent.searchHintLocked = [];
        //this.globalService.setData({});
        this.globalService.setData({
            'productId': '',
            'productSearch': ''
        });
        if (this.searchObject.length > 1) {
            this.hintContainer = true;
            $.post(this.ApiURL + 'products/public_product_view', {
                'data': {
                    'filter': {
                        'name-category': val,
                    },
                    'extra': {
                        'pageJump': 0,
                        //'orderByDateCreated':-1 /* Descending order , Not mandatory order by date created */
                        'required': ['name', 'category']
                    }
                }
            }, function (res) {
                parent.hintProducts = res.products;
                parent.orginalHintProducts = res.products;
            });
        }
        else {
            this.hintContainer = false;
        }
    };
    ListingComponent.prototype.hintDisplayLogic = function (name, category) {
        var lengthSrch = (this.searchObject).length;
        var categ = category.substr(0, lengthSrch);
        var nam = name.substr(0, lengthSrch);
        nam = nam.toLowerCase();
        //console.log(nam,'--',this.searchObject);
        if (nam == this.searchObject) {
            this.checkk(this.orginalHintProducts);
            //  return name;
        }
        else {
            if ((this.searchHintLocked).indexOf(categ) < 0) {
                (this.hintProducts).unshift({ name: category, productId: '', category: category });
                (this.searchHintLocked).push(categ);
                this.checkk(this.hintProducts);
                //  return category;
            }
            else {
                //return name;
            }
        }
        //console.log('prds',this.hintProducts);
        //console.log(category.substr(0,lengthSrch));
    };
    ListingComponent.prototype.checkk = function (eve) {
        var parent = this;
        parent.hintProducts = eve;
        setTimeout(function () { }, 100);
    };
    ListingComponent.prototype.hintPull = function (val, id) {
        console.log(val);
        this.searchObject = val;
        this.globalService.setData({
            'productId': id,
        });
    };
    ListingComponent.prototype.closeSearchBoxHintContainer = function () {
        var parent = this;
        setTimeout(function () {
            parent.hintContainer = false;
        }, 500);
    };
    ListingComponent.prototype.doScroll = function (pos) {
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
    ListingComponent.prototype.getPublicProducts = function () {
        var parent = this;
        this.JumpCnt = 0;
        $.post(this.ApiURL + 'products/public_product_view', {
            'data': {
                'filter': {
                    //    'name': parent.searchObject,
                    'name-category': parent.searchObject,
                    'category_in': parent.categoryFilterItem,
                    'credits': parent.creditsFilterItem,
                    'ratings': parent.ratingsFiterItem
                    /* similar to like statement in mysql query, i.e select * from table where name like '%f%'. Not Mandatory */
                },
                'extra': {
                    'pageJump': 0,
                }
            }
        }, function (res) {
            parent.products = res.products;
            // console.log('res Product',res);
            /*      if(res!=null)
                  {
                    for(let item of res.products ){
                          parent.products.push(item);
                       }
                    }
                    */
            // console.log('parent.products',parent.products);
        });
    };
    ListingComponent.prototype.LoadMore = function () {
        var parent = this;
        // parent.products=[];
        parent.JumpCnt = parent.JumpCnt + 1;
        $.post(this.ApiURL + 'products/public_product_view', {
            'data': {
                'filter': {
                    'name': parent.searchObject,
                    'category_in': parent.categoryFilterItem
                    /* similar to like statement in mysql query, i.e select * from table where name like '%f%'. Not Mandatory */
                },
                'extra': {
                    'pageJump': parent.JumpCnt,
                }
            }
        }, function (res) {
            // =res.products;
            // console.log('res Product',res);
            //var array = Object.keys(res.products).map(function (key) { return res.products[key]; });
            //parent.products=parent.merge_objects(parent.products,array);
            setTimeout(function () {
                if (res.products != null) {
                    for (var _i = 0, _a = res.products; _i < _a.length; _i++) {
                        var item = _a[_i];
                        parent.products.push(item);
                    }
                }
                $('#lm').trigger('click');
                //  console.log('parent.products LoadMore',parent.products);
            }, 200);
        });
    };
    ListingComponent.prototype.prdLoadDummy = function () {
        //**********Don't delete this dummy function.its use for load product data on view
    };
    ListingComponent.prototype.productPage = function (val) {
        var token = localStorage.getItem('GBCItoken');
        var service = this.globalService.getData();
        // console.log(service,val);
        service.productSearch = val;
        this.globalService.setData(service);
        //console.log(this.globalService.getData());
        if (token == '' || token == null) {
            this.redirect('page-login', {});
        }
        else {
            this.redirect('page-product', {});
        }
        //#page-product
    };
    ListingComponent.prototype.productPageSlider = function (productId) {
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
    ListingComponent.prototype.checkAllBox = function (event) {
        //  console.log("event",event);
        var checkboxes = document.getElementById('CATList');
        // checkboxes.forEach(x => x.state = event.target.checked)
        // $(".CATList input:checkbox").prop('checked', $(this).prop("checked"));
    };
    ListingComponent.prototype.changeplusicon = function () {
        if ($('.rt1').find($(".fa")).hasClass('fa fa-plus')) {
            $('.rt1').find($(".fa")).removeClass('fa fa-plus').addClass('fa fa-minus');
            $('.rt1').next().slideDown(200);
        }
        else if ($('.rt1').find($(".fa")).hasClass('fa fa-minus')) {
            $('.rt1').find($(".fa")).removeClass('fa fa-minus').addClass('fa fa-plus');
        }
    };
    ListingComponent.prototype.scroll2Top = function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
    };
    ListingComponent = __decorate([
        core_1.Component({
            //selector: 'my-app',
            styles: ["\n\n     h2 {\n     \tmargin: 0 0 20px 0;\n     \tfont-weight: 500;\n     \tfont-size: 34px;\n     \tcolor: #333;\n     \ttext-transform: uppercase;\n     }\n     h3 {\n     \tfont-size: 22px;\n     \tfont-weight: 500;\n     \tcolor: #333;\n     }\n     h4 {\n\n     \tfont-weight: 700;\n\n     }\n     h5 {\n     \ttext-transform: uppercase;\n     \tfont-weight: 700;\n     \tline-height: 20px;\n     }\n     p {\n     \tfont-size: 16px;\n     }\n     p.intro {\n     \tmargin: 12px 0 0;\n     \tline-height: 24px;\n     }\n     a {\n     \tcolor: #8eb640;\n     }\n     a:hover, a:focus {\n     \ttext-decoration: none;\n     \tcolor: #222;\n     }\n     ul, ol {\n     \tlist-style: none;\n     }\n     .clearfix:after {\n     \tvisibility: hidden;\n     \tdisplay: block;\n     \tfont-size: 0;\n     \tcontent: \" \";\n     \tclear: both;\n     \theight: 0;\n     }\n     .clearfix {\n     \tdisplay: inline-block;\n     }\n     * html .clearfix {\n     \theight: 1%;\n     }\n     .clearfix {\n     \tdisplay: block;\n     }\n     ul, ol {\n     \tpadding: 0;\n     \twebkit-padding: 0;\n     \tmoz-padding: 0;\n     }\n     hr {\n     \theight: 2px;\n     \twidth: 40%;\n     \ttext-align: center;\n     \t/*position: relative;*/\n     \tbackground: #8eb640;\n     \t/*margin: 0;*/\n     \tmargin-bottom: 40px;\n     \tborder: 0;\n     \t/*margin-left: 39%;*/\n     \tleft: 50%\n     }\n     .btn:active, .btn.active {\n     \tbackground-image: none;\n     \toutline: 0;\n     \t-webkit-box-shadow: none;\n     \tbox-shadow: none;\n     }\n     a:focus, .btn:focus, .btn:active:focus, .btn.active:focus, .btn.focus, .btn:active.focus, .btn.active.focus {\n     \toutline: none;\n     \toutline-offset: none;\n     }\n     /* Header Section */\n     .intro {\n     \tdisplay: table;\n     \twidth: 100%;\n     \tpadding: 0;\n     \tbackground: url(./webroot/images/landing-page/jesse-orrico-60368.jpg) no-repeat center center fixed;\n     \tbackground-color: #e5e5e5;\n     \t-webkit-background-size: cover;\n     \t-moz-background-size: cover;\n     \tbackground-size: cover;\n     \t-o-background-size: cover;\n     \t/*filter:brightness(200%);*/\n     }\n     .intro .overlay {\n     \tbackground: rgba(0,0,0,0.4);\n     \theight: 665px;\n     }\n     .intro h1 {\n     \t/*font-family: 'Dancing Script', cursive;*/\n     \tcolor: #fff;\n     \tfont-size: 10em;\n     /*\tfont-weight: 700;*/\n     \tmargin-top: 0;\n     \tmargin-bottom: 60px;\n     \tfont-weight: lighter;\n     }\n     .intro span {\n     \tcolor: #a7c44c;\n     \tfont-weight: 600;\n     }\n     .intro p {\n     \tcolor: #fff;\n     \tfont-size: 32px;\n     \tfont-weight: 300;\n     \tmargin-top: 10px;\n     \tmargin-bottom: 40px;\n     }\n     header .intro-text {\n     \tpadding-top: 250px;\n     \tpadding-bottom: 200px;\n     \ttext-align: center;\n     }\n     /* About Section */\n     #about {\n     \tpadding: 120px 0;\n     }\n     #about h3 {\n     \tfont-size: 20px;\n     }\n     #about .about-text {\n     \tmargin-left: 10px;\n     }\n     #about .about-img {\n     \tdisplay: inline-block;\n     \tposition: relative;\n     }\n     #about .about-img:before {\n     \tdisplay: block;\n     \tcontent: '';\n     \tposition: absolute;\n     \ttop: 8px;\n     \tright: 8px;\n     \tbottom: 8px;\n     \tleft: 8px;\n     \tborder: 1px solid rgba(255, 255, 255, 0.5);\n     }\n     #about p {\n     \tline-height: 24px;\n     \tmargin: 15px 0 30px;\n     }\n     /* Menu Section */\n     #ratings-info {\n     \tpadding: 0 0 60px 0;\n     }\n     /*#ratings-info .section-title {\n     \tbackground: #444 url(../img/menu-bg.jpg) center center no-repeat fixed;\n     \tbackground-size: cover;\n     }*/\n     #ratings-info .section-title h2 {\n     \tcolor: #fff;\n     }\n     #ratings-info img {\n     \twidth: 300px;\n     \tbox-shadow: 15px 0 #a7c44c;\n     }\n     #ratings-info h3 {\n     \tpadding: 10px 0;\n     \ttext-transform: uppercase;\n     }\n     #ratings-info .menu-section hr {\n     \tmargin: 0 auto;\n     }\n     #ratings-info .menu-section {\n     \tmargin: 0 20px 80px;\n     }\n     #ratings-info .menu-section-title {\n     \tfont-size: 26px;\n     \tdisplay: block;\n     \tfont-weight: 500;\n     \tcolor: #444;\n     \tmargin: 20px 0;\n     \ttext-align: center;\n     }\n     #ratings-info .menu-item {\n     \tmargin: 35px 0;\n     \tfont-size: 18px;\n     }\n     #ratings-info .menu-item-name {\n     \tfont-weight: 600;\n     \tfont-size: 17px;\n     \tcolor: #555;\n     \tborder-bottom: 2px dotted rgb(213, 213, 213);\n     }\n     #ratings-info .menu-item-description {\n     \tfont-style: italic;\n     \tfont-size: 15px;\n     }\n     #ratings-info .menu-item-price {\n     \tfloat: right;\n     \tfont-weight: 600;\n     \tcolor: #555;\n     \tmargin-top: -26px;\n     }\n     /* Footer Section*/\n     #footer {\n     \tbackground: #262626;\n     \tpadding: 50px 0 0 0;\n     }\n     #footer h3 {\n     \tcolor: #8eb640;\n     \tfont-weight: 400;\n     \tfont-size: 18px;\n     \ttext-transform: uppercase;\n     \tmargin-bottom: 20px;\n     }\n     #footer .copyrights {\n     \tpadding: 20px 0;\n     \tmargin-top: 50px;\n     \t/* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#779936+0,8eb640+50 */\n     \tbackground: rgb(119,153,54); /* Old browsers */\n     \tbackground: -moz-linear-gradient(top, rgba(119,153,54,1) 0%, rgba(142,182,64,1) 50%); /* FF3.6-15 */\n     \tbackground: -webkit-linear-gradient(top, rgba(119,153,54,1) 0%, rgba(142,182,64,1) 50%); /* Chrome10-25,Safari5.1-6 */\n     \tbackground: linear-gradient(to bottom, rgba(119,153,54,1) 0%, rgba(142,182,64,1) 50%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n     filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#779936', endColorstr='#8eb640', GradientType=0 ); /* IE6-9 */\n     }\n     #footer .social {\n     \tmargin: 20px 0 30px 0;\n     }\n     #footer .social ul li {\n     \tdisplay: inline-block;\n     \tmargin: 0 20px;\n     }\n     #footer .social i.fa {\n     \tfont-size: 26px;\n     \tpadding: 4px;\n     \tcolor: #fff;\n     \ttransition: all 0.3s;\n     }\n     #footer .social i.fa:hover {\n     \tcolor: #eee;\n     }\n     #footer p {\n     \tfont-size: 15px;\n     \tcolor: rgba(255,255,255,0.8)\n     }\n     #footer a {\n     \tcolor: #f6f6f6;\n     }\n     #footer a:hover {\n     \tcolor: #333;\n     }\n     .panel .image {\n       position: relative;\n       height: 100%;\n       background-color: transparent;\n       background-repeat: no-repeat;\n       background-position: center top;\n       background-size: cover;\n     }\n\n     #ratings-info .panel{\n     \tmargin-bottom: -2px;\n     }\n     .panel-leed-cover{\n     \tbackground: url(./webroot/images/landing-page/leed.jpg);\n     }\n     .panel-sites-cover{\n     \tbackground: url(./webroot/images/landing-page/sites-swaner.jpg);\n     }\n     .panel-peer-cover{\n     \tbackground: url(./webroot/images/landing-page/peer-powerlines.jpg);\n     }\n     .panel-well-cover{\n     \tbackground: url(./webroot/images/landing-page/well-hallway.jpg);\n     }\n     .panel-edge-cover{\n     \tbackground: url(./webroot/images/landing-page/edge-buildings.jpg);\n     }\n     .text{\n     \tline-height: 2;\n     \ttop: 12%;\n     }\n     /*Articles section*/\n\n     .border {\n         /*border-top: 1px solid #999;\n         border-bottom: 1px solid #999;\n         margin: 0 45%;\n         -webkit-transition: all 0.3s;\n         -moz-transition: all 0.3s;\n         -o-transition: all 0.3s;\n         transition: all 0.3s;*/\n         border-top: 1px solid #2196F3;\n         border-bottom: 1px solid #2196F3;\n         margin: 8% 45% 7% 0;\n         -webkit-transition: all 0.3s;\n         -moz-transition: all 0.3s;\n         -o-transition: all 0.3s;\n         transition: all 0.3s;\n         width: 10%\n     }\n\n     .newsFeed-section-1 {\n         padding-top: 10px;\n         padding-bottom: 120px;\n         background-color: #f1f1f1;\n     }\n\n     .about-us-section-2 {\n         padding-top: 120px;\n         padding-bottom: 120px;\n         background-color: #28ABE3;\n     }\n     .welcome-section {\n          background-color: #fff;\n         box-shadow: 0 0 3px #ccc;\n         padding: 30px;\n         cursor: pointer;\n         height: 400px;\n     }\n\n     .welcome-section img {\n         width: 100%;\n         -webkit-border-radius: 2px;\n         -moz-border-radius: 2px;\n         -o-border-radius: 2px;\n         border-radius: 2px;\n     }\n\n\n     .welcome-section h3 {\n        /* padding-top: 20px;*/\n         color: #777;\n         text-align: left;\n         /*text-transform: uppercase;*/\n         font-size: 18px;\n         font-weight: 500;\n         line-height: 1.3;\n     }\n\n     .welcome-section p {\n         padding-top: 20px;\n         color: #999;\n     }\n\n     /*.welcome-section:hover .border {\n         margin: 0 40%;\n     }*/\n     div.panel{\n          box-shadow: none !important;\n     }\n\n     .articleDescription{\n          height: 100px;\n     }\n\n\n.product-slider{\n  -ms-overflow-style: none;  // IE 10+\n    overflow: -moz-scrollbars-none;  // Firefox\n    overflow-x: hidden;\n}\n.product-slider::-webkit-scrollbar {\n  display: none;\n}\n\n.product-slider-nav{\n\n  background: #eee;\nborder: #ddd 1px solid;\nwidth: 50px;\nfont-size: 20px;\nposition: relative; /*top: -305px;*/\ntop: -245px;\n\n}\n.product-slider-nav ul li{\n  display: block;\ntext-align: center;\npadding: 20px 0;\nborder-top: 1px solid #d4d4d4;\n\ncolor: #444;\ncursor:pointer;\n/*\n-webkit-transition: background 2s ease-in-out, color 2s ease-in-out;\n-moz-transition: background 2s ease-in-out, color 2s ease-in-out;\ntransition: background 2s ease-in-out, color 2s ease-in-out;\n*/\n\n-webkit-transition: background 1s, color 2s;\n  -moz-transition: background 1s, color 2s;\n  transition: background 1s, color 2s;\n\n}\n\n.product-slider-nav ul li:hover {\n\n\nbackground: #676666/*#272828*/;\ncolor: white;\n\n\n\n}\n\n.banner-search-area{\n\n}\n.banner-search-area h1{\n  color: white; font-size:40px;text-shadow: 2px 3px 5px black;\n}\n.banner-search-area .search-container{\nborder-radius:3px; margin-left: 30%; margin-right: 30%; background: white;\n}\n.banner-search-area .text-box{\n  height: 48px; border-radius:3px;\n  padding-right: 80px;\n}\n.banner-search-area .btn{\n  background:#009aee; padding:10px; font-size:19px; position: relative; top: -70.4px; left: 6px;\n    box-shadow: none;\n    border-radius:0px;\n}\n.banner-search-area .clearx{\n  position: relative; top: -50.4px; left: 6px;\n  color: silver; cursor: pointer;\n}\n.banner-search-area .clearx:hover{\n  color: grey;\n}\n\n.banner-search-area .btn:hover{\n  box-shadow: none;\n}\n\n.banner-search-area .hint-container{\n     position: relative; top: 20px;\n}\n\n.banner-search-area .hint-container .group{\n   position: relative; top: -10px;\n   height: 120px; overflow: auto;\n}\n.banner-search-area .hint-container .group div{\n  padding: 1px 10px 1px 10px; cursor: pointer;\n}\n.banner-search-area .hint-container .group div:hover{\n background: #dfdfdf;\n}\n\n.banner-search-area .hint-container span{\n  color: grey; font-size: 14px; font-weight: normal\n}\n\n\n.scrollToTop{\n  display: none;\n  width: 45px;\n  height: 45px;\n  text-indent: -9999px;\n  position: fixed;\n  z-index: 999;\n  right: 20px;\n  bottom: 20px;\n  background: #708A96 url(\"./webroot/images/up-arrow.png\") no-repeat center 43%; */\n  -webkit-border-radius: 30px;\n  -moz-border-radius: 30px;\n  border-radius: 30px;\n}\n.scrollToTop:hover{\n  background-color: #45526E;\n}\n\n\n\n\n\n\n\n\n\n.modal-window {\n  position: fixed;\n  /*background-color: rgba(255, 255, 255, 0.15);*/\n  background-color: rgba(0, 0, 0, 0.15);\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 999;\n  opacity: 0;\n  pointer-events: none;\n  -webkit-transition: all 0.3s;\n  -moz-transition: all 0.3s;\n  transition: all 0.3s;\n  opacity: 1;\n  pointer-events: auto;\n\n}\n\n.modal-window>div {\n  width: 60%;\n  position: relative;\n  margin: 10% auto;\n\n  background: #f6f6f6;\n  color: #444;\n   box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);\n\n}\n.modal-window .modal-area{\n  padding: 10px;\n  margin-top: -10px;\n}\n\n\n\n.modal-close {\n  color: #464646;\n  line-height: 50px;\n  font-size: 95%;\n  position: absolute;\n  right: 0;\n  text-align: center;\n  top: 0;\n  width: 70px;\n  text-decoration: none;\n}\n\n.modal-close:hover {\n  color: #000;\n}\n\n.modal-window h4 {\n  padding: 10px;\n  margin: 0 0 15px;\n  background-color: #ffffff;\n  border-top: 1px solid silver;\n  border-bottom: 1px solid silver;\n}\n    "],
            templateUrl: './app/pages/home/listing.template.html',
        }),
        __metadata("design:paramtypes", [router_1.Router, global_service_1.globalService, core_2.NgZone])
    ], ListingComponent);
    return ListingComponent;
}(app_component_1.AppComponent));
exports.ListingComponent = ListingComponent;
