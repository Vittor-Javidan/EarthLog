- change Image Service to Media Service
- move sync data to their own folder
- Add sync data for media
- Implement Picture amount feedback into camera layer
- Add info about media being deleted on sample/widget/input deletion warning message.
- Add a image feedback for PictureInput in case image do not exist on given directory.

# After implementation finish
- find a way to move the download/upload sync logic to DataProcess Service.
- create a database method to define all sync data into 'uploaded' or 'new'
- rename sync methods on Sync Service
- create a excalidraw map of all services already created.
- add a popUp to normal alerts
- remove all unecessary arrow functions reconstructions
- change the gap between inputs to 15
- fix the typos on AlertService
- Inside AlertService, on setConfig, rename the argument from 'question' to 'config'
- rename buttons theme props, to use 'active' instead 'pressed'
- remove ID and IDsArray types