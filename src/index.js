import createDatastoreClient from '@google-cloud/datastore';

const createFakeLogger = () => ({ debug: () => null });

export { default as googleDatastoreTunneling } from './tunneling';

export default function({ platform, projectId, keyFilename, logger = createFakeLogger() }) {
    if (!platform) {
        throw new Error('Can\'t create Google Datastore instance in adapter. Please provide platform name.');
    }

    logger.debug(`Google Cloud Datastore connected to ${projectId} project`);

    return function(entryId, senderId) {
        const namespace = `${platform}.${entryId}.${senderId}`;
        const datastore = createDatastoreClient({
            projectId,
            keyFilename,
            namespace
        });

        return {
            key: (keys) => datastore.key({
                namespace,
                path: keys
            }),
            save: (keyValueData) => new Promise((resolve, reject) => {
                datastore.save(keyValueData, error => {
                    if (error) {
                        return reject(error);
                    }

                    resolve(keyValueData.data);
                })
            }),
            get: (key) => new Promise((resolve, reject) => {
                datastore.get(key, (error, entity) => {
                    if (error) {
                        console.log(error);
                        return reject(error);
                    }

                    resolve(entity);
                })
            }),
            delete: (key) => new Promise((resolve, reject) => {
                datastore.delete(key, (error, entity) => {
                    if (error) {
                        return reject(error);
                    }

                    resolve(entity);
                })
            })
        }
    };
}
