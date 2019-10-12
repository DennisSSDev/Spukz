"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = __importDefault(require("../misc/helper"));
var dataTypes_1 = require("../global/dataTypes");
var dataStore_1 = require("../global/dataStore");
var GetIcon = function (req, res) {
    var accept = req.headers.accept;
    if (helper_1.default(accept, res)) {
        return;
    }
    var query = req.query;
    var type = query.type;
    if (!type) {
        res.status(400).json({
            id: 'ErrorBadIconRequest',
            message: 'You must specify the type of icon you require'
        });
        return;
    }
    if (!Object.keys(dataTypes_1.Type).includes(type)) {
        res.status(400).json({
            id: 'ErrorBadIconRequest',
            message: 'The Icon type you specified does not exist'
        });
        return;
    }
    res.json(dataStore_1.QueryIcon(type));
};
exports.default = GetIcon;
