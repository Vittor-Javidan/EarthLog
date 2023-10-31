// Before any commit, use the command line: npx tsc --noEmit

# 0.1.9.18 Delete media method refactored.

- Instead openning and closing the sync file for each deletion, now the its openned only once.
- Deletion performance optimized.
- Now there is only one method that handles any media deletion. For now just picture, but adapted to implement video and audio as well.