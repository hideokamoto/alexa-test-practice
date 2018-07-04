const Conversation = require('alexa-conversation-model-assert')
const { handler } = require('../../index')

const condition = {
  handler: handler,
  skillId: 'xxxxx',
  request: {
    locale: 'en-US'
  },
  testDescription: ''
}

condition.testDescription = 'Just launch the skill'
Conversation.init(condition)
  .requestIntent('LaunchRequest')
  .equalPlain({
    speech: 'Welcome to the Alexa Skills Kit, you can say hello!',
    reprompt: 'Welcome to the Alexa Skills Kit, you can say hello!'
  })
  .end()

condition.testDescription = 'Use skill by one shot invocation'
Conversation.init(condition)
  .requestIntent('LaunchRequest')
  .requestIntent('HelloWorldIntent')
  .equalPlain({
    speech: 'Hello World!'
  })
  .end()

condition.testDescription = 'Launch and invoke HelloWorld'
Conversation.init(condition)
  .requestIntent('LaunchRequest')
  .equalPlain({
    speech: 'Welcome to the Alexa Skills Kit, you can say hello!',
    reprompt: 'Welcome to the Alexa Skills Kit, you can say hello!'
  })
  .requestIntent('HelloWorldIntent')
  .equalPlain({
    speech: 'Hello World!'
  })
  .end()
