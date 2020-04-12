"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
require('dotenv').config();
const Unsplash = require('unsplash-js').default;
const unsplash = new Unsplash({
    accessKey: `${process.env.UNSPLASH_KEY}`,
});
const ImageSearch = {
    // query: { category: string }, page: number, per_page: number
    imageSearch: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield unsplash.search.photos("dog", 1, 5);
            const result = res.toJson();
            console.log("Hello resultsss", result);
            return result;
        }
        catch (err) {
            throw new Error(`Failed to fetch images: ${err}`);
        }
    })
};
ImageSearch.imageSearch();
