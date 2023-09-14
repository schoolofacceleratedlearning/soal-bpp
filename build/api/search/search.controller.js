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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_util_1 = require("../../utils/request.util");
var constants_1 = require("../../constants");
var axios_1 = __importDefault(require("axios"));
function searchController(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var searchDto, data, searchResponse, requestOptions, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    searchDto = req.body;
                    console.log('Request body from the BPP SEARCH', searchDto);
                    searchDto.context.domain = constants_1.DSEP_DOMAIN;
                    searchDto.context.action = constants_1.SEARCH_ACTION;
                    searchDto.context.bpp_id = constants_1.BPP_ID;
                    searchDto.context.bpp_uri = constants_1.BPP_URI;
                    (0, request_util_1.sendAcknowledgement)(res, 'ACK');
                    console.log('Making request to ', "".concat(process.env.DELTA_PROVIDER_URI, "/search"));
                    return [4 /*yield*/, axios_1.default.post("".concat(process.env.DELTA_PROVIDER_URI, "/search"), searchDto, {
                            headers: {
                                'Content-Type': 'application/json',
                                // You might need additional headers
                            },
                        })];
                case 1:
                    data = (_a.sent()).data;
                    searchResponse = {
                        context: searchDto === null || searchDto === void 0 ? void 0 : searchDto.context,
                        message: {
                            catalog: data,
                        },
                    };
                    console.log('search response: ', searchResponse);
                    searchResponse.context.action = constants_1.ON_SEARCH_ACTION;
                    requestOptions = {
                        headers: {
                            'Content-Type': 'application/json',
                            // authorization: authHeader,
                        },
                        withCredentials: true,
                        // ... You might want to add more options here.
                    };
                    console.log('calling request forwarder from bpp', "".concat(searchDto.context.bap_uri, "on_search"));
                    return [4 /*yield*/, axios_1.default.post("".concat(searchDto.context.bap_uri, "on_search"), searchResponse, requestOptions)];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    err_1 = _a.sent();
                    console.log('BPP ERRRRRRRRRRR %%%%%%%%', err_1);
                    res.status(500).json({ error: 'Internal server error!' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.default = searchController;
