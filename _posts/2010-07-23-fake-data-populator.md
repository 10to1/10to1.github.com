---
layout: post
title: Fake data populator
author: Koen
category: rails
---
When you're building webapps, sooner or later you run into a screen where you want to list some data. An index page of all people for instance. There are many other cases where you want a lot of data, but for now, let's follow this path.

Say, you got thousands of people, you're not going to show them all on one page, do you? Probably you will use something like [will_paginate](http://github.com/mislav/will_paginate).

Say, you want to see this pagination stuff in action, in your development environment. Since you are not going to manualy create a couple of thousand people, one option could be to set the number of results per page to 1 or 5 or 6 or ... well you know what I mean.

An other option, better option, is to use [the populator](http://github.com/ryanb/populator) and/or [faker](http://faker.rubyforge.org/) gem(s). The populator gems adds a method 'populate' to all Active Record models.

{% highlight ruby %}
Person.populate(3000) do |person|
  person.first_name = "John"
  person.last_name = "Smith"
  person.number_of_shoes = 1..100
end
{% endhighlight %}

This will create 3000 people with the name John Smith. It becomes better when you throw in the faker gem.

{% highlight ruby %}
Person.populate(3000) do |person|
  person.first_name = Faker::Name.first_name
  person.last_name = Faker::Name.last_name
  person.number_of_shoes = 1..100
  person.email = Faker::Internet.free_email
end
{% endhighlight %}

This will create 3000 people with random names, which is better if you ask me.