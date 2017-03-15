"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var storage_1 = require('./storage');
/**
 * Created by Daniel on 08.02.2017.
 */
var Resource = (function (_super) {
    __extends(Resource, _super);
    function Resource() {
        _super.apply(this, arguments);
    }
    return Resource;
}(storage_1.Storage));
exports.Resource = Resource;
(function (ResourceType) {
    ResourceType[ResourceType["Basic"] = 0] = "Basic";
    ResourceType[ResourceType["WhiteLion"] = 1] = "WhiteLion";
    ResourceType[ResourceType["Phoenix"] = 2] = "Phoenix";
    ResourceType[ResourceType["ScreamingAntelope"] = 3] = "ScreamingAntelope";
    ResourceType[ResourceType["Strange"] = 4] = "Strange";
})(exports.ResourceType || (exports.ResourceType = {}));
var ResourceType = exports.ResourceType;
