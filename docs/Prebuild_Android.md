# 1 Detele Android Folder (If exists) and run:
``` bash
npx expo prebuild
```

# 2 Prebuild config:

## android/gradle.properties:
Change `org.gradle.jvmargs` and `-XX:MaxMetaspaceSize` values (2:1 proportion):
```
org.gradle.jvmargs=-Xmx2048m -XX:MaxMetaspaceSize=1024m
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