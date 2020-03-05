"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MerchantUsersAddDir = (function () {
    function MerchantUsersAddDir() {
    }
    MerchantUsersAddDir = __decorate([
        core_1.Component({
            selector: 'merchant-users-add',
            template: "\n     <div class=\"row\">\n      <div class=\"col-sm-6\">\n        <label>First Name</label>\n        <input class=\"form-control\" />\n      </div>\n      <div class=\"col-sm-6\">\n        <label>First Name</label>\n        <input class=\"form-control\" />\n      </div>\n     </div>\n\n     <div class=\"row\">\n      <div class=\"col-sm-6\">\n        <label>Organization Email</label>\n        <input class=\"form-control\" />\n      </div>\n      <div class=\"col-sm-6\">\n        <label>Password</label>\n        <input class=\"form-control\" />\n      </div>\n     </div>\n\n     <div class=\"row\">\n      <div class=\"col-sm-6\">\n        <label>Gender</label>\n        <select class=\"form-control\">\n          <option>Male</option>\n          <option>Female</option>\n        </select>\n      </div>\n      <div class=\"col-sm-6\">\n\n       <label>Role</label>\n        <label class=\"text-primary pull-right pointer\">Manage</label>\n\n        <select class=\"form-control\">\n          <option>Master</option>\n          <option>Product Manager</option>\n        </select>\n      </div>\n     </div>\n\n     <div class=\"row\">\n      <div class=\"col-sm-6\">\n        <label>Location</label>\n        <input class=\"form-control\" />\n      </div>\n      <div class=\"col-sm-6\">\n        <label>City</label>\n        <input class=\"form-control\" />\n      </div>\n     </div>\n\n     <div class=\"row\">\n      <div class=\"col-sm-6\">\n        <label>State</label>\n        <input class=\"form-control\" />\n      </div>\n      <div class=\"col-sm-6\">\n        <label>Country</label>\n        <input class=\"form-control\" />\n      </div>\n     </div>\n\n     <div class=\"row\">\n      <div class=\"col-sm-6\">\n        <label>Report to</label>\n        <input class=\"form-control\" />\n      </div>\n      <div class=\"col-sm-6\">\n        <label>Status</label>\n        <select class=\"form-control\">\n          <option>Active</option>\n          <option>In active</option>\n        </select>\n      </div>\n     </div>\n\n\n\n\n  "
        })
    ], MerchantUsersAddDir);
    return MerchantUsersAddDir;
}());
exports.MerchantUsersAddDir = MerchantUsersAddDir;
