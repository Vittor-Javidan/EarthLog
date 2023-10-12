// Before any commit, use the command line: tsc --noEmit

# 0.1.4.4 Upload Date/Time improvements

- Now creating widgets or samples changes the project status from 'uploaded' to 'modified'
- Better comments for scopes where project status was being updated to 'uploaded'.
- Now there is 2 types of dates on uploaded Entries. DateUTC and Date. The new date is the users local date and time.
- New Date and Time service.
- Added time and date format to ConfigDTO
- Any Date and Time method was moved into the new DateTimeService.
- Implemented DateAndTime scope, <DateFormatScreen /> and <TimeFormatScreen />
- fixed a color constras o DARK app theme, where alert popButtons buttons were having the same colors between background and font
- fixed horizontal padding from Theme Buttons to be the same as the new Time and Format screens.
- replaced some <Scrollview /> for <Layout.Scrollview />
- <Button.TextWithIcon /> icon changed from 55 to 45.
- <HomeScreen />: <LastProjectButton /> height reduced from 55 to 45.