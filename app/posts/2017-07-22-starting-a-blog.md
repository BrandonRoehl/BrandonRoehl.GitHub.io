I am now starting a blog on my website using `Jekyll`

This is hosted on [GitHub Pages](https://pages.github.com)

Here are the steps that it took for me to get this working

**[Gemfile](https://github.com/BrandonRoehl/BrandonRoehl.GitHub.io/blob/master/Gemfile)**
```ruby
source 'https://rubygems.org'
gem 'github-pages'
# or
# gem 'jekyll'
```
**[_config.yml](https://github.com/BrandonRoehl/BrandonRoehl.GitHub.io/blob/master/_config.yml)**
```yaml
sass:
    sass_dir: stylesheets
    style: compressed
permalink: /blog/post-:year-:month-:day-:title.html
defaults:
  -
    scope:
      path: "_posts"
      type: "posts"
    values:
      layout: "post"
```
**[bower.json](https://github.com/BrandonRoehl/BrandonRoehl.GitHub.io/blob/master/bower.json)**
```json
{
  "name": "polymer-project",
  "authors": [
    "Brandon Roehl"
  ],
  "private": true,
  "dependencies": {
    "app-layout": "PolymerElements/app-layout#^0.10.0",
    "app-route": "PolymerElements/app-route#^0.9.0",
    "iron-flex-layout": "PolymerElements/iron-flex-layout#^1.0.0",
    "iron-icon": "PolymerElements/iron-icon#^1.0.0",
    "iron-icons": "PolymerElements/iron-icons#^1.0.0",
    "iron-iconset": "PolymerElements/iron-iconset#^1.0.0",
    "iron-iconset-svg": "PolymerElements/iron-iconset-svg#^1.0.0",
    "iron-media-query": "PolymerElements/iron-media-query#^1.0.0",
    "iron-pages": "PolymerElements/iron-pages#^1.0.0",
    "iron-selector": "PolymerElements/iron-selector#^1.0.0",
    "paper-elements": "PolymerElements/paper-elements#^1.0.7"
  }
}
```

Then just running
```bash
gem install bundler
bundler install
bower install
jekyll s
```

Then I built out the page with polymer using `<app-route>` and `<app-location>`
for the normal routing

For the posts in jekyll you can then loop though with the
{% raw %}`{% for post in post %}`{% endraw %}. An example of how I did this
is in
[`my-blog.html`](https://github.com/BrandonRoehl/BrandonRoehl.GitHub.io/blob/master/src/my-blog.html)

Now because we made the permalink in the `_config.yml` similar to the original
files so then every `<dom-module/>` is able to have the basename of these files
this way then the `<app-location/>` always knows where to look. Then with the
`<iron-pages/>` being able to load in the module and avoid ajax and using
Polymer's `importHref` we are able to load the file once and not have to reload
it every time you navigate as ajax would.

Then it came to just write a post in the `_posts` directory in the way that
Jekyll specifies naming and bam! Every md file gets it's own route dom-module
and tab so they are all loaded and now you don't even have to write posts in
html add locations to the blog page or update the src directory with new
modules.

Happy blogging in static html with Jekyll and Polymer!
