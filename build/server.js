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
var got_1 = __importDefault(require("got"));
var content_1 = __importDefault(require("./global/content"));
var handle_1 = __importDefault(require("./feed/handle"));
var handle_2 = __importDefault(require("./form/handle"));
var dataStore_1 = require("./global/dataStore");
var handle_3 = __importStar(require("./company/handle"));
var helper_1 = require("./misc/helper");
var handle_4 = __importDefault(require("./github/handle"));
var handle_5 = __importDefault(require("./gdctalks/handle"));
var app = express_1.default();
var directory = __dirname;
/**
 * Date from which to filter github repos from.
 * Anything older than this will not be considered
 */
var oldestDate = new Date('2018-01-01');
/**
 * Server setup
 */
// Data by default should always be JSON. If you're still using XML /shrug
app.use(express_1.default.static(path_1.default.resolve(directory + "/../client/build")));
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
/**
 * GETs and HEADs
 */
app.get('/getFeed', function (req, res) {
    handle_1.default(req, res);
});
app.head('/getFeed', function (req, res) {
    res.writeHead(200, undefined, { 'Content-Type': 'application/json' }).send();
});
app.get('/getCompanies', function (req, res) {
    handle_3.default(req, res);
});
app.head('/getCompanies', function (req, res) {
    res.writeHead(200, undefined, { 'Content-Type': 'application/json' }).send();
});
app.get('/github', function (req, res) {
    handle_4.default(req, res);
});
app.head('/github', function (req, res) {
    res.writeHead(200, undefined, { 'Content-Type': 'application/json' }).send();
});
app.get('/gdctalks', function (req, res) {
    handle_5.default(req, res);
});
app.head('/gdctalks', function (req, res) {
    res.writeHead(200, undefined, { 'Content-Type': 'application/json' }).send();
});
/**
 * POSTs
 */
app.post('/newResource', function (req, res) {
    handle_2.default(req, res);
});
app.post('/postRating', function (req, res) {
    handle_3.PostCompanyRating(req, res);
});
/**
 * STATIC SERVE
 */
app.get('*', function (req, res) {
    res.sendFile('index.html', { root: './client/build' });
});
// create initial meta data and servable icons
content_1.default();
/**
 * Get the unreal github repos and cache them away
 */
got_1.default
    .get('https://api.github.com/search/repositories?q=Unreal+language:cpp&sort=stars&order=desc', { json: true })
    .then(function (response) {
    var json = response.body;
    var store = dataStore_1.produceStore(json, oldestDate);
    dataStore_1.SetGitHubStore(store);
})
    .catch(function (error) {
    console.log(error.response.body);
});
/**
 * Get the unity gitub repos and cache them away
 */
got_1.default
    .get('https://api.github.com/search/repositories?q=Unity+language:csharp&sort=stars&order=desc', { json: true })
    .then(function (response) {
    var json = response.body;
    var store = dataStore_1.produceStore(json, oldestDate);
    dataStore_1.SetGitHubStore(store, true);
})
    .catch(function (error) {
    console.log(error.response.body);
});
/**
 * Request the data for GDC vault 2019 talks (for now)
 * and filter them for Career Seminars,
 * as long as they are not related to artists
 */
got_1.default
    .get('http://yankooliveira.com/gdcvault/2019_extended.json', { json: true })
    .then(function (response) {
    var json = response.body;
    var predicate = function (value) {
        var title = value.title;
        var titleS = title;
        return (
        // ignore all artist talks
        value.track === 'Game Career Seminar' &&
            !titleS.includes('Artist') &&
            !titleS.includes('artist') &&
            !titleS.includes('Artists') &&
            !titleS.includes('artists'));
    };
    var data = helper_1.filterObject(json, predicate);
    dataStore_1.SetGDCTalkStore(data);
});
var port = process.env.PORT || 5000;
app.listen(port, function () { return console.log("Listening on port " + port); });
