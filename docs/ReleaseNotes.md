// Before any commit, use the command line: npx tsc --noEmit

# [1,2] Fix: RESTService

- Removed the 'Bearer ' prefix from received access token during auth process, to allow the server to decide what implementation it wants