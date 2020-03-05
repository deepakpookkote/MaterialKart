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
var router_1 = require("@angular/router");
var global_service_1 = require("./services/global.service");
var ApiService_1 = require("./services/ApiService");
var AppComponent = (function () {
    //Global Variables
    function AppComponent(router, globalService, apiService) {
        this.router = router;
        this.globalService = globalService;
        this.apiService = apiService;
        this.name = 'GBCI';
        //public ApiURL:any='http://localhost/Group10/GBCI/Gitlab/API/v1/app/index.php?path=';
        //Final cloud Api link
        this.ApiURL = 'https://product.gbci.org/green-building/dev-1/api/app/index.php?path=';
        // public ApiURL:any='http://172.16.0.224/API_GreenBuilding/api/app/index.php?path=';
        //public ApiURL = 'http://localhost/Group10/GBCI/Gitlab/API/v1/app/index.php?path=';
        //public ApiURL:any='httpS://product.gbci.org/green-building/dev-1/api/app/';
        //public ApiURL:any='https://product.gbci.org/green-building/dev-1/api/app/';
        //public ApiURL:any='https://gbci-devdesk.g10.pw/';
        // public ApiURL:any='http://172.16.0.224/API_GreenBuilding/api/app/';
        // public ApiURL:any='http://localhost/API_GreenBuilding/api/app/';
        //
        this.wishListWindow = false;
        this.wishListmanage = false;
        this.wishlistSuccessMsg = "";
        this.wishListCategObj = "";
        this.wishlistCategory = [];
        this.wishlistData = [];
        this.availableWishlists = [];
        this.wishlistCategoryMap = [];
        this.productCompareData = [];
        this.wishListshare = false;
        this.ViewMLflag = false;
        this.sharedEmailObjId = [];
        this.sharedEmailObj = [];
        this.sharehintEmail = [];
        this.sharehintContainer = false;
        this.cmpErrshow = false;
        //  public sharedEmailObj:any=[];
        //  public sharedEmailObjId:any=[];
        this.shareErr = false;
        this.WLRenameFlag = false;
        this.shareErrMsg = "";
        this.SelectedProjCategory = "";
        this.apiKey = localStorage.getItem('GBCItoken');
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent.prototype.stringLimit = function (str, limit) {
        //  return str.substring(0,10)
        return str.substring(0, limit);
    };
    AppComponent.prototype.redirect = function (page, parameters) {
        //  this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        this.router.navigate(["" + page + ""], { queryParams: parameters });
    };
    AppComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    AppComponent.prototype.validateSpecialCharacter = function (str) {
        var re = /^[a-zA-Z0-9]*$/;
        return re.test(str);
    };
    AppComponent.prototype.validateNumber = function (str) {
        var re = /^[0-9]*$/;
        return re.test(str);
    };
    AppComponent.prototype.scrollToRatings = function () {
        $('html, body').animate({
            scrollTop: $("body").offset().top
        }, 200);
        /*
        if(this.router.url=="/page-landing#ratingspos"){
          $('html, body').animate({
              scrollTop: $("#ratings-info").offset().top
          }, 2000);
      
        }else{
          $('html, body').animate({
              scrollTop: $("body").offset().top
          }, 200);
        }
        */
    };
    AppComponent.prototype.merge_objects = function (obj1, obj2) {
        var obj3 = {};
        for (var attrname in obj1) {
            obj3[attrname] = obj1[attrname];
        }
        for (var attrname in obj2) {
            obj3[attrname] = obj2[attrname];
        }
        return obj3;
    };
    /* Wishlist Functionalities */
    AppComponent.prototype.renameWishlist = function (NewCategoryTextId, oldCategory) {
        var categoryText = document.getElementById("wishlistCategRename" + NewCategoryTextId);
        var parent = this;
        parent.WLRenameFlag = false;
        $.post(this.ApiURL + 'wishlist/updatewishlist', {
            'data': {
                'key': parent.apiKey,
                'form': {
                    'oldCategory': oldCategory,
                    'newCategory': categoryText.value
                }
                // 'filter':{
                //    'accountType':parent.accountType
                //           }
            }
        }, function (res) {
            if (res.status == 'success') {
                parent.getWishlistCategory();
                parent.WLRenameFlag = true;
                setTimeout(function () { parent.WLRenameFlag = false; }, 3000);
            }
            //  console.log('Wishlist Category',res);
        });
    };
    AppComponent.prototype.removeWishlist = function (NewCategoryTextId, oldCategory) {
        var parent = this;
        // var r = confirm("Delete all products from "+oldCategory+".");
        swal({
            title: 'Are you sure?',
            text: "Delete all products from " + oldCategory + ".",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete it!',
            cancelButtonText: 'No, keep it'
        }).then(function () {
            $.post(parent.ApiURL + 'wishlist/deletewishlist', {
                'data': {
                    'key': parent.apiKey,
                    'form': {
                        'oldCategory': oldCategory,
                    }
                }
            }, function (res) {
                swal('Removed!', 'All product has been deleted.', 'success');
                setTimeout(function () { swal.close(); }, 1000);
                parent.getWishlistCategory();
                parent.getWishlistData();
                //  console.log('Wishlist Category',res);
            });
        }, function (dismiss) {
            if (dismiss === 'cancel') {
                swal('Cancelled', 'Your product is safe :)', 'error');
                setTimeout(function () { swal.close(); }, 1000);
            }
        });
    };
    AppComponent.prototype.removeParticularWishlist = function (productId) {
        var parent = this;
        var categoryName = this.wishlistCategoryMap[productId];
        // var r = confirm("This product will be removed from "+categoryName+" project.");
        swal({
            title: 'Are you sure?',
            text: "This product will be removed from " + categoryName + " project.",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Remove it!',
            cancelButtonText: 'No, keep it'
        }).then(function () {
            $.post(parent.ApiURL + 'wishlist/deletewishlist', {
                'data': {
                    'key': parent.apiKey,
                    'form': {
                        'productId': productId,
                    }
                }
            }, function (res) {
                swal('Removed!', 'Your product has been removed.', 'success');
                setTimeout(function () { swal.close(); }, 1000);
                parent.getWishlistCategory();
                //  console.log('Wishlist Category',res);
            });
        }, function (dismiss) {
            if (dismiss === 'cancel') {
                swal('Cancelled', 'Your product is safe :)', 'error');
                setTimeout(function () { swal.close(); }, 1000);
            }
        });
    };
    AppComponent.prototype.getWishlistCategory = function () {
        var parent = this;
        $.post(this.ApiURL + 'wishlist/viewwishlistcategory', {
            'data': {
                'key': parent.apiKey,
                'filter': {
                    'category': parent.categoryFilter
                }
            }
        }, function (res) {
            if (res != null) {
                parent.wishlistCategory = res.categories;
                // parent.getWishlistData();
            }
            //  console.log('Wishlist Category',res);
        });
    };
    AppComponent.prototype.getFilterCategory = function (categoryFilter) {
        var parent = this;
        $.post(this.ApiURL + 'wishlist/viewwishlistcategory', {
            'data': {
                'key': parent.apiKey,
                'filter': {
                    'category': categoryFilter
                    //  'accountType':parent.accountType
                }
            }
        }, function (res) {
            if (res != null) {
                parent.wishlistCategory = res.categories;
                // parent.getWishlistData();
            }
            //  console.log('Wishlist Category',res);
        });
    };
    AppComponent.prototype.getWishlistData = function (category) {
        var parent = this;
        $.post(this.ApiURL + 'wishlist/viewwishlists', {
            'data': {
                'key': parent.apiKey,
                'filter': {
                    'category': category
                    //  'accountType':parent.accountType
                }
            }
        }, function (res) {
            parent.wishlistData = res.products;
            parent.availableWishlists = res.availableWishlists;
            parent.wishlistCategoryMap = res.wishlistCategoryMap;
            //console.log('Wishlist Category', parent.wishlistData);
        });
    };
    AppComponent.prototype.findInWishlist = function (productId) {
        if (this.availableWishlists != '' && this.availableWishlists != undefined) {
            if (this.availableWishlists.indexOf(productId) > -1) {
                return true;
            }
        }
    };
    AppComponent.prototype.wishListPopup = function (product, type) {
        var parent = this;
        if (type == true) {
            parent.wishItem = product;
            setTimeout(function () { parent.wishListWindow = true; }, 400);
        }
    };
    AppComponent.prototype.modelClose = function ($event) {
        //console.log($event.target.parentNode.id);
        //console.log($event.target.className);
        if ($event.target.className == "modal-window zoomInUp animated") {
            this.wishListWindow = false;
            this.wishListmanage = false;
            this.wishListshare = false;
            this.ViewMLflag = false;
            this.sharedEmailObjId = [];
            this.sharedEmailObj = [];
        }
    };
    AppComponent.prototype.pushWishlist = function (productId, category) {
        var parent = this;
        var tagList;
        if (productId != '' && category != '' && category != undefined) {
            parent.tagList = this.globalService.getData().ProjectTags;
            this.wishListCategObj = '';
            this.wishlistSuccessMsg = '<div class="alert alert-info" role="alert"><i class="fa fa-thumbs-up" aria-hidden="true"></i> Successfully Added </div>';
            $.post(this.ApiURL + 'wishlist/addwishlist', {
                'data': {
                    'key': parent.apiKey,
                    'form': {
                        'productId': productId,
                        'category': category,
                        'tags': parent.tagList
                    }
                    //  'filter':{
                    //    'accountType':parent.accountType
                    //  }
                }
            }, function (res) {
                parent.getWishlistCategory();
                parent.getWishlistData();
                //  console.log('Product Public List Response',res);
            });
            setTimeout(function () { parent.wishListWindow = false; parent.wishlistSuccessMsg = ""; }, 5000);
        }
    };
    /* Wishlist Functionalities */
    AppComponent.prototype.addCompareProduct = function (prodID, ProdCat) {
        var parent = this;
        this.productCompareData = [];
        this.productCompareData = this.globalService.getData().ComparProductId;
        if (this.productCompareData == undefined) {
            this.productCompareData = [];
        }
        if (this.productCompareData.length >= 0 && this.productCompareData.length < 2) {
            //  console.log('this.productCompareData.length',this.productCompareData.length);
            if (this.productCompareData.length == 0) {
                this.globalService.setData({
                    'ComparProductCat': ProdCat
                });
                this.productCompareCategory = this.globalService.getData().ComparProductCat;
                //  console.log('this.productCompareCategory',this.productCompareCategory);
            }
            if (this.productCompareCategory == '' || this.productCompareCategory == ProdCat) {
                this.productCompareData.push(prodID);
                this.globalService.setData({
                    'ComparProductId': this.productCompareData
                });
            }
            else {
                swal({
                    title: 'Message !',
                    text: "You can select only " + this.productCompareCategory + " for comparison",
                    type: 'warning',
                    showConfirmButton: false,
                }).then(function () { });
                setTimeout(function () { swal.close(); }, 2000);
            }
        }
        else {
            // alert("Maximum (3) product was selected for comparison");
            swal({
                title: 'Message',
                text: "Maximum (2) product was selected for comparison",
                type: 'warning',
                showConfirmButton: false,
            }).then(function () { });
            setTimeout(function () { swal.close(); }, 2000);
        }
    };
    AppComponent.prototype.removeCompareProduct = function (RmprodID) {
        this.productCompareData = this.globalService.getData().ComparProductId;
        var Pindex = this.productCompareData.indexOf(RmprodID);
        if (Pindex > -1) {
            this.productCompareData.splice(Pindex, 1);
        }
        // console.log('this.productCompareData.length',this.productCompareData.length);
        if (this.productCompareData.length == 0) {
            this.globalService.setData({
                'ComparProductCat': ''
            });
            this.productCompareCategory = this.globalService.getData().ComparProductCat;
            // console.log('this.productCompareCategory',this.productCompareCategory);
        }
    };
    AppComponent.prototype.ClearCompareData = function () {
        this.productCompareData = [];
        this.globalService.setData({
            'ComparProductId': this.productCompareData
        });
        this.globalService.setData({
            'ComparProductCat': ''
        });
        // console.log("clear data");
    };
    AppComponent.prototype.GotoComparePage = function () {
        var parent = this;
        // console.log('this.productCompareData',parent.productCompareData);
        if (parent.productCompareData.length >= 2) {
            parent.cmpErrshow = false;
            parent.redirect('compare-product', {});
        }
        else {
            parent.cmpErrshow = true;
            setTimeout(function () { parent.cmpErrshow = false; }, 2000);
        }
    };
    AppComponent.prototype.findInCompare = function (productId) {
        this.productCompareData = this.globalService.getData().ComparProductId;
        if (this.productCompareData != undefined) {
            if (this.productCompareData.indexOf(productId) > -1) {
                return true;
            }
        }
    };
    AppComponent.prototype.ProductShareFilter = function (val, indx) {
        var _this = this;
        this.sharehintEmail = [];
        this.shareErr = false;
        this.apiService.usersPublic_users_list({
            'data': {
                'key': this.apiKey,
                'filter': {
                    'email': val
                },
                'extra': {
                    'required': ['firstName', 'email', 'lastName']
                }
            }
        }).then(function (res) {
            if (res.users != null) {
                _this.sharehintContainer = true;
                _this.sharehintEmail = res.users;
            }
        }).catch(function (error) {
            console.log('Error !', error);
        });
        //  }else{
        //          this.sharehintContainer=false;
        //    }
    };
    AppComponent.prototype.sharehintPull = function (val, UsrId) {
        var parent = this;
        parent.sharesearchObject = "";
        //  let tagenter:any=document.getElementById("emlSearch");
        //  tagenter.value="";
        var foundPresent = $.inArray(val, parent.sharedEmailObj) > -1;
        // console.log('foundPresent',foundPresent);
        if (foundPresent == false) {
            parent.shareErr = false;
            if (parent.sharedEmailObj.length < 5 && val != '') {
                parent.sharedEmailObj.push(val);
                //  parent.sharedEmailObjId.push({uid:UsrId,cat:parent.SelectedProjCategory});
                parent.sharedEmailObjId.push(UsrId);
                //  console.log('parent.sharedEmailObjId',parent.sharedEmailObjId);
            }
            else {
                parent.shareErr = true;
                parent.shareErrMsg = " Maximum member added to this project !";
            }
        }
        else {
            parent.shareErr = true;
            parent.shareErrMsg = " Member already added to this project !";
        }
    };
    AppComponent.prototype.removeEmail = function (indx) {
        var parent = this;
        parent.sharedEmailObj.splice(indx, 1);
        parent.sharedEmailObjId.splice(indx, 1);
        //  console.log('parent.sharedEmailObjId',parent.sharedEmailObjId);
        // console.log('parent.tags',parent.tags);
    };
    AppComponent.prototype.closeShareContainer = function () {
        var parent = this;
        setTimeout(function () {
            parent.sharehintContainer = false;
        }, 800);
    };
    AppComponent.prototype.GetProjectCat = function (idx, ProJcat) {
        var parent = this;
        parent.SelectedProjCategory = ProJcat;
    };
    AppComponent.prototype.SharingProjects = function () {
        var parent = this;
        if (parent.sharedEmailObjId.length > 0) {
            $.post(this.ApiURL + 'projects/shareProjects', {
                'data': {
                    'key': parent.apiKey,
                    'filter': {
                        'sharingData': parent.sharedEmailObjId,
                        'sharingCategory': parent.SelectedProjCategory
                    }
                }
            }, function (res) {
                console.log('res', res);
                if (res.status == 'success') {
                    swal({
                        title: 'Added',
                        text: "Member has been added.",
                        type: 'success',
                        showConfirmButton: false,
                    });
                    setTimeout(function () {
                        swal.close();
                        parent.SelectedProjCategory = "";
                        parent.sharedEmailObjId = [];
                        parent.sharedEmailObj = [];
                        parent.wishListWindow = false;
                        parent.wishListmanage = false;
                        parent.wishListshare = false;
                    }, 1500);
                }
                else {
                    parent.shareErr = true;
                    parent.shareErrMsg = "Error on adding member";
                }
            });
        }
        else {
            parent.shareErr = true;
            parent.shareErrMsg = "No member for add";
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n  <router-outlet></router-outlet>",
        }),
        __metadata("design:paramtypes", [router_1.Router,
            global_service_1.globalService,
            ApiService_1.ApiService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
