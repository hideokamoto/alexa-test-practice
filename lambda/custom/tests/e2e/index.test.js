const kuchimane = require('kuchimane')
const Kuchimane = kuchimane.default
const assert = require('power-assert')
const LaunchRequest = require('../../handlers/LaunchRequest')
const HelloWorldIntent = require('../../handlers/HelloWorldIntent')

const kuchimaneRunner = Kuchimane.runner({ LaunchRequest, HelloWorldIntent }, `${__dirname}/kuchimane_config.json`)

describe('e2e', () => {
  it('greet', () => {
    return kuchimaneRunner.talkCheck('Open greeter', (replyMessage) => {
      console.log(replyMessage)
      assert.deepEqual(replyMessage, 'Welocome to GreetingBot')
      // expect(replyMessage).to.include('Welocome to GreetingBot')
    })()
      .then(kuchimaneRunner.talkCheck('Hello', (replyMessage) => {
        assert.deepEqual(replyMessage, 'Hello! Good day')
      }))
  })
})
