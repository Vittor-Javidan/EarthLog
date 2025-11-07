export type Scope = {
  scope: (
    'TEST SCOPE'                               |
    'VERSION CHANGE SCOPE'                     |
    'SETTINGS SCOPE'                           |
      'LANGUAGE SELECTION SCOPE'               |
      'DATE AND TIME SCOPE'                    |
      'THEME SCOPE'                            |
      'VIBRATION OPTIONS SCOPE'                |
    'CREDENTIAL SCOPE'                         |
    'HOME SCOPE'                               |
    'FILE EXPLORE SCOPE'                       |
    'EXPORTED FILES SCOPE'                     |
    'SUBSCRIPTIONS SCOPE'
  )
} | {
  scope: 'PROJECT SCOPE' | 'EXPORT PROJECT SCOPE'
  id_project: string
} | {
  scope: 'SAMPLE SCOPE'
  id_project: string
  id_sample: string
}
