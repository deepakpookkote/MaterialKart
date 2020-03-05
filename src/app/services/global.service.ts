import { Injectable } from '@angular/core';

@Injectable()
export class globalService {
  public sharedData:any=[];

  constructor(){

    this.sharedData=localStorage.getItem("globalServiceData");

    if(this.sharedData==undefined||this.sharedData==""){
      this.sharedData=[];
    }else{
      this.sharedData=JSON.parse( this.sharedData );
    }
  //  this.sharedData=[];



  }
 

   merge_options(obj1:any,obj2:any){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}
  setData (data:any) {
    //this.sharedData = data;
    var existingData = this.sharedData;
    var newData = data;
   var combined = this.merge_options(existingData,newData);
   this.sharedData=[];
   this.sharedData=combined;
   localStorage.setItem("globalServiceData",JSON.stringify(this.sharedData) );
  }
  getData () {
  return this.sharedData;


  }
  removeData(){
    this.sharedData=[];
     localStorage.setItem("globalServiceData",JSON.stringify(this.sharedData) );
  }
}
