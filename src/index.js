import createGcloud from 'google-cloud';

const createFakeLogger = () => ({ debug: () => null });

export default function({ platform, projectId, keyFilename, logger = createFakeLogger() }) {
    if (!platform) {
        throw new Error('Can\'t create Google Datastore instance in adapter. Please provide platform name.');
    }
    const gcloud = createGcloud({
        projectId,
        keyFilename
    });
    logger.debug(`Google Cloud Datastore connected to ${projectId} project`);

    return function(entryId, senderId) {
        return gcloud.datastore({ namespace: `${platform}.${entryId}.${senderId}` });
    };
}
