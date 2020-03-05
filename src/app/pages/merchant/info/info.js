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
var ApiService_1 = require("./../../../services/ApiService");
var countrydb_service_1 = require("./../../../services/countryDB/countrydb.service");
var MerchantInfo = (function () {
    //public countryDB:any;
    function MerchantInfo(countryDB, apiService) {
        this.countryDB = countryDB;
        this.apiService = apiService;
        this.addMore = 1;
        this.apiKey = localStorage.getItem('GBCItoken');
        this.accountType = localStorage.getItem('GBCIaccountType');
        this.primaryRange = [];
        this.userInfo = {};
        this.ContactInfo = [];
        this.regContactInfo = [];
        this.ContactInfoDisp = [];
        this.contactList = [];
        this.countryRegion = [];
        this.countrySubRegionArray = [];
        this.countryArray = [];
        this.countryDisp = [];
        this.countrySubRegiondisp = [];
        this.contact = '';
        this.regContactDatas = [];
        this.regContactInit();
        // console.log('this.countryDB',this.countryDB);
        this.countryRegion = this.countryDB.regions;
        this.countrySubRegionArray = this.countryDB.subRegion;
        this.countryArray = this.countryDB.countries;
        // console.log('this.countryRegion',this.countryRegion);
        // console.log('this.countrySubRegion',this.countrySubRegionArray);
        // console.log('this.countryArray',this.countryArray);
    }
    MerchantInfo.prototype.regContactInit = function () {
        this.regContactInfo.regions = 'Region';
        this.regContactInfo.subregions = 'Sub Region';
        this.regContactInfo.country = 'Country';
        this.regContactInfo.address = "";
        this.regContactInfo.contact = "";
        this.regContactInfo.phone = "";
        this.regContactInfo.email = "";
        this.regContactInfo.store = "";
        this.ContactInfo.name = "";
        this.ContactInfo.name = "";
        this.ContactInfo.name = "";
        this.ContactInfo.name = "";
    };
    MerchantInfo.prototype.removeRegContactInfo = function (i) {
        this.regContactDatas.splice(i, 1);
    };
    MerchantInfo.prototype.addRegContactInfo = function () {
        if (this.regContactInfo.address == '' || this.regContactInfo.contact == "" || this.regContactInfo.phone == "") {
            return 0;
        }
        this.regContactDatas.push({
            region: this.regContactInfo.regions,
            subRegion: this.regContactInfo.subregions,
            country: this.regContactInfo.country,
            address: this.regContactInfo.address,
            contact: this.regContactInfo.contact,
            phone: this.regContactInfo.phone,
            email: this.regContactInfo.email,
            store: this.regContactInfo.store
        });
        this.regContactInfo.regions = 'Region';
        this.regContactInfo.subregions = 'Sub Region';
        this.regContactInfo.country = 'Country';
        this.regContactInfo.address = "";
        this.regContactInfo.contact = "";
        this.regContactInfo.phone = "";
        this.regContactInfo.email = "";
        this.regContactInfo.store = "";
        $('html,body').animate({
            scrollTop: $("#regContactContainer").offset().top
        }, 'slow');
    };
    //function to store the contact information in a temporary array
    MerchantInfo.prototype.SelectedRegion = function (selRegion) {
        // console.log('selRegion',selRegion);
        this.countrySubRegiondisp = this.countrySubRegionArray[selRegion];
        // console.log('this.countrySubRegiondisp',this.countrySubRegiondisp);
    };
    MerchantInfo.prototype.SelectedSubRegion = function (selSubRegion) {
        var subregExist = this.countryArray[this.regContactInfo.regions];
        // console.log('selSubRegion',selSubRegion,subregExist);
        if (subregExist != '' && subregExist != undefined) {
            // console.log('countryDisp',this.countryArray[this.regContactInfo.regions][selSubRegion]);
            this.countryDisp = this.countryArray[this.regContactInfo.regions][selSubRegion];
        }
        else {
            this.countryDisp = []; //this.countryArray['Region']['Sub Region'];
        }
        // console.log('this.countryDisp',this.countryDisp);
    };
    MerchantInfo.prototype.store = function () {
        this.contactList.push(this.contact);
        this.contact = '';
    };
    //function to remove the contact information from temporary array
    MerchantInfo.prototype.removeContact = function (i) {
        //this.contactList=[];
        this.contactList.splice(i, 1);
    };
    //   constructor( public router: Router ){
    //   super(router);
    //
    // }
    MerchantInfo.prototype.ngOnInit = function () {
        var parent = this;
        console.log('accountType', this.accountType);
        setTimeout(function () {
            parent.getInfo();
            parent.accountInfoView();
        }, 500);
    };
    MerchantInfo.prototype.addmorePos = function (arg) {
        if (arg == "plus") {
            this.addMore = this.addMore + 1;
            setTimeout(function () {
                var objDiv = document.getElementById("add_more_scroll");
                objDiv.scrollTop = objDiv.scrollHeight;
            }, 500);
        }
        else {
            this.addMore = this.addMore - 1;
        }
    };
    MerchantInfo.prototype.getInfo = function () {
        var parent = this;
        console.log('ApiURL', this.apiService.base);
        $.post(this.apiService.base + 'Merchant/merchant_information', {
            'data': {
                'key': parent.apiKey,
                'filter': {
                    'accountType': parent.accountType
                },
            }
        }, function (res) {
            console.log('resUserInfo', res);
            if (res != null) {
                parent.userInformation = res.userInfo;
                parent.firstName = res.userInfo.firstName;
                parent.lastName = res.userInfo.lastName;
                parent.merchantMail = res.userInfo.email;
            }
        });
    };
    MerchantInfo.prototype.userInfoContact = function (item, assoc) {
        if (this.userInfo.contact == undefined) {
            this.userInfo.contact = {};
        }
        //  console.log(this.userInfo.contact[item]);
        if (this.userInfo.contact[item] != undefined) {
            if (this.userInfo.contact[item][assoc] != undefined) {
                return this.userInfo.contact[item][assoc];
            }
            else {
                return '';
            }
        }
        else {
            return '';
        }
    };
    MerchantInfo.prototype.maintainContactInfo = function (item, assoc, eve) {
        if (this.userInfo.contact == undefined) {
            this.userInfo.contact = {};
        }
        if (this.userInfo.contact[item] == undefined) {
            this.userInfo.contact[item] = {};
            if (this.userInfo.contact[item][assoc] == undefined) {
                this.userInfo.contact[item][assoc] = '';
            }
        }
        this.userInfo.contact[item][assoc] = eve.target.value;
    };
    MerchantInfo.prototype.removeUserInfo = function (item) {
        var contact = this.userInfo.contact;
        //  console.log('Before Delete',contact);
        contact.splice(item, 1); // parameter 1 : Position, parameter 2 : How many
        //   console.log('After Delete',contact);
        this.userInfo.contact = contact;
    };
    MerchantInfo.prototype.updateUserInfo = function () {
        var parent = this; //console.log(parent.userInfo);
        var mFname = document.getElementById('merchantFirstName');
        var mLname = document.getElementById('merchantLastName');
        var mOffice = document.getElementById('merchantOffice');
        var mWebsite = document.getElementById('merchantWebsite');
        var mContact = document.getElementById('merchantContact');
        var mEmail = document.getElementById('merchantEmail');
        var mCompany = document.getElementById('merchantCompanyName');
        //Merchant regional contact info.
        var mRegion1 = document.getElementById('merchantRegion-1');
        var mContact1 = document.getElementById('merchantContact-1');
        var mAddress1 = document.getElementById('merchantAddress-1');
        var mContactNumber = document.getElementById('merchantContactNum-1');
        var mRegionalEmail = document.getElementById('merchantRegEmail-1');
        var storeLocator = document.getElementById('merchantStoreLocator');
        var regionalContacts = [];
        var regObj = {
            'contactPerson': mContact1.value,
            'address': mAddress1.value,
            'contactNumber': mContactNumber.value,
            'contactEmail': mRegionalEmail.value,
            'storeLocator': storeLocator.value,
            'regionalContacts': mRegion1.value
        };
        regionalContacts.push(regObj);
        $.post(this.apiService.base + 'merchant/merchant_information_edit', {
            'data': {
                'key': parent.apiKey,
                'form': {
                    'firstName': mFname.value,
                    'lastName': mLname.value,
                    'website': mWebsite.value,
                    'companyName': mCompany.value,
                    'officeAddress': mOffice.value,
                    'contactNumber': mContact.value,
                    'email': mEmail.value,
                    'regionalContacts': regionalContacts
                }
            },
        }, function (res) {
            console.log(res);
            this.infoDetail = res;
            //  if(res.status=="failure"){
            //   parent.redirect('page-login',{});
            //  }else{
            //     if(res.status=="success"){
            //       parent.getInfo();
            //       swal("Success", "Successfully Updated", "success")
            //     }
            //  }
        });
    };
    ////////
    ///Extra
    MerchantInfo.prototype.createRange = function (number) {
        /* This method is equal to for(var i=0; i<=5; i++ ) // forloop
           In template just define  <div  *ngFor="let item of createRange(5)">
           Now Iteration will go upto 5 */
        this.primaryRange = [];
        for (var i = 1; i <= number; i++) {
            this.primaryRange.push(i);
        }
        return this.primaryRange;
    };
    MerchantInfo.prototype.accountInfoView = function () {
        var _this = this;
        this.apiService.accountInfoView({
            data: {
                key: this.apiKey
            }
        }).then(function (res) {
            // console.log('res',res);
            _this.ContactInfoDisp = res.userInfo[0];
            console.log('res', _this.ContactInfoDisp);
            if (_this.ContactInfoDisp != '' && _this.ContactInfoDisp != null) {
                _this.ContactInfo.name = _this.ContactInfoDisp.name;
                _this.ContactInfo.desc = _this.ContactInfoDisp.description;
                _this.ContactInfo.officeAdd = _this.ContactInfoDisp.officeAddress;
                _this.ContactInfo.weburl = _this.ContactInfoDisp.websiteUrl;
                _this.contactList = _this.ContactInfoDisp.contactNumber;
                _this.ContactInfo.email = _this.ContactInfoDisp.email;
                _this.regContactDatas = _this.ContactInfoDisp.regionalContactInfo;
            }
        }).catch(function (err) {
            console.log("Unable to get profile information !", err);
        });
    };
    // accountInfoView(){
    //   let parent:any=this;
    //   $.post(this.apiService.base+'users/account_info',{
    //     'data':{
    //       'key':parent.apiKey,
    //     }
    //       },function(res:any){
    //         console.log('res',res);
    //
    //       });
    // }
    MerchantInfo.prototype.saveDetails = function () {
        if (this.regContactDatas.length > 0) {
            console.log('1');
        }
        else {
            this.addRegContactInfo();
            console.log('2');
        }
        this.apiService.accountInfoAdd({
            data: {
                key: this.apiKey,
                form: {
                    name: this.ContactInfo.name,
                    description: this.ContactInfo.desc,
                    websiteUrl: this.ContactInfo.weburl,
                    officeAddress: this.ContactInfo.officeAdd,
                    contactNumber: this.contactList,
                    email: this.ContactInfo.email,
                    regionalContactInfo: this.regContactDatas
                }
            }
        }).then(function (res) {
            // console.log('res',res);
            if (res.status == "success") {
                swal("Success", "Successfully Updated", "success");
                setTimeout(function () { swal.close(); }, 2000);
            }
        }).catch(function (err) {
            console.log("Unable to update profile information !", err);
        });
    };
    MerchantInfo.prototype.updateDetails = function () {
        // console.log('updateDetails');
        this.apiService.accountInfoEdit({
            data: {
                key: this.apiKey,
                form: {
                    name: this.ContactInfo.name,
                    description: this.ContactInfo.desc,
                    websiteUrl: this.ContactInfo.weburl,
                    officeAddress: this.ContactInfo.officeAdd,
                    contactNumber: this.contactList,
                    email: this.ContactInfo.email,
                    regionalContactInfo: this.regContactDatas
                }
            }
        }).then(function (res) {
            // console.log('res',res);
            if (res.status == "success") {
                swal("Success", "Successfully Updated", "success");
                setTimeout(function () { swal.close(); }, 2000);
            }
        }).catch(function (err) {
            console.log("Unable to update profile information !", err);
        });
    };
    //function for number validation
    MerchantInfo.prototype.CheckIntVal = function (event) {
        event.srcElement.value = event.srcElement.value.replace(/[^\d].+/, "");
        if (event.srcElement.value != '') {
            //  console.log('t',event.srcElement.value);
            if ((event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }
        }
        else {
            // event.srcElement.value=0;
        }
    };
    MerchantInfo = __decorate([
        core_1.Component({
            styles: ["\n\n    .md-textarea {\n       padding:5px!important;\n     }\n     .table tr td{\n        padding:5px!important;\n     }\n     .cont .rotate {\n          cursor:pointer;\n          font-size: 15px;\n      }\n\n\n      .cont .rotate:hover{\n          color: red;\n          transition: 0.9s;\n          transform: rotateY(180deg);\n      }\n\n\n\n    "],
            templateUrl: './app/pages/merchant/info/info.template.html',
        }),
        __metadata("design:paramtypes", [countrydb_service_1.CountryDbService, ApiService_1.ApiService])
    ], MerchantInfo);
    return MerchantInfo;
}());
exports.MerchantInfo = MerchantInfo;
//  return this.primaryRange;
