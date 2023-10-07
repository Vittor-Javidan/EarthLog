// Before any commit, use the command line: tsc --noEmit

# 0.1.3.6 AppAPI new endpoint and fix

- Fixed a issue where the download could be triggered many times, causing an attempt to crete projects with same ids.
- Sample buttons flatlist and some database methods was change in order to fix a bug where uploaded projects comes with samples inverted, and keeps inverted for each upload and download process.
- New Upload enpoint created.
- Now projects has a new prop to save a log of each upload mande. Those are saved only after a succesfull upload.
- New cloud status propertie implemented.