# generate-feed

Generate rss/atom/json feeds from a simple, scalable and standard blog index format.  

## Usage

```console
$ tree log-folder/

log-folder/
├── 2016.json
├── 2017.json
├── 2018.json
└── config.json

$ generate-feed log-folder --dest build-folder # generates a json and atom feed file from the 

$ tree build-folder/

build-folder/
├── 2016.json
├── 2017.json
├── feed.json
└── atom.xml
```

## CLI

```console
$ generate-feed --help
Usage: generate-feed [source] [options]

    Example: generate-feed source/ -b build/

    source                path to source directory (default: log)
    --dest, -b            path to build directory (default: "build")
    --version, -v         show version information
    --help, -h            show help

```

https://validator.jsonfeed.org
https://twitter.com/jsonfeed
