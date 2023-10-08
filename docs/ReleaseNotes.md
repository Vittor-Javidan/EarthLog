// Before any commit, use the command line: tsc --noEmit

# 0.1.3.16 Drawer renderization fixed.

- Now Drawer is rendered inside the <AppLayer />.
- Drawer height and width calculations depends on children current dimenions using onLayout callback event.
- <Button.TextWithIcon /> have the constant 'iosLargeTitle' removed.
- <Button.TextWithIcon /> have a height isolated defined on its icons, allowing the buttons to grow vertically.