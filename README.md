# testing example repository for Alexa Skills Kit

Example test source codes for Alexa Skill made by `ask-sdk`.


## Getting started

### prepare

```
$ npm i -g ask-cli
$ ask init
```

### install

```
$ git clone git@github.com:hideokamoto/alexa-test-practice.git
$ cd alexa-test-practice/lambda/custom
$ pwd
/PATH/TO/alexa-test-practice/lambda/custom
$ npm install
```

### deploy

```
$ cd ../../
$ pwd
/PATH/TO/alexa-test-practice
$ ask deploy
```

## Running tests

### unit test
Simple unit tests by mocha / power-assert/ ask-utils

```
$ cd lambda/custom
$ pwd
/PATH/TO/alexa-test-practice/lambda/custom
$ npm run test:unit
```

### simulation test
Simulation tests by ask-cli / mocha / power-assert

```
$ pwd
/PATH/TO/alexa-test-practice/lambda/custom
$ npm run test:simulation
```
