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
├── 2016.xml
├── 2017.json
├── 2017.xml
├── feed.json
└── feed.xml
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

## Config

The log folder is required to have a `config.json` file.

Required + recommended options:

```json
{
    "title": "Feeds need a title!",
    "url": "https://thesiteurl.com",
    "description": "Explain what this feed is for",
    "author": "Your Name <your@email.com> (https://yourPersonalWebsite.com)"
}
```

Additional configuration properties:

```json
{
    "user_comment": "A comment viewers of the raw feed should see",
    "icon": "https://examaple.com/pic512x512.png",
    "favicon": "https://examaple.com/pic64x64.png",
    "expired": false
}
```

## Log types

### Log

All fields are optional.  These are recommended:

```json
{
    "date": "2018-04-07T15:06:43-07:00",
    "content": "Plain text or HTML",
    "title": "Optional title",
    "url": "/some/url"
}
```

Additional properties:

```json
{
    "modified": "2018-04-07T13:48:02-07:00",
    "link": "https://example.com/some/external/link",
    "image": "/some/optional/image/url",
    "banner_image": "/some/optional/image/url",
    "author": "Some Author <email@gmail.com> (https://example.com/some/external/link)",
    "summary": "you can include a summary",
    "tags": [ "any", "tags" ],
    "attachments": [
        {
            "url": "https://example.com",
            "mime_type": "audio/mpeg",
            "title": "foo a title",
            "size_in_bytes": 123,
            "duration_in_seconds": 123
        }
    ]
}
```

## References

- [jsonfeed.org](https://jsonfeed.org)
- [validator.jsonfeed.org](https://validator.jsonfeed.org)
- [twitter.com/jsonfeed](https://twitter.com/jsonfeed)
- [http://atomenabled.org](https://web.archive.org/web/20160113103647/http://atomenabled.org/developers/syndication/ )
- [bcomnes/jsonfeed-to-atom](https://github.com/bcomnes/jsonfeed-to-atom)


## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/generate-feed.svg?style=flat-square
[3]: https://npmjs.org/package/generate-feed
[4]: https://img.shields.io/travis/bcomnes/generate-feed/master.svg?style=flat-square
[5]: https://travis-ci.org/bcomnes/generate-feed
[8]: http://img.shields.io/npm/dm/generate-feed.svg?style=flat-square
[9]: https://npmjs.org/package/generate-feed
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard
[12]: https://img.shields.io/coveralls/bcomnes/generate-feed/master.svg?style=flat-square
[13]: https://coveralls.io/github/bcomnes/generate-feed
