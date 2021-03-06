<p align="center">
  <a href="https://bespoken.io/">
    <img alt="Bespoken" src="https://bespoken.io/wp-content/uploads/Bespoken-Logo-RGB-e1500333659572.png" width="546">
  </a>
</p>

<p align="center">
  Virtual Alexa<br>
  Interact with skills intuitively and programmatically.
</p>

<p align="center">
    <a href="https://travis-ci.org/bespoken/virtual-alexa">
        <img alt="Build Status" class="badge" src="https://travis-ci.org/bespoken/virtual-alexa.svg?branch=master">
    </a>
    <a href="https://codecov.io/gh/bespoken/virtual-alexa">
      <img src="https://codecov.io/gh/bespoken/virtual-alexa/branch/master/graph/badge.svg" alt="Codecov" />
    </a>
    <a href="https://www.npmjs.com/package/virtual-alexa">
        <img alt="NPM Version" class="badge" src="https://img.shields.io/npm/v/virtual-alexa.svg">
    </a>
    <a href="http://docs.bespoken.io/">
        <img alt="Read The Docs" class="badge" src="https://img.shields.io/badge/docs-latest-brightgreen.svg?style=flat">
    </a>
    <a href="https://gitter.im/bespoken/bst?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge">
        <img alt="Read The Docs" class="badge" src="https://badges.gitter.im/bespoken/bst.svg">
    </a>
</p>


# Bespoken Virtual Alexa SDK
The Bespoken Virtual Device SDK allows for interacting with skills (and, soon, Actions) programmatically.

The Virtual Alexa class allows for easy interaction programmatically:
    * utter: Generates JSON as if the user said the given phrase
    * intend: Generates JSON as if the given intent was uttered

## Why Do I Need This?
This library allows for easy testing of skills.

You can use it for:

1) Unit-testing - ensuring individual routines work correctly
2) Regression testing - ensuring the code as a whole works properly

## How Do I Get It?
```
npm install virtual-alexa --save-dev
```

## How Do I Use It?
Easy! Just add a line of code like so:
```
const va = require("virtual-alexa");
const alexa = va.VirtualAlexa.Builder()
    .handler("index.handler") // Lambda function file and name
    .intentSchemaFile("./speechAssets/IntentSchema.json") // Path to IntentSchema.json
    .sampleUtterancesFile("./speechAssets/SampleUtterances.txt") // Path to SampleUtterances
    .create();

alexa.utter("play").then((payload) => {
    console.log("OutputSpeech: " + payload.response.outputSpeech.ssml);
    // Prints out returned SSML, e.g., "<speak> Welcome to my Skill </speak>"
});
```

That's all there is to getting started. Take a look here for a more in-depth example:  
https://github.com/bespoken/giftionary/blob/master/test/index.test.js

And read all the docs here:  
https://bespoken.github.io/virtual-alexa/api/

## How Do I Talk To You?
Easy, you can open [an issue here](https://github.com/bespoken/virtual-alexa/issues), or find us on [our Gitter](https://gitter.im/bespoken/bst).

We are also on the [Alexa Slack channel](http://amazonalexa.slack.com) - @jpkbst, @jperata, @chrisramon and @ankraiza.

We look forward to hearing from you!
