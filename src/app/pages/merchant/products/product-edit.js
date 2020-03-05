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
var app_component_1 = require("./../../../app.component");
var common_1 = require("@angular/common");
var global_service_1 = require("./../../../services/global.service");
var ApiService_1 = require("./../../../services/ApiService");
var ratings_service_1 = require("./../../../services/ratings/ratings.service");
var MerchantProductEdit = (function (_super) {
    __extends(MerchantProductEdit, _super);
    function MerchantProductEdit(router, globalService, apiService, _location, ratingsService, cdRef) {
        var _this = _super.call(this, router, globalService, apiService) || this;
        _this.router = router;
        _this.globalService = globalService;
        _this.apiService = apiService;
        _this._location = _location;
        _this.ratingsService = ratingsService;
        _this.cdRef = cdRef;
        // public addMore:number=1;
        _this.apiKey = localStorage.getItem('GBCItoken');
        _this.productImage1 = "../../webroot/images/general/file-upload.jpg";
        _this.productImage2 = "../../webroot/images/general/file-upload.jpg";
        _this.productImage3 = "../../webroot/images/general/file-upload.jpg";
        _this.successMessage = false;
        _this.productCategory = "";
        _this.addParameter = true;
        _this.parameterCategCheckbox = {};
        _this.input_parameter = {};
        _this.view_Parameters = [];
        //Newly added instances for fetching data from Json
        _this.RatingArray = [];
        _this.CategoryArray = [];
        _this.carArr = [];
        _this.ParametersArray = [];
        _this.parameterList = [];
        _this.parameterTitle = [];
        _this.prdRating = '';
        _this.prdCategory = '';
        _this.prdParameters = '';
        _this.subMenuArray = [];
        _this.parameterCollections = [];
        _this.productInformationYES = "";
        _this.additionalInformation = false;
        _this.additionalInformationAry = {};
        _this.prdRecords = [];
        _this.parameters = [];
        _this.ratingCategoriesArray = [];
        _this.addedParameters = [];
        _this.formErrors = [];
        _this.parameterArrayList = [];
        _this.userInput = {};
        _this.productName = '';
        _this.category = '';
        _this.ratingSys = '';
        _this.manufactLocation = '';
        _this.productDescription = '';
        _this.websiteUrl = '';
        _this.ratingCategories = (ratingsService.ratingCategories);
        _this.ratingCategoriesArray = _this.toArrayKeyValue(_this.ratingsService.ratingCategories);
        _this.parametersExplorer = ratingsService.parametersExplorer;
        _this.parameters = _this.toArrayKeyValue(_this.ratingsService.parametersExplorer);
        _this.thresholdsLists = ratingsService.thresholds;
        _this.prdRecords.productName = '';
        _this.prdRecords.manufactLocation = '';
        _this.prdRecords.productDescription = '';
        _this.prdRecords.websiteUrl = '';
        _this.ApiURL = _this.apiService.base;
        return _this;
    }
    MerchantProductEdit.prototype.ngOnInit = function () {
        if (localStorage.getItem('productId') != '') {
            // console.log('local-'+localStorage.getItem('productId'));
        }
        else {
            localStorage.setItem('productId', this.globalService.getData().productId);
        }
        this.productId = localStorage.getItem('productId');
        this.getProductDetails(this.productId);
    };
    MerchantProductEdit.prototype.productparametersValues = function (category, submenu1) {
        if (this.userInput[category] != undefined) {
            this.userInput[category]['submenu1'] = submenu1;
        }
        else {
            this.userInput[category] = {};
            this.userInput[category]['submenu1'] = submenu1;
        }
    };
    //
    //  public dispIndex:any=0;
    //  assighDispIndex(indxVal:any){
    //    this.dispIndex=indxVal;
    //  }
    MerchantProductEdit.prototype.PrintIndex = function (index) {
        console.log('index', index);
    };
    MerchantProductEdit.prototype.toArrayCategory = function (obj) {
        var ary = Object.keys(obj).map(function (key) { return key; });
        return ary.sort();
    };
    MerchantProductEdit.prototype.toArrayValue = function (obj) {
        return Object.keys(obj).map(function (key) { return obj[key]; });
    };
    MerchantProductEdit.prototype.toArrayKeyValue = function (obj) {
        return Object.keys(obj).map(function (key) { return { key: key, value: obj[key] }; });
    };
    MerchantProductEdit.prototype.goback = function () {
        this._location.back();
    };
    MerchantProductEdit.prototype.changingParameters = function () {
        $('#productCategory').val('');
        $('.productParameters').val('');
    };
    MerchantProductEdit.prototype.selectedOption = function () {
        $("#productCategory").change(function () {
            if ($(this).val() == "YES") {
                $("#informationDiv").show();
            }
            else {
                $("#informationDiv").hide();
            }
        });
    };
    //------ Extra --------
    MerchantProductEdit.prototype.createRange = function (number) {
        /* This method is equal to for(var i=0; i<=5; i++ ) // forloop
           In template just define  <div  *ngFor="let item of createRange(5)">
           Now Iteration will go upto 5 */
        this.primaryRange = [];
        for (var i = 1; i <= number; i++) {
            this.primaryRange.push(i);
        }
        return this.primaryRange;
    };
    MerchantProductEdit.prototype.readUrl = function (event, prod) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (event) {
                if (prod == 'image1')
                    _this.productImage1 = event.target.result;
                else if (prod == 'image2')
                    _this.productImage2 = event.target.result;
                else
                    _this.productImage3 = event.target.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    MerchantProductEdit.prototype.getProductDetails = function (productId) {
        var _this = this;
        var parent = this;
        //	console.log(parent.apiKey);
        this.apiService.merchantProductView({
            'data': {
                'key': parent.apiKey,
                filter: {
                    productId: this.productId
                }
            }
        }).then(function (res) {
            var productsInfo = {};
            productsInfo = res.products[0];
            console.log(productsInfo);
            //parent.productsInfo = parent.productsInfo[0];
            _this.productName = productsInfo.name;
            _this.prdCategory = productsInfo.category;
            _this.ratingSys = productsInfo.ratingSystem;
            _this.manufactLocation = productsInfo.manufactureLocation;
            _this.productDescription = productsInfo.description;
            _this.websiteUrl = productsInfo.websiteUrl;
            _this.productParams = productsInfo.parameters;
            _this.addedParameters = productsInfo.v2parameters;
            _this.input_parameter = productsInfo.v2parameters;
            _this.view_Parameters = _this.toArrayKeyValue(_this.input_parameter);
            if (productsInfo.images.image1) {
                _this.productImage1 = _this.apiService.base + "images/src/" + productsInfo.images.image1 + '/300x300';
                _this.prodImageAvail1 = true;
            }
            else {
                _this.productImage1 = "../../webroot/images/general/file-upload.jpg";
                _this.prodImageAvail1 = false;
            }
        }).catch(function (err) {
        });
    };
    MerchantProductEdit.prototype.addSubmenu1 = function (category, val) {
        if (this.input_parameter[category] == undefined) {
            this.input_parameter[category] = {};
        }
        this.input_parameter[category]['submenu1'] = val;
    };
    MerchantProductEdit.prototype.addEntryField = function (category, val) {
        if (this.input_parameter[category] == undefined) {
            this.input_parameter[category] = {};
        }
        this.input_parameter[category]['entryField'] = val;
    };
    MerchantProductEdit.prototype.addDocumentUrl = function (category, val) {
        if (this.input_parameter[category] == undefined) {
            this.input_parameter[category] = {};
        }
        this.input_parameter[category]['documentUrl'] = val;
    };
    MerchantProductEdit.prototype.addSubmenu2 = function (category, subItem2, val) {
        if (this.input_parameter[category] == undefined) {
            this.input_parameter[category] = {};
        }
        if (this.input_parameter[category]['submenu2'] == undefined) {
            this.input_parameter[category]['submenu2'] = {};
        }
        this.input_parameter[category]['submenu2'][subItem2] = val;
    };
    MerchantProductEdit.prototype.resetCategory = function (category) {
        delete this.input_parameter[category];
    };
    MerchantProductEdit.prototype.updateProduct = function () {
        var _this = this;
        this.successMessage = true;
        this.formErrors = [];
        if (this.productName == '')
            this.formErrors.push('Name field must.');
        if (this.prdCategory == '')
            this.formErrors.push('Category field must.');
        if (this.manufactLocation == '')
            this.formErrors.push('Manufacturer Location field must.');
        if (this.productDescription == '')
            this.formErrors.push('Product description field must.');
        if (this.websiteUrl == '')
            this.formErrors.push('Website URL field must.');
        if (this.formErrors.length > 0) {
            return 0;
        }
        var params = JSON.parse(JSON.stringify(this.input_parameter));
        this.apiService.merchantProductEdit({
            data: {
                key: this.apiKey,
                form: {
                    name: this.productName,
                    category: this.prdCategory,
                    //  status  :'hold',
                    manufactureLocation: this.manufactLocation,
                    description: this.productDescription,
                    websiteUrl: this.websiteUrl,
                    v2parameters: params
                },
                filter: {
                    productId: this.productId
                }
            }
        }).then(function (res) {
            if (res.status == 'success') {
                var parent_1 = _this;
                var productId_1 = res.productId;
                if ($('#image1')[0].files[0]) {
                    var formData = new FormData();
                    formData.append('key', _this.apiKey);
                    formData.append('productId', productId_1);
                    formData.append('imageCategory', 'productImage');
                    formData.append('image1', $('#image1')[0].files[0]);
                    //console.log(formData);
                    $.ajax({
                        url: _this.ApiURL + 'images/push',
                        type: 'POST', data: formData,
                        cache: false, contentType: false, processData: false,
                        complete: function (res) {
                            var resp = (res.responseText);
                            res = (resp.substring(resp.lastIndexOf('"status":"') + 10, resp.lastIndexOf('","reference"'))); /// eval("(" + res.responseText + ")");
                            if (res == "success") {
                                parent_1.productImage1 = "../../webroot/images/general/cloud_uploaded.jpg";
                                if ($('#image2')[0].files[0]) {
                                    var formData2 = new FormData();
                                    formData2.append('key', parent_1.apiKey);
                                    formData2.append('productId', productId_1);
                                    formData2.append('imageCategory', 'productImage');
                                    formData2.append('image2', $('#image2')[0].files[0]);
                                    //console.log(formData);
                                    $.ajax({
                                        url: parent_1.ApiURL + 'images/push',
                                        type: 'POST', data: formData2,
                                        cache: false, contentType: false, processData: false,
                                        complete: function (res) {
                                            // console.log(res);
                                            //   console.log('Image 02',res);
                                            var resp = (res.responseText);
                                            res = (resp.substring(resp.lastIndexOf('"status":"') + 10, resp.lastIndexOf('","reference"'))); /// eval("(" + res.responseText + ")");
                                            if (res == "success") {
                                                parent_1.productImage2 = "../../webroot/images/general/cloud_uploaded.jpg";
                                                if ($('#image3')[0].files[0]) {
                                                    var formData3 = new FormData();
                                                    formData3.append('key', parent_1.apiKey);
                                                    formData3.append('productId', productId_1);
                                                    formData3.append('imageCategory', 'productImage');
                                                    formData3.append('image3', $('#image3')[0].files[0]);
                                                    //console.log(formData);
                                                    $.ajax({
                                                        url: parent_1.ApiURL + 'images/push',
                                                        type: 'POST', data: formData3,
                                                        cache: false, contentType: false, processData: false,
                                                        complete: function (res) {
                                                            //   console.log('Image 03',res);
                                                            var resp = (res.responseText);
                                                            res = (resp.substring(resp.lastIndexOf('"status":"') + 10, resp.lastIndexOf('","reference"'))); /// eval("(" + res.responseText + ")");
                                                            if (res == "success") {
                                                                parent_1.productImage3 = "../../webroot/images/general/cloud_uploaded.jpg";
                                                                swal("Success", "Successfully Updated", "success");
                                                                parent_1.successMessage = false;
                                                                ;
                                                            }
                                                            else {
                                                                swal("Failure", "unable to upload Image", "warning");
                                                                parent_1.successMessage = false;
                                                                ;
                                                            }
                                                        }
                                                    });
                                                }
                                                else {
                                                    swal("Success", "Successfully Updated", "success");
                                                    parent_1.successMessage = false;
                                                    ;
                                                }
                                            }
                                            else {
                                                swal("Failure", "unable to upload Image", "warning");
                                                parent_1.successMessage = false;
                                                ;
                                            }
                                        }
                                    });
                                }
                                else {
                                    swal("Success", "Successfully Updated", "success");
                                    parent_1.successMessage = false;
                                    ;
                                }
                            }
                            else {
                                swal("Failure", "unable to upload Image", "warning");
                                parent_1.successMessage = false;
                                ;
                            }
                        }
                    });
                }
                else {
                    swal("Success", "Successfully Updated", "success");
                    parent_1.successMessage = false;
                    ;
                }
                /*
     
              if($('#image3')[0].files[0]){
                var formData = new FormData();
                formData.append('key',  this.apiKey );
                formData.append('productId', res.productId );
                formData.append('imageCategory','productImage');
              formData.append('image3', $('#image3')[0].files[0] );
              //console.log(formData);
              $.ajax({
                url: this.ApiURL+'images/push',//'upload.php',
                type: 'POST', data: formData,   // Tell jQuery not to process data or worry about content-type
               cache: false, contentType: false,  processData: false, // You *must* include these options!
               complete:function(res:any){
                  // console.log(res);
                  parent.successMessage=true;
               }
              });
              }
          */
            }
        }).catch(function (err) {
            console.log('Error while uploading Product !', err);
        });
    };
    MerchantProductEdit = __decorate([
        core_1.Component({
            styles: ["\n       .parameter-table tr th{\n         background-color:white;\n       }\n       .parameter-table tr th,.parameter-table tr td{\n         border: 1px solid #a8a3a3;\n       }\n       .min-width-200{\n         min-width:88px!important;\n       }\n\n       .image-input{\n         border: none;\n         box-shadow: none;\n       }\n       .bgBlack{\n         background: #000000;\n         padding:8px;\n       }\n       .bgBlack:hover {\n         background: #000000;\n         cursor: pointer;\n       }\n       .dropdownLabel {\n         font-size:15.5px !important;\n       }\n\n       .error{\n         color:red;\n       }\n       .rotate:hover{\n          color: red;\n          transition: 0.9s;\n          transform: rotateY(180deg);\n      }\n      .alert-info {\n        color: #31708f;\n        background: none;\n        border: none;\n      }\n    "],
            templateUrl: './app/pages/merchant/products/product-edit.template.html',
        }),
        __metadata("design:paramtypes", [router_1.Router,
            global_service_1.globalService,
            ApiService_1.ApiService,
            common_1.Location,
            ratings_service_1.RatingsService,
            core_1.ChangeDetectorRef])
    ], MerchantProductEdit);
    return MerchantProductEdit;
}(app_component_1.AppComponent));
exports.MerchantProductEdit = MerchantProductEdit;
