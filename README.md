# uperweb

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### FireBase Setup
```
create a file firebase.json in root
copy these lines to to file

{
  "hosting": {
    "public": "build",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}

uncomment 
 import 'firebase/messaging';
 import firebaseMessaging from '@/core/service/firebase'
every where in project

uncomment 
 application.config.globalProperties.$messaging = firebaseMessaging
in main.ts

uncomment serviceworker in public/f-m-sw.js

uncomment getToken in mainapp.vue
```
