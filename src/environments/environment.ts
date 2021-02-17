// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyCQd2CJZJbZ5pZ1kMhjMo6err9_znKn1l8',
    authDomain: 'test-development-frontend.firebaseapp.com',
    projectId: 'test-development-frontend',
    storageBucket: 'test-development-frontend.appspot.com',
    messagingSenderId: '614352294114',
    appId: '1:614352294114:web:11db6a7387648703a08ebb'
  },
  url_api_get_users: 'https://api.github.com/search/users?q=',
  url_api_get_user: 'https://api.github.com/users/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
