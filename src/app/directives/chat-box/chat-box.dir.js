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
var animations_1 = require("@angular/animations");
var ApiService_1 = require("./../../services/ApiService");
var ChatboxDir = (function () {
    function ChatboxDir(apiService) {
        this.apiService = apiService;
        this.fileAttachment = false;
        this.imageAttachment = false;
        this.message = new core_1.EventEmitter();
        this.state = 'inactive';
    }
    ChatboxDir.prototype.messageChnage = function (str) {
        this.message.emit(str);
    };
    ChatboxDir.prototype.actionActive = function () {
        var _this = this;
        this.state = 'void';
        setTimeout(function () { _this.state = 'active'; }, 5);
    };
    ChatboxDir.prototype.handShake = function () {
        //  this.apiService.socketConnectionTest().then(res=>{
        //    console.log('chat box handshake',res);
        //  }).catch(err=>{
        //
        //  });
        this.apiService.test({
            name: 'admin'
        }).then(function (res) {
            console.log(res);
        });
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ChatboxDir.prototype, "message", void 0);
    ChatboxDir = __decorate([
        core_1.Component({
            selector: 'chat-box',
            styleUrls: ["./app/directives/chat-box/chat-box-style.css"],
            //  templateUrl: `./app/directives/chat-box/chat-box-template.html`,
            template: "",
            animations: [
                animations_1.trigger('chatState', [
                    animations_1.state('inactive', animations_1.style({
                        height: '40px'
                    })),
                    animations_1.state('void', animations_1.style({
                        opacity: 0,
                    })),
                    animations_1.state('active', animations_1.style({
                        opacity: 1,
                        height: '400px',
                        transition: 'height 5s'
                        //transform: 'scale(1.1)'
                    })),
                    animations_1.transition('void => active', animations_1.animate('500ms ease-in')),
                    animations_1.transition('active => inactive', animations_1.animate('800ms ease-in', animations_1.style({ opacity: 0 }))),
                    animations_1.transition('inactive => active', animations_1.animate('400ms')),
                ])
            ]
        }),
        __metadata("design:paramtypes", [ApiService_1.ApiService])
    ], ChatboxDir);
    return ChatboxDir;
}());
exports.ChatboxDir = ChatboxDir;
