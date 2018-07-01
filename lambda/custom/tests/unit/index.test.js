const Alexa = require('ask-sdk-core');
const { PersistenceAdapter } = require('ask-sdk-core');
const { services } = require('ask-sdk-model');
const { HandlerInput, BaseSkillFactory } = Alexa;
const assert = require('power-assert')
const { expect } = require('chai')
const { handler , HelpIntentHandler, GetAddressIntent} = require('../../index.js')

const { ResponseFactory, AttributesManagerFactory } = require('ask-sdk-core')
const { ServiceClientFactory, apiClient } = services

const getHandlerInput = (requestEnvelope, context = {}) => {
  const handlerInput = {
    requestEnvelope,
    context,
    attributesManager: AttributesManagerFactory.init({
      requestEnvelope,
      persistenceAdapter: PersistenceAdapter
    }),
    responseBuilder: ResponseFactory.init(),
    serviceClientFactory: apiClient
      ? new ServiceClientFactory({
        apiClient: apiClient,
        apiEndpoint: requestEnvelope.context.System.apiEndpoint,
        authorizationValue: requestEnvelope.context.System.apiAccessToken
      })
      : undefined
  }
  return handlerInput
}

const event = {
  session: {
    new: true,
    sessionId: 'amzn1.echo-api.session.[unique-value-here]',
    attributes: {},
    user: {
      userId: 'amzn1.ask.account.[unique-value-here]'
    },
    application: {
      applicationId: 'amzn1.ask.skill.[unique-value-here]'
    }
  },
  version: '1.0',
  request: {
    locale: 'en-US',
    timestamp: '2016-10-27T18:21:44Z',
    type: 'AMAZON.Help',
    requestId: 'amzn1.echo-api.request.[unique-value-here]'
  },
  context: {
    AudioPlayer: {
      playerActivity: 'IDLE'
    },
    System: {
      device: {
        supportedInterfaces: {
          AudioPlayer: {}
        }
      },
      application: {
        applicationId: 'amzn1.ask.skill.[unique-value-here]'
      },
      user: {
        userId: 'amzn1.ask.account.[unique-value-here]'
      }
    }
  }
}

describe('test', () => {
  it('canHandle test', () => {
    const param = {
      requestEnvelope: event
    }
    const result = HelpIntentHandler.canHandle(param)
    assert.equal(result, false)
  })
  it('lambda invoke test', (done) => {
    handler(event, {}, (error, result) => {
      assert.equal(error, null)
      assert.equal(result.response.outputSpeech.ssml, "<speak>Sorry, I can\'t understand the command. Please say again.</speak>");
      done()
    })
  })
  it('handler test', async() => {
    const { DefaultHandlerAdapter } = Alexa;
    const handlerAdapter = new DefaultHandlerAdapter()
    const testHandler = {
      canHandle: function(){ return true},
      handle: function (handlerInput) {
        return {shouldEndSession: true}
      }
    }
    const response = await handlerAdapter.execute(null, testHandler)
    assert.deepEqual(response, {shouldEndSession: true})
  })
  it('help intent handler test', async() => {
    const { DefaultHandlerAdapter, ResponseFactory } = Alexa;
    const handlerAdapter = new DefaultHandlerAdapter()
    const Input = getHandlerInput(event)
    const response = await handlerAdapter.execute(Input, HelpIntentHandler)
    assert.equal(response.outputSpeech.ssml, "<speak>You can say hello to me!</speak>")
    assert.equal(response.shouldEndSession, false)
  })
})
