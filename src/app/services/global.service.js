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
var globalService = (function () {
    function globalService() {
        this.sharedData = [];
        this.sharedData = localStorage.getItem("globalServiceData");
        if (this.sharedData == undefined || this.sharedData == "") {
            this.sharedData = [];
        }
        else {
            this.sharedData = JSON.parse(this.sharedData);
        }
        //  this.sharedData=[];
    }
    globalService.prototype.merge_options = function (obj1, obj2) {
        var obj3 = {};
        for (var attrname in obj1) {
            obj3[attrname] = obj1[attrname];
        }
        for (var attrname in obj2) {
            obj3[attrname] = obj2[attrname];
        }
        return obj3;
    };
    globalService.prototype.setData = function (data) {
        //this.sharedData = data;
        var existingData = this.sharedData;
        var newData = data;
        var combined = this.merge_options(existingData, newData);
        this.sharedData = [];
        this.sharedData = combined;
        localStorage.setItem("globalServiceData", JSON.stringify(this.sharedData));
    };
    globalService.prototype.getData = function () {
        return this.sharedData;
    };
    globalService.prototype.removeData = function () {
        this.sharedData = [];
        localStorage.setItem("globalServiceData", JSON.stringify(this.sharedData));
    };
    globalService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], globalService);
    return globalService;
}());
exports.globalService = globalService;
