---
layout: post
title: i18n and Rails Engines
author: Koen
category: rails
---
Rails Engines, what are they? What do they do? But most importantly: how do they do it?

> Rails 2.3 brings us much of the same functionality as the Rails Engines plugin. Learn how to embed one application into another in [this episode](http://railscasts.com/episodes/149-rails-engines).

Engines allow us to use one application in another in the form of a plugin. As the [screencast](http://railscasts.com/episodes/149-rails-engines) shows, you can integrate the `app` folder of a Rails application in the plugin of another one. All models, controllers and views are available. If you still need custom functionality, you can add them in your applications 'own' `app` folder by redefining the model, controller or view. The same goes for routes; if you have `routes.rb` in your plugin dir, it is loaded as well.

And **i18n**, how about that? You would *expect* `config/locals/*.yml` to work just as nicely as the `app` dir and `routes.rb`. But it doesn't.

Luckily, it's not that hard to solve:

In `environment.rb`, you add

{% highlight ruby %}
config.i18n.load_path += Dir[Rails.root.join('vendor', 
	'plugins', 'your_plugin', 'config', 'locales', 
	'*.{rb,yml}')]
{% endhighlight%}

If you prefer to read the [Railscast](http://railscasts.com/episodes/149-rails-engines): [ASCIIcasts - 149: Rails Engines](http://asciicasts.com/episodes/149-rails-engines)