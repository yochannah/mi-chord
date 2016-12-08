# MI-model

MI-model parses MI-Json data into backbone.js Models and Collections.

The Models are connected in such a way that accessing various parts of the Complex are done through chaining `get()` methods.
For example, to get the sequence of a protein starting at the participant...

```javascript
complex = new MIModel.complex(data);

complex.get("participants").get(1).get("interactor").get("sequence")
```

Complexes have three useful collections:

```javascript
complex = new MIModel.complex(data);

complex.get("participants") // A Collection of Participant Models
complex.get("interactors") // A Collection of Interactor Models
complex.get("links") // A Collection of Link Models
```

The Models returned from those collections have relationships to connected Models. For instance, one can traverse a from a participant to a linked feature's interactor like so:

complex > participant 1 > feature 2 > linkedFeatures 3 > participant > interactor

```javascript
complex = new MIModel.complex(data);

complex
  .get("participants")
  .get(1)
  .get("features")
  .get(2)
  .get("linkedFeatures")
  .get(3)
  .get("participant")
  .get("interactor")
```
![Alt text](https://cdn.rawgit.com/joshkh/model/master/model.svg "Optional Title")



## Installation

### Browser

```html
<script src="mi-model.js"></script>
```

```javascript
$.get( "json/EBI-9082861.json", function( data ) {
  var complex = new MIModel.complex(data);
});
```

### NodeJS

`npm install --save-dev mi-model`


```javascript
MIModel = require('mi-model')

var mijson = require('./test-data/EBI-9082861.json')

var complex = new MIModel.complex(mijson)
```

## Usage


```javascript

// NOTE: Interactors have a string ID
// Returns an Interactor with ID "uniprotkb_P01127"
complex.get("interactors").get("uniprotkb_P01127")

// NOTE: All other Models have an integer ID (from MIJson)
// Returns a Participant model with ID 4
complex.get("participants").get(1)

// Get a participant's Interactor model
complex.get("participants").get(1).get("interactor")
```

## Development

Running gulp should open your browser and a complex will be logged to the console. Saving changes to .coffee files will reload the browser.

Due to a bug in my Gulpfile you will need to refresh the browser once to clear any errors.

```bash
npm install
bower install
gulp
```

After the project has been built you can minify it by running `gulp compress`

