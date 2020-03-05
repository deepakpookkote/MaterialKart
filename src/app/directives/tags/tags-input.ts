import { Component,Input, } from '@angular/core';
import { AppComponent } from './../../app.component';
  import { RouterModule, Routes, Router } from '@angular/router';
  import { globalService } from './../../services/global.service';

declare var $:any;
@Component({
  	selector: 'tag-cloud',
  	styles:[`

      input:focus {
      border:0px solid white;
      outline:0;
      }



  	`],
  	template: `

      <div style="border-radius: 4px;width:100%;position: relative;top: -10px;" >
        <div class="pull-left">
             <span class="tags animate zoomIn" *ngFor="let tag of tags;let i=index;">{{tag}}<span class="tag-close-btn"><i class="fa fa-times" (click)="removeTags(i);"></i></span></span>
         </div>
        <input class="pull-left inptag" id="tagenter" (keyup.enter)="addTag($event.target.value)" placeholder="Enter Tag"/>
      </div>


  	`,
})
export class TaggDirective {
   public tags:any=[];

  // @Input() pId: any;

  constructor( public router: Router , public globalService: globalService){

   }

  public token:string = localStorage.getItem('GBCItoken');
  public accountType=localStorage.getItem('GBCIaccountType');



    ngOnInit(){


    }

    addTag(tag:string){
      let parent=this;
      let tagenter:any=document.getElementById("tagenter");
      tagenter.value="";

      if(parent.tags.length<3 && tag!='')
      {
        parent.tags.push(tag);
        // localStorage.setItem('GBCItoken',res.key);
        this.globalService.setData({
          'ProjectTags':parent.tags
        });


      }
    }
    // addTag(tag:string){
    //   let parent=this;
    //   let tagenter:any=document.getElementById("tagenter");
    //   tagenter.value="";
    //
    // let tempKey="ProjectTags_"+parent.pId;
    //   var idref:any={};
    //
    //   if(parent.tags.length<3 && tag!='')
    //   {
    //     parent.tags.push(tag);
    //      idref[tempKey]=parent.tags;
    //      console.log(idref);
    //     // localStorage.setItem('GBCItoken',res.key);
    //     parent.globalService.setData({
    //       'ProjectTags': idref
    //     });
    //     console.log('pId',parent.pId,idref);
    //
    //   }
    // }

    removeTags(indx:any){

          let parent=this;

      // var Pindex=parent.tags.indexOf(indx);
      // console.log('indx',indx,'Pindex',Pindex,parent.tags);
            parent.tags.splice(indx, 1);
            this.globalService.setData({
              'ProjectTags':parent.tags
            });
    // console.log('parent.tags',parent.tags);
    }


}
