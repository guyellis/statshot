# statshot
Take snapshots of stats from a JSON API

## Install

`npm i -g statshot`

## Usage

### Demo

`statshot demo`
* This will call the `http://api.randomuser.me/` API and report on a randomly generated number (DOB).

### Reality

`statshot -u http://yourapi.com/ -k your.key [-i <interval> -d <false>]`

Example: `statshot -u http://api.randomuser.me/ -k results.0.user.dob -i 5 -d 0`

* -u The URI/URL that will return a JSON result.
* -k The part (key) of the resulting JSON you want to take snapshots of. The value of that key is what will be used.
* -i The number of seconds between each snapshot.
* -d Enable/disable the showing of the change in the value between the current snapshot of this value and the previous one.
  * Only works if the -k key option references a property in the JSON that has a numeric value.
  * Enabled by default.
  * Disable if snap-shotting non numeric data.
