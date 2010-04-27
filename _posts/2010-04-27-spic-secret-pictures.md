---
layout: post
title: Secret pictures (SPIC)
author: Koen
category: ruby
---
A couple of weeks ago, **ruby-play** was imminent and in such a case one should always try some new things. [Heroku](http://heroku.com) is hot, so it had to be something I could deploy on Heroku. [Sinatra 1.0](http://www.sinatrarb.com/one-oh-faq) was released, so it had to be something using Sinatra.

**What else?** [S3](http://aws.amazon.com/s3/) is always fun and with that in mind I found the [CarrierWave gem](http://github.com/jnicklas/carrierwave).

**More?** Sure. To experiment with something else then ActiveRecord I used [Sequel](http://sequel.rubyforge.org/).

**Does it blend?** Sure!

A new example app was born: [SPIC](http://github.com/atog/spic). Spic (secret pictures) allows you to upload files to S3 for your sharing pleasure.

[Heroku](http://heroku.com) really is fun to use. One can setup Spic in only a matter of seconds.

`git clone git://github.com/atog/spic.git`<br />
`cd spic`<br />
`heroku create`<br />
`git push heroku master`<br />
`heroku config:add S3_KEY=your_s3_key S3_SECRET=your_amazon_secret S3_BUCKET=your_bucket SECRET=your_own_personal_jesus`<br />
`heroku open`<br />

It was fun. It was short. It is good.