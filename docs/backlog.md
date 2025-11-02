# features:

- Add a required boolean option on all inputs (If this option is true, the project will not be allowed to be uploaded to any server until the input is fullfilled)

- Regex validation on Text Input (to simplify server business logic on serverside). (If required is setted true, and exists a regex, the project will not allowed to be uploaded until the regex validate the data)

- Phone Input

- Date Input

- Add Sponsor Subscription Option
    - Since the subscription library is needed to allow the next feature (<MapLayer />) to be economically viable, This is the correct momment to implement sponsoring for those who wants to help the app.

- Add a <MapLayer /> inside the app.
    - The app must provide 2 options (Since the google maps api allows only 1000 calls/month for free)
        - 1: A specific subscription just to unlock the map
            - For those who just want to pay for convenience, to not bother getting through the whole process of getting their own api key
            - To cover usage costs from google of my own API KEY, to make the app economically viable. I can't allow a undefined and unknow number of users have free access, since depending on the number, or hack attack, this could made me have a huge billing to deal with.
        - 2: A free option (Where I will link a youtube video teaching users to create their own API key. But at this point the user is responsible for their own billing with google map. Which is actually good, sincce is hard to open the map 1000 times in a month)
    - The app must be able to load all coordinates of the project into it, with the label: `Sample:Widget:InputName`
    - The map must have a filter, where it shows samples as checkboxes.
    - The map option must be shown on ProjectScope `scr/app/[id_project]` menu
    

- implement compassUI and compass input (Geologic and Normal)

- implement a new type of project that don't have samples

- implement quality camera options

- implement flah auto option

# refactoring:
