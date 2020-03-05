import { Component,style, state, animate, transition, trigger,
     ElementRef, AfterViewInit,  OnDestroy, ViewChild,
 } from '@angular/core';
  import { Router } from '@angular/router';


import { AppComponent } from './../../../app.component';

import { globalService } from './../../../services/global.service';
import { ApiService } from './../../../services/ApiService';

declare var $:any;
declare var Highcharts:any;
declare var swal :any;


@Component({
  //selector: 'my-app',
//  styles:[` `],
  styleUrls : ['./app/pages/merchant/dashboard/dashboard.style.css'],
  templateUrl: './app/pages/merchant/dashboard/dashboard.template.html' ,
})
export class MerchantDashboardComponent extends AppComponent  {
  public products:any;
  public accountType:any=localStorage.getItem('GBCIaccountType');
  public getApiUrl:any=this.ApiURL;
  public apiKey:any=localStorage.getItem('GBCItoken');
  public recentActivities:any=[];
  public userInfo:any=[];
  public service:any=[];
  public totalProducts:number=0;

       constructor(
          public router: Router ,
          public globalService: globalService,
          public apiService:ApiService
        ){
          super(router,globalService,apiService);
        }
//   constructor( public router: Router ){
//   super(router);
//
// }
   ngOnInit(){
     let parent:any=this;
     this.scrollToRatings();
     this.checkAccess();
     if(this.accountType=='merchant'){
       setTimeout(function(){
           parent.loadWorldMapChart();
         parent.loadChart();
         // parent.loadBrowserChart();
        },500);

     this.getProducts();
     this.getRecentActivity();
    }

     this.service=this.globalService.getData();
    this.userInfo=this.service.userInfo;

    //console.log(  this.userInfo );
   }
public WeekDay:any=[];
public MonthNames:any=[];
public MonthorWeekSel:any=[];
public selcFlag:number=0;
public WeekMonthData:any=[];

loadChart(){

  this.WeekDay= [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
  ];

  // this.MonthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

  Highcharts.setOptions({
    colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
});
if(this.selcFlag==1){
  // this.MonthorWeekSel=this.MonthNames;
  this.WeekMonthData=[{
      name: 'Current Month',
      data: [23,34,73,85,94,126,118]
  }, {
      name: 'Last Month',
      data: [12,98,176,183,267,112]
  }];
}else{
  // this.MonthorWeekSel=this.WeekDay;
  this.WeekMonthData=[{
      name: 'Current Week',
      data: [3, 4, 3, 5, 4, 6, 8]
  }, {
      name: 'Last Week',
      data: [2, 3, 4, 3, 3, 2, 3]
  }];
}



  Highcharts.chart('containerChart', {
     chart: {
         type: 'areaspline'
     },
     title: {
         text: 'Total views this week/month',
         style: {
             fontSize: '17px',
             fontFamily: 'proxima-nova-medium',

         }
     },
      exporting: { enabled: false },
     legend: {
         layout: 'vertical',
         align: 'left',
         verticalAlign: 'top',
         x: 150,
         y: 100,
         floating: true,
         borderWidth: 1,
         backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
     },
     xAxis: {
        //  categories:this.MonthorWeekSel,
        //  plotBands: [{ // visualize the weekend
        //      from: 4,
        //      to: 6,
        //      color: 'rgba(68, 170, 213, .2)'
        //  }]
     },
     yAxis: {
         title: {
             text: 'Total Views'
         }
     },
     tooltip: {
         shared: true,
         valueSuffix: ' Views'
     },
     credits: {
         enabled: false
     },
    //  plotOptions: {
    //      areaspline: {
    //          fillOpacity: 0.5
    //      }
    //  },
     series: this.WeekMonthData
 });

}

loadBrowserChart(){
  Highcharts.setOptions({
    colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
});
  Highcharts.chart('containerChartBrowser', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Views by Location'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    },

    credits: {
        enabled: false
    },
    series: [{
        name: 'Locations',
        colorByPoint: true,
        data: [{
            name: 'Indiana',
            y: 56.33
        } , {
            name: 'Virginia',
            y: 4.77
        }, {
            name: 'Florida',
            y: 3.2
        }]
    }]
});
}

   checkAccess(){
     let parent=this;
     $.post(this.ApiURL+'api/merchantdashboard',{
       'data':{
         'key':parent.apiKey
       }
     },function(res:any){
     //  console.log('Response',res);

        if(res.status=="failure"){
         parent.redirect('page-login',{});
        }else{

        }

     });
   }

   getRecentActivity(){

     let parent=this;
     $.post(this.ApiURL+'api/recentActivity',{
       'data':{
         'key':parent.apiKey,
         'orderByDateCreated':-1
       }
     },function(res:any){
       parent.recentActivities=res.records;
       parent.totalProducts=res.totalProducts;
    //  console.log('Response',res);
     });
   }


   getProducts(){
     let parent:any = this;
     //  console.log(parent.apiKey);
      $.post(this.ApiURL+'Merchant/merchant_product_view',{
         'data':{
             'key':parent.apiKey,
             'filter':{

             },
             'extra':{
               'orderByDateCreated':-1
             }
         }
         },function(res:any){
           parent.products = res.products;
           //this.productsInfo = [1];
             //console.log(this.products);
         });
   }
   //Edit Selected productsInfo
   editProduct(productId:any){

     localStorage.setItem('productId','');
     this.globalService.setData({'productId':productId});
     this.router.navigate(['./page-merchant-product-edit']);
     // to append productId in url.
     //this.router.navigate(['./page-merchant-product-edit'],{ queryParams: {productId:productId} });
   }


   deleteProduct(productId:any){
       let parent:any=this;


     swal({
 title: 'Are you sure?',
 text: "This product will be removed from database.",
 type: 'warning',
 showCancelButton: true,
 confirmButtonColor: '#3085d6',
 cancelButtonColor: '#d33',
 confirmButtonText: 'Yes, Remove it!',
 cancelButtonText: 'No, keep it'
 }).then(function() {
   $.post(parent.ApiURL+'Merchant/merchant_product_delete',{
     'data':{
       'key':parent.apiKey,
       'filter':{
          'productId': productId
        }
     }
   },function(res:any){
     swal(
       'Removed!',
       'Your product has been removed.',
       'success'
     )

     setTimeout( function(){ swal.close();}, 1000);
     parent.getProducts();
    //  console.log('Wishlist Category',res);
   });

 }, function(dismiss:any) {
 if (dismiss === 'cancel') {
   swal(
     'Cancelled',
     'Your product is safe :)',
     'error'
   )
   setTimeout( function(){ swal.close();}, 1000);
 }
 });

 }

 loadWorldMapChart(){
   $(".mapcontainer").mapael({
  map: {
      name: "world_countries",
      defaultArea: {
          attrs: {
              stroke: "#fff",
              "stroke-width": 1
          }
      }
  },
  legend: {
      area: {
          mode: "horizontal",
          title: "",
          labelAttrs: {
              "font-size": 9
          },
          marginLeft: 5,
          marginLeftLabel: 5,
          slices: [
              {
                  max: 50,
                  attrs: {
                      fill: "#6aafe1"
                  },
                  label: "< 50 Views"
              },
              {
                  min: 50,
                  max: 100,
                  attrs: {
                      fill: "#459bd9"
                  },
                  label: "> 50 Views and < 100 Views"
              },
              {
                  min: 100,
                  max: 500,
                  attrs: {
                      fill: "#2579b5"
                  },
                  label: "> 100 Views and < 500 Views"
              },
              {
                  min: 500,
                  attrs: {
                      fill: "#1a527b"
                  },
                  label: "> 500 Views"
              }
          ]
      },
      // plot: {
      //     mode: "horizontal",
      //     title: "Total Views",
      //     labelAttrs: {
      //         "font-size": 12
      //     },
      //     marginLeft: 5,
      //     marginLeftLabel: 5,
      //     slices: [
      //         {
      //             max: 500000,
      //             attrs: {
      //                 fill: "#f99200"
      //             },
      //             attrsHover: {
      //                 transform: "s1.5",
      //                 "stroke-width": 1
      //             },
      //             label: "< 50",
      //             size: 10
      //         },
      //         {
      //             min: 500000,
      //             max: 1000000,
      //             attrs: {
      //                 fill: "#f99200"
      //             },
      //             attrsHover: {
      //                 transform: "s1.5",
      //                 "stroke-width": 1
      //             },
      //             label: "> 500 000 and 1 million",
      //             size: 20
      //         },
      //         {
      //             min: 1000000,
      //             attrs: {
      //                 fill: "#f99200"
      //             },
      //             attrsHover: {
      //                 transform: "s1.5",
      //                 "stroke-width": 1
      //             },
      //             label: "> 1 million",
      //             size: 30
      //         }
      //     ]
      // }
  },
  // plots: {
  //     'paris': {
  //         latitude: 48.86,
  //         longitude: 2.3444,
  //         value: 500000000,
  //         tooltip: {content: "<br /Paris<br />Views: 500000000"}
  //     },
  //     'newyork': {
  //         latitude: 40.667,
  //         longitude: -73.833,
  //         value: 200001,
  //         tooltip: {content: "New york<br />Views: 200001"}
  //     },
  //     'sydney': {
  //         latitude: -33.917,
  //         longitude: 151.167,
  //         value: 600000,
  //         tooltip: {content: "Sydney<br />Views: 600000"}
  //     },
  //     'brasilia': {
  //         latitude: -15.781682,
  //         longitude: -47.924195,
  //         value: 200000001,
  //         tooltip: {content: "Brasilia<br />Views: 200000001"}
  //     },
  //     'tokyo': {
  //         latitude: 35.687418,
  //         longitude: 139.692306,
  //         value: 200001,
  //         tooltip: {content: "Tokyo<br />Views: 200001"}
  //     }
  // },
  areas: {
      "AF": {
          "value": "353",
          // "attrs": {
          //     "href": "#"
          // },
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Afghanistan : 353 <\/span>"
          }
      },
      "ZA": {
          "value": "505",
          ////"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">South Africa : 505<\/span>"
          }
      },
      "AL": {
          "value": "32",
          ////"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Albania : 32<\/span>"
          }
      },
      "DZ": {
          "value": "359",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Algeria : 359<\/span> "
          }
      },
      "DE": {
          "value": "817",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Germany : 817<\/span>"
          }
      },
      "AD": {
          "value": "86",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Andorra : 86<\/span>"
          }
      },
      "AO": {
          "value": "196",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Angola : 196<\/span>"
          }
      },
      "AG": {
          "value": "89",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Antigua And Barbuda : 89<\/span>"
          }
      },
      "SA": {
          "value": "2808",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Saudi Arabia : 2808<\/span>"
          }
      },
      "AR": {
          "value": "40",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Argentina : 40<\/span>"
          }
      },
      "AM": {
          "value": "310",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Armenia : 310<\/span>"
          }
      },
      "AU": {
          "value": "226",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Australia : 226<\/span>"
          }
      },
      "AT": {
          "value": "84",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Austria : 84<\/span>"
          }
      },
      "AZ": {
          "value": "9",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Azerbaijan : 9<\/span>"
          }
      },
      "BS": {
          "value": "34",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Bahamas : 34<\/span>"
          }
      },
      "BH": {
          "value": "13",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Bahrain : 13<\/span>"
          }
      },
      "BD": {
          "value": "150",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Bangladesh : 150<\/span>"
          }
      },
      "BB": {
          "value": "273",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Barbados : 273<\/span>"
          }
      },
      "BE": {
          "value": "1100",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Belgium : 1100<\/span>"
          }
      },
      "BZ": {
          "value": "356",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Belize : 356<\/span>"
          }
      },
      "BJ": {
          "value": "909",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Benin : 909<\/span>"
          }
      },
      "BT": {
          "value": "738",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Bhutan : 738<\/span>"
          }
      },
      "BY": {
          "value": "947",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Belarus : 947<\/span>"
          }
      },
      "MM": {
          "value": "48",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Myanmar : 48<\/span>"
          }
      },
      "BO": {
          "value": "1008",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Bolivia : 1008<\/span>"
          }
      },
      "BA": {
          "value": "375",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Bosnia And Herzegovina : 375<\/span>"
          }
      },
      "BW": {
          "value": "203",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Botswana : 203<\/span>"
          }
      },
      "BR": {
          "value": "196",
          //"href": "#",
          "tooltip": {
              "content": "<span  style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Brazil : 196<\/span>"
          }
      },
      "BN": {
          "value": "405",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Brunei Darussalam : 405<\/span>"
          }
      },
      "BG": {
          "value": "747",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Bulgaria : 747<\/span>"
          }
      },
      "BF": {
          "value": "845",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Burkina Faso : 845<\/span>"
          }
      },
      "BI": {
          "value": "857",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Burundi : 857<\/span>"
          }
      },
      "KH": {
          "value": "143",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Cambodia : 143<\/span>"
          }
      },
      "CM": {
          "value": "200",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Cameroon : 200<\/span>"
          }
      },
      "CA": {
          "value": "344",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Canada : 344<\/span>"
          }
      },
      "CV": {
          "value": "500",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Cape Verde : 500<\/span>"
          }
      },
      "CF": {
          "value": "448",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Central African Republic : 448<\/span>"
          }
      },
      "CL": {
          "value": "1726",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Chile : 1726<\/span>"
          }
      },
      "CN": {
          "value": "134",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">China : 134<\/span>"
          }
      },
      "CY": {
          "value": "111",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Cyprus : 111<\/span>"
          }
      },
      "CO": {
          "value": "469",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Colombia : 469<\/span>"
          }
      },
      "KM": {
          "value": "753",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Comoros : 753<\/span>"
          }
      },
      "CG": {
          "value": "413",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Congo : 413<\/span>"
          }
      },

      "KP": {
          "value": "244",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Korea, Democratic : 244<\/span>"
          }
      },
      "KR": {
          "value": "497",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Korea, Republic : 497<\/span>"
          }
      },
      "CR": {
          "value": "47",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Costa Rica : 47<\/span>"
          }
      },
      "CI": {
          "value": "2015",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">C\u00d4te D'ivoire : 2015<\/span>"
          }
      },
      "HR": {
          "value": "440",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Croatia : 440<\/span>"
          }
      },
      "CU": {
          "value": "1125",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Cuba : 1125<\/span>"
          }
      },
      "DK": {
          "value": "55",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Denmark : 55<\/span>"
          }
      },
      "DJ": {
          "value": "905",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Djibouti : 905<\/span>"
          }
      },
      "DM": {
          "value": "67",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Dominica : 67<\/span>"
          }
      },
      "EG": {
          "value": "825",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Egypt : 825<\/span>"
          }
      },
      "AE": {
          "value": "78",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">United Arab Emirates : 78<\/span>"
          }
      },
      "EC": {
          "value": "14",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Ecuador : 14<\/span>"
          }
      },
      "ER": {
          "value": "54",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Eritrea : 54<\/span>"
          }
      },
      "ES": {
          "value": "462",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Spain : 462<\/span>"
          }
      },
      "EE": {
          "value": "13",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Estonia : 13<\/span>"
          }
      },
      "US": {
          "value": "311",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">United States : 311<\/span>"
          }
      },
      "ET": {
          "value": "847",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Ethiopia : 847<\/span>"
          }
      },
      "FJ": {
          "value": "86",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Fiji : 86<\/span>"
          }
      },
      "FI": {
          "value": "53",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Finland : 53<\/span>"
          }
      },
      "FR": {
          "value": "654",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">France : 654<\/span>"
          }
      },
      "GA": {
          "value": "15",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Gabon : 15<\/span>"
          }
      },
      "GM": {
          "value": "177",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Gambia : 177<\/span>"
          }
      },
      "GE": {
          "value": "44",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Georgia : 44<\/span>"
          }
      },
      "GH": {
          "value": "249",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Ghana : 249<\/span>"
          }
      },
      "GR": {
          "value": "1130",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Greece : 1130<\/span>"
          }
      },
      "GD": {
          "value": "104",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Grenada : 104<\/span>"
          }
      },
      "GT": {
          "value": "147",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Guatemala : 147<\/span>"
          }
      },
      "GN": {
          "value": "1028",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Guinea : 1028<\/span>"
          }
      },
      "GQ": {
          "value": "72",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Equatorial Guinea : 72<\/span>"
          }
      },
      "GW": {
          "value": "154",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Guinea-bissau : 154<\/span>"
          }
      },
      "GY": {
          "value": "756",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Guyana : 756<\/span>"
          }
      },
      "HT": {
          "value": "10",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Haiti : 10<\/span>"
          }
      },
      "HN": {
          "value": "77",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Honduras : 77<\/span>"
          }
      },
      "HU": {
          "value": "997",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Hungary : 997<\/span>"
          }
      },
      "JM": {
          "value": "270",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Jamaica : 270<\/span>"
          }
      },
      "JP": {
          "value": "127",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Japan : 127<\/span>"
          }
      },
      "MH": {
          "value": "548",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Marshall Islands : 548<\/span>"
          }
      },
      "PW": {
          "value": "206",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Palau : 206<\/span>"
          }
      },
      "SB": {
          "value": "557",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Solomon Islands : 557<\/span>"
          }
      },
      "IN": {
          "value": "124",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">India : 124<\/span>"
          }
      },
      "ID": {
          "value": "242",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Indonesia : 242<\/span>"
          }
      },
      "JO": {
          "value": "618",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Jordan : 618<\/span>"
          }
      },
      "IR": {
          "value": "747",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Iran, Islamic Republic Of : 747<\/span>"
          }
      },
      "IQ": {
          "value": "329",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Iraq : 329<\/span>"
          }
      },
      "IE": {
          "value": "4480",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Ireland : 4480<\/span>"
          }
      },
      "IS": {
          "value": "310",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Iceland : 310<\/span>"
          }
      },
      "IL": {
          "value": "7700",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Israel : 7700<\/span>"
          }
      },
      "IT": {
          "value": "607",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Italy : 607<\/span>"
          }
      },
      "KZ": {
          "value": "16",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Kazakhstan : 16<\/span>"
          }
      },
      "KE": {
          "value": "416",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Kenya : 416<\/span>"
          }
      },
      "KG": {
          "value": "550",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Kyrgyzstan : 550<\/span>"
          }
      },
      "KI": {
          "value": "101",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Kiribati : 101<\/span>"
          }
      },
      "KW": {
          "value": "28",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Kuwait : 28<\/span>"
          }
      },
      "LA": {
          "value": "628",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Lao People's Democratic Republic : 628<\/span>"
          }
      },
      "LS": {
          "value": "219",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Lesotho : 219<\/span>"
          }
      },
      "LV": {
          "value": "220",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Latvia : 220<\/span>"
          }
      },
      "LB": {
          "value": "42",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Lebanon : 42<\/span>"
          }
      },
      "LR": {
          "value": "417",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Liberia : 417<\/span>"
          }
      },
      "LY": {
          "value": "64",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Libya : 64<\/span>"
          }
      },
      "LI": {
          "value": "363",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Liechtenstein : 363<\/span>"
          }
      },
      "LT": {
          "value": "3200",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Lithuania : 3200<\/span>"
          }
      },
      "LU": {
          "value": "510",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Luxembourg : 510<\/span>"
          }
      },
      "MK": {
          "value": "20",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Macedonia : 20<\/span>"
          }
      },
      "MG": {
          "value": "21",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Madagascar : 21<\/span>"
          }
      },
      "MY": {
          "value": "288",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Malaysia : 288<\/span>"
          }
      },
      "MW": {
          "value": "153",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Malawi : 153<\/span>"
          }
      },
      "MV": {
          "value": "320",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Maldives : 320<\/span>"
          }
      },
      "ML": {
          "value": "158",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Mali : 158<\/span>"
          }
      },
      "MT": {
          "value": "41",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Malta : 41<\/span>"
          }
      },
      "MA": {
          "value": "322",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Morocco : 322<\/span>"
          }
      },
      "MU": {
          "value": "128",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Mauritius : 128<\/span>"
          }
      },
      "MR": {
          "value": "54",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Mauritania : 54<\/span>"
          }
      },
      "MX": {
          "value": "114",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Mexico : 114<\/span>"
          }
      },
      "FM": {
          "value": "111",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Micronesia : 111<\/span>"
          }
      },
      "MD": {
          "value": "590",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Moldova : 590<\/span>"
          }
      },
      "MC": {
          "value": "354",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Monaco : 354<\/span>"
          }
      },
      "MN": {
          "value": "28",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Mongolia : 28<\/span>"
          }
      },
      "ME": {
          "value": "631",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Montenegro : 631<\/span>"
          }
      },
      "MZ": {
          "value": "238",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Mozambique : 238<\/span>"
          }
      },
      "NA": {
          "value": "4004",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Namibia : 4004<\/span>"
          }
      },
      "NP": {
          "value": "308",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Nepal : 308<\/span>"
          }
      },
      "NI": {
          "value": "58",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Nicaragua : 58<\/span>"
          }
      },
      "NE": {
          "value": "16",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Niger : 16<\/span>"
          }
      },
      "NG": {
          "value": "162",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Nigeria : 162<\/span>"
          }
      },
      "NO": {
          "value": "495",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Norway : 495<\/span>"
          }
      },
      "NZ": {
          "value": "440",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">New Zealand : 440<\/span>"
          }
      },
      "OM": {
          "value": "28",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Oman : 28<\/span>"
          }
      },
      "UG": {
          "value": "34",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Uganda : 34<\/span>"
          }
      },
      "UZ": {
          "value": "2900",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Uzbekistan : 2900<\/span>"
          }
      },
      "PK": {
          "value": "674",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Pakistan : 674<\/span>"
          }
      },
      "PS": {
          "value": "40",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Palestine : 40<\/span>"
          }
      },
      "PA": {
          "value": "357",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Panama : 357<\/span>"
          }
      },
      "PG": {
          "value": "701",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Papua New Guinea : 701<\/span>"
          }
      },
      "PY": {
          "value": "650",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Paraguay : 650<\/span>"
          }
      },
      "NL": {
          "value": "1000",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Netherlands : 1000<\/span>"
          }
      },
      "PE": {
          "value": "29",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Peru : 29<\/span>"
          }
      },
      "PH": {
          "value": "948",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Philippines : 948<\/span>"
          }
      },
      "PL": {
          "value": "382",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Poland : 382<\/span>"
          }
      },
      "PT": {
          "value": "100",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Portugal : 100<\/span>"
          }
      },
      "QA": {
          "value": "187",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Qatar : 187<\/span>"
          }
      },
      "DO": {
          "value": "101",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Dominican Republic : 101<\/span>"
          }
      },
      "RO": {
          "value": "21",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Romania : 21<\/span>"
          }
      },
      "GB": {
          "value": "626",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">United Kingdom : 626<\/span>"
          }
      },
      "RU": {
          "value": "140",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Russian Federation : 140<\/span>"
          }
      },
      "RW": {
          "value": "1090",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Rwanda : 1090<\/span>"
          }
      },
      "KN": {
          "value": "53",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Saint Kitts And Nevis : 53<\/span>"
          }
      },
      "SM": {
          "value": "317",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">San Marino : 317<\/span>"
          }
      },
      "VC": {
          "value": "105",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Saint Vincent And The Grenadines : 105<\/span>"
          }
      },
      "LC": {
          "value": "176",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Saint Lucia : 176<\/span>"
          }
      },
      "SV": {
          "value": "622",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">El Salvador : 622<\/span>"
          }
      },
      "WS": {
          "value": "183",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Samoa : 183<\/span>"
          }
      },
      "ST": {
          "value": "168",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Sao Tome And Principe : 168<\/span>"
          }
      },
      "SN": {
          "value": "127",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Senegal : 127<\/span>"
          }
      },
      "RS": {
          "value": "726",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Serbia : 726<\/span>"
          }
      },
      "SC": {
          "value": "86",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Seychelles : 86<\/span>"
          }
      },
      "SL": {
          "value": "596",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Sierra Leone : 596<\/span>"
          }
      },
      "SG": {
          "value": "51",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Singapore : 51<\/span>"
          }
      },
      "SK": {
          "value": "5",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Slovakia : 5<\/span>"
          }
      },
      "SI": {
          "value": "205",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Slovenia : 205<\/span>"
          }
      },
      "SO": {
          "value": "955",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Somalia : 955<\/span>"
          }
      },
      "SD": {
          "value": "343",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Sudan : 343<\/span>"
          }
      },
      "SS": {
          "value": "103",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">South Sudan : 103<\/span>"
          }
      },
      "LK": {
          "value": "208",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Sri Lanka : 208<\/span>"
          }
      },
      "SE": {
          "value": "945",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Sweden : 945<\/span>"
          }
      },
      "CH": {
          "value": "79",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Switzerland : 79<\/span>"
          }
      },
      "SR": {
          "value": "529",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Suriname : 529<\/span>"
          }
      },
      "SZ": {
          "value": "1067",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Swaziland : 1067<\/span>"
          }
      },
      "SY": {
          "value": "208",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Syrian Arab Republic : 208<\/span>"
          }
      },
      "TJ": {
          "value": "697",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Tajikistan : 697<\/span>"
          }
      },
      "TZ": {
          "value": "462",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Tanzania, United Republic Of : 462<\/span>"
          }
      },
      "TD": {
          "value": "115",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Chad : 115<\/span>"
          }
      },
      "CZ": {
          "value": "105",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Czech Republic : 105<\/span>"
          }
      },
      "TH": {
          "value": "695",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Thailand : 695<\/span>"
          }
      },
      "TL": {
          "value": "117",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Timor-leste : 117<\/span>"
          }
      },
      "TG": {
          "value": "615",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Togo : 615<\/span>"
          }
      },
      "TO": {
          "value": "1009",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Tonga : 1009<\/span>"
          }
      },
      "TT": {
          "value": "1340",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Trinidad And Tobago : 1340<\/span>"
          }
      },
      "TN": {
          "value": "106",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Tunisia : 106<\/span>"
          }
      },
      "TM": {
          "value": "510",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Turkmenistan : 510<\/span>"
          }
      },
      "TR": {
          "value": "736",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Turkey : 736<\/span>"
          }
      },
      "TV": {
          "value": "987",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Tuvalu : 987<\/span>"
          }
      },
      "VU": {
          "value": "249",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Vanuatu : 249<\/span>"
          }
      },
      "VE": {
          "value": "2920",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Venezuela : 2920<\/span>"
          }
      },
      "VN": {
          "value": "870",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">VietNam : 870<\/span>"
          }
      },
      "UA": {
          "value": "450",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Ukraine : 450<\/span>"
          }
      },
      "UY": {
          "value": "35",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Uruguay : 35<\/span>"
          }
      },
      "YE": {
          "value": "247",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Yemen : 247<\/span>"
          }
      },
      "ZM": {
          "value": "139",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Zambia : 139<\/span>"
          }
      },
      "ZW": {
          "value": "127",
          //"href": "#",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;width: 100px;padding: 10px;border: 1px solid #797979;margin: 0;box-shadow: 3px 3px 4px #888888;\">Zimbabwe : 127<\/span>"
          }
      }
  }
});



 }

 }
