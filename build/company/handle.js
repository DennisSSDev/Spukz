"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dataStore_1 = __importStar(require("../global/dataStore"));
var helper_1 = __importDefault(require("../misc/helper"));
var GetCompanies = function (req, res) {
    var accept = req.headers.accept;
    if (helper_1.default(accept, res)) {
        return;
    }
    // per page requests
    var query = req.query;
    if (!query.page || query.page <= 0) {
        // give the first page only
        res.json(dataStore_1.QueryCompanies(0));
        return;
    }
    // give the specified page if it's still in range
    res.json(dataStore_1.QueryCompanies(query.page));
};
/**
 * func for handling user liking and disliking a company
 */
exports.PostCompanyRating = function (req, res) {
    var body = req.body, sessionID = req.sessionID;
    var companyName = body.companyName, rating = body.rating;
    // check if data is valid
    if (!companyName || rating === undefined) {
        return res.status(400).json({
            id: 'MissingData',
            message: 'Company Name and rating are missing'
        });
    }
    var userDB = dataStore_1.default.userDB;
    if (!sessionID || !userDB[sessionID]) {
        return res.status(400).json({
            id: 'InvalidSession',
            message: 'You are not a valid user'
        });
    }
    var actions = userDB[sessionID];
    var companies = dataStore_1.default.store.companies;
    var i = -1;
    var company = companies.find(function (value, index) {
        if (value.name === companyName) {
            i = index;
            return true;
        }
        return false;
    });
    if (!company) {
        return res.status(400).json({
            id: 'InvalidCompany',
            message: 'Provided Company does not exist'
        });
    }
    if (actions.votes[companyName] !== undefined) {
        // has already voted, update the company's data based on the new vote if any
        var vote = actions.votes[companyName];
        if (vote === rating) {
            return res.status(200).json({ id: 'OK', message: 'same vote' });
        }
        if (rating === false) {
            company.meta.ratio.like--;
            company.meta.ratio.dislike++;
        }
        else {
            company.meta.ratio.like++;
            company.meta.ratio.dislike--;
        }
        actions.votes[companyName] = rating;
        companies[i] = company;
    }
    else {
        // new vote
        actions.votes[companyName] = rating;
        if (rating) {
            company.meta.ratio.like++;
        }
        else {
            company.meta.ratio.dislike++;
        }
        companies[i] = company;
    }
    return res
        .status(200)
        .json({ id: 'OK', message: 'successfully added rating' });
};
exports.default = GetCompanies;
