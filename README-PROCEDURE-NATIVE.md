
# vue create
```
cd ~/IdeaProjects/iwaki-onion-architecture-for-vuejs
vue-native init onion-architecture-native
```

# Please enter a few initial configuration values.
```
? Please enter a few initial configuration values.
  Read more: https://docs.expo.io/versions/latest/workflow/configuration/ › 100% completed
 {
   "expo": {
     "name": "onion-architecture-native",
     "slug": "onion-architecture-native"
   }
 }
```

# Yarn v1.17.3 found. Use Yarn to install dependencies?
```
✔ Please enter a few initial configuration values.
  Read more: https://docs.expo.io/versions/latest/workflow/configuration/ · 100% completed
? Yarn v1.17.3 found. Use Yarn to install dependencies? Yes
```

# first run serve
```
cd ~/IdeaProjects/iwaki-onion-architecture-for-vuejs/onion-architecture-native
yarn
yarn start
```

# 👎 Warning on first run
```
Warning: DatePickerIOS has been merged with DatePickerAndroid and will be removed in a future release. It can now be installed and imported from '@react-native-community/datetimepicker' instead of 'react-native'. See https://github.com/react-native-community/react-native-datetimepicker
- node_modules/expo/build/environment/muteWarnings.fx.js:27:24 in error
- node_modules/fbjs/lib/warning.js:30:18 in printWarning
- node_modules/fbjs/lib/warning.js:51:23 in <anonymous>
- node_modules/react-native/Libraries/Utilities/warnOnce.js:29:10 in warnOnce
- node_modules/react-native/Libraries/react-native/react-native-implementation.js:48:6 in module.exports.get__DatePickerIOS
- node_modules/vue-native-helper/build.js:3942:12 in Object.keys.map$argument_0
* [native code]:null in map
- node_modules/vue-native-helper/build.js:3939:30 in buildNativeComponent
* http://127.0.0.1:19001/node_modules/expo/AppEntry.bundle?platform=ios&dev=true&minify=false&hot=false:123358:82 in <unknown>
- node_modules/metro/src/lib/polyfills/require.js:322:6 in loadModuleImplementation
- node_modules/expo/AppEntry.js:5:0 in <global>
- node_modules/metro/src/lib/polyfills/require.js:322:6 in loadModuleImplementation
- node_modules/metro/src/lib/polyfills/require.js:201:45 in guardedLoadModule
* http://127.0.0.1:19001/node_modules/expo/AppEntry.bundle?platform=ios&dev=true&minify=false&hot=false:130328:4 in global code

```

# additional typescrit modules
```
yarn add --dev typescript
yarn add --dev react-native-typescript-transformer
yarn add --dev @types/react @types/react-native
yarn tsc --init --pretty --jsx react
```

# additional modules
```
yarn add vuex
yarn add nedb-promises events
yarn add axios axios-mock-adapter
```
