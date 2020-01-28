<h1 align="center">Home Dashboard Splitwise Manager </h1>
<p align="center">
    <img src="https://travis-ci.com/iamtomhewitt/home-dashboard-splitwise-manager.svg"/>
    <img src="https://heroku-badge.herokuapp.com/?app=home-dashboard-splitwise-mngr&style=round&svg=1"/>
</p>
<p align="center">
    💰 A small Node Express app for getting the "I owe you"'s to display on my home dashboard.
</p>
<p align="center">🙌 Big thanks to <a href="https://github.com/keriwarr">Keri Warr</a> for making a Splitwise API!</p>

Here is the [Splitwise API](https://dev.splitwise.com/#introduction).

## Pipeline
* `Travis` tests the repo using `npm test`, which runs `mocha 'tests/**/*.js' --exit`
* Once the tests pass, `Heroku` deploys the app.
* When the app is deployed, you can make requests to it.

## Endpoints

### `/ (GET)`
* The root endpoint, returning information about the app.

#### Responses
* `200` success
```json
{
    "status": "💰 SERVER OK",
    "version": "1.0.0",
    "endpoints": [
        {
            "path": "/group",
            "methods": [
                "GET"
            ]
        },
        {
            "path": "/",
            "methods": [
                "GET"
            ]
        }
    ]
}
```

### `/group (GET)`
* Gets the information about a splitwise group.
* Query parameters:
	* `groupId=<group>`

#### Responses
* `200` success
```json
{
    "groupName": "Group Name",
    "lastUpdated": "2020-01-17T09:00:00Z",
    "expenses": [
        {
            "who": "Jimmy",
            "owes": "Tom",
            "amount": "£10"
        },
        {
            "who": "Sarah",
            "owes": "Bob",
            "amount": "£2.50"
        }
    ]
}
```
* `400` bad request if no group id specified
```json
{
    "status": 400,
    "message": "Group ID missing from query"
}
```
* `500` if Splitwise could not get the group
```json
{
    "status": 500,
    "message": "Using group ID: 12345 gave following error: <error message>"
}
```
