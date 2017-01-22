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
        var datastore = gcloud.datastore({ namespace: platform + '.' + entryId + '.' + senderId });

        return {
            key: datastore.key,
            save: function save(keyValueData) {
                return new Promise(function (resolve, reject) {
                    datastore.save(keyValueData, function (error) {
                        if (error) {
                            return reject(error);
                        }

                        resolve(keyValueData.data);
                    });
                });
            },
            get: function get(key) {
                return new Promise(function (resolve, reject) {
                    datastore.get(key, function (error, entity) {
                        if (error) {
                            return reject(error);
                        }

                        resolve(entity);
                    });
                });
            }
        };
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
