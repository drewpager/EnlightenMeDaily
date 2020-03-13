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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../../../lib/api");
const crypto_1 = __importDefault(require("crypto"));
const LogInViaGoogle = (code, token, db) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = yield api_1.Google.logIn(code);
    if (!user) {
        throw new Error(`Failed to log in with Google`);
    }
    const userNamesList = user.names && user.names.length ? user.names : null;
    const userPhotosList = user.photos && user.photos.length ? user.photos : null;
    const userEmailList = user.emailAddresses && user.emailAddresses.length ? user.emailAddresses : null;
    const userNames = userNamesList ? userNamesList[0].displayName : null;
    const userId = userNamesList && userNamesList[0].metadata && userNamesList[0].metadata.source
        ? userNamesList[0].metadata.source.id
        : null;
    const userAvatar = userPhotosList && userPhotosList[0].url ? userPhotosList[0].url : null;
    const userEmail = userEmailList && userEmailList[0].value ? userEmailList[0].value : null;
    if (!userNames || !userId || !userAvatar || !userEmail) {
        throw new Error('Google login error');
    }
    const updateRes = yield db.users.findOneAndUpdate({ _id: userId }, {
        $set: {
            name: userNames,
            avatar: userAvatar,
            contact: userEmail,
            token
        }
    }, { returnOriginal: false });
    let viewer = updateRes.value;
    if (!viewer) {
        const insertResult = yield db.users.insertOne({
            _id: userId,
            token,
            name: userNames,
            avatar: userAvatar,
            contact: userEmail,
            bookmarkings: [],
            quotes: []
        });
        viewer = insertResult.ops[0];
    }
    return viewer;
});
exports.viewerResolvers = {
    Query: {
        authUrl: () => {
            try {
                return api_1.Google.authUrl;
            }
            catch (error) {
                throw new Error(`failed to query Google auth url: ${error}`);
            }
        }
    },
    Mutation: {
        logIn: (_root, { input }, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const code = input ? input.code : null;
                const token = crypto_1.default.randomBytes(16).toString("hex");
                const viewer = code
                    ? yield LogInViaGoogle(code, token, db)
                    : undefined;
                if (!viewer) {
                    return { didRequest: true };
                }
                return {
                    _id: viewer._id,
                    token: viewer.token,
                    avatar: viewer.avatar,
                    didRequest: true
                };
            }
            catch (error) {
                throw new Error(`Failed to log in: ${error}`);
            }
        }),
        logOut: () => {
            try {
                return { didRequest: true };
            }
            catch (error) {
                throw new Error(`failed to log out of Google: ${error}`);
            }
        }
    },
    Viewer: {
        id: (viewer) => {
            return viewer._id;
        }
    }
};
