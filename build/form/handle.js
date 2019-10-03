"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var dataTypes_1 = require("../global/dataTypes");
var dataStore_1 = __importStar(require("../global/dataStore"));
var PostResource = function (req, res) {
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
};
exports.default = PostResource;
