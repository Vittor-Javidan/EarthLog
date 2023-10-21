// Before any commit, use the command line: npx tsc --noEmit

# 0.1.7.12 Bug prevention

- Removed undeline decoration for carousel buttons. Due the possible fatar error described on this issue: https://github.com/facebook/react-native/issues/17530
- This bugged already happenend once in development, and it blocks permanently access to app after occurs once, no matter how many times the app is restarted.