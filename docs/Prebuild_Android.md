# 1 Detele Android Folder (If exists) and run:
``` bash
npx expo prebuild
```

# 2 Prebuild config:

## android/app/src/main/AndroidManifest.xml:
remove from manifest the Health Permission:
```
<uses-permission android:name="android.permission.ACTIVITY_RECOGNITION" tools:node="remove"/>
```

# 3 react-native-iap:

## android/app/src/main/AndroidManifest.xml

copy and paste:
```
<uses-permission android:name="com.android.vending.BILLING" />
```

## android/app/build.gradle

copy and paste:
```
dependencies {
// react-native-iap
    implementation 'com.android.billingclient:billing:6.0.0'
}
```

## android/app/proguard-rules.pro

copy and paste:
```
# react-native-iap
-keep class com.android.billingclient.** { *; }
-keep class com.android.vending.billing.** { *; }
```