---
layout: post
title: Find or create with hash attributes
author: Koen
category: rails
---
[Dynamic finders](http://railscasts.com/episodes/2-dynamic-find-by-methods) in [Rails](http://rubyonrails.org/), represent some the _'magic'_ we've all gotten used to. One can use these dynamic finders to create or initialize a new object when it doesn't already exist.

{% highlight ruby %}
# Find a user by screen_name_
user = User.find_by_screen_name("atog")  

# So instead of ...
user = User.find_by_screen_name("atog")  
unless user  
  user = User.create(:name => "atog")  
end

# ... you can  
user = User.find_or_create_by_screen_name("atog")  
{% endhighlight %}

It gets even better. By passing a hash to the finder you can initialize or create a new object with **all** the values while only the attribute named in the finder will be used to find the object.

{% highlight ruby %}
user = User.find_or_create_by_screen_name(
		:screen_name => "atog", 
		:name => "Koen Van der Auwera")
{% endhighlight %}