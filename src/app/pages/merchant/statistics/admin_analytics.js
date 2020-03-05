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
var AdminAnalyticsGeneral = (function (_super) {
    __extends(AdminAnalyticsGeneral, _super);
    function AdminAnalyticsGeneral(router, globalService) {
        var _this = _super.call(this, router, globalService) || this;
        _this.router = router;
        _this.globalService = globalService;
        _this.accountType = localStorage.getItem('GBCIaccountType');
        _this.getApiUrl = _this.ApiURL;
        _this.apiKey = localStorage.getItem('GBCItoken');
        _this.recentActivities = [];
        _this.userInfo = [];
        _this.service = [];
        _this.totalProducts = 0;
        _this.DivEnableFlag = false;
        _this.ViewselcFlag = 2;
        _this.WeekDay = [];
        _this.MonthNames = [];
        _this.MonthorWeekSel = [];
        _this.selcFlag = 0;
        _this.WeekMonthData = [];
        return _this;
    }
    //   constructor( public router: Router ){
    //   super(router);
    //
    // }
    AdminAnalyticsGeneral.prototype.ngOnInit = function () {
        var parent = this;
        setTimeout(function () {
            parent.loadChart();
            //  parent.getProducts();
            // parent.loadBrowserChart();
        }, 500);
        this.service = this.globalService.getData();
        this.userInfo = this.service.userInfo;
        //console.log(  this.userInfo );
    };
    AdminAnalyticsGeneral.prototype.loadChart = function () {
        Highcharts.chart('top5queriedProdChart', {
            chart: {
                type: 'column',
                // Edit chart spacing
                //  spacingBottom: 15,
                spacingTop: 10,
                //  spacingLeft: 10,
                //  spacingRight: 10,
                width: 470,
                height: 450
            },
            exporting: { enabled: false },
            title: {
                text: 'Most Queried Manufacturer',
                style: {
                    fontSize: '17px',
                    fontFamily: 'proxima-nova-medium',
                }
            },
            credits: { enabled: false },
            //  subtitle: {
            //      text: 'Source: WorldClimate.com'
            //  },
            xAxis: {
                categories: ['Armstrong', 'Certainteed Corporation', 'TOTO', 'Saint Gobain Glass', 'AGC Asahi Glass Company']
            },
            yAxis: {
                title: {
                    text: 'Views'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: [{
                    showInLegend: false,
                    name: 'View records',
                    data: [86, 34, 50, 450, 156]
                }
            ]
        });
        Highcharts.chart('top5queriedCatChart', {
            chart: {
                type: 'column',
                // Edit chart spacing
                //  spacingBottom: 15,
                spacingTop: 10,
                //  spacingLeft: 10,
                //  spacingRight: 10,
                width: 470,
                height: 450
            },
            exporting: { enabled: false },
            title: {
                text: 'Most Queried Product Category',
                style: {
                    fontSize: '17px',
                    fontFamily: 'proxima-nova-medium',
                }
            },
            credits: { enabled: false },
            //  subtitle: {
            //      text: 'Source: WorldClimate.com'
            //  },
            xAxis: {
                categories: ['Ceiling', 'Flooring', 'Insulation', 'Glazing External', 'Internal Paint']
            },
            yAxis: {
                title: {
                    text: 'Views'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: [{
                    showInLegend: false,
                    name: 'View records',
                    data: [120, 212, 151, 65, 119]
                }
            ]
        });
    };
    AdminAnalyticsGeneral.prototype.getProducts = function () {
        var parent = this;
        //  console.log(parent.apiKey);
        $.post(this.ApiURL + 'Merchant/merchant_product_view', {
            'data': {
                'key': parent.apiKey,
                'filter': {},
                'extra': {
                    'orderByDateCreated': -1
                }
            }
        }, function (res) {
            parent.products = res.products;
            //this.productsInfo = [1];
            //console.log(this.products);
        });
    };
    AdminAnalyticsGeneral = __decorate([
        core_1.Component({
            //selector: 'my-app',
            styles: ["\n\n\n    html{\n       font-family: proxima-nova-medium !important;\n       font-size:14px;\n       color: #595959;\n         }\n\n.activeStar{\n  font-size: 21px;\nposition: absolute;\nmargin-left: -9px;\nmargin-top: -7px;\ncolor:#629562;\n}\n\n    "],
            templateUrl: './app/pages/merchant/statistics/admin_analytics.template.html',
        }),
        __metadata("design:paramtypes", [router_1.Router, global_service_1.globalService])
    ], AdminAnalyticsGeneral);
    return AdminAnalyticsGeneral;
}(app_component_1.AppComponent));
exports.AdminAnalyticsGeneral = AdminAnalyticsGeneral;
