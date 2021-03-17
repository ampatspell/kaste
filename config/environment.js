'use strict';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'kaste',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },
    APP: {
    },
    kaste: {
      firebase: {
        apiKey: "AIzaSyD-VB88AREQGysXstiKAuZp5p6NBboSkjE",
        authDomain: "kaste-ir.firebaseapp.com",
        databaseURL: "https://kaste-ir.firebaseio.com",
        projectId: "kaste-ir",
        storageBucket: "kaste-ir.appspot.com",
        messagingSenderId: "920112943882",
        appId: "1:920112943882:web:652929ca90332c968aa0f3",
        measurementId: "G-2NE4NEG0YG"
      },
      functions: {
        region: 'europe-west2'
      }
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
