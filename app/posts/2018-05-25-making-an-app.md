I have been asked about my experience making and publishing an app to the
AppStore so I thought that this would be as good of a spot as any.

My app is called
[Day & Night](https://itunes.apple.com/us/app/day-night/id1350609762?mt=12)
and the idea had come from a
[Reddit post](https://www.reddit.com/r/mac/comments/7wiwvf/first_time_in_this_subreddit_i_need_help_changing/).
This idea of changing wallpapers based on time of day had been accomplished by others as well as me making scripts and cron jobs to eyeball the times.

# The First Version

So when I first set out to make the app I had to think what would make it different and make it so people would want to buy it.

1. No scripts required
2. Would use actual sunrise / sunset times

The first came when I implemented just a basic app that held on to the image
file locations and ran `NSTimer`s. I then used data provided by
[sunrise-sunset.org](https://sunrise-sunset.org). I realized that the app
needed to cache the data it received as well as function without the user's
location and internet.

This came to be a mashup between `NSTimer` and `NSBackgroundActivityScheduler`.

The first version of this app was $0.99 and had only the image through a
file-picker and sent location data to an API request to
[sunrise-sunset.org](https://sunrise-sunset.org).

## Publishing

This version of the app was approved after modifications to parts of it's UI to
conform to Apple's model for the AppStore.

Soon after publishing I had gotten feedback from customers that had used my app.
The most helpful feedback were criticisms and feature requests.

Requests included
- Ability to add dragging and dropping files onto the part of the app that represented the time.
- Control multi-monitor support
- Higher refresh rate
- Offline date calculation

The first two were added easily but the second two weren't possible with the
current API I was using. Then some Redditor brought up
[ceeK/Solar](https://github.com/ceeK/Solar) and I now had a way to calculate
sunrise and sunset times offline. However the framework had used Swift `struts`
and needed to be reinitialized for every check and update to the location.

The app then would have to hold on to all the initialization data and fire
multiple useless calculations every time it checked conditions that might be
called in multiple places to keep it up-to-date.

I became aware that this didn't suit my needs but could. I had then forked the
repo to [BrandonRoehl/Solar](https://github.com/BrandonRoehl/Solar) where I
made the modifications necessary to convert it into a class that only
initialized the version of sunset sunrise that was needed being able to cache
calculations and update times without reinitialization. And after implementing
it in my own app offered a [pull request](https://github.com/ceeK/Solar/pull/33)
on the original repo.

# Number 2.0

For the second version I had implemented everything in the first Version
as well as changed the monetization scheme of the app to a Freemium based
product.

I had done this because I had read somewhere, _don't remember where_
> 90% of your sales come from 10% of your customers

I had implemented the Freemium version and had actually seen an increase in the
sales showing far more people were willing to give the app a try when it was
free than when it was only paid.

So this app even with that scheme and 450 units on
[itunesconnect](https://itunesconnect.apple.com) this will never pass the money
it took to publish it, but I have learned a ton along the way and will continue
to maintain it for the few who's lives I've improved.
