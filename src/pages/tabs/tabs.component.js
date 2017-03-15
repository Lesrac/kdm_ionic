"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var contact_1 = require('../contact/contact');
var settlements_component_1 = require('../settlements/settlements.component');
var survivors_component_1 = require('../survivors/survivors.component');
var TabsPageComponent = (function () {
    function TabsPageComponent() {
        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.tab1Root = settlements_component_1.SettlementsPageComponent;
        this.tab2Root = survivors_component_1.SurvivorsPageComponent;
        this.tab3Root = contact_1.ContactPage;
    }
    TabsPageComponent = __decorate([
        core_1.Component({
            templateUrl: 'tabs.component.html',
        })
    ], TabsPageComponent);
    return TabsPageComponent;
}());
exports.TabsPageComponent = TabsPageComponent;
