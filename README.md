<h1 align="center">Home Dashboard Splitwise Manager </h1>
<p align="center">
    <img src="https://travis-ci.org/iamtomhewitt/home-dashboard-splitwise-manager.svg"/>
    <img src="https://heroku-badge.herokuapp.com/?app=home-dashboard-splitwise-manager&style=round&svg=1"/>
</p>
<p align="center">
    💰 A small Node Express app for getting the "I owe you"'s to display on my home dashboard.
</p>
<p align="center">🙌 Big thanks to <a href="https://github.com/keriwarr">Keri Warr</a> for making a Splitwise API!</p>

Here is the [Splitwise API](https://dev.splitwise.com/#introduction).

## Pipeline
* `Travis` tests the repo using `npm test`, which runs `mocha 'tests/**/*.js' --exit`
* Once the tests pass, `Heroku` deploys the app.
* When the app is deployed, you can make requests to it [here](https://home-dashboard-splitwise-manager.herokuapp.com/).

## Endpoints

### `/ (GET)`
The root endpoint, returning information about the app.

#### Responses
* `200` success
```json
{
    "status": "💰 SERVER OK",
    "version": "1.0.0",
    "endpoints": [
        {
            "path": "/",
            "methods": [
                "GET"
            ]
        }
    ]
}
```
