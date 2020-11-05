# kaste

``` bash
# user who can set roles for other users
$ firebase functions:config:set users.admin="<uid>"
$ firebase functions:config:set environment.region="europe-west2"
```

``` javascript
// make someone uploader
let store = Ember.Namespace.NAMESPACES[0].__container__.lookup('service:store');
await store.setRole('target-uid', 'uploader');
```
