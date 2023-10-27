- Implement image deletion, in case those cases: Sample deletion, widget deletion, input deletion, individual deletion.
- Implement Picture amount feedback into camera layer
- Add info about media being deleted on sample/widget/input deletion warning message.

# After implementation finish
- add a popUp to normal alerts
- remove all unecessary arrow functions reconstructions
- change the gap between inputs to 15
- fix the typos on AlertService
- Inside AlertService, on setConfig, rename the argument from 'question' to 'config'
- rename buttons theme props, to use 'active' instead 'pressed'
- remove ID and IDsArray types