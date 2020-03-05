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
var ProjectComponent = (function (_super) {
    __extends(ProjectComponent, _super);
    function ProjectComponent(router, globalService, route, apiService) {
        var _this = _super.call(this, router, globalService, apiService) || this;
        _this.router = router;
        _this.globalService = globalService;
        _this.route = route;
        _this.apiService = apiService;
        _this.apiKey = localStorage.getItem('GBCItoken');
        _this.products = [];
        _this.articles = [];
        _this.forrange = [];
        _this.scrollPos = 0;
        _this.getApiUrl = _this.ApiURL;
        _this.accountType = localStorage.getItem('GBCIaccountType');
        _this.currentProductpage = 0;
        _this.loadMoreProductBtn = false;
        _this.totalProducts = 0;
        _this.sharehintEmail = [];
        _this.sharehintContainer = false;
        //  public sharedEmailObj:any=[];
        //  public sharedEmailObjId:any=[];
        _this.shareErr = false;
        _this.shareErrMsg = "";
        _this.SelectedProjCategory = "";
        _this.Comments = [];
        _this.CurrentDateTime = "";
        _this.likecnt = 0;
        _this.dislikecnt = 0;
        _this.sharedUsersList = [];
        _this.ProjectMemeberList = [];
        _this.urlParams = {};
        _this.UserListlen = "";
        return _this;
    }
    ProjectComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Requesting url
        this.route.params.subscribe(function (params) {
            _this.urlParams.category = params.category;
        });
        this.scrollToRatings();
        //  this.SharedUserList();
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
        this.productCompareCategory = this.globalService.getData().ComparProductCat;
        this.currentUserInfo = this.globalService.getData().userInfo;
        // console.log('this.productCompareCategory',this.productCompareCategory);
        // console.log('this.currentUserInfo',this.currentUserInfo);
        if (this.accountType == "user" || this.accountType == "gbcistaff") {
            this.getWishlistCategory();
            // this.getWishlistData('');
            this.InitialProjectSelect();
        }
    };
    ProjectComponent.prototype.scroll2Top = function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
    };
    ProjectComponent.prototype.makeActive = function (indexi) {
        // console.log('indexi',indexi);
        $('.catSelectionActive ul li a').removeClass('active1');
        //  $('#catLeft_'+indexi).css({'color':'white'});
        $('#catLeft_' + indexi).addClass('active1');
    };
    ProjectComponent.prototype.makeActive1 = function (indexi1) {
        //  localStorage.setItem('activeProject',indexi1);
        this.acctiveidx = indexi1;
        //  console.log('indexi',indexi1,this.acctiveidx);
        $('#catLeft_' + indexi1).addClass('active1');
    };
    ProjectComponent.prototype.doScroll = function (pos) {
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
    ProjectComponent.prototype.categSelection = function (categ) {
        var i = (this.wishlistCategory).indexOf(categ);
        this.getWishlistData(categ);
        this.GetProjectCat(i, categ);
        this.makeActive(i);
        this.shareErrMsg = '';
        this.shareErr = false;
        this.sharedEmailObjId = [];
        this.sharedEmailObj = [];
    };
    ProjectComponent.prototype.productPage = function (val) {
        var token = localStorage.getItem('GBCItoken');
        var service = this.globalService.getData();
        // console.log(service,val);
        //  service.productSearch=val;
        this.globalService.setData({
            'productSearch': val
        });
        //this.globalService.setData(service);
        //console.log(this.glob alService.getData());
        if (token == '' || token == null) {
            this.redirect('page-login', {});
        }
        else {
            this.redirect('page-product', {});
        }
        //#page-product
    };
    ProjectComponent.prototype.productPageSlider = function (productId) {
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
    ProjectComponent.prototype.InitialProjectSelect = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.wishlistCategory != null && _this.wishlistCategory != '') {
                // console.log('parent.wishlistCategory',parent.wishlistCategory,parent.wishlistCategory[0]);
                var i = 0;
                if ((_this.urlParams.category) && (_this.urlParams.category != "_")) {
                    // this.categSelection(this.urlParams.category);
                    i = (_this.wishlistCategory).indexOf(_this.urlParams.category);
                }
                _this.GetProjectCat(i, _this.wishlistCategory[i]);
                _this.makeActive(i);
                _this.shareErrMsg = '';
                _this.shareErr = false;
                _this.sharedEmailObjId = [];
                _this.sharedEmailObj = [];
                _this.getWishlistData(_this.wishlistCategory[i]);
            }
        }, 1300);
    };
    ProjectComponent.prototype.GetProjectCat = function (idx, ProJcat) {
        var parent = this;
        parent.SelectedProjCategory = ProJcat;
        parent.SharedUserList(parent.SelectedProjCategory);
    };
    ProjectComponent.prototype.SharingProjects = function () {
        var _this = this;
        if (this.sharedEmailObjId.length > 0) {
            this.apiService.projectsShareProjects({
                'data': {
                    'key': this.apiKey,
                    'filter': {
                        'sharingData': this.sharedEmailObjId,
                        'sharingCategory': this.SelectedProjCategory
                    }
                }
            }).then(function (res) {
                if (res.status == 'success') {
                    swal({
                        title: 'Added',
                        text: "Member has been added.",
                        type: 'success',
                        showConfirmButton: false,
                    });
                    setTimeout(function () {
                        swal.close();
                        _this.SharedUserList(_this.SelectedProjCategory);
                        // parent.SelectedProjCategory="";
                        _this.sharedEmailObjId = [];
                        _this.sharedEmailObj = [];
                        _this.wishListWindow = false;
                        _this.wishListmanage = false;
                        _this.wishListshare = false;
                        _this.ViewMLflag = false;
                    }, 1500);
                }
                else {
                    _this.shareErr = true;
                    _this.shareErrMsg = "Error on adding member";
                }
            }).catch(function (error) {
                console.log('Error !', error);
            });
        }
        else {
            this.shareErr = true;
            this.shareErrMsg = "No member for add";
        }
    };
    ProjectComponent.prototype.addComment = function (comment) {
        var parent = this;
        parent.CurrentDateTime = "";
        parent.CurrentDateTime = Date();
        var tagenter = document.getElementById("tagenter");
        tagenter.value = "";
        if (comment != '') {
            parent.Comments.push({ 'com': comment, 'date': parent.CurrentDateTime });
            // this.globalService.setData({
            //   'ProjectComments:parent.Comments
            // });
            // console.log('parent.Comments',parent.Comments);
            //   var wtf    = $('.commentBox');
            // var height = (wtf[0].scrollHeight)+200;
            // wtf.scrollTop(height);
            var $t = $('.commentBox');
            $t.animate({ "scrollTop": $('.commentBox')[0].scrollHeight - 40 }, "slow");
            // $('.commentBox').scrollTop(1E10);
        }
    };
    ProjectComponent.prototype.clearComments = function () {
        this.Comments = [];
    };
    ProjectComponent.prototype.SharedUserList = function (categories) {
        var _this = this;
        this.apiService.projectsShareUsers({
            data: {
                key: this.apiKey,
                filter: {
                    category: categories
                }
            }
        }).then(function (res) {
            if (res.sharedusers != null) {
                _this.sharedUsersList = res.sharedusers;
                _this.UserListlen = Object.keys(_this.sharedUsersList).length;
            }
        }).catch(function (error) {
            console.log('Error !', error);
        });
    };
    ProjectComponent.prototype.ViewMemberList = function (categories1) {
        var _this = this;
        this.ViewMLflag = true;
        this.apiService.projectsShareUsers({
            data: {
                key: this.apiKey,
                filter: {
                    category: categories1
                }
            }
        }).then(function (res) {
            if (res.sharedusers != null) {
                _this.ProjectMemeberList = res.sharedusers;
            }
        }).catch(function (error) {
            console.log('Error !', error);
        });
    };
    ProjectComponent.prototype.removeMember = function (mid, category, product) {
        var _this = this;
        this.apiService.projectsRemoveUsers({
            data: {
                key: this.apiKey,
                form: {
                    userId: mid,
                    productId: product,
                    category: category
                }
            }
        }).then(function (res) {
            _this.ViewMemberList(category);
            _this.SharedUserList(category);
        }).catch(function (err) {
            console.log('Error !', err);
        });
    };
    ProjectComponent = __decorate([
        core_1.Component({
            //selector: 'my-app',
            styleUrls: ["./app/pages/projects/project-info.css"],
            templateUrl: './app/pages/projects/project-info.template.html',
        }),
        __metadata("design:paramtypes", [router_1.Router,
            global_service_1.globalService,
            router_1.ActivatedRoute,
            ApiService_1.ApiService])
    ], ProjectComponent);
    return ProjectComponent;
}(app_component_1.AppComponent));
exports.ProjectComponent = ProjectComponent;
