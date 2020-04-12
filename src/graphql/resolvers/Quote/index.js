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
const type_1 = require("../../../lib/type");
const utils_1 = require("../../../lib/utils");
const api_1 = require("../../../lib/api");
const verifyCreateQuoteInput = ({ quote, author, type }) => {
    if (quote.length < 50) {
        throw new Error('Quote must be greater than 50 characters');
    }
    if (author.length < 3) {
        throw new Error('Author name must be longer than 3 characters');
    }
    if (type !== type_1.QuoteType.Passage && type !== type_1.QuoteType.Quote) {
        throw new Error('Type must be "QUOTE" or "PASSAGE"');
    }
};
exports.quoteResolvers = {
    Query: {
        quotes: (_root, { category, filter, limit, page }, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            //category here is the users search query
            category;
            try {
                const data = {
                    total: 0,
                    result: []
                };
                let cursor = yield db.quotes.find({ $text: { $search: `${category}` } });
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
                if (viewer && viewer._id) {
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
    },
    Mutation: {
        createQuote: (_root, { input }, { db, req }) => __awaiter(void 0, void 0, void 0, function* () {
            verifyCreateQuoteInput(input);
            let viewer = yield utils_1.authorize(db, req);
            if (!viewer) {
                throw new Error('Viewer not found. Please log in!');
            }
            const imageUrl = yield api_1.Cloudinary.upload(input.image);
            const insertResult = yield db.quotes.insertOne(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId() }, input), { image: imageUrl }));
            const insertedQuote = insertResult.ops[0];
            yield db.users.updateOne({ _id: viewer._id }, { $push: { quotes: insertedQuote._id } });
            return insertedQuote;
        })
    }
};
