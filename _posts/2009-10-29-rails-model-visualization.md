---
layout: post
title: Rails model visualization
author: Tom
category: rails
---
If you're a developer, you know how it goes. At the beginning of a project, you draw some UML sketches to get you going. There's a [nice tool](http://blog.10to1.be/ruby/2009/10/13/yuml-me-gem/) to do that. As your project goes on, and your code grows, these diagrams don't get updated too often. After all, [every piece of knowledge must have a single, unambiguous, authoritative representation within a system](http://c2.com/cgi/wiki?DontRepeatYourself). And for a class model, that representation is the code.

But at some points during your development, you have to communicate with some stakeholders. They want to know what your class model looks like. So you have to provide them with a drawing. Until recently, we went through the trouble of creating these diagrams manually. But those days are over: we found [yUMLmeRails](http://github.com/nelsonsilva/yUMLmeRails)

To get yourself a diagram, follow these steps:

{% highlight bash %}
cd your_project
script/plugin install \
	git://github.com/nelsonsilva/yUMLmeRails.git
rake yUMLmeRails:download
{% endhighlight %}

Your diagram will be saved in _your\_project_/diagrams. 

Easy. Nice. Handy. Did I mention 'pie' ?