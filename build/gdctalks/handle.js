"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = __importDefault(require("../misc/helper"));
var dataStore_1 = require("../global/dataStore");
/**
 * Retrieves GDC talk data.
 * Due to the low volume of GDC talks, it's ok to return the whole list for now
 * @todo when scale - convert into retrieving based on category and subsize
 */
var GetGDCTalks = function (req, res) {
    var accept = req.headers.accept;
    if (helper_1.default(accept, res)) {
        return;
    }
    res.json(dataStore_1.QueryGDCTalks());
};
exports.default = GetGDCTalks;
