'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.googleDatastoreTunneling = undefined;

var _tunneling = require('./tunneling');

Object.defineProperty(exports, 'googleDatastoreTunneling', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_tunneling).default;
    }
});

exports.default = function (_ref) {
    var platform = _ref.platform;
    var projectId = _ref.projectId;
    var keyFilename = _ref.keyFilename;
    var _ref$logger = _ref.logger;
    var logger = _ref$logger === undefined ? createFakeLogger() : _ref$logger;

    if (!platform) {
        throw new Error('Can\'t create Google Datastore instance in adapter. Please provide platform name.');
    }
    var gcloud = (0, _googleCloud2.default)({
        projectId: projectId,
        keyFilename: keyFilename
    });
    logger.debug('Google Cloud Datastore connected to ' + projectId + ' project');

    return function (entryId, senderId) {
        return gcloud.datastore({ namespace: platform + '.' + entryId + '.' + senderId });
    };
};

var _googleCloud = require('google-cloud');

var _googleCloud2 = _interopRequireDefault(_googleCloud);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createFakeLogger = function createFakeLogger() {
    return { debug: function debug() {
            return null;
        } };
};