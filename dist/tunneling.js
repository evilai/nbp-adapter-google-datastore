'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (client) {
    return function (req, res, next) {
        if (!req.bot) {
            throw new Error('Field \'bot\' should be initialized in request object.');
        }

        if (!req.bot.normalized) {
            throw new Error('No normalized data in request object.');
        }

        req.bot.normalized.reduce(function (acc, data) {
            data.googleDatastore = client(data.sender.id, data.recipient.id);
            acc.push(data);
            return acc;
        }, []);

        next();
    };
};