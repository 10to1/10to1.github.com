---
layout: post
title: Generating a timestamp string in Ruby
author: Tom
category: rails
---

*In the hope that the Google Gods will help me next time I need this :-)*

An easy way to generate a human-readable timestamp string, following the ISO 8601 standard, is:

{% highlight ruby %}
Time.now.utc.iso8601.gsub('-', '').gsub(':', '')
{% endhighlight %}

Very handy if you need a timestamp in a file you're writing.