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
var common_1 = require("@angular/common");
var app_component_1 = require("./../../app.component");
var global_service_1 = require("./../../services/global.service");
var ApiService_1 = require("./../../services/ApiService");
var SingleProductComponent = (function (_super) {
    __extends(SingleProductComponent, _super);
    function SingleProductComponent(router, globalService, apiService, _location) {
        var _this = _super.call(this, router, globalService, apiService) || this;
        _this.router = router;
        _this.globalService = globalService;
        _this.apiService = apiService;
        _this._location = _location;
        _this.pageContent = '';
        _this.product = {};
        _this.getApiUrl = _this.ApiURL;
        _this.apiKey = localStorage.getItem('GBCItoken');
        _this.accountType = localStorage.getItem('GBCIaccountType');
        _this.Comments = [];
        _this.hideMenu1 = false;
        _this.hideMenu2 = false;
        _this.userhintContainer = false;
        _this.UserListErr = false;
        _this.messageUnread = true;
        _this.UserListErrMsg = "";
        _this.userhintEmail = [];
        _this.usersearchObject = "";
        _this.selectedMessageUser = "";
        _this.selectedMessageUserID = "";
        _this.productInProjects = {};
        _this.merchantInfo = [];
        _this.commentUsers = {};
        _this.showMessanger = false;
        _this.messagesInd = {};
        _this.messageFlag = "";
        _this.messageFlagInput = {};
        _this.addedParameters = [];
        _this.credits = {
            "Solar Reflectance - 3 year aged": "Heat Island Reduction",
            "Solar Reflective Index - Initial (low-slope roof)": "Heat Island Reduction",
            "Kitchen Faucet flow rate - lpm/gpm at 60 Psi/415 kPa": "Indoor Water Use Reduction (P) & Indoor Water Use Reduction",
            "WC flush rate - lpf/gpf": "Indoor Water Use Reduction (P) & Indoor Water Use Reduction",
            "SHGC": "Minimum Energy Performance (P) & Optimize Energy Performance",
            "SU-value (W/sqm/K or Btu/h·sqft·°F)HGC": "Minimum Energy Performance (P) & Optimize Energy Performance",
            "Visible Light Transmittance": "Minimum Energy Performance (P) & Optimize Energy Performance",
            "Environmental Product Declaration": "BPDO: Environmental Product Declarations",
            "FSC certified wood": "BPDO: Sourcing of Raw Materials",
            "Recycled Content": "BPDO: Sourcing of Raw Materials",
            'Bio-based material as per SAN"s': "BPDO: Sourcing of Raw Materials",
            "Health Product Declaration": "BPDO: Material Ingredients",
            "Cradle to Cradle Certification": "BPDO: Material Ingredients",
            "REACH compliant": "BPDO: Material Ingredients",
            "ANSI/BIFMA e3 Furniture Sustainability Standard": "BPDO: Material Ingredients",
            "Declare": "BPDO: Material Ingredients",
            "Lead Content": "PBT Source Reduction: Lead, cadmium and Copper",
            "Cadmium Content": "PBT Source Reduction: Lead, cadmium and Copper",
            "VOC content": "Low-Emitting Materials",
            "VOC emissions": "Low-Emitting Materials",
            "Surface Reflectance": "Acoustic Performance",
            "Noise Reduction Coefficient": "Acoustic Performance"
        };
        _this.creditsPossible = [];
        _this.leadsPossible = [];
        _this.leadbdc = [
            "Heat Island Reduction",
            "Minimum Energy Performance (P) & Optimize Energy Performance",
            "Indoor Water Use Reduction (P) & Indoor Water Use Reduction",
            "BPDO: Environmental Product Declarations",
            "BPDO: Sourcing of Raw Materials",
            "BPDO: Material Ingredients",
            "PBT Source Reduction: Lead, cadmium and Copper",
            "Low-Emitting Materials",
            "Acoustic Performance",
            "Daylight"
        ];
        _this.leadidc = [
            "Minimum Energy Performance (P) & Optimize Energy Performance",
            "Indoor Water Use Reduction (P) & Indoor Water Use Reduction",
            "BPDO: Environmental Product Declarations",
            "BPDO: Sourcing of Raw Materials",
            "BPDO: Material Ingredients",
            "Low-Emitting Materials",
            "Acoustic Performance",
            "Daylight"
        ];
        _this.leadbdcPossibles = [];
        _this.leadidcPossibles = [];
        _this.productParameters = [];
        _this.param = [];
        _this.selectedMessageUserFN = "";
        _this.apiService.base = _this.ApiURL;
        return _this;
    }
    SingleProductComponent.prototype.ngOnInit = function () {
        this.service = this.globalService.getData();
        this.currentUserInfo = this.globalService.getData().userInfo;
        $('.content').hide();
        this.scrollToRatings();
        var service = this.globalService.getData();
        this.keepProductId();
        this.getProduct();
        //  this.getMerchantInfo();
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.scrollToTop').fadeIn();
            }
            else {
                $('.scrollToTop').fadeOut();
            }
        });
        if (this.accountType == "user" || this.accountType == "gbcistaff") {
            this.getWishlistCategory();
            this.getWishlistData('');
        }
        this.getComentUsers();
        this.productInWishlist();
    };
    SingleProductComponent.prototype.goback = function () {
        this._location.back();
    };
    SingleProductComponent.prototype.fetchMessanger = function (member) {
        var _this = this;
        this.showMessanger = true;
        this.apiService.ComParticularMemberMessage({
            data: {
                key: this.apiKey,
                filter: {
                    ownerId: this.currentUserInfo.merchantId,
                    memberId: member,
                    productId: this.globalService.getData().productId
                }
            }
        }).then(function (response) {
            _this.messagesInd = response.messages;
        }).catch(function (error) {
            console.log('Error while logging in', error);
        });
    };
    SingleProductComponent.prototype.keepProductId = function () {
        var localId = localStorage.getItem('activeProductId');
        if (localId != "" && localId != null && localId != undefined) {
            this.service.productId = localId;
        }
        if (this.service.productId) {
            localStorage.setItem('activeProductId', this.service.productId);
            this.getProduct();
        }
        else {
            this.redirect('page-listing', {});
        }
        //console.log(service.productSearch );
    };
    SingleProductComponent.prototype.getProduct = function () {
        var paramFull;
        var Segmentlist;
        var parent = this;
        var productId = localStorage.getItem('activeProductId');
        $.post(this.ApiURL + 'products/public_product_view', {
            'data': {
                'filter': {
                    'productId': productId
                }
            }
        }, function (res) {
            parent.product = res.products[0];
            if (res.merchantInfo != '' && res.merchantInfo != null) {
                parent.merchantInfo = res.merchantInfo;
            }
            // console.log(' parent.product', parent.product);
            if (parent.product != '' && parent.product != null) {
                parent.addedParameters = parent.product.v2parameters;
                parent.paramFull = parent.product.v2parameters;
                for (var key in parent.paramFull) {
                    // console.log( key + ": " + parent.paramFull[key]);
                    parent.Segmentlist = parent.paramFull[key];
                    for (var key1 in parent.Segmentlist) {
                        parent.param.push(key1);
                        // console.log( key1 + ": " + parent.Segmentlist[key1]);
                    }
                }
            }
            for (var _i = 0, _a = parent.param; _i < _a.length; _i++) {
                var item = _a[_i];
                var paramName = parent.credits[item];
                // console.log( parent.credits );
                if (((parent.creditsPossible).indexOf(paramName) > -1) == false) {
                    parent.creditsPossible.push(paramName);
                }
            }
            // console.log( parent.creditsPossible );
            for (var _b = 0, _c = parent.creditsPossible; _b < _c.length; _b++) {
                var item = _c[_b];
                //checking in leadv4bdc
                if (parent.leadbdc.indexOf(item) > -1) {
                    if ((parent.leadbdcPossibles.indexOf(item) > -1) == false) {
                        parent.leadbdcPossibles.push(item);
                    }
                    if ((parent.leadsPossible.indexOf('LEED V4 BD+C CREDITS/PREREQUISITES') > -1) == false) {
                        parent.leadsPossible.push('LEED V4 BD+C CREDITS/PREREQUISITES');
                    }
                }
                //checking in leadv4idc
                if (parent.leadidc.indexOf(item) > -1) {
                    if ((parent.leadidcPossibles.indexOf(item) > -1) == false) {
                        parent.leadidcPossibles.push(item);
                    }
                    if ((parent.leadsPossible.indexOf('LEED V4 ID+C CREDITS/PREREQUISITES') > -1) == false) {
                        parent.leadsPossible.push('LEED V4 ID+C CREDITS/PREREQUISITES');
                    }
                }
            } //console.log(parent.leadbdcPossibles);
            //console.log('lead',  parent.leadsPossible);
        });
    };
    SingleProductComponent.prototype.getMerchantInfo = function () {
        var _this = this;
        this.apiService.accountInfoView({
            data: {
                key: this.apiKey
            }
        }).then(function (res) {
            // console.log('res',res);
            _this.merchantInfo = res.userInfo[0];
            console.log('res', _this.merchantInfo);
        }).catch(function (err) {
            console.log("Unable to get profile information !", err);
        });
    };
    SingleProductComponent.prototype.getUserListInfo = function (val, indx) {
        var _this = this;
        var parent = this;
        this.userhintContainer = true;
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
                _this.userhintContainer = true;
                _this.userhintEmail = res.users;
            }
        }).catch(function (error) {
            console.log('Error !', error);
        });
    };
    SingleProductComponent.prototype.UserhintPull = function (val) {
        // console.log('val',val);
        this.usersearchObject = val.email;
        this.selectedMessageUser = val.email;
        this.selectedMessageUserID = val.userId;
        this.selectedMessageUserFN = val.firstName;
        this.hideMenu1 = false;
        // console.log('selectedMessageUser',parent.selectedMessageUser);
        // parent.usersearchObject=val;
    };
    SingleProductComponent.prototype.closeUserListContainer = function () {
        var parent = this;
        setTimeout(function () {
            parent.userhintContainer = false;
        }, 800);
    };
    SingleProductComponent.prototype.scroll2Top = function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
    };
    SingleProductComponent.prototype.openChat = function () {
        this.messageUnread = false;
        $('#qnimate').addClass('popup-box-on');
    };
    SingleProductComponent.prototype.closeChat = function () {
        $('#qnimate').removeClass('popup-box-on');
    };
    SingleProductComponent.prototype.productInWishlist = function () {
        var _this = this;
        this.apiService.productInWishlist({
            data: {
                key: this.apiKey,
                form: {
                    productId: this.globalService.getData().productId
                }
            }
        }).then(function (response) {
            if (response) {
                if (response.status == "success") {
                    _this.productInProjects = response.records;
                }
            }
        }).catch(function (error) {
            console.log('Error while logging in', error);
        });
    };
    SingleProductComponent.prototype.addComment = function (comment) {
        var parent = this;
        if (parent.selectedMessageUser != '') {
            parent.UserListErr = false;
            parent.UserListErrMsg = "";
            parent.CurrentDateTime = "";
            var d = new Date();
            parent.CurrentDateTime = Date();
            var tagenter = document.getElementById("messgenter");
            tagenter.value = "";
            if (comment != '') {
                parent.Comments.push({ 'msg': comment, 'date': parent.CurrentDateTime, 'fromUser': parent.currentUserInfo.merchantId, 'ProductId': parent.service.productId, 'ToUser': parent.selectedMessageUserID });
                // var $t = $('.popup-messages');
                // $t.animate({"scrollTop": $('.popup-messages')[0].scrollHeight-40}, "slow");
                //  console.log('parent.Comments',parent.Comments);
            }
        }
        else {
            parent.UserListErr = true;
            parent.UserListErrMsg = "Please,enter the user email to message !";
            setTimeout(function () {
                parent.UserListErr = false;
                parent.UserListErrMsg = "";
            }, 4000);
        }
    };
    SingleProductComponent.prototype.clearComments = function () {
        this.Comments = [];
    };
    SingleProductComponent.prototype.SendPress = function () {
        var _this = this;
        var tagenter1 = document.getElementById("messgenter");
        var toID = this.selectedMessageUserID;
        var fromID = this.currentUserInfo.merchantId;
        var message = tagenter1.value;
        var toManufacturer = this.messageFlagInput['manufacturer'];
        var toSiteAdmin = this.messageFlagInput['siteadmin'];
        if ((toID != '' || toManufacturer == true || toSiteAdmin == true) && message != '') {
            this.apiService.ComproductPageAdd({
                data: {
                    key: this.apiKey,
                    form: {
                        from: fromID,
                        to: toID,
                        message: message,
                        productId: this.globalService.getData().productId,
                        toManufacturer: toManufacturer,
                        toSiteAdmin: toSiteAdmin
                    }
                }
            }).then(function (response) {
                if (response) {
                    if (response.status == "success") {
                        //  this.getComentUsers();
                        tagenter1.value = "";
                        _this.selectedMessageUserID = "";
                        swal({
                            title: 'Message',
                            text: "Your message has been submitted.",
                            type: 'success'
                        });
                        setTimeout(function () { swal.close(); }, 1000);
                    }
                }
            }).catch(function (error) {
                console.log('Error while logging in', error);
            });
            //this.addComment(tagenter1.value);
        }
        else {
            this.UserListErr = true;
            this.UserListErrMsg = "Required fields should not be empty! ";
            setTimeout(function () {
                _this.UserListErr = false;
                _this.UserListErrMsg = "";
            }, 4000);
        }
    };
    SingleProductComponent.prototype.getComentUsers = function () {
        var _this = this;
        this.apiService.ComproductPageView({
            data: {
                key: this.apiKey,
                filter: {
                    productId: this.globalService.getData().productId
                }
            }
        }).then(function (response) {
            _this.commentUsers = response.members;
        }).catch(function (error) {
            console.log('Error while logging in', error);
        });
    };
    SingleProductComponent.prototype.CommentCollapse = function (e) {
        //  $("#w3s").attr("href", "https://www.w3schools.com/jquery");
        //console.log('e',e.srcElement.id);
        //  $("#"+e.srcElement.id).attr("data-target", "#"+e.srcElement.id);
        //
        // $('.content').removeClass('active').next().slideUp(); //Remove all "active" state and slide up the immediate next container
        //     $(this).toggleClass('active').next().slideDown();
        //     return false;
    };
    SingleProductComponent.prototype.toArrayCategory = function (obj) {
        var ary = Object.keys(obj).map(function (key) { return key; });
        return ary.sort();
    };
    SingleProductComponent.prototype.toArrayValue = function (obj) {
        return Object.keys(obj).map(function (key) { return obj[key]; });
    };
    SingleProductComponent.prototype.toArrayKeyValue = function (obj) {
        return Object.keys(obj).map(function (key) { return { key: key, value: obj[key] }; });
    };
    SingleProductComponent = __decorate([
        core_1.Component({
            //  selector: ' ',
            styleUrls: ["./app/pages/products/single.css"],
            //  template: `  `,
            templateUrl: './app/pages/products/single.template.html'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            global_service_1.globalService,
            ApiService_1.ApiService,
            common_1.Location])
    ], SingleProductComponent);
    return SingleProductComponent;
}(app_component_1.AppComponent));
exports.SingleProductComponent = SingleProductComponent;
