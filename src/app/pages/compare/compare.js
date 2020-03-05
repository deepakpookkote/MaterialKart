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
var CompareProductComponent = (function (_super) {
    __extends(CompareProductComponent, _super);
    // public merchantInfo:any;
    function CompareProductComponent(router, globalService) {
        var _this = _super.call(this, router, globalService) || this;
        _this.router = router;
        _this.globalService = globalService;
        _this.pageContent = '';
        _this.getApiUrl = _this.ApiURL;
        _this.productData = [];
        _this.compareProd1 = {};
        _this.compareProd2 = {};
        _this.compareProd3 = {};
        _this.Product4ComparePID = [];
        _this.product = {};
        _this.productsFullCategoryObj = [];
        //  public ProductParamerRef:any=['Solar Reflectance - 3 year aged','Solar Reflective Index - Initial (low-slope roof)','Kitchen Faucet flow rate - lpm/gpm at 60 Psi/415 kPa','WC flush rate - lpf/gpf','SHGC','U-value (W/sqm/K or Btu/h·sqft·°F)','Visible Light Transmittance','Life-Cycle Assessment','Environmental Product Declaration','FSC certified wood','Recycled Content','Bio-based material as per SAN SAS (tested as per ASTM D6866)','Health Product Declaration','Cradle to Cradle Certification','REACH compliant','ANSI/BIFMA e3 Furniture Sustainability Standard','Declare','VOC content','VOC emissions'];
        _this.apiKey = localStorage.getItem('GBCItoken');
        _this.accountType = localStorage.getItem('GBCIaccountType');
        _this.searchObject = "";
        _this.searchObject1 = "";
        _this.searchObject2 = "";
        _this.searchObject3 = "";
        _this.hintProducts1 = [];
        _this.hintProducts2 = [];
        _this.hintProducts3 = [];
        _this.orginalHintProducts = [];
        _this.hintContainer1 = false;
        _this.hintContainer2 = false;
        _this.hintContainer3 = false;
        _this.searchHintLocked = [];
        _this.prodCompCategory = "";
        _this.Prod1ChartArry = [];
        _this.Prod2ChartArry = [];
        _this.Prod3ChartArry = [];
        _this.Prod1Parameters = [];
        _this.Prod2Parameters = [];
        _this.Prod3Parameters = [];
        _this.parameterCodes = [];
        _this.LEEDV4EBOM_parameterCodes = [];
        _this.LEEDV4BDID_parameterCodes = [];
        _this.dynamicParameters = [];
        _this.SideVal = "";
        _this.SideValcnt = 0;
        _this.tname = "aaa";
        _this.displayBarChart = false;
        _this.Res4 = "";
        _this.ProductParamerRef = [];
        // public GlobalProductobj:any = [];
        _this.GlobalProductobj = [];
        _this.GlobalProductArr = [];
        _this.FinalObj = [];
        //  CheckParameter(parameterRefId:any,ParameterObj:any){
        //    let parent:any=this;
        //   //  let var1:any="";
        //    var var1 = false;
        //   //  console.log('ParameterObj',ParameterObj,'parameterRefId',parameterRefId);
        //    Object.keys(ParameterObj).forEach(function(key) {
        //         // console.log('key',key+" - "+ ParameterObj[key].name+" - "+parameterRefId);
        //         var n = parameterRefId.localeCompare(ParameterObj[key].name);
        //         if(n=='0'){
        //           var1 = true;
        //           // console.log('ParameterObj.thresholds',ParameterObj[key].thresholds);
        //           // var1 = parseFloat(ParameterObj[key].thresholds);
        //         }
        //     });
        //     return var1;
        //
        //  }
        _this.EnableSubmenu2 = [];
        _this.Submenu2fullObj = [];
        _this.Submenu2Key = "";
        _this.submenu2ArrObj = [];
        _this.submenu2ArrObjKey = [];
        _this.ProdChartArry = [];
        _this.ParamNameForChart = "";
        _this.paramAcidification = [];
        // CompareChartData(ParamName:any,idx:any){
        //   let parent:any=this;
        //   parent.paramAcidification=[];
        //     let dataArr1:any=[];
        //
        //   parent.ParamNameForChart=ParamName;
        //
        //
        //   if(parent.compareProd1.parameters!=undefined && parent.Product4CompareLength>0){
        //   //  console.log('ParamName',ParamName,parent.compareProd1.parameters);
        //     for(let params of parent.compareProd1.parameters){
        //     if(params.name==ParamName){
        //   //    console.log('params.name',params.name,params.submenu2)
        //       if(params.submenu2!=null && params.submenu2!=''){
        //         // if(params.submenu2.Acidification !='' && params.submenu2.Acidification !=undefined){
        //         //   parent.dataArr1.push(params.submenu2.Acidification);
        //         // }else{
        //         //   parent.dataArr1.push('0');
        //         // }
        //
        //         // parent.dataArr1.push((params.submenu2.Acidification !='' && params.submenu2.Acidification !=undefined  )? params.submenu2.Acidification : 0);
        //         var dataInVar = params.submenu2.Acidification !='' ? params.submenu2.Acidification : 0;
        //       //  console.log(dataInVar);
        //         var dataInArray = new Array();
        //         dataInArray.push(parseFloat(dataInVar));
        //         parent.paramAcidification.push({
        //          name: parent.compareProd1.name,
        //         data:dataInArray
        //
        //        });
        //
        //       }
        //     }
        //       // parent.productsFullCategoryObj.push(params.name);
        //       };
        //     //  console.log('parent.paramAcidification',parent.paramAcidification);
        //
        //     }
        //
        //     if(parent.compareProd2.parameters!=undefined && parent.Product4CompareLength>0){
        //       // console.log('ParamName',ParamName,parent.compareProd2.parameters);
        //       for(let params1 of parent.compareProd2.parameters){
        //       if(params1.name==ParamName){
        //       //  console.log('params1.name',params1.name,params1.submenu2)
        //         if(params1.submenu2!=null && params1.submenu2!=''){
        //           parent.paramAcidification.push({
        //            name: parent.compareProd2.name,
        //            data: params1.submenu2.Acidification !='' ? params1.submenu2.Acidification : 0
        //
        //          });
        //         }
        //       }
        //         // parent.productsFullCategoryObj.push(params.name);
        //         };
        //         console.log('parent.paramAcidification2',parent.paramAcidification);
        //
        //       }
        //
        //   // if(parent.compareProd1.parameters!=undefined && parent.Product4CompareLength>0){
        //   //   var paramThresholdVal1=parent.CheckParameter(ParamName,parent.compareProd1.parameters);
        //   //     parent.ProdChartArry.push({
        //   //       name: ParamName,
        //   //       y:paramThresholdVal1 !='' ? paramThresholdVal1 : 0
        //   //     });
        //   // }
        //   // if(parent.compareProd2.parameters!=undefined && parent.Product4CompareLength>0){
        //   //   var paramThresholdVal2=parent.CheckParameter(ParamName,parent.compareProd2.parameters);
        //   //     parent.ProdChartArry.push({
        //   //       name: ParamName,
        //   //       y:paramThresholdVal2 !='' ? paramThresholdVal2 : 0
        //   //     });
        //   // }
        //
        //   // console.log('parent.ProdChartArry',parent.ProdChartArry);
        //   setTimeout( function(){parent.displayBarChart=true; parent.loadChart();}, 1000);
        // }
        _this.paramForChart = [];
        return _this;
    }
    CompareProductComponent.prototype.ngOnInit = function () {
        this.service = this.globalService.getData();
        this.scrollToRatings();
        var service = this.globalService.getData();
        this.prodCompCategory = this.globalService.getData().ComparProductCat;
        // this.keepProductId();
        this.getProduct();
        // this.getMerchantInfo();
        var parent = this;
        // setTimeout( function(){ parent.loadChart();}, 1000);
        // alert (-1.23e-2.toFixed(9))
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.scrollToTop').fadeIn();
            }
            else {
                $('.scrollToTop').fadeOut();
            }
        });
        if (this.accountType == "user") {
            this.getWishlistCategory();
            this.getWishlistData('');
        }
    };
    CompareProductComponent.prototype.keepProductId = function () {
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
    CompareProductComponent.prototype.GetExponentionalVal = function (ParamName, p1, p2) {
        var parent = this;
        var OpVal1, OpVal2;
        //  var expNumber = '2.5989898E+8';
        var resP1 = p1.split("E" || 'e');
        var resP2 = p2.split("E" || 'e');
        var res4;
        // console.log('resP1',resP1[1],'resP2',resP2[1]);
        if (resP1[1] < 0 && resP2[1] < 0) {
            if (resP1[1] > resP2[1]) {
                res4 = resP1[1];
            }
            else {
                res4 = resP2[1];
            }
            // console.log('res4',res4);
            OpVal1 = resP1[0] * (Math.pow(10, parseInt(resP1[1]))) / (Math.pow(10, parseInt(res4)));
            OpVal2 = resP2[0] * (Math.pow(10, parseInt(resP2[1]))) / (Math.pow(10, parseInt(res4)));
            // OpVal2=(parseFloat(resP2[0])*(10^parseInt(resP2[1])))/(10^parseInt(res4));
            // console.log('OpVal1',OpVal1,'OpVal2',OpVal2);
        }
        parent.CompareChartData(ParamName, OpVal1, OpVal2);
        parent.SideVal = 1;
        parent.Res4 = res4;
    };
    CompareProductComponent.prototype.ConvertValues = function (val) {
        var parent = this;
        //  var expNumber = '2.5989898E+8';
        var res = val.split("E" || 'e');
        var OpVal;
        //    if(res.length>1)
        //    {
        //    var tt;
        //    if(parseFloat(res[1])<20)
        //    {
        //    if(parseFloat(res[1])<0)
        //    {
        //    tt=parseFloat(res[1])*(-1) + 2;
        //    }else{
        //    tt=parseFloat(res[1]) + 2;
        //    }
        //    }else{
        //      tt=20;
        //    }
        //    OpVal=parseFloat(val).toFixed(tt);
        //  }else{
        //    OpVal=parseFloat(val);
        //  }
        //   if(res.length>1)
        //   {
        //  OpVal = Math.log10(val);
        //   parent.SideValcnt=parent.SideValcnt+1;
        //
        // }else{
        //   OpVal=parseFloat(val);
        // }
        if (res.length > 1) {
        }
        // return OpVal;
        // console.log('convert Expo',res.length,parseFloat(expNumber).toPrecision(),parseFloat(expNumber).toFixed(tt));
    };
    CompareProductComponent.prototype.getParameterCodes = function () {
        this.LEEDV4BDID_parameterCodes = {
            'Concrete': {
                'SS01': 'false',
                'SS02': 'false',
                'EA01': 'false',
                'EA02': 'false',
                'EA03': 'false',
                'WE01': 'false',
                'WE02': 'false',
                //  'MR01':'true',
                'MR02': 'true',
                'MR03': 'false',
                'MR04': 'true',
                'MR05': 'false',
                'MR06': 'true',
                'MR07': 'true',
                'MR08': 'true',
                'MR09': 'false',
                'MR10': 'true',
                'MR11': 'false',
                'MR12': 'false',
                'IEQ01': 'false',
                'IEQ02': 'false',
                'IEQ03': 'false',
                'IEQ04': 'false'
            },
            'Glazing External': {
                'SS01': 'false',
                'SS02': 'false',
                'EA01': 'true',
                'EA02': 'true',
                'EA03': 'true',
                'WE01': 'false',
                'WE02': 'false',
                //  'MR01':'true',
                'MR02': 'true',
                'MR03': 'false',
                'MR04': 'true',
                'MR05': 'false',
                'MR06': 'true',
                'MR07': 'true',
                'MR08': 'true',
                'MR09': 'false',
                'MR10': 'true',
                'MR11': 'false',
                'MR12': 'false',
                'IEQ01': 'false',
                'IEQ02': 'false',
                'IEQ03': 'false',
                'IEQ04': 'false'
            },
            'Glazing Internal': {
                'SS01': 'false',
                'SS02': 'false',
                'EA01': 'false',
                'EA02': 'false',
                'EA03': 'false',
                'WE01': 'false',
                'WE02': 'false',
                //  'MR01':'true',
                'MR02': 'true',
                'MR03': 'false',
                'MR04': 'true',
                'MR05': 'false',
                'MR06': 'true',
                'MR07': 'true',
                'MR08': 'true',
                'MR09': 'false',
                'MR10': 'true',
                'MR11': 'false',
                'MR12': 'false',
                'IEQ01': 'false',
                'IEQ02': 'false',
                'IEQ03': 'false',
                'IEQ04': 'false'
            },
            'Ceiling': {
                'SS01': 'false',
                'SS02': 'false',
                'EA01': 'false',
                'EA02': 'false',
                'EA03': 'false',
                'WE01': 'false',
                'WE02': 'false',
                //  'MR01':'true',
                'MR02': 'true',
                'MR03': 'false',
                'MR04': 'true',
                'MR05': 'false',
                'MR06': 'true',
                'MR07': 'true',
                'MR08': 'true',
                'MR09': 'false',
                'MR10': 'true',
                'MR11': 'false',
                'MR12': 'false',
                'IEQ01': 'true',
                'IEQ02': 'true',
                'IEQ03': 'true',
                'IEQ04': 'true'
            },
            'Flooring': {
                'SS01': 'false',
                'SS02': 'false',
                'EA01': 'false',
                'EA02': 'false',
                'EA03': 'false',
                'WE01': 'false',
                'WE02': 'false',
                //  'MR01':'true',
                'MR02': 'true',
                'MR03': 'true',
                'MR04': 'true',
                'MR05': 'true',
                'MR06': 'true',
                'MR07': 'true',
                'MR08': 'true',
                'MR09': 'false',
                'MR10': 'true',
                'MR11': 'false',
                'MR12': 'false',
                'IEQ01': 'true',
                'IEQ02': 'true',
                'IEQ03': 'true',
                'IEQ04': 'true'
            },
            'Insulation': {
                'SS01': 'false',
                'SS02': 'false',
                'EA01': 'false',
                'EA02': 'true',
                'EA03': 'false',
                'WE01': 'false',
                'WE02': 'false',
                //  'MR01':'true',
                'MR02': 'true',
                'MR03': 'false',
                'MR04': 'true',
                'MR05': 'true',
                'MR06': 'true',
                'MR07': 'true',
                'MR08': 'true',
                'MR09': 'false',
                'MR10': 'true',
                'MR11': 'false',
                'MR12': 'false',
                'IEQ01': 'true',
                'IEQ02': 'true',
                'IEQ03': 'false',
                'IEQ04': 'false'
            },
            'WC': {
                'SS01': 'false',
                'SS02': 'false',
                'EA01': 'false',
                'EA02': 'false',
                'EA03': 'false',
                'WE01': 'false',
                'WE02': 'true',
                //  'MR01':'true',
                'MR02': 'true',
                'MR03': 'false',
                'MR04': 'true',
                'MR05': 'false',
                'MR06': 'true',
                'MR07': 'true',
                'MR08': 'true',
                'MR09': 'false',
                'MR10': 'true',
                'MR11': 'false',
                'MR12': 'false',
                'IEQ01': 'false',
                'IEQ02': 'false',
                'IEQ03': 'false',
                'IEQ04': 'false'
            },
            'Indoor Furniture': {
                'SS01': 'false',
                'SS02': 'false',
                'EA01': 'false',
                'EA02': 'false',
                'EA03': 'false',
                'WE01': 'false',
                'WE02': 'false',
                //  'MR01':'true',
                'MR02': 'true',
                'MR03': 'true',
                'MR04': 'true',
                'MR05': 'true',
                'MR06': 'true',
                'MR07': 'true',
                'MR08': 'true',
                'MR09': 'true',
                'MR10': 'true',
                'MR11': 'false',
                'MR12': 'false',
                'IEQ01': 'true',
                'IEQ02': 'true',
                'IEQ03': 'true',
                'IEQ04': 'false'
            },
            'Laminate': {
                'SS01': 'false',
                'SS02': 'false',
                'EA01': 'false',
                'EA02': 'false',
                'EA03': 'false',
                'WE01': 'false',
                'WE02': 'false',
                //  'MR01':'true',
                'MR02': 'true',
                'MR03': 'true',
                'MR04': 'true',
                'MR05': 'true',
                'MR06': 'true',
                'MR07': 'true',
                'MR08': 'true',
                'MR09': 'false',
                'MR10': 'true',
                'MR11': 'false',
                'MR12': 'false',
                'IEQ01': 'true',
                'IEQ02': 'true',
                'IEQ03': 'true',
                'IEQ04': 'false'
            },
            'Internal Paint': {
                'SS01': 'false',
                'SS02': 'false',
                'EA01': 'false',
                'EA02': 'false',
                'EA03': 'false',
                'WE01': 'false',
                'WE02': 'false',
                //  'MR01':'true',
                'MR02': 'true',
                'MR03': 'false',
                'MR04': 'false',
                'MR05': 'false',
                'MR06': 'true',
                'MR07': 'true',
                'MR08': 'true',
                'MR09': 'false',
                'MR10': 'true',
                'MR11': 'true',
                'MR12': 'true',
                'IEQ01': 'true',
                'IEQ02': 'true',
                'IEQ03': 'true',
                'IEQ04': 'false'
            },
            //  'Flooring carpet':{
            //    'SS01':'false',
            //    'SS02':'false',
            //    'EA01':'false',
            //    'EA02':'false',
            //    'EA03':'false',
            //    'WE01':'false',
            //    'WE02':'false',
            //   //  'MR01':'true',
            //    'MR02':'true',
            //    'MR03':'false',
            //    'MR04':'true',
            //    'MR05':'true',
            //    'MR06':'true',
            //    'MR07':'true',
            //    'MR08':'true',
            //    'MR09':'false',
            //    'MR10':'true',
            //    'MR11':'false',
            //    'MR12':'false',
            //    'IEQ01':'true',
            //    'IEQ02':'true',
            //    'IEQ03':'true',
            //    'IEQ04':'true'
            //  },
            'Faucet': {
                'SS01': 'false',
                'SS02': 'false',
                'EA01': 'false',
                'EA02': 'false',
                'EA03': 'false',
                'WE01': 'true',
                'WE02': 'false',
                //  'MR01':'true',
                'MR02': 'true',
                'MR03': 'false',
                'MR04': 'true',
                'MR05': 'true',
                'MR06': 'true',
                'MR07': 'true',
                'MR08': 'true',
                'MR09': 'false',
                'MR10': 'true',
                'MR11': 'false',
                'MR12': 'false',
                'IEQ01': 'false',
                'IEQ02': 'false',
                'IEQ03': 'false',
                'IEQ04': 'false'
            },
            'Adhesive': {
                'SS01': 'false',
                'SS02': 'false',
                'EA01': 'false',
                'EA02': 'false',
                'EA03': 'false',
                'WE01': 'false',
                'WE02': 'false',
                //  'MR01':'true',
                'MR02': 'true',
                'MR03': 'false',
                'MR04': 'true',
                'MR05': 'true',
                'MR06': 'true',
                'MR07': 'true',
                'MR08': 'true',
                'MR09': 'false',
                'MR10': 'true',
                'MR11': 'false',
                'MR12': 'false',
                'IEQ01': 'true',
                'IEQ02': 'true',
                'IEQ03': 'false',
                'IEQ04': 'false'
            }
        };
        this.LEEDV4EBOM_parameterCodes = {
            'Concrete': {
                'SS01': 'false',
                'SS02': 'false',
                'EA01': 'false',
                'EA02': 'false',
                'EA03': 'false',
                'WE01': 'false',
                'WE02': 'false',
                //  'MR01':'false',
                'MR02': 'false',
                'MR03': 'false',
                'MR04': 'false',
                'MR05': 'false',
                'MR06': 'false',
                'MR07': 'false',
                'MR08': 'false',
                'MR09': 'false',
                'MR10': 'false',
                'IEQ01': 'false',
                'IEQ02': 'false',
                'IEQ03': 'false',
                'IEQ04': 'false'
            },
            'Glazing External': {
                'SS01': 'false',
                'SS02': 'false',
                'EA01': 'true',
                'EA02': 'true',
                'EA03': 'true',
                'WE01': 'false',
                'WE02': 'false',
                //  'MR01':'false',
                'MR02': 'false',
                'MR03': 'false',
                'MR04': 'false',
                'MR05': 'false',
                'MR06': 'false',
                'MR07': 'false',
                'MR08': 'false',
                'MR09': 'false',
                'MR10': 'false',
                'IEQ01': 'false',
                'IEQ02': 'false',
                'IEQ03': 'false',
                'IEQ04': 'false'
            },
            'Glazing Internal': {
                'SS01': 'false',
                'SS02': 'false',
                'EA01': 'false',
                'EA02': 'false',
                'EA03': 'false',
                'WE01': 'false',
                'WE02': 'false',
                //  'MR01':'false',
                'MR02': 'false',
                'MR03': 'false',
                'MR04': 'false',
                'MR05': 'false',
                'MR06': 'false',
                'MR07': 'false',
                'MR08': 'false',
                'MR09': 'false',
                'MR10': 'false',
                'IEQ01': 'false',
                'IEQ02': 'false',
                'IEQ03': 'false',
                'IEQ04': 'false'
            },
            'Ceiling': {
                'SS01': 'false',
                'SS02': 'false',
                'EA01': 'false',
                'EA02': 'false',
                'EA03': 'false',
                'WE01': 'false',
                'WE02': 'false',
                //  'MR01':'false',
                'MR02': 'false',
                'MR03': 'false',
                'MR04': 'false',
                'MR05': 'false',
                'MR06': 'false',
                'MR07': 'false',
                'MR08': 'false',
                'MR09': 'false',
                'MR10': 'false',
                'IEQ01': 'false',
                'IEQ02': 'true',
                'IEQ03': 'true',
                'IEQ04': 'true'
            },
            'Flooring': {
                'SS01': 'false',
                'SS02': 'false',
                'EA01': 'false',
                'EA02': 'false',
                'EA03': 'false',
                'WE01': 'false',
                'WE02': 'false',
                //  'MR01':'false',
                'MR02': 'false',
                'MR03': 'false',
                'MR04': 'false',
                'MR05': 'false',
                'MR06': 'false',
                'MR07': 'false',
                'MR08': 'false',
                'MR09': 'false',
                'MR10': 'false',
                'IEQ01': 'false',
                'IEQ02': 'true',
                'IEQ03': 'true',
                'IEQ04': 'true'
            },
            'Insulation': {
                'SS01': 'false',
                'SS02': 'false',
                'EA01': 'false',
                'EA02': 'true',
                'EA03': 'false',
                'WE01': 'false',
                'WE02': 'false',
                //  'MR01':'false',
                'MR02': 'false',
                'MR03': 'false',
                'MR04': 'false',
                'MR05': 'false',
                'MR06': 'false',
                'MR07': 'false',
                'MR08': 'false',
                'MR09': 'false',
                'MR10': 'false',
                'IEQ01': 'false',
                'IEQ02': 'true',
                'IEQ03': 'false',
                'IEQ04': 'false'
            },
            'WC': {
                'SS01': 'false',
                'SS02': 'false',
                'EA01': 'false',
                'EA02': 'false',
                'EA03': 'false',
                'WE01': 'false',
                'WE02': 'true',
                //  'MR01':'false',
                'MR02': 'false',
                'MR03': 'false',
                'MR04': 'false',
                'MR05': 'false',
                'MR06': 'false',
                'MR07': 'false',
                'MR08': 'false',
                'MR09': 'false',
                'MR10': 'false',
                'IEQ01': 'false',
                'IEQ02': 'false',
                'IEQ03': 'false',
                'IEQ04': 'false'
            },
            'Indoor Furniture': {
                'SS01': 'false',
                'SS02': 'false',
                'EA01': 'false',
                'EA02': 'false',
                'EA03': 'false',
                'WE01': 'false',
                'WE02': 'false',
                //  'MR01':'false',
                'MR02': 'false',
                'MR03': 'false',
                'MR04': 'false',
                'MR05': 'false',
                'MR06': 'false',
                'MR07': 'false',
                'MR08': 'false',
                'MR09': 'false',
                'MR10': 'false',
                'IEQ01': 'false',
                'IEQ02': 'false',
                'IEQ03': 'true',
                'IEQ04': 'false'
            },
            'Laminate': {
                'SS01': 'false',
                'SS02': 'false',
                'EA01': 'false',
                'EA02': 'false',
                'EA03': 'false',
                'WE01': 'false',
                'WE02': 'false',
                //  'MR01':'false',
                'MR02': 'false',
                'MR03': 'false',
                'MR04': 'false',
                'MR05': 'false',
                'MR06': 'false',
                'MR07': 'false',
                'MR08': 'false',
                'MR09': 'false',
                'MR10': 'false',
                'IEQ01': 'true',
                'IEQ02': 'true',
                'IEQ03': 'true',
                'IEQ04': 'false'
            },
            'Internal Paint': {
                'SS01': 'false',
                'SS02': 'false',
                'EA01': 'false',
                'EA02': 'false',
                'EA03': 'false',
                'WE01': 'false',
                'WE02': 'false',
                //  'MR01':'false',
                'MR02': 'false',
                'MR03': 'false',
                'MR04': 'false',
                'MR05': 'false',
                'MR06': 'false',
                'MR07': 'false',
                'MR08': 'false',
                'MR09': 'false',
                'MR10': 'false',
                'IEQ01': 'true',
                'IEQ02': 'true',
                'IEQ03': 'true',
                'IEQ04': 'false'
            },
            //  'Flooring carpet':{
            //    'SS01':'false',
            //    'SS02':'false',
            //    'EA01':'false',
            //    'EA02':'false',
            //    'EA03':'false',
            //    'WE01':'false',
            //    'WE02':'false',
            //   //  'MR01':'false',
            //    'MR02':'false',
            //    'MR03':'false',
            //    'MR04':'false',
            //    'MR05':'false',
            //    'MR06':'false',
            //    'MR07':'false',
            //    'MR08':'false',
            //    'MR09':'false',
            //    'MR10':'false',
            //    'IEQ01':'false',
            //    'IEQ02':'true',
            //    'IEQ03':'true',
            //    'IEQ04':'true'
            //  },
            'Faucet': {
                'SS01': 'false',
                'SS02': 'false',
                'EA01': 'false',
                'EA02': 'false',
                'EA03': 'false',
                'WE01': 'true',
                'WE02': 'false',
                //  'MR01':'true',
                'MR02': 'true',
                'MR03': 'false',
                'MR04': 'true',
                'MR05': 'true',
                'MR06': 'true',
                'MR07': 'true',
                'MR08': 'true',
                'MR09': 'false',
                'MR10': 'true',
                'IEQ01': 'false',
                'IEQ02': 'false',
                'IEQ03': 'false',
                'IEQ04': 'false'
            },
            'Adhesive': {
                'SS01': 'false',
                'SS02': 'false',
                'EA01': 'false',
                'EA02': 'false',
                'EA03': 'false',
                'WE01': 'false',
                'WE02': 'false',
                //  'MR01':'true',
                'MR02': 'true',
                'MR03': 'false',
                'MR04': 'true',
                'MR05': 'true',
                'MR06': 'true',
                'MR07': 'true',
                'MR08': 'true',
                'MR09': 'false',
                'MR10': 'true',
                'IEQ01': 'true',
                'IEQ02': 'true',
                'IEQ03': 'false',
                'IEQ04': 'false'
            }
        };
    };
    //   getParameterNames(){
    //     let TempParameters:any=[];
    //     let ratingVal=$('#productparameter').val();
    //
    //     let ele:any = document.getElementById('productCategory');
    //     var productCategory = ele.value;
    //     this.selectedCategory = productCategory;
    //     this.dynamicParameters = [];
    //     var parameterMappings = {
    //      'SS01':'Solar Reflectance - 3 year aged',
    //      'SS02':'Solar Reflective Index - Initial (low-slope roof)',
    //      'WE01':'Kitchen Faucet flow rate - lpm/gpm at 60 Psi/415 kPa',
    //      'WE02':'WC flush rate - lpf/gpf',
    //      'EA01':'SHGC',
    //      'EA02':'SU-value (W/sqm/K or Btu/h·sqft·°F)HGC',
    //      'EA03':'Visible Light Transmittance',
    //
    //      'MR02':'Environmental Product Declaration',
    //      'MR03':'FSC certified wood',
    //      'MR04':'Recycled Content',
    //      'MR05':'Bio-based material as per SAN"s',
    //      'MR06':'Health Product Declaration',
    //      'MR07':'Cradle to Cradle Certification',
    //      'MR08':'REACH compliant',
    //      'MR09':'ANSI/BIFMA e3 Furniture Sustainability Standard',
    //      'MR10':'Declare',
    //      'MR11':'Lead Content',
    //      'MR12':'Cadmium Content',
    //      'IEQ01':'VOC content',
    //      'IEQ02':'VOC emissions',
    //      'IEQ03':'Surface Reflectance',
    //      'IEQ04':'Noise Reduction Coefficient'
    //     };
    //
    //      // this.LEEDV4EBOM_parameterCodes
    //
    //    //  console.log('productCategory',productCategory,'ratingVal',ratingVal);
    //
    //     if(ratingVal=="LEED V4 EBOM"){
    //
    //       TempParameters=this.LEEDV4EBOM_parameterCodes;
    //     }else{
    //
    //       TempParameters=this.LEEDV4BDID_parameterCodes;
    //     }
    //
    // this.parameterCodes=TempParameters;
    //
    //     for(var param in this.parameterCodes[''+productCategory]){
    //       var isParamApplicable = this.parameterCodes[''+productCategory][''+param];
    //       if(((typeof(parameterMappings[''+param]) != 'undefined'))&&(isParamApplicable == 'true')){
    //        //  console.log(isParamApplicable,param);
    //         this.dynamicParameters.push(parameterMappings[''+param]);
    //       }
    //     }
    //
    //   }
    CompareProductComponent.prototype.getProduct = function () {
        var parent = this;
        var productId = localStorage.getItem('activeProductId');
        parent.Product4Compare = this.globalService.getData().ComparProductId;
        //  parent.Product4Compare=this.globalService.getData().ComparProductId;
        // console.log('parent.Product4Compare',parent.Product4Compare);
        parent.Product4CompareLength = parent.Product4Compare.length;
        if (parent.Product4Compare.length > 0) {
            var index;
            for (index = 0; index < parent.Product4Compare.length; index++) {
                //  console.log(parent.Product4Compare[index]);
                parent.getProductInformations(parent.Product4Compare[index], index);
                parent.Product4ComparePID.push(parent.Product4Compare[index]);
            }
        }
        else {
            parent.compareProd1 = "";
            parent.compareProd2 = "";
            parent.compareProd3 = "";
            parent.Product4CompareLength = 0;
        }
        // if(parent.Product4Compare.length>0){
        //
        //
        //    var str = parent.Product4Compare;
        //    var str_array = str.split(',');
        //
        //    parent.Product4CompareLength=str_array.length;
        //    console.log('parent.Product4CompareLength',parent.Product4CompareLength);
        //    for(var i = 0; i < str_array.length; i++) {
        //       // Trim the excess whitespace.
        //       str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
        //       // Add additional code here, such as:
        //      parent.getProductInformations(str_array[i],i);
        //      parent.Product4ComparePID.push(str_array[i]);
        //      //  console.log(str_array[i],str_array.length);
        //    }
        //  }else{
        //    parent.compareProd1="";parent.compareProd2="";parent.compareProd3="";
        //    parent.Product4CompareLength=0;
        //
        //  }
    };
    CompareProductComponent.prototype.getProductInformations = function (productId, idx) {
        var parent = this;
        $.post(this.ApiURL + 'products/public_product_view', {
            'data': {
                'filter': {
                    'productId': productId
                }
            }
        }, function (res) {
            //parent.product=res.products[0];
            if (res.products[0] != null) {
                // console.log('res',res);
                if (idx == '0') {
                    parent.compareProd1 = res.products[0];
                    parent.Prod1Parameters = res.products[0].parameters;
                    for (var _i = 0, _a = parent.Prod1Parameters; _i < _a.length; _i++) {
                        var params = _a[_i];
                        // parent.ProductParamerRef.push(params.name);
                        parent.productsFullCategoryObj.push(params.name);
                    }
                    ;
                    // console.log('parent.ProductParamerRef',parent.ProductParamerRef);
                    // console.log('parent.Prod1Parameters',parent.Prod1Parameters);
                }
                else if (idx == '1') {
                    parent.compareProd2 = res.products[0];
                    parent.Prod2Parameters = res.products[0].parameters;
                    //  console.log('parent.compareProd2',parent.compareProd2);
                    for (var _b = 0, _c = parent.Prod2Parameters; _b < _c.length; _b++) {
                        var params1 = _c[_b];
                        // parent.ProductParamerRef.push(params1.name);
                        parent.productsFullCategoryObj.push(params1.name);
                    }
                    ;
                    // console.log('parent.compareProd2',parent.compareProd2);
                }
                else if (idx == '2') {
                    parent.compareProd3 = res.products[0];
                    parent.Prod3Parameters = res.products[0].parameters;
                    for (var _d = 0, _e = parent.Prod3Parameters; _d < _e.length; _d++) {
                        var params2 = _e[_d];
                        // parent.ProductParamerRef.push(params1.name);
                        parent.productsFullCategoryObj.push(params2.name);
                    }
                    ;
                    // console.log('parent.compareProd3',parent.compareProd3);
                }
                else {
                }
                if (parent.compareProd1.parameters) {
                    for (var _f = 0, _g = parent.compareProd1.parameters; _f < _g.length; _f++) {
                        var item = _g[_f];
                        if (parent.GlobalProductobj[item.name] == undefined) {
                            parent.GlobalProductobj[item.name] = [];
                        }
                        parent.GlobalProductobj[item.name]['p1'] = [];
                        parent.GlobalProductobj[item.name]['p1']['thresholds'] = item.thresholds;
                        parent.GlobalProductobj[item.name]['p1']['submenu1'] = item.submenu1;
                        parent.GlobalProductobj[item.name]['p1']['submenu2'] = item.submenu2;
                    }
                }
                if (parent.compareProd2.parameters) {
                    for (var _h = 0, _j = parent.compareProd2.parameters; _h < _j.length; _h++) {
                        var item = _j[_h];
                        if (parent.GlobalProductobj[item.name] == undefined) {
                            parent.GlobalProductobj[item.name] = [];
                        }
                        parent.GlobalProductobj[item.name]['p2'] = [];
                        parent.GlobalProductobj[item.name]['p2']['thresholds'] = item.thresholds;
                        parent.GlobalProductobj[item.name]['p2']['submenu1'] = item.submenu1;
                        parent.GlobalProductobj[item.name]['p2']['submenu2'] = item.submenu2;
                    }
                }
            }
            // parent.FinalObj=parent.GlobalProductobj;
            //           Object.keys(parent.GlobalProductobj).forEach( key => {
            //      console.log(parent.GlobalProductobj[key]); //value
            //      console.log(key); //key
            // });
            // let nullArray:any = [];
            // let notNullArray:any = [];
            //
            //  Object.keys(parent.GlobalProductobj).forEach(function(key) {
            //    console.log('key',key);
            // var item = {};
            // item[key] = parent.GlobalProductobj[key];
            //
            // if(parent.GlobalProductobj[key]){
            //  parent.FinalObj.push(item);
            // } else {
            //  nullArray.push(item);
            // }
            // });
            // parent.FinalObj=parent.toArray(parent.GlobalProductobj);
            // console.log('parent.FinalObj',parent.FinalObj);
            console.log('parent.GlobalProductobj', parent.GlobalProductobj);
            parent.ProductParamerRef = parent.productsFullCategoryObj.filter(function (item, i, ar) { return ar.indexOf(item) === i; });
            // console.log('parent.ProductParamerRef',parent.ProductParamerRef);
        });
    };
    CompareProductComponent.prototype.toFor = function (obj) {
        console.log("#", obj);
    };
    CompareProductComponent.prototype.checkSubmenu1 = function (obj1) {
        if (obj1.submenu1 != '' && obj1.submenu2 != '' && obj1.submenu2 != undefined && obj1.submenu2 != null) {
            // console.log('objLen',obj1.submenu2);
            return 'EFD';
        }
        if (obj1.submenu1 != '') {
            // console.log('objLen',obj1.submenu2);
            return obj1.submenu1;
        }
        if (obj1.submenu1 != '') {
            // console.log('objLen',obj1.submenu2);
            return obj1.submenu1;
        }
    };
    CompareProductComponent.prototype.checkSubmenu2 = function (obj1) {
        if (obj1.submenu1 != '' && obj1.submenu2 != '' && obj1.submenu2 != undefined && obj1.submenu2 != null) {
            // console.log('objLen',obj1.submenu2);
            return 'EFD';
        }
        if (obj1.submenu1 != '') {
            // console.log('objLen',obj1.submenu2);
            return obj1.submenu1;
        }
        if (obj1.submenu1 != '') {
            // console.log('objLen',obj1.submenu2);
            return obj1.submenu1;
        }
    };
    CompareProductComponent.prototype.CheckThresold1 = function (obj1, index) {
        //console.log('CheckThresoldA',obj1);
        //let tickMark=document.getElementById("p"+index);
        if (obj1.p1 != undefined) {
            if (obj1.p2 == undefined) {
                //  tickMark.style.display="none";
                return 'tick';
            }
            if (obj1.p2.thresholds == '') {
                ////  tickMark.style.display="none";
                return 'tick';
            }
            else {
                return obj1.p1.thresholds;
            }
        }
    };
    CompareProductComponent.prototype.CheckThresold2 = function (obj2, index) {
        // console.log('CheckThresoldA',obj2);
        //let tickMark=document.getElementById("p"+index);
        if (obj2.p2 != undefined) {
            if (obj2.p1 == undefined) {
                return 'tick';
            }
            if (obj2.p1.thresholds == '') {
                //tickMark.style.display="none";
                return 'tick';
            }
            else {
                return obj2.p2.thresholds;
            }
        }
    };
    CompareProductComponent.prototype.getMerchantInfo = function () {
        var parent = this;
        $.post(this.ApiURL + 'Merchant/merchant_information', {
            'data': {
                'key': parent.apiKey,
                'filter': {},
            }
        }, function (res) {
            if (res != null) {
                parent.merchantInfo = res.userInfo;
            }
        });
    };
    CompareProductComponent.prototype.scroll2Top = function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
    };
    CompareProductComponent.prototype.Printf = function (data) {
        console.log('Dataaa', data);
    };
    CompareProductComponent.prototype.CheckParameter = function (parameterRefId, ParameterObj, idx) {
        var parent = this;
        var var1 = "";
        // console.log('parameterRefId',parameterRefId,ParameterObj,idx);
        // for(let [params,key] of ParameterObj){
        for (var params in ParameterObj) {
            //  console.log('params',params,ParameterObj[params]);
            if (ParameterObj[params].name == parameterRefId) {
                parent.Submenu2Key = params;
                if (ParameterObj[params].submenu1 != '' && ParameterObj[params].submenu1 != null) {
                    // console.log('params.submenu1',ParameterObj[params].submenu1);
                }
                if (ParameterObj[params].submenu2 != '' && ParameterObj[params].submenu2 != null) {
                    // console.log('params.submenu2',ParameterObj[params].submenu2);
                    parent.EnableSubmenu2[idx] = true;
                    parent.itrateSubmenu2(ParameterObj[params].submenu2, idx);
                }
                else {
                    parent.EnableSubmenu2[idx] = false;
                    // parent.Submenu2fullObj[idx]=[];
                }
            }
            //  parent.var1= params.thresholds !='' ? params.thresholds : '';
            //   if(params.name=='Environmental Product Declaration'){
            // //  //    console.log('ParameterObj',ParameterObj,'parameterRefId',parameterRefId);
            //     parent.var1= params.submenu1 !='' ? params.submenu1 : '';
            //
            //   }
            //
            // if(params.name=='Recycled Content'){
            //        parent.var1= params.submenu1 !='' ? params.submenu1 : '';
            //
            //    }
            //
            //    if(params.name=='Cradle to Cradle Certification'){
            //       parent.var1= params.submenu1 !='' ? params.submenu1 : '';
            //
            //    }
        }
        //  if(parameterRefId=='Environmental Product Declaration'){
        //    console.log('ParameterObj',ParameterObj,'parameterRefId',parameterRefId);
        //    parent.var1=ParameterObj.parameters.submenu1;
        //  }
        //  else if(parameterRefId=='Recycled Content'){
        //    parent.var1=ParameterObj.parameters.submenu1;
        //  }else if(parameterRefId=='Cradle to Cradle Certification'){
        //    parent.var1=ParameterObj.parameters.submenu1;
        //  }else{
        //    parent.var1=ParameterObj.parameters.thresholds;
        //
        //  }
        // return parent.var1;
    };
    CompareProductComponent.prototype.toArray = function (obj) {
        if (obj) {
            return Object.keys(obj).map(function (key) { return obj[key]; });
        }
    };
    CompareProductComponent.prototype.itrateSubmenu2 = function (data, idx) {
        var parent = this;
        // console.log(data);
        parent.submenu2ArrObj[idx] = $.map(data, function (value, index) {
            //console.log('index',index,value);
            return [value];
        });
        parent.submenu2ArrObjKey[idx] = $.map(data, function (value, index) {
            return [index];
        });
        console.log('submenu2ArrObj', parent.submenu2ArrObj[idx]);
    };
    // itrateSubmenu2(data:any,idx:any){
    //    let parent:any=this;
    //   // console.log(data);
    //
    //   parent.submenu2ArrObj[idx] = $.map(data, function(value:any, index:any) {
    //     //console.log('index',index,value);
    //     return [value];
    // });
    // parent.submenu2ArrObjKey[idx] = $.map(data, function(value:any, index:any) {
    //   //console.log('index',index,value);
    //   return [index];
    // });
    // //console.log('submenu2ArrObj',parent.submenu2ArrObj);
    // }
    CompareProductComponent.prototype.productPageSlider = function (productId) {
        var token = localStorage.getItem('GBCItoken');
        var service = this.globalService.getData();
        // console.log(service,val);
        this.globalService.setData({
            'productId': productId
        });
        //console.log(this.globalService.getData());
        if (token == '' || token == null) {
            this.redirect('page-login', {});
        }
        else {
            this.redirect('page-product', {});
        }
        //#page-product
    };
    CompareProductComponent.prototype.objExp = function (data) {
        // console.log('objAry',data.slice(0,1));
        console.log('objAry', data);
    };
    CompareProductComponent.prototype.ReloadPage = function (pID) {
        var parent = this;
        var Pindex = parent.Product4ComparePID.indexOf(pID);
        // console.log(parent.Product4ComparePID,Pindex);
        if (Pindex > -1) {
            parent.Product4ComparePID.splice(Pindex, 1);
            //  localStorage.setItem('ComparProductId', parent.Product4ComparePID);
            this.globalService.setData({
                'ComparProductId': parent.Product4ComparePID
            });
            //  console.log('Remove parent.productCompareData',parent.Product4ComparePID);
        }
        if (parent.Product4ComparePID.length == 0) {
            this.globalService.setData({
                'ComparProductCat': ''
            });
            this.productCompareCategory = this.globalService.getData().ComparProductCat;
            // console.log('this.productCompareCategory',this.productCompareCategory);
        }
    };
    CompareProductComponent.prototype.hintFilter = function (val, indx) {
        var parent = this;
        parent.hintProducts1 = [];
        parent.hintProducts2 = [];
        parent.hintProducts3 = [];
        parent.searchHintLocked = [];
        //  console.log('val',val);
        //this.globalService.setData({});
        this.globalService.setData({
            'productId': '',
            'productSearch': ''
        });
        if (this.searchObject1.length > 1 || this.searchObject2.length > 1 || this.searchObject3.length > 1) {
            if (indx == '0') {
                this.hintContainer1 = true;
            }
            else if (indx == '1') {
                this.hintContainer2 = true;
            }
            else if (indx == '2') {
                this.hintContainer3 = true;
            }
            else
                ;
            $.post(this.ApiURL + 'products/public_product_view', {
                'data': {
                    'filter': {
                        'name-category': val,
                        'category': this.prodCompCategory,
                    },
                    'extra': {
                        'pageJump': 0,
                        //'orderByDateCreated':-1 /* Descending order , Not mandatory order by date created */
                        'required': ['name', 'category', 'images']
                    }
                }
            }, function (res) {
                // console.log('resssss',res);
                if (indx == '0') {
                    parent.hintProducts1 = res.products;
                    // console.log('parent.compareProd1',parent.compareProd1);
                }
                else if (indx == '1') {
                    parent.hintProducts2 = res.products;
                    // console.log('parent.compareProd2',parent.compareProd2);
                }
                else if (indx == '2') {
                    parent.hintProducts3 = res.products;
                    // console.log('parent.compareProd3',parent.compareProd3);
                }
                else {
                }
                // console.log('parent.hintProducts',parent.hintProducts);
            });
        }
        else {
            if (indx == '0') {
                this.hintContainer1 = false;
            }
            else if (indx == '1') {
                this.hintContainer2 = false;
            }
            else if (indx == '2') {
                this.hintContainer3 = false;
            }
            else
                ;
        }
    };
    //   hintDisplayLogic(name:any,category:any){
    //
    //
    //     var lengthSrch=(this.searchObject).length;
    //     let categ=category.substr(0,lengthSrch);
    //     let nam=name.substr(0,lengthSrch);
    //     nam=nam.toLowerCase();
    //
    // //console.log(nam,'--',this.searchObject);
    //         if(nam==this.searchObject){
    //
    //              this.checkk(this.orginalHintProducts);
    //
    //         //  return name;
    //         }else{
    //           if( (this.searchHintLocked).indexOf(categ) < 0 ){
    //             (this.hintProducts).unshift({name:category,productId:'',category:category});
    //             (this.searchHintLocked).push(categ);
    //             this.checkk(this.hintProducts);
    //           //  return category;
    //           }else{
    //             //return name;
    //           }
    //         }
    //
    //   }
    // checkk(eve:any){
    //   let parent=this;  parent.hintProducts=eve;
    //  setTimeout(function(){   },100);
    //
    // }
    CompareProductComponent.prototype.hintPull = function (val, id, idxx) {
        //  console.log(val);
        if (idxx == '0') {
            this.searchObject1 = val;
        }
        else if (idxx == '1') {
            this.searchObject2 = val;
        }
        else if (idxx == '2') {
            this.searchObject3 = val;
            // console.log('parent.compareProd3',parent.compareProd3);
        }
        else {
        }
        this.globalService.setData({
            'productId': id,
        });
    };
    CompareProductComponent.prototype.getSingleProduct = function (pID, idx) {
        var parent = this;
        parent.Product4Compare[idx] = pID;
        this.globalService.setData({
            'ComparProductId': parent.Product4Compare
        });
        parent.Product4Compare = this.globalService.getData().ComparProductId;
        parent.Product4CompareLength = parent.Product4Compare.length;
        $.post(this.ApiURL + 'products/public_product_view', {
            'data': {
                'filter': {
                    'productId': pID
                }
            }
        }, function (res) {
            if (res.products[0] != null) {
                // console.log('res',res);
                if (idx == '0') {
                    parent.compareProd1 = res.products[0];
                    $(".cmpSearch1").val('');
                }
                else if (idx == '1') {
                    parent.compareProd2 = res.products[0];
                    $(".cmpSearch2").val('');
                    // console.log('parent.compareProd2',parent.compareProd2);
                }
                else if (idx == '2') {
                    parent.compareProd3 = res.products[0];
                    $(".cmpSearch3").val('');
                    // console.log('parent.compareProd3',parent.compareProd3);
                }
                else {
                }
            }
        });
    };
    CompareProductComponent.prototype.closeSearchBoxHintContainer = function () {
        var parent = this;
        setTimeout(function () {
            parent.hintContainer1 = false;
            parent.hintContainer2 = false;
            parent.hintContainer3 = false;
        }, 800);
    };
    CompareProductComponent.prototype.CompareChartData = function (ParamName, p1, p2) {
        //  p1=parseFloat(p1);    p2=parseFloat(p2);
        var parent = this;
        parent.paramForChart = [];
        parent.ParamNameForChart = "";
        var dataArr1 = [];
        parent.SideValcnt = 0;
        parent.ParamNameForChart = ParamName;
        // var t1=parent.ConvertValues(p1.toString());
        // var t2=parent.ConvertValues(p2.toString());
        // var t3=parent.ConvertValues(p3.toString());
        var t1 = parseFloat(p1);
        var t2 = parseFloat(p2);
        // var t3=parseFloat(p3);
        console.log('t1', ParamName, t1, t2);
        //  console.log(dataInVar);
        var dataInArray1 = new Array();
        dataInArray1.push(t1);
        var dataInArray2 = new Array();
        dataInArray2.push(t2);
        // var dataInArray3 = new Array();
        // dataInArray3.push(t3);
        parent.paramForChart.push({
            name: parent.compareProd1.name,
            data: dataInArray1
        });
        parent.paramForChart.push({
            name: parent.compareProd2.name,
            data: dataInArray2
        });
        //   parent.paramForChart.push({
        //    name: parent.compareProd3.name,
        //   data:dataInArray3
        //
        //  });
        // console.log('parent.paramForChart',parent.paramForChart);
        setTimeout(function () {
            if (parent.Res4 != '') {
                parent.SideVal = "Scaling in 1.0E" + parent.Res4;
            }
            else {
                parent.SideVal = "";
            }
            //  console.log('parent.SideVal',parent.SideVal,'parent.SideValcnt',parent.SideValcnt,parent.Res4);
            parent.displayBarChart = true;
            parent.Res4 = "";
            parent.loadChart(ParamName);
        }, 1000);
    };
    // hoverLeaveCart(){
    //   this.displayBarChart=false;
    // }
    CompareProductComponent.prototype.convertInt = function (ConvVal) {
        var OpConVal = parseFloat(ConvVal);
        return OpConVal;
    };
    CompareProductComponent.prototype.loadChart = function (ParamName) {
        var parent = this;
        // console.log('tttt',parent.displayBarChart,parent.paramForChart);
        Highcharts.setOptions({
            colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
        });
        //    let seriesAry:any=[];
        // // console.log('parent.Prod1Parameters',parent.Prod1Parameters,parent.Prod1Parameters.length);
        // if(parent.Prod1Parameters.length>0){
        // for(let params of parent.Prod1Parameters){
        //   parent.Prod1ChartArry.push({
        //     name: params.name,
        //     y:params.thresholds !='' ? parseInt(params.thresholds) : 0
        //
        //   });
        // }
        // console.log('parent.Prod1ChartArry',parent.Prod1ChartArry);
        // }
        // // console.log('parent.Prod2Parameters',parent.Prod2Parameters,parent.Prod2Parameters.length);
        // if(parent.Prod2Parameters.length>0){
        // for(let params1 of parent.Prod2Parameters){
        //   parent.Prod2ChartArry.push({
        //     name: params1.name,
        //     y:params1.thresholds !='' ? parseInt(params1.thresholds) : 0
        //   });
        // }
        // console.log('parent.Prod2ChartArry',parent.Prod2ChartArry);
        // }
        // // console.log('parent.Prod3Parameters',parent.Prod3Parameters,parent.Prod3Parameters.length);
        // if(parent.Prod3Parameters.length>0){
        // for(let params2 of parent.Prod3Parameters){
        //   parent.Prod3ChartArry.push({
        //     name: params2.name,
        //     y:params2.thresholds !='' ? parseInt(params2.thresholds) : 0
        //   });
        // }
        // console.log('parent.Prod3ChartArry',parent.Prod3ChartArry);
        // }
        //     Highcharts.chart('containerChart', {
        //       chart: {
        //         type: 'line'
        //     },
        //     title: {
        //         text: 'Parameter'
        //     },
        //     credits: {
        //     enabled: false
        // },
        //    //  subtitle: {
        //    //      text: 'Source: WorldClimate.com'
        //    //  },
        //    //  xAxis: {
        //    //      categories: ['0.0', '1.0', '2.0', '3.0', '4.0', '5.0', '6.0', '7.0', '8.0', '9.0', '10.0']
        //    //  },
        //     yAxis: {
        //         title: {
        //             text: 'Environmental Product Declaration'
        //         }
        //     },
        //     plotOptions: {
        //         line: {
        //             dataLabels: {
        //                 enabled: true
        //             },
        //             enableMouseTracking: false
        //         }
        //     },
        //     series: [{
        //         name: 'Product 1',
        //         data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        //     }, {
        //         name: 'Product 2',
        //         data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        //     },
        //     {
        //         name: 'Product 3',
        //         data: [2.9, 7.2, 2.7, 17.5, 16.9, 1.2, 7.0, 6.6, 4.2, 5.3, 9.6, 2.8]
        //     }
        //   ]
        //    });
        if (parent.displayBarChart == true) {
            console.log('@@@@@@@', parent.paramForChart);
            Highcharts.chart('containerChart1', {
                chart: {
                    renderTo: 'container',
                    type: 'column'
                },
                credits: {
                    enabled: false
                },
                exporting: { enabled: false },
                title: {
                    text: ''
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                yAxis: {
                    title: {
                        text: parent.SideVal,
                        useHTML: true,
                        style: {
                            "-webkit-transform": "rotate(90deg)",
                            "-moz-transform": "rotate(90deg)",
                            "-o-transform": "rotate(90deg)"
                        }
                    }
                },
                series: parent.paramForChart
            });
        }
        /*if(parent.Prod2Parameters.length>0){
           Highcharts.chart('containerChart2', {
             chart: {
                 plotBackgroundColor: null,
                 plotBorderWidth: null,
                 plotShadow: false,
                 type: 'pie'
               },
               title: {
                 text: ''
               },
               credits: {
               enabled: false
                 },
               tooltip: {
                 // pointFormat: '{series.name}: <b>{point.y}</b>',
                 // percentageDecimals: 1
                 // formatter: function() {
                 //     return 'Total Records: ' + this.y;
                 // }
        
               },
               plotOptions: {
                 pie: {
                   allowPointSelect: true,
                   cursor: 'pointer',
                   dataLabels: {
                     enabled: true,
                     color: '#000000',
                     connectorColor: '#000000',
                       format: '{y}',
                       style: {
                           color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                       }
                   },
                   showInLegend: true,
                 },
               },
           series: [{
               name: 'Product 2',
               colorByPoint: true,
               data: parent.Prod2ChartArry
           }]
          });
        }
        if(parent.Prod3Parameters.length>0){
          Highcharts.chart('containerChart3', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
              },
              title: {
                text: ''
              },
              credits: {
              enabled: false
                },
              tooltip: {
                // pointFormat: '{series.name}: <b>{point.y}</b>',
                // percentageDecimals: 1
                // formatter: function() {
                //     return 'Total Records: ' + this.y;
                // }
        
              },
              plotOptions: {
                pie: {
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
                    enabled: true,
                    color: '#000000',
                    connectorColor: '#000000',
                      format: '{y}',
                      style: {
                          color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                      }
                  },
                  showInLegend: true,
                },
              },
          series: [{
              name: 'Product 3',
              colorByPoint: true,
              data:parent.Pro3ChartArry
          }]
         });
         }*/
    };
    CompareProductComponent = __decorate([
        core_1.Component({
            //  selector: ' ',
            styles: ["\n\n    .wid60{\n      padding-left: 70px;\n      text-align:center;\n    }\n.wid80{\n  padding-left: 150px;\n    text-align:center;\n}\n\n#glow{\n  margin-top:8px;\n}\n\n    /* Header Section */\n    .intro {\n     display: table;\n     width: 100%;\n     padding: 0;\n     background: url(./webroot/images/about/pexels-photo-348323.jpeg) no-repeat center center fixed;\n     background-color: #e5e5e5;\n     -webkit-background-size: cover;\n     -moz-background-size: cover;\n     background-size: cover;\n     -o-background-size: cover;\n     /*filter:brightness(200%);*/\n    }\n    .intro .overlay {\n     background: rgba(0,0,0,0.4);\n     /*height: 665px;*/\n     height: 300px;\n    }\n    .intro h1 {\n    \n     color: #fff;\n     font-size: 10em;\n    /*\tfont-weight: 700;*/\n     margin-top: 0;\n     margin-bottom: 60px;\n     font-weight: lighter;\n    }\n    .intro span {\n     color: #a7c44c;\n     font-weight: 600;\n    }\n    .intro p {\n     color: #fff;\n     font-size: 32px;\n     font-weight: 300;\n     margin-top: 10px;\n     margin-bottom: 40px;\n    }\n    header .intro-text {\n     padding-top: 250px;\n     padding-bottom: 200px;\n     text-align: center;\n    }\n\n    .scrollToTop{\n      display: none;\n      width: 45px;\n      height: 45px;\n      text-indent: -9999px;\n      position: fixed;\n      z-index: 999;\n      right: 20px;\n      bottom: 20px;\n      background: #708A96 url(\"./webroot/images/up-arrow.png\") no-repeat center 43%;\n      -webkit-border-radius: 30px;\n      -moz-border-radius: 30px;\n      border-radius: 30px;\n    }\n    .scrollToTop:hover{\n      background-color: #45526E;\n    }\n\n\n    .effect2\n    {\n      position: relative;\n    }\n    .effect2:before, .effect2:after\n    {\n      z-index: -1;\n      position: absolute;\n      content: \"\";\n      bottom: 15px;\n      left: 10px;\n      width: 50%;\n      top: 80%;\n      max-width:300px;\n      background: #777;\n      -webkit-box-shadow: 0 15px 10px #777;\n      -moz-box-shadow: 0 15px 10px #777;\n      box-shadow: 0 15px 10px #777;\n      -webkit-transform: rotate(-3deg);\n      -moz-transform: rotate(-3deg);\n      -o-transform: rotate(-3deg);\n      -ms-transform: rotate(-3deg);\n      transform: rotate(-3deg);\n    }\n    .effect2:after\n    {\n      -webkit-transform: rotate(3deg);\n      -moz-transform: rotate(3deg);\n      -o-transform: rotate(3deg);\n      -ms-transform: rotate(3deg);\n      transform: rotate(3deg);\n      right: 10px;\n      left: auto;\n    }\n\n// #containerChart1{\n//    position: fixed;\n//    left: 40%; top:25%;\n//    width: 600px;\n//    height: 400px;\n//    box-shadow: 0 0 5px black;\n//    background-color: white;\n// }\n\n.chartWindowStyle{\n\n  //  left: 10%; top:15%;\n\n   box-shadow: 0 0 5px black;\n   background-color: white;\n}\n\n\n  "],
            //  template: `  `,
            templateUrl: './app/pages/compare/compare.template.html'
        }),
        __metadata("design:paramtypes", [router_1.Router, global_service_1.globalService])
    ], CompareProductComponent);
    return CompareProductComponent;
}(app_component_1.AppComponent));
exports.CompareProductComponent = CompareProductComponent;
