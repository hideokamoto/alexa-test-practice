/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core')
// handlers
const ErrorHandler = require('./handlers/ErrorHandler')
const LaunchRequestHandler = require('./handlers/LaunchRequest')
const HelloWorldIntentHandler = require('./handlers/HelloWorldIntent')
const HelpIntentHandler = require('./handlers/HelpIntent')
const CancelAndStopIntentHandler = require('./handlers/StopAndCancelIntent')

const SessionEndedRequestHandler = {
  canHandle (handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest'
  },
  handle (handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`)

    return handlerInput.responseBuilder.getResponse()
  }
}

const skillBuilder = Alexa.SkillBuilders.custom()

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    HelloWorldIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda()
