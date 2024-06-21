# react-native-iap (Android)

docs: https://react-native-iap.dooboolab.com/docs/get-started/#android-1

OBS: The import `import com.dooboolab.rniap.RNIapPackage` and usage of `new RNIapPackage()` is not necessary, because it will cause a double import, due the reason of expo automatically add all the packages inside `android/settings.gradle` file.

INSTALATION:

- Add on `android/app/build.graddle` file:

```
dependencies {
  ...
  implementation project(':react-native-iap')
  ...
}
```
```
android {
  ...
  defaultConfig {
    ...
    missingDimensionStrategy "store", "play"
  }
  ...
}
```

Add on `android/settings.graddle` file:

```
include ':react-native-iap'
project(':react-native-iap').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-iap/android')
```