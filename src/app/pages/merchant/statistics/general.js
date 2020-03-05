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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_component_1 = require("./../../../app.component");
var MerchantStatisticsGeneral = (function (_super) {
    __extends(MerchantStatisticsGeneral, _super);
    function MerchantStatisticsGeneral() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.DivEnableFlag = false;
        _this.selcFlag = 1;
        return _this;
    }
    //   constructor( public router: Router ){
    //   super(router);
    //
    // }
    MerchantStatisticsGeneral.prototype.ngOnInit = function () {
        this.loadChart();
    };
    MerchantStatisticsGeneral.prototype.FilterExpandFun = function () {
        if (this.DivEnableFlag == true) {
            $(".rightDiv").animate({ "width": "220px" }, 100);
        }
        else {
            $(".rightDiv").animate({ "width": "25px" }, 100);
        }
    };
    MerchantStatisticsGeneral.prototype.loadChart = function () {
        var parent = this;
        Highcharts.setOptions({
            colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
        });
        // Chart Start
        Highcharts.chart('topFiveCategChart1', {
            chart: {
                type: 'column',
                // Edit chart spacing
                //  spacingBottom: 15,
                spacingTop: 10,
                //  spacingLeft: 10,
                //  spacingRight: 10,
                width: 300,
                height: 350
            },
            exporting: { enabled: false },
            title: {
                text: 'Most viewed product/technology',
                style: {
                    fontSize: '17px',
                    fontFamily: 'proxima-nova-medium',
                }
            },
            credits: {
                enabled: false
            },
            //  subtitle: {
            //      text: 'Source: WorldClimate.com'
            //  },
            xAxis: {
                categories: ['Flooring', 'Ceiling', 'Glazing External', 'Insulation', 'Internal Paint']
            },
            yAxis: {
                title: {
                    text: 'Views'
                }
            },
            labels: {
                enabled: false
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
                    data: [300, 205, 212, 110, 48]
                }
            ]
        });
        Highcharts.chart('topFiveCategChart2', {
            chart: {
                type: 'column',
                // Edit chart spacing
                //  spacingBottom: 15,
                spacingTop: 10,
                //  spacingLeft: 10,
                //  spacingRight: 10,
                width: 300,
                height: 350
            },
            exporting: { enabled: false },
            title: {
                text: 'Most saved product/technology',
                style: {
                    fontSize: '17px',
                    fontFamily: 'proxima-nova-medium',
                }
            },
            credits: {
                enabled: false
            },
            //  subtitle: {
            //      text: 'Source: WorldClimate.com'
            //  },
            xAxis: {
                categories: ['Internal Paint', 'Ceiling', 'Glazing External', 'Flooring', 'Insulation']
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
                    data: [7, 25, 13, 20, 3]
                }
            ]
        });
        Highcharts.chart('topFiveCategChart3', {
            chart: {
                type: 'column',
                // Edit chart spacing
                //  spacingBottom: 15,
                spacingTop: 10,
                //  spacingLeft: 10,
                //  spacingRight: 10,
                width: 300,
                height: 350
            },
            exporting: { enabled: false },
            title: {
                text: 'Most compared product',
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
                categories: ['Glazing External', 'Flooring', 'Insulation', 'Internal Paint', 'Ceiling']
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
                    data: [10, 2, 15, 15, 19]
                }
            ]
        });
        Highcharts.chart('top5regionviewsChart', {
            chart: {
                type: 'column',
                spacingTop: 10,
                width: 480,
                height: 450
            },
            exporting: { enabled: false },
            title: {
                text: 'Most views by region',
                style: {
                    fontSize: '17px',
                    fontFamily: 'proxima-nova-medium'
                }
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: 'Views'
                }
            },
            credits: { enabled: false },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0
                    // dataLabels: {
                    //     enabled: true,
                    //     format: '{point.y}'
                    // }
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> views<br/>'
            },
            series: [{
                    name: 'Region',
                    colorByPoint: true,
                    data: [{
                            name: 'USA',
                            y: 1831,
                            colors: '#058DC7',
                            drilldown: 'USA'
                        }, {
                            name: 'INDIA',
                            y: 1759,
                            color: '#058DC7',
                            drilldown: 'INDIA'
                        }, {
                            name: 'CHINA',
                            y: 1001,
                            color: '#058DC7',
                            drilldown: 'CHINA'
                        }, {
                            name: 'UK',
                            y: 887,
                            color: '#058DC7',
                            drilldown: 'UK'
                        }, {
                            name: 'GERMANY',
                            y: 591,
                            color: '#058DC7',
                            drilldown: 'GERMANY'
                        }]
                }],
            drilldown: {
                series: [{
                        name: 'USA',
                        id: 'USA',
                        data: [
                            [
                                'Washington',
                                600
                            ],
                            [
                                'Ohio',
                                520
                            ],
                            [
                                'North Carolina',
                                156
                            ],
                            [
                                'New Jersey',
                                130
                            ],
                            [
                                'New York',
                                425
                            ]
                        ]
                    }, {
                        name: 'INDIA',
                        id: 'INDIA',
                        data: [
                            [
                                'Delhi',
                                255
                            ],
                            [
                                'Tamil Nadu',
                                292
                            ],
                            [
                                'Andhra Pradesh',
                                353
                            ],
                            [
                                'Gujarat',
                                160
                            ],
                            [
                                'Kerala',
                                201
                            ],
                            [
                                'Maharashtra',
                                189
                            ],
                            [
                                'Uttar Pradesh',
                                124
                            ],
                            [
                                'West Bengal',
                                185
                            ],
                        ]
                    }, {
                        name: 'CHINA',
                        id: 'CHINA',
                        data: [
                            [
                                'Beijing',
                                276
                            ],
                            [
                                'Shanghai',
                                232
                            ],
                            [
                                'Hefei',
                                231
                            ],
                            [
                                'Chongqing',
                                127
                            ],
                            [
                                'Tianjin',
                                102
                            ],
                            [
                                'Shishi',
                                33
                            ]
                        ]
                    }, {
                        name: 'UK',
                        id: 'UK',
                        data: [
                            [
                                'London',
                                256
                            ],
                            [
                                'Manchester',
                                177
                            ],
                            [
                                'Nottingham',
                                142
                            ],
                            [
                                'Oxford',
                                83
                            ],
                            [
                                'Peterborough',
                                229
                            ]
                        ]
                    }, {
                        name: 'GERMANY',
                        id: 'GERMANY',
                        data: [
                            [
                                'Berlin',
                                134
                            ],
                            [
                                'Brandenburg',
                                124
                            ],
                            [
                                'Thuringia',
                                117
                            ],
                            [
                                'Baden-Württemberg',
                                216
                            ]
                        ]
                    }]
            }
        });
        Highcharts.chart('top5queriedChart', {
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
                text: 'Most queried product/technology',
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
        // Chart END
        // // Chart Start 1
        //   Highcharts.setOptions({
        //     colors: ['#64E572', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#058DC7', '#FF9655', '#FFF263', '#6AF9C4']
        // });
        //        Highcharts.chart('topFiveProductChart', {
        //          chart: {
        //            type: 'column'
        //        },
        //        title: {
        //            text: 'Most saved products during past week'
        //        },
        //        credits: {
        //        enabled: false
        //    },
        //       //  subtitle: {
        //       //      text: 'Source: WorldClimate.com'
        //       //  },
        //        xAxis: {
        //            categories: ['Flotex Tile', 'Calla Ceiling Tiles', 'Planiclear', 'Armaflex class 0']
        //        },
        //        yAxis: {
        //            title: {
        //                text: ''
        //            }
        //        },
        //        plotOptions: {
        //            line: {
        //                dataLabels: {
        //                    enabled: true
        //                },
        //                enableMouseTracking: false
        //            }
        //        },
        //        series: [{
        //            name: 'Past week record ',
        //            data: [25,14,12,8]
        //        }
        //
        //      ]
        //       });
        // Chart END 2
    };
    MerchantStatisticsGeneral = __decorate([
        core_1.Component({
            styles: ["\n\n\n\n.border-filter{\n  position: fixed;\nright:0px;\ntop:135px;\nz-index:99;\n  border-radius: 3px;\n  border: 1px solid #dedada;\n  width: 194px;\n  padding: 6px;\n  margin-left: 13px;\n  background-color: #fff;\n  -webkit-box-shadow: 0 6px 4px -4px grey;\n  -moz-box-shadow: 0 6px 4px -4px grey;\n  box-shadow: 0 6px 4px -4px grey;\n}\n\n.rightDiv {\n  position: fixed;\n  right: 3px;\n  top: 135px;\n  z-index: 99;\n  width: 25px;\n  height: 45px;\n  text-align: center;\n  border-radius: 25px;\n  border: 1px solid #dedada;\n  cursor: pointer;\n  background-color: #f8f8f8;\n  -webkit-box-shadow: 0 6px 4px -4px grey;\n  -moz-box-shadow: 0 6px 4px -4px grey;\n  box-shadow: 0 6px 4px -4px grey;\n}\n\n/*.rightDiv:hover{\n    width: 194px;\n\n}*/\n\n\n\n    "],
            templateUrl: './app/pages/merchant/statistics/general.template.html',
        })
    ], MerchantStatisticsGeneral);
    return MerchantStatisticsGeneral;
}(app_component_1.AppComponent));
exports.MerchantStatisticsGeneral = MerchantStatisticsGeneral;
