"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Helper func for finding out if the accepts are valid
 * true means that an issue was found
 * false means that everything is ok
 */
var handleAccept = function (accept, res) {
    if (!accept) {
        res.status(400).json({
            id: 'NoAcceptHeader',
            message: 'The accept header was not provided'
        });
        return true;
    }
    if (accept !== 'application/json') {
        res.status(400).json({
            id: 'NotSupportedAccept',
            message: 'The specified accept header is not supported'
        });
        return true;
    }
    return false;
};
exports.default = handleAccept;
