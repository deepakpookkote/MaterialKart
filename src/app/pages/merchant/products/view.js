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
var global_service_1 = require("./../../../services/global.service");
var MerchantProductView = (function (_super) {
    __extends(MerchantProductView, _super);
    function MerchantProductView(router, globalService) {
        var _this = _super.call(this, router, globalService) || this;
        _this.router = router;
        _this.globalService = globalService;
        _this.getApiUrl = _this.ApiURL;
        _this.apiKey = localStorage.getItem('GBCItoken');
        _this.pageJump = 0;
        _this.srchName = "";
        return _this;
    }
    MerchantProductView.prototype.ngOnInit = function () {
        this.getProducts();
    };
    MerchantProductView.prototype.filterFunction = function () {
        var parent = this;
        parent.getProducts();
        parent.pageJump = 0;
    };
    MerchantProductView.prototype.getProducts = function () {
        var parent = this;
        if (parent.pageJump < 0) {
            parent.pageJump = 0;
        }
        //  console.log(parent.apiKey);
        $.post(this.ApiURL + 'Merchant/merchant_product_view', {
            'data': {
                'key': parent.apiKey,
                'filter': {
                    'name': parent.srchName,
                    'category': parent.srchCategory
                },
                'extra': {
                    'pageJump': parent.pageJump
                }
            }
        }, function (res) {
            parent.products = res.products;
            //this.productsInfo = [1];
            // console.log(this.products);
        });
    };
    //Edit Selected productsInfo
    MerchantProductView.prototype.editProduct = function (productId) {
        var navigationExtras = {
            queryParams: { 'session_id': 123 },
            preserveQueryParams: true,
            preserveFragment: true
        };
        console.log('productID', productId);
        localStorage.setItem('productId', '');
        this.globalService.setData({ 'productId': productId });
        this.router.navigate(['./page-merchant-product-edit']);
        // to append productId in url.
        //this.router.navigate(['./page-merchant-product-edit'],{ queryParams: {productId:productId} });
    };
    //delete product
    //  deleteProduct(productId:any){
    //
    //   var r = confirm("This product will be removed from database.");
    //     if (r == true) {
    //
    //   let parent=this;
    //       $.post(this.ApiURL+'Merchant/merchant_product_delete',{
    //         'data':{
    //           'key':parent.apiKey,
    //           'filter':{
    //              'productId': productId
    //            }
    //         }
    //       },function(res:any){
    //           parent.getProducts();
    //       });
    //     }else{
    //
    //     }
    //
    // }
    MerchantProductView.prototype.deleteProduct = function (productId) {
        var parent = this;
        swal({
            title: 'Are you sure?',
            text: "This product will be removed from database.",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Remove it!',
            cancelButtonText: 'No, keep it'
        }).then(function () {
            $.post(parent.ApiURL + 'Merchant/merchant_product_delete', {
                'data': {
                    'key': parent.apiKey,
                    'filter': {
                        'productId': productId
                    }
                }
            }, function (res) {
                swal('Removed!', 'Your product has been removed.', 'success');
                setTimeout(function () { swal.close(); }, 1000);
                parent.getProducts();
                //  console.log('Wishlist Category',res);
            });
        }, function (dismiss) {
            if (dismiss === 'cancel') {
                swal('Cancelled', 'Your product is safe :)', 'error');
                setTimeout(function () { swal.close(); }, 1000);
            }
        });
    };
    MerchantProductView = __decorate([
        core_1.Component({
            styles: ["\n\n    "],
            templateUrl: './app/pages/merchant/products/view.template.html',
        }),
        __metadata("design:paramtypes", [router_1.Router, global_service_1.globalService])
    ], MerchantProductView);
    return MerchantProductView;
}(app_component_1.AppComponent));
exports.MerchantProductView = MerchantProductView;
