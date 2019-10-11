"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dataStore_1 = require("../global/dataStore");
var helper_1 = __importDefault(require("../misc/helper"));
var GetGitHubRepos = function (req, res) {
    var accept = req.headers.accept;
    if (helper_1.default(accept, res)) {
        return;
    }
    res.json(dataStore_1.QueryGitHubRepos());
};
exports.default = GetGitHubRepos;
