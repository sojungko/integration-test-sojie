import auth from 'basic-auth'
import express from 'express'
import bodyParser from 'body-parser'
import debug from 'debug'
import get from 'lodash.get'
import helmet from 'helmet'
import morgan from 'morgan'
import startTests from '../lib/start-tests'

const app = express()
const log = debug('server')

app.use(morgan('tiny'))
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Greetings from Integration Tests app!')
})

app.post('/', (req, res) => {
  const user = auth(req)

  if (!isAuth(user) && (process.env.NODE_ENV !== 'development')) {
    res.sendStatus(403)
    return
  }

  if (process.env.ENABLED === 'false') {
    log('Integration tests are disabled')
    res.sendStatus(200)
    return
  }

  let {
    app,
    app_uuid,
    url,
  } = req.body

  console.log('app', app)
  console.log('app_uuid', app_uuid)
  console.log('url', url)
  console.log('process.env.NODE_ENV', process.env.NODE_ENV)
  console.log('process.env.TEST_DELAY', process.env.TEST_DELAY)
  console.log('process.env.TIMEOUT', process.env.TIMEOUT)

  switch (app_uuid) {
    case process.env.LABS_UUID:
    case process.env.DEV_UUID:
    case process.env.STAGING_UUID:
    case process.env.PRODUCTION_UUID:
      log(`Detected: ${app}`)

      if (app === 'rentals-www') url = 'https://www.doorsteps.com'

      startTests(url)
      res.sendStatus(200)
      return

    default:
      if (process.env.NODE_ENV === 'development') {
        log('Development Detected')
        startTests(url)
        res.sendStatus(200)
        return
      }

      log('No Matches')
      res.sendStatus(500)
      return
  }

})

app.get('/toggle-tests', (req, res) => {
  res.send(`Integration tests are enabled: ${process.env.ENABLED}`)
})

app.post('/toggle-tests', (req, res) => {
  const user = auth(req)

  if (!isAuth(user) && (process.env.NODE_ENV !== 'development')) {
    res.sendStatus(403)
    return
  }

  if (process.env.ENABLED === 'false') {
    process.env.ENABLED = 'true'
  } else {
    process.env.ENABLED = 'false'
  }

  res.sendStatus(200)
})

app.set('port', process.env.PORT || 5005)

app.listen(app.get('port'), () => {
  log('Integrated tests app listening on port 5005!')
})

function isAuth (user) {
  const validUsername = process.env.USERNAME === get(user, 'name')
  const validPassword = process.env.USER_PASSWORD === get(user, 'pass')

  return  validUsername && validPassword
}
