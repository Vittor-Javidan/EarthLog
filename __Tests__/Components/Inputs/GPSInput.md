# 1: When editMode === false:
  - Must Show edit iconButton
  - Must show delete iconButton when "hideDeleteButton" is false or undefined.
  - Static display must be show with current data.

# 2: When editMode === true:
  - Must show Play iconButton
  - Interative Display for selected options
  - Cancel and save button.
  - Unselecting any option must delete temporary local state data for the unselected option.
  - play iconButton starts gps

# 3: When gps starts:
  - it must collect data for selected options.
  - the current data must be replaced for the most accurate data at the moment.
  - Play icon button must be replaced by a stop iconButton.
  - Cancel and Save buttons must be hidden.
  - Static display must be shown instead the interative

# 4: When gps stop:
  - Must go back to scenario #2.
  - Interative display must be shown instead static Display
  - updated data must populate the interative display

# 5: When cancel button is clicked:
  - Must go back to scenario #1.
  - Must cancel any changes relative from initial data.

# 6:: When save button is clicked:
  - Must go back to scenario #1
  - Must show the updated data on static display.