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
var ProductApprovalComponent = (function (_super) {
    __extends(ProductApprovalComponent, _super);
    //  constructor( public router: Router ,public globalService: globalService,public apiService: ApiService){
    //    super(router,globalService,apiService);
    //  }
    function ProductApprovalComponent(router, globalService) {
        var _this = _super.call(this, router, globalService) || this;
        _this.router = router;
        _this.globalService = globalService;
        _this.getApiUrl = _this.ApiURL;
        _this.apiKey = localStorage.getItem('GBCItoken');
        _this.pageJump = 0;
        _this.srchName = "";
        _this.productLen = "";
        _this.approvedProductList = [];
        return _this;
    }
    ProductApprovalComponent.prototype.ngOnInit = function () {
        this.getProducts();
    };
    ProductApprovalComponent.prototype.filterFunction = function () {
        var parent = this;
        parent.getProducts();
        parent.pageJump = 0;
    };
    ProductApprovalComponent.prototype.getProducts = function () {
        var parent = this;
        if (parent.pageJump < 0) {
            parent.pageJump = 0;
        }
        //  console.log(parent.apiKey);
        $.post(parent.ApiURL + 'products/public_product_view', {
            'data': {
                'filter': {
                    'name': $('#srchName1').val(),
                    'status': parent.srchstatus,
                    'category': $('#srchcat1').val(),
                    'userRole': 'admin'
                },
                'extra': {
                    'pageJump': parent.pageJump,
                    'required': ['name', 'category', 'status', 'description', 'manufacturer', 'images']
                }
            }
        }, function (res) {
            if (res.products != null) {
                parent.products = res.products;
                // parent.productLen=parent.product.length;
                parent.productLen = Object.keys(res.products).length;
                // console.log('parent.productLen',parent.productLen);
            }
            else {
                parent.productLen = 0;
                parent.products = [];
            }
            //this.productsInfo = [1];
            // console.log(this.products);
        });
    };
    //Edit Selected productsInfo
    ProductApprovalComponent.prototype.ApproveSelectionClick = function (event, prodId) {
        // console.log('event',event.target.checked,prodId);
        // var Pindex=this.approvedProductList.indexOf(RmprodID);
        // if (Pindex > -1) {
        //       this.productCompareData.splice(Pindex, 1);
        //               }
        // if(event.target.checked==true)
        // {
        //   this.approvedProductList.push({pid:prodId,status:event.target.checked});
        //
        // }else{
        //   this.approvedProductList.push({pid:prodId,status:event.target.checked});
        // }
        // this.globalService.setData({
        //   'ApproveProductId':this.approvedProductList
        // });
        // console.log('this.approvedProductList',this.approvedProductList);
    };
    ProductApprovalComponent.prototype.SaveApproveProduct = function () {
        var parent = this;
        $.each($(".checkclass input:checkbox:not(:checked)"), function (index, evn) {
            // console.log('nch',index,evn.value);
            parent.ProductUpdateStatus(evn.value, 'hold');
        });
        $.each($(".checkclass input[type='checkbox']:checked"), function (index, evn) {
            // console.log(index,evn.value);
            parent.ProductUpdateStatus(evn.value, 'active');
        });
    };
    ProductApprovalComponent.prototype.ProductUpdateStatus = function (ProctId, ProdSts) {
        var parent = this;
        $.post(this.ApiURL + 'products/product_update', {
            'data': {
                'key': parent.apiKey,
                'filter': {
                    'productId': ProctId
                },
                'form': {
                    'status': ProdSts
                }
            }
        }, function (res) {
            console.log('res', res);
            if (res.status == "success") {
                $("#dispmsg").html("<div style='width:50%;margin-left:50px;' class='alert alert-success animated fadeIn'> <strong>Success!</strong> Updated successfully !</div>");
            }
            setTimeout(function () {
                ;
                $("#dispmsg").html("");
            }, 3000);
        });
    };
    ProductApprovalComponent = __decorate([
        core_1.Component({
            styles: ["\n    .form-control{\n          border-radius: 5px;\n    }\n\n    "],
            templateUrl: './app/pages/products/product.approval.template.html',
        }),
        __metadata("design:paramtypes", [router_1.Router, global_service_1.globalService])
    ], ProductApprovalComponent);
    return ProductApprovalComponent;
}(app_component_1.AppComponent));
exports.ProductApprovalComponent = ProductApprovalComponent;
