"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_merge_1 = __importDefault(require("lodash.merge"));
const Viewer_1 = require("./Viewer");
exports.resolvers = lodash_merge_1.default(Viewer_1.viewerResolvers);
