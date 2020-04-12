"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_merge_1 = __importDefault(require("lodash.merge"));
const Viewer_1 = require("./Viewer");
const User_1 = require("./User");
const Quote_1 = require("./Quote");
const Bookmark_1 = require("./Bookmark");
exports.resolvers = lodash_merge_1.default(Viewer_1.viewerResolvers, User_1.userResolvers, Quote_1.quoteResolvers, Bookmark_1.bookmarkResolvers);
