"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dataStore_1 = require("../global/dataStore");
var dataTypes_1 = require("../global/dataTypes");
var helper_1 = __importDefault(require("../misc/helper"));
var ProcessTags = function (query, tags) {
    // deal with tags.
    if (query.github && query.github === 'true')
        tags.push(dataTypes_1.Tag.GitHub);
    if (query.cpp && query.cpp === 'true')
        tags.push(dataTypes_1.Tag['C++']);
    if (query.vault && query.vault === 'true')
        tags.push(dataTypes_1.Tag.Vault);
    if (query.unreal && query.unreal === 'true')
        tags.push(dataTypes_1.Tag.Unreal);
    if (query.unity && query.unity === 'true')
        tags.push(dataTypes_1.Tag.Unity);
};
var GetFeed = function (req, res) {
    var query = req.query;
    var accept = req.headers.accept;
    if (helper_1.default(accept, res)) {
        return;
    }
    var start = query.start;
    var end = query.end;
    var tagsArr = [];
    ProcessTags(query, tagsArr);
    try {
        res.json(dataStore_1.QueryResources(start, end, tagsArr));
        return;
    }
    catch (err) {
        if (err.message === 'RangeOverflow') {
            res.status(400).json({
                id: 'RangeOverflow',
                message: 'The given range is not valid'
            });
            return;
        }
        res.status(500).json({
            id: 'ErrorResourceRequest',
            message: 'The server failed to return to find the requested resource'
        });
    }
};
exports.default = GetFeed;
