## Google Datastore adapter

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
 
 ## Tunneling
 Check `tunneling.js`. To bind context of all client's function we need to perform tunneling on each request, so inside skills you can do `memcached.set('key', 'Some text)` without specifying application tokens, with suffixes (`platform.entryId.senderId.key`) for keys.
 
 Look at [router-builder.js](https://github.com/evilai/nodejs-bot-platform/blob/master/src/bot/platforms/messenger/bot-name/router-builder.js) as an example.