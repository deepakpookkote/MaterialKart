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
var DefaultPublicDashboardComponent = (function (_super) {
    __extends(DefaultPublicDashboardComponent, _super);
    function DefaultPublicDashboardComponent(router, globalService) {
        var _this = _super.call(this, router, globalService) || this;
        _this.router = router;
        _this.globalService = globalService;
        _this.apiKey = localStorage.getItem('GBCItoken');
        return _this;
    }
    //   constructor( public router: Router ){
    //   super(router);
    //
    // }
    DefaultPublicDashboardComponent.prototype.ngOnInit = function () {
        this.scrollToRatings();
    };
    DefaultPublicDashboardComponent = __decorate([
        core_1.Component({
            //selector: 'my-app',
            styles: ["\n    .product-slider{\n      -ms-overflow-style: none;  // IE 10+\n        overflow: -moz-scrollbars-none;  // Firefox\n        margin-right: -16px;\n \n         overflow-x: hidden;\n    }\n    .product-slider browser {\n     margin-right: -14px !important;\n\n     overflow-x: hidden;\n    }\n\n    .product-slider::-webkit-scrollbar {\n      display: none;\n    }\n    "],
            templateUrl: './app/pages/publicMembers/dashboard/default-dashboard.template.html',
        }),
        __metadata("design:paramtypes", [router_1.Router, global_service_1.globalService])
    ], DefaultPublicDashboardComponent);
    return DefaultPublicDashboardComponent;
}(app_component_1.AppComponent));
exports.DefaultPublicDashboardComponent = DefaultPublicDashboardComponent;
