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
var dataTypes_1 = require("./dataTypes");
var dataStore_1 = __importStar(require("./dataStore"));
// Data by default should always be JSON. If you're still using XML /shrug
var app = express_1.default();
app.use(express_1.default.static(__dirname + "/../client/build"));
app.use(express_1.default.json());
app.get('/getFeed', function (req, res) {
    var query = req.query;
    var accept = req.headers.accept;
    if (!accept) {
        res.status(400).json({
            id: 'NoAcceptHeader',
            message: 'The accept header was not provided'
        });
    }
    if (accept !== 'application/json') {
        res.status(400).json({
            id: 'NotSupportedAccept',
            message: 'The specified accept header is not supported'
        });
    }
    var start = query.start;
    var end = query.end;
    var tagsArr = [];
    // deal with tags. There is no future plan to add more tags so this is fine
    if (query.github && query.github === 'true')
        tagsArr.push(dataTypes_1.Tag.GitHub);
    if (query.cpp && query.cpp === 'true')
        tagsArr.push(dataTypes_1.Tag['C++']);
    if (query.vault && query.vault === 'true')
        tagsArr.push(dataTypes_1.Tag.Vault);
    if (query.unreal && query.unreal === 'true')
        tagsArr.push(dataTypes_1.Tag.Unreal);
    if (query.unity && query.unity === 'true')
        tagsArr.push(dataTypes_1.Tag.Unity);
    try {
        res.json(dataStore_1.GetResources(start, end, tagsArr));
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
});
app.head('/getFeed', function (req, res) {
    res.writeHead(200, undefined, { 'Content-Type': 'application/json' }).send();
});
app.post('/newResource', function (req, res) {
    var body = req.body;
    var type = body.type, link = body.link, title = body.title, description = body.description, tags = body.tags;
    var newResource = {
        type: type,
        link: link,
        title: title,
        description: description,
        tags: tags,
        icon: dataStore_1.default.iconMap[type]
    };
    if (!type || !link) {
        res.status(400).json({
            id: 'InvalidParams',
            message: 'The supplied parameters are invalid'
        });
        return;
    }
    if (!Object.values(dataTypes_1.Type).includes(type)) {
        res.status(404).json({
            id: 'InvalidType',
            message: 'The supplied resource type does not exist'
        });
    }
    // todo: validate link
    if (!description) {
        newResource.description = '';
    }
    var status = 201;
    try {
        status = dataStore_1.AddNewResource(newResource);
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
    if (status !== 201) {
        res.status(status).send();
        return;
    }
    res
        .status(status)
        .json({ id: 'OK', message: 'successfully added new resource' });
});
app.get('*', function (req, res) {
    res.sendFile(__dirname + "/../client/build/index.html");
});
// create initial data and servable icons
dataStore_1.GenContent();
var port = process.env.PORT || 5000;
app.listen(port, function () { return console.log("Listening on port " + port); });
