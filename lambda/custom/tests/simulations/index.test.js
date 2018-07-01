const assert = require('power-assert')
const { execFile } = require('child_process')

describe('test by ask-cli', () => {
  it('should return valid response when send invocation name', (done) => {
    execFile('ask', [
      'simulate', '-s', 'amzn1.ask.skill.d7d6176c-ab76-4e4c-b5ee-81366c4cd223',
      '-l', 'en-US', '-t', 'open greeter'
    ], (error, stdout, stderr) => {
      if (error) {
        assert.deepEqual(error, {})
      } else {
        const { result } = JSON.parse(stdout)
        const { invocationResponse } = result.skillExecutionInfo
        const { response } = invocationResponse.body
        assert.deepEqual(response, {
          card: {
            type: 'Simple',
            title: 'Hello World',
            content: 'Welcome to the Alexa Skills Kit, you can say hello!'
          },
          outputSpeech: {
            type: 'SSML',
            ssml: '<speak>Welcome to the Alexa Skills Kit, you can say hello!</speak>'
          },
          reprompt: {
            outputSpeech: {
              type: 'SSML',
              ssml: '<speak>Welcome to the Alexa Skills Kit, you can say hello!</speak>'
            }
          },
          shouldEndSession: false
        })
      }
      done()
    })
  })
})
