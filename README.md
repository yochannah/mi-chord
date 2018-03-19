# MI-Chord

A visual chord representation of protein complex data from:
https://www.ebi.ac.uk/complexportal/


### Development

MI-Chord uses `gulp` to compile itself
```bash
npm install -g gulp
```

To build the project and watch for changes, use the default gulp task:
```bash
gulp
```

To release a compressed (production) version of the project:
```bash
gulp deploy
```

Note that while the source code is in coffeescript, the compiled JavaScript files are included in the repository to provide better integration with other NodeJS build solutions, such as a webpack.
