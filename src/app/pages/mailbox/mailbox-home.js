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
var MailboxPageComponent = (function (_super) {
    __extends(MailboxPageComponent, _super);
    // @HostListener('click', ['$event'])
    // onClick(e:any) {
    // //  console.log(e.target.id);
    //   if(e.target.id=="msgboxInbox"){
    //     this.getInbox('inbox');
    //   }else if(e.target.id=="msgboxSent"){
    //     this.getInbox('sent');
    //   }
    // }
    function MailboxPageComponent(router, globalService, apiService, route) {
        var _this = _super.call(this, router, globalService, apiService) || this;
        _this.router = router;
        _this.globalService = globalService;
        _this.apiService = apiService;
        _this.route = route;
        _this.inboxLists = [];
        _this.messageDetail = '';
        _this.messageType = "";
        _this.InboxCnt = "";
        _this.SentCnt = "";
        _this.showErr = false;
        _this.showsuccssMsg = false;
        _this.showErrMsg = "";
        _this.deleteMsgArr = [];
        _this.userhintContainer = false;
        _this.UserListErr = false;
        _this.messageUnread = true;
        _this.UserListErrMsg = "";
        _this.userhintEmail = [];
        _this.selectedMessageUser = "";
        _this.usersearchObject = "";
        _this.emailLists = [];
        _this.writeMsgProjectFilterModel = '';
        _this.writeMsgWishlistCategories = '';
        _this.writeMsgProjHintContainer = true;
        _this.pageContent = '';
        _this.mouseOverDelete = [];
        _this.apiService.base = _this.ApiURL;
        return _this;
    }
    MailboxPageComponent.prototype.ngOnInit = function () {
        this.updateMemberInfo();
        // this.getInbox('sent');
        this.getInbox('inbox');
        // this.route
        //        .params
        //        .subscribe(params => { console.log(Math.random(),params);
        //            // Récupération des valeurs de l'URL
        //            this.msgBoxType = params['type']; // --> Name must match wanted paramter
        //    });
    };
    MailboxPageComponent.prototype.getInboxSendData = function (TypeCheck) {
        if (TypeCheck == "inbox") {
            this.getInbox('inbox');
        }
        else if (TypeCheck == "sent") {
            this.getInbox('sent');
        }
        $('#ckall').prop('checked', false);
        this.deleteMsgArr = [];
    };
    MailboxPageComponent.prototype.updateMemberInfo = function () {
        var parent = this;
        setTimeout(function () {
            parent.userInfo = (parent.globalService.getData()).userInfo;
            //  console.log('parent.userInfo',parent.userInfo);
        }, 500);
    };
    MailboxPageComponent.prototype.getInbox = function (type) {
        var _this = this;
        this.messageDetail = '';
        this.messageType = type;
        this.apiService.ComMailboxInbox({
            data: {
                key: this.apiKey,
                filter: {
                    type: type
                }
            }
        }).then(function (response) {
            if (response != null) {
                _this.inboxLists = response.results;
                if (type == 'inbox') {
                    _this.InboxCnt = Object.keys(_this.inboxLists).length;
                }
                if (type == 'sent') {
                    _this.SentCnt = Object.keys(_this.inboxLists).length;
                }
                console.log('this.inboxLists', _this.inboxLists);
                _this.inboxLists.forEach(function (item, key) {
                    _this.mouseOverDelete[key] = false;
                });
            }
        }).catch(function (error) {
            //  console.log('Error while logging in', error)
        });
    };
    MailboxPageComponent.prototype.ClearData = function () {
        $('#ReplyMSG').val();
    };
    MailboxPageComponent.prototype.makeActive = function (selectActiveID) {
        //  console.log('selectActiveID',selectActiveID);
        $('.inbox-nav li').removeClass('active');
        $('#' + selectActiveID + "1").addClass('active');
    };
    MailboxPageComponent.prototype.SendPress = function (val) {
        var parent = this;
        parent.showsuccssMsg = false;
        parent.showErr = false;
        parent.showErrMsg = "";
        var tagenter1 = document.getElementById("ReplyMSG");
        if (tagenter1.value != '') {
            var toID = val.from;
            var fromID = val.to;
            var message = tagenter1.value;
            //  console.log('val',val);
            //   console.log('toID',toID,'fromID',fromID,'message',message,'productTracker',val.productTracker);
            this.apiService.ComproductPageAdd({
                data: {
                    key: this.apiKey,
                    form: {
                        from: fromID,
                        to: toID,
                        message: message,
                        productId: val.productTracker,
                        replyId: val.messageTracker
                    }
                }
            }).then(function (response) {
                if (response) {
                    if (response.status == "success") {
                        parent.showsuccssMsg = true;
                        parent.showErrMsg = "Message Sent to " + val.fromName;
                        setTimeout(function () {
                            parent.showsuccssMsg = false;
                            $("#ReplyMSG").val('');
                            parent.getInbox('inbox');
                            $('#replyModal').modal('hide');
                        }, 2000);
                    }
                    else {
                    }
                }
            }).catch(function (error) {
                console.log('Error while logging in', error);
            });
        }
        else {
            parent.showErr = true;
            parent.showErrMsg = "Message is empty !";
            setTimeout(function () { parent.showErr = false; }, 2000);
        }
    };
    MailboxPageComponent.prototype.checkAll = function (ev) {
        var _this = this;
        if (ev.target.checked == true) {
            this.inboxLists.forEach(function (item) {
                _this.deleteMsgArr.push(item.messageTracker);
                item.checked = true;
            });
        }
        else {
            this.inboxLists.forEach(function (item) {
                item.checked = false;
                _this.deleteMsgArr = [];
            });
        }
        console.log('this.deleteMsgArr', this.deleteMsgArr);
    };
    MailboxPageComponent.prototype.SingleMsgSelect = function (checkedSts, msgid) {
        // console.log('checkedSts',checkedSts,'msgid',msgid);
        if (checkedSts == true) {
            this.deleteMsgArr.push(msgid);
        }
        else {
            var Pindex = this.deleteMsgArr.indexOf(msgid);
            if (Pindex > -1) {
                this.deleteMsgArr.splice(Pindex, 1);
            }
        }
        console.log('this.deleteMsgArr', this.deleteMsgArr);
    };
    MailboxPageComponent.prototype.MouseOverDelete = function (val, idx) {
        // console.log('idx',idx);
        var parent = this;
        setTimeout(function () {
            if (val == '1') {
                parent.mouseOverDelete[idx] = true;
            }
            else {
                parent.mouseOverDelete[idx] = false;
            }
        }, 300);
    };
    MailboxPageComponent.prototype.getUserListInfo = function (val, indx) {
        var _this = this;
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
    MailboxPageComponent.prototype.getProductListInfo = function () {
    };
    MailboxPageComponent.prototype.closeUserListContainer = function () {
        //  setTimeout(()=>{
        //    this.userhintContainer=false;
        //  },800);
    };
    MailboxPageComponent.prototype.writeMsgProjectFilter = function () {
        var _this = this;
        this.apiService.availableWishlists({
            data: {
                key: this.apiKey,
                filter: {
                    category: this.writeMsgProjectFilterModel
                }
            }
        }).then(function (res) {
            _this.writeMsgWishlistCategories = res.categories;
        }).catch(function (err) {
            console.log('Error while fetching wishlist category ! ', err);
        });
    };
    MailboxPageComponent.prototype.writeMessageUpdateProjectList = function () {
        var _this = this;
        this.apiService.viewWishlists({
            data: {
                key: this.apiKey,
                filter: {
                    category: this.writeMsgProjectFilterModel
                }
            }
        }).then(function (res) {
            _this.writeMsgWishlistCategories = res.categories;
        }).catch(function (err) {
            console.log('Error while fetching wishlist category ! ', err);
        });
    };
    MailboxPageComponent.prototype.UserhintPull = function (val) {
        // console.log('val',val);
        this.usersearchObject = val.email;
        this.addEmail(val.email);
        this.usersearchObject = "";
        // this.hideMenu1=false;
        // console.log('selectedMessageUser',parent.selectedMessageUser);
        // parent.usersearchObject=val;
    };
    MailboxPageComponent.prototype.addEmail = function (eMAIL) {
        //console.log('eMAIL',eMAIL);
        // if(this.emailLists.length<3 && eMAIL!='')
        // {
        this.emailLists.push(eMAIL);
        // localStorage.setItem('GBCItoken',res.key);
        // this.globalService.setData({
        //   'ProjectTags':parent.emailLists
        // });
        //console.log('this.emailLists',this.emailLists);
        // }
    };
    MailboxPageComponent.prototype.removeEmail = function (indx) {
        var parent = this;
        // var Pindex=parent.tags.indexOf(indx);
        // console.log('indx',indx,'Pindex',Pindex,parent.tags);
        parent.emailLists.splice(indx, 1);
        // this.globalService.setData({
        //   'ProjectTags':parent.tags
        // });
        //console.log('parent.emailLists',parent.emailLists);
    };
    MailboxPageComponent = __decorate([
        core_1.Component({
            //  selector: ' ',
            //styles:[` `],
            styleUrls: ['./app/pages/mailbox/messageBox-home.style.css'],
            //  template: `  `,
            templateUrl: './app/pages/mailbox/messageBox-home-template.html'
        }),
        __metadata("design:paramtypes", [router_1.Router, global_service_1.globalService, ApiService_1.ApiService, router_1.ActivatedRoute])
    ], MailboxPageComponent);
    return MailboxPageComponent;
}(app_component_1.AppComponent));
exports.MailboxPageComponent = MailboxPageComponent;
