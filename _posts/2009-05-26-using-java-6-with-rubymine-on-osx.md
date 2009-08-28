---
layout: post
title: Using Java 6 with RubyMine on OS X
author: Koen
category: rails
---
What do you need?

* [OS X](http://www.apple.com/macosx/)
* [Java 6](http://developer.apple.com/java/)
* [RubyMine](http://www.jetbrains.com/ruby/)

Next, open RubyMine’s `Info.plist`:

{% highlight bash %}
mate /Applications/RubyMine\ 1.0.5.app/Contents/Info.plist
{% endhighlight %}

Find the line with value `1.5*` en change it to `1.6*`.

Start RubyMine and check the 'about'. It should look something like this:

![RubyMine about screen](http://farm3.static.flickr.com/2480/3567900318_bf2309a98a_o.jpg)

Enjoy. [It does feel snappier on my side](http://twitter.com/atog/statuses/1921998572).

On a sidenote: You can set the [default Java version](http://stuffthathappens.com/blog/2009/05/23/setting-java-version-on-leopard/) via the 'Java Preferences' app.
