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
    var platform = _ref.platform,
        projectId = _ref.projectId,
        keyFilename = _ref.keyFilename,
        _ref$logger = _ref.logger,
        logger = _ref$logger === undefined ? createFakeLogger() : _ref$logger;

    if (!platform) {
        throw new Error('Can\'t create Google Datastore instance in adapter. Please provide platform name.');
    }

    logger.debug('Google Cloud Datastore connected to ' + projectId + ' project');

    return function (entryId, senderId) {
        var namespace = platform + '.' + entryId + '.' + senderId;
        var datastore = (0, _datastore2.default)({
            projectId: projectId,
            keyFilename: keyFilename,
            namespace: namespace
        });

        return {
            key: function key(keys) {
                return datastore.key({
                    namespace: namespace,
                    path: keys
                });
            },
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
                            console.log(error);
                            return reject(error);
                        }

                        resolve(entity);
                    });
                });
            },
            delete: function _delete(key) {
                return new Promise(function (resolve, reject) {
                    datastore.delete(key, function (error, entity) {
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

var _datastore = require('@google-cloud/datastore');

var _datastore2 = _interopRequireDefault(_datastore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createFakeLogger = function createFakeLogger() {
    return { debug: function debug() {
            return null;
        } };
};