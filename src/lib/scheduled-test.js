import request from 'request-promise'

request({
  url: `https://${process.env.USERNAME}:${process.env.USER_PASSWORD}@doorsteps-integration-tests.herokuapp.com`,
  method: 'POST',
  json: true,
  body: {
    app_uuid: process.env.PRODUCTION_UUID,
    url: 'https://www.doorsteps.com',
    app: 'Production Scheduled Test'
  }
})
.then(res => console.log(res))
.catch(err => console.log(err))
