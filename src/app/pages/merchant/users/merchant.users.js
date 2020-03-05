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
var global_service_1 = require("./../../../services/global.service");
var MerchantUsers = (function () {
    function MerchantUsers(router, globalService) {
        this.router = router;
        this.globalService = globalService;
        this.apiKey = localStorage.getItem('GBCItoken');
        this.pageJump = 0;
        this.srchName = "";
        this.usersAdd = false;
        //super(router,globalService);
    }
    MerchantUsers.prototype.ngOnInit = function () {
        this.getProducts();
    };
    MerchantUsers.prototype.filterFunction = function () {
        var parent = this;
        parent.getProducts();
        parent.pageJump = 0;
    };
    MerchantUsers.prototype.getProducts = function () {
        var parent = this;
        if (parent.pageJump < 0) {
            parent.pageJump = 0;
        }
        //  console.log(parent.apiKey);
        $.post('Merchant/merchant_product_view', {
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
    MerchantUsers.prototype.editProduct = function (productId) {
        var navigationExtras = {
            queryParams: { 'session_id': 123 },
            preserveQueryParams: true,
            preserveFragment: true
        };
        console.log(productId);
        localStorage.setItem('productId', '');
        this.globalService.setData({ 'productId': productId });
        this.router.navigate(['./page-merchant-product-edit']);
        // to append productId in url.
        //this.router.navigate(['./page-merchant-product-edit'],{ queryParams: {productId:productId} });
    };
    MerchantUsers.prototype.deleteProduct = function (productId) {
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
    MerchantUsers = __decorate([
        core_1.Component({
            styles: ["\n\n    "],
            templateUrl: './app/pages/merchant/users/users.template.html',
        }),
        __metadata("design:paramtypes", [router_1.Router, global_service_1.globalService])
    ], MerchantUsers);
    return MerchantUsers;
}());
exports.MerchantUsers = MerchantUsers;
