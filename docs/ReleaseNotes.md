# 0.1.1.8 GPSInput Manual data input

Buttons:
- <TextWithIcon />:
  - Title width removed.
  - added a prop to modify text style.


Inputs:
- Added a display data dedicated for manual input.
- New type GPSAccuracyDTO
- __Display_Data__ renamed to __DataDisplayHandler. Component rendere optimized.
- New type GPSFeaturesDTO
- All local components now use GPSFeaturesDTO instead isolated features states.
- __DataDisplayHandler__ now has 2 sub components: __DisplayStatic__ and __DisplayDataInterative__.
- fixed longitude regex. Numbers less than Absolute(100) was giving false during validation.