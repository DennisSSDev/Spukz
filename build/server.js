"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var app = express_1.default();
var port = process.env.PORT || 5000;
app.use(express_1.default.static(path_1.default.join(__dirname, 'client/build')));
app.get('/api/getList', function (req, res) {
    var list = ['item1', 'item2', 'item3'];
    res.json(list);
});
app.get('*', function (req, res) {
    res.sendFile(path_1.default.join(__dirname + "/client/build/index.html"));
});
// console.log that your server is up and running
app.listen(port, function () { return console.log("Listening on port " + port); });
