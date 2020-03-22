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
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const utils_1 = require("../../../lib/utils");
exports.quoteResolvers = {
    Query: {
        quotes: (_root, { filter, limit, page }, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const data = {
                    total: 0,
                    result: []
                };
                let cursor = yield db.quotes.find({});
                if (filter && filter === "OLDEST") {
                    cursor = cursor.sort({ period: -1 });
                }
                if (filter && filter === "MOST_RECENT") {
                    cursor = cursor.sort({ period: 1 });
                }
                cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
                cursor = cursor.limit(limit);
                data.total = yield cursor.count();
                data.result = yield cursor.toArray();
                return data;
            }
            catch (error) {
                throw new Error(`Failed to query quotes: ${error}`);
            }
        }),
        quote: (_root, { id }, { db, req }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const quote = yield db.quotes.findOne({ _id: new mongodb_1.ObjectId(id) });
                if (!quote) {
                    throw new Error("Quote was not found.");
                }
                // author may be string and therefore not equal to an ID. 
                // possibly remove this
                const viewer = yield utils_1.authorize(db, req);
                if (viewer && viewer._id === quote.reporter) {
                    quote.authorized = true;
                }
                return quote;
            }
            catch (error) {
                throw new Error(`Failed to find quote: ${error}`);
            }
        })
    },
    Quote: {
        id: (quote) => {
            return quote._id.toHexString();
        },
        reporter: (quote, _args, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            const reporter = yield db.users.findOne({ _id: quote.reporter });
            if (!reporter) {
                throw new Error(`Failed to find reporter`);
            }
            return reporter;
        })
    }
};
