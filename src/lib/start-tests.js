import debug from 'debug'
import { exec } from 'child_process'

const log = debug('server')

export default function startTests (origin = process.env.ENDPOINT) {
   log(`Starting tests targeting ${origin}`)

   setTimeout(() => {
    exec(`ENDPOINT=${origin} mocha -r setup  --timeout ${process.env.TIMEOUT} --compilers js:babel-register test --reporter=min`, (err, stdout, stderr) => {
      let message = `Results for running integration tests on ${origin} ${stdout}`.replace('\u001b[2J\u001b[1;3H', '') // beginnng of stdout has \u001b[2J\u001b[1;3H for min reporter

      log(message)
      if (err) {
        // prepend an @everyone if the test has an error
        // https://api.slack.com/docs/message-formatting-
        message = '<!channel>\n' + message
        log(err)
      }

      // exec(`curl -X POST --data-urlencode 'payload={
      //   "channel": "#${process.env.SLACK_CHANNEL}",
      //   "username": "integration-bot",
      //   "text": ${JSON.stringify(message)},
      //   "icon_emoji": ":success:"
      // }' ${process.env.SLACK_URL}`, (err, stdout, stderr) => {

      //   if (stdout !== 'ok') {
      //     log(`Error posting to #${process.env.SLACK_CHANNEL} -- Output: ${stdout}`)
      //   } else {
      //     log(`Posted to #${process.env.SLACK_CHANNEL}`)
      //   }

      // })
    })
  }, process.env.TEST_DELAY)
}
