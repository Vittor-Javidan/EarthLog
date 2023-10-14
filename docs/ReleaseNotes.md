// Before any commit, use the command line: tsc --noEmit

# 0.1.5.3 New sync system design

- Added database service methods for sync files.
- Now all sync logic is manage by a single block of data called syncData. This file contais the status of any element inside the project.
- New type DownloadedProjectDTO was create, to allow some properties diference between client and servers.