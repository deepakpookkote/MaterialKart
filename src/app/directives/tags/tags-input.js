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
var global_service_1 = require("./../../services/global.service");
var TaggDirective = (function () {
    // @Input() pId: any;
    function TaggDirective(router, globalService) {
        this.router = router;
        this.globalService = globalService;
        this.tags = [];
        this.token = localStorage.getItem('GBCItoken');
        this.accountType = localStorage.getItem('GBCIaccountType');
    }
    TaggDirective.prototype.ngOnInit = function () {
    };
    TaggDirective.prototype.addTag = function (tag) {
        var parent = this;
        var tagenter = document.getElementById("tagenter");
        tagenter.value = "";
        if (parent.tags.length < 3 && tag != '') {
            parent.tags.push(tag);
            // localStorage.setItem('GBCItoken',res.key);
            this.globalService.setData({
                'ProjectTags': parent.tags
            });
        }
    };
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
    TaggDirective.prototype.removeTags = function (indx) {
        var parent = this;
        // var Pindex=parent.tags.indexOf(indx);
        // console.log('indx',indx,'Pindex',Pindex,parent.tags);
        parent.tags.splice(indx, 1);
        this.globalService.setData({
            'ProjectTags': parent.tags
        });
        // console.log('parent.tags',parent.tags);
    };
    TaggDirective = __decorate([
        core_1.Component({
            selector: 'tag-cloud',
            styles: ["\n\n      input:focus {\n      border:0px solid white;\n      outline:0;\n      }\n\n\n\n  \t"],
            template: "\n\n      <div style=\"border-radius: 4px;width:100%;position: relative;top: -10px;\" >\n        <div class=\"pull-left\">\n             <span class=\"tags animate zoomIn\" *ngFor=\"let tag of tags;let i=index;\">{{tag}}<span class=\"tag-close-btn\"><i class=\"fa fa-times\" (click)=\"removeTags(i);\"></i></span></span>\n         </div>\n        <input class=\"pull-left inptag\" id=\"tagenter\" (keyup.enter)=\"addTag($event.target.value)\" placeholder=\"Enter Tag\"/>\n      </div>\n\n\n  \t",
        }),
        __metadata("design:paramtypes", [router_1.Router, global_service_1.globalService])
    ], TaggDirective);
    return TaggDirective;
}());
exports.TaggDirective = TaggDirective;
