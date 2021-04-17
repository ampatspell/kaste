# kaste

![](https://github.com/ampatspell/kaste/raw/master/screenshots/screenshot-1.png)
![](https://github.com/ampatspell/kaste/raw/master/screenshots/screenshot-2.png)
![](https://github.com/ampatspell/kaste/raw/master/screenshots/screenshot-3.png)
![](https://github.com/ampatspell/kaste/raw/master/screenshots/screenshot-4.png)

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

## Fork

To deploy it in your own firebase project:

* `config.js` → update production environment config
* `firebase/.firebaserc` → set project id for `production`

```
$ npm install
$ cd firebase/functions && npm install
$ FIREBASE=production npm run deploy:all
```
