import { Component,style, state, animate, transition, trigger,
     ElementRef, AfterViewInit,  OnDestroy, ViewChild,
 } from '@angular/core';
  import { RouterModule, Routes, Router } from '@angular/router';
import { AppComponent } from './../../../app.component';

import { globalService } from './../../../services/global.service';

declare var $:any;
declare var Highcharts:any;
declare var swal :any;


@Component({
  //selector: 'my-app',
  styles:[`


    html{
       font-family: proxima-nova-medium !important;
       font-size:14px;
       color: #595959;
         }

.activeStar{
  font-size: 21px;
position: absolute;
margin-left: -9px;
margin-top: -7px;
color:#629562;
}

    `],
  templateUrl: './app/pages/merchant/statistics/admin_analytics.template.html',
})
export class AdminAnalyticsGeneral extends AppComponent  {
  public products:any;
  public accountType:any=localStorage.getItem('GBCIaccountType');
  public getApiUrl:any=this.ApiURL;
  public apiKey:any=localStorage.getItem('GBCItoken');
  public recentActivities:any=[];
  public userInfo:any=[];
  public service:any=[];
  public totalProducts:number=0;
  public DivEnableFlag:boolean=false;
  public ViewselcFlag:number=2;

       constructor( public router: Router , public globalService: globalService){
          super(router,globalService);
        }
//   constructor( public router: Router ){
//   super(router);
//
// }
   ngOnInit(){
     let parent:any=this;

       setTimeout(function(){

         parent.loadChart();
        //  parent.getProducts();
         // parent.loadBrowserChart();
        },500);

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

  Highcharts.chart('top5queriedProdChart', {
    chart: {
      type: 'column',
      // Edit chart spacing
     //  spacingBottom: 15,
      spacingTop: 10,
     //  spacingLeft: 10,
     //  spacingRight: 10,
     width: 470,
     height:450
  },
  exporting: { enabled: false },
  title: {
      text: 'Most Queried Manufacturer',

      style: {
          fontSize: '17px',
          fontFamily: 'proxima-nova-medium',

      }
  },
  credits: { enabled: false},
  //  subtitle: {
  //      text: 'Source: WorldClimate.com'
  //  },
  xAxis: {
      categories: ['Armstrong','Certainteed Corporation','TOTO','Saint Gobain Glass','AGC Asahi Glass Company']
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
      data: [86,34,50,450,156]
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
     height:450
  },
  exporting: { enabled: false },
  title: {
      text: 'Most Queried Product Category',

      style: {
          fontSize: '17px',
          fontFamily: 'proxima-nova-medium',

      }
  },
  credits: { enabled: false},
  //  subtitle: {
  //      text: 'Source: WorldClimate.com'
  //  },
  xAxis: {
      categories: ['Ceiling','Flooring','Insulation','Glazing External','Internal Paint']
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
      data: [120,212,151,65,119]
  }

  ]
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



 }
