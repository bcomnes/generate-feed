# generate-feed

Generate rss/atom/json feeds from a simple, scalable and standard blog index format.  

## Usage

```sh
$ tree log-folder/

log-folder/
├── 2016.json
├── 2017.json
├── 2018.json
└── config.json

$ generate-feed log-folder build-folder # generates a json and atom feed file from the 

$ tree build-folder/

build-folder/
├── atom.xml
└── feed.json
```


https://validator.jsonfeed.org
https://twitter.com/jsonfeed
