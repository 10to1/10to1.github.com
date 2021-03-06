---
layout: post
title: Fancy a Natter ?
author: Piet
category: rails
---

### What's a [Natter](http://natter.r10.railsrumble.com)?

{% highlight html %}
natter |ˈnatər| informal
verb [ intrans. ]
talk casually, esp. about unimportant matters;
chatter : they nattered away for hours.
{% endhighlight %}

Most of us here at [10to1](http://10to1.be) are avid Twitter users and being the <del>social media experts</del> geeks that we are we've also got a Facebook account. The problem is; we like Twitter much more than we do Facebook. So when a Facebook-friend commented on something we've posted via Twitter, we didn't know it until hours later.

So we felt an itch and the [Rails Rumble](http://railsrumble.com) was an excellent excuse to scratch it.

### What's a Rails Rumble?

> The Rails Rumble is an annual 48 hour web application development competition in which teams of skilled web application developers get one weekend to design, develop, and deploy the best web property that they can, using the power of Ruby and Rails.

We ([Jelle](http://twitter.com/fousa), [Koen](http://twitter.com/atog) and [me](http://twitter.com/junkiesxl)) teamed up with [Nick](http://twitter.com/nilo) to participate in this year's event. We did the nuts and bolts while [Nick](http://twitter.com/nilo) made sure the app looked as well as it does.

And it sure as hell looks as tight as we could have hoped for.

![Zot Franske](http://farm2.static.flickr.com/1434/5118151514_99dac05d2e_d.jpg "Natter in action")

Since we only had 48 hours to make it, we didn't get in as much features as we wanted but all the basics are there.

* Did we have fun? Yes.
* Will we participate again? Yes.
* Are we proud of our 13th place? Yes. (13 is the new 1)
* Did we sleep much? No. (OK: I overslept for 6 hours; quit whining [Jelle](http://twitter.com/fousa))
* Did it have bugs? Yes, some.
* Could we have done it without Rails? No. (Okay, maybe in Sinatra)
* Will we push the app even further? Yes. (It got an update last night, which fixed some bugs and made some performance enhancements).

### How does it work?

After you sign up with [Natter](http://natter.r10.railsrumble.com), it will listen to your tweets and post them to Facebook, enhancing them to atual Facebook posts if they contain an URL or an image.

![Example](http://farm2.static.flickr.com/1066/5117584255_ac2053f1ca_d.jpg)

Now, dear reader, I can tell you're not impressed but here's the kicker; whenever a Facebook-user posts a comment to a Natter posted tweet on Facebook, Natter will post this comment on Twitter. And, you can reply to it, straight from the confines of your sweet minimal (before they redesigned) Twitter.

So now you've gone full circle for al your social networking needs. (Unless you're one of thos [Jaiku](http://jaiku.com) or IRC guys)

### Yeah, but how does it work?

We couldn't have done it without standing on some pretty big shoulders; so we're using (like most of our webaps) [Rails](http://rubyonrails.org/) coupled with the following gems: [twitter_oauth](http://github.com/moomerman/twitter_oauth) for handling all things Twitter, [facebook_oauth](http://github.com/moomerman/facebook_oauth) for all things Facebook, [bitly](http://github.com/philnash/bitly) to make the Facebook links small and kinda sexy (I'm stretching the limits of sexy here, it's more [javacool](http://twitter.com/junkiesxl/statuses/19729619848) and to make sure the server can handle it all we're using [Resque](http://github.com/defunkt/resque) for queuing all background jobs (pretty much everything is a background job).

The whole thing is hosted on a, Rails Rumble supplied, [Linode](http://linode.com) slice which also hosts our MySQL db. We've only brought it down once, and that was pretty much our own fault (note to future self: decide who puts the indexes on the DB), so it's safe to say Linode rocked.

### What did we learn?

* A sexy design works
* A painless signup process works
* Sleep is overrated
* We need to prepare better (Texts, flow of the app, design sketches,...)
* Testing stuff like this was hard. (Study up on how to test your app)
* Hard deadlines work (We could only submit our final build 10 minutes before the deadline)
* Sysadmin-skillz (or rather [devops](http://en.wikipedia.org/wiki/DevOps) /ht [@frank_be](http://twitter.com/frank_be/status/27647075461)) are needed
* Being able to split up your app in tasks suited for one person, is a plus.




