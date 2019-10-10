"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var v4_1 = __importDefault(require("uuid/v4"));
var path_1 = __importDefault(require("path"));
var content_1 = __importDefault(require("./global/content"));
var handle_1 = __importDefault(require("./feed/handle"));
var handle_2 = __importDefault(require("./form/handle"));
var dataStore_1 = require("./global/dataStore");
var handle_3 = __importStar(require("./company/handle"));
var app = express_1.default();
var directory = __dirname;
// Data by default should always be JSON. If you're still using XML /shrug
app.use(express_1.default.static(path_1.default.join(directory, 'client/build')));
app.use(express_1.default.json());
app.use(express_session_1.default({
    genid: function () {
        var id = v4_1.default();
        dataStore_1.AddNewUser(id);
        return id;
    },
    secret: 'devops_1n_D3_Hauz',
    resave: false,
    saveUninitialized: true
}));
app.get('/getFeed', function (req, res) {
    handle_1.default(req, res);
});
app.head('/getFeed', function (req, res) {
    res.writeHead(200, undefined, { 'Content-Type': 'application/json' }).send();
});
app.post('/newResource', function (req, res) {
    handle_2.default(req, res);
});
app.get('/getCompanies', function (req, res) {
    handle_3.default(req, res);
});
app.head('/getCompanies', function (req, res) {
    res.writeHead(200, undefined, { 'Content-Type': 'application/json' }).send();
});
app.post('/postRating', function (req, res) {
    handle_3.PostCompanyRating(req, res);
});
// any ask should serve React, unless specified
app.get('*', function (req, res) {
    res.sendFile(path_1.default.join(directory + "/client/build/index.html"));
});
// create initial data and servable icons
content_1.default();
var port = process.env.PORT || 5000;
app.listen(port, function () { return console.log("Listening on port " + port); });
