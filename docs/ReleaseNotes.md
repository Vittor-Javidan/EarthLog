// Before any commit, use the command line: npx tsc --noEmit

# 0.1.7.3 Backlogs Catch Up

- Fix a bug where useCallback missing a dependency, freezing initial state of inputData when values change.
- Now all label buttons uses only text input, instead text input and a pressable
- Now all labels save in real time, instead after focus losing
- Some newData variable was not being used to set inputData states