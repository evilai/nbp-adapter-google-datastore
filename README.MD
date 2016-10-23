# Google Datastore adapter

```js
import googleDatastoreAdapterFactory from 'nbp-adapter-google-datastore';
const datastoreAdapter = googleDatastoreAdapterFactory({
    platform: 'name-of-your-platform',
    projectId: 'google-project-id',
    keyFilename: 'path-to-your-keys-json',
    logger: 'your logger instance'
});
```

Then you can get a namespaced datastore instance by passing `entryId` (can be a FB Page ID for example) and `senderId` (this is user ID):
 
 ```js
 const datastore = datastoreAdapter({
    entryId: 'fb-page-id',
    senderId: 'user-id'
 });
 ```
 
 `datastore` is a usual datastore instance. So you can [check docs](https://googlecloudplatform.github.io/google-cloud-node/#/docs/google-cloud/0.43.0/datastore).