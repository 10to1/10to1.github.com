---
layout: post
title: Localizing Javascript in your rails app
author: Jelle
category: rails
---

On a recent project I had to translate some text inside my Javascript code. But I didn't want to use duplicate localization files so I looked for a framework so I could reuse the translations from my rails app. So no duplicate translation files, just the *locales/\*.yml* files used by rails.

###Installation

Add the i18n-js gem to your gemfile.

{% highlight ruby %}
gem "i18n-js"
{% endhighlight %}

Now add the following *before\_filter* to your *ApplicationController*. This generates the Javascript translation file every time you render a page in development.

{% highlight rails %}
class ApplicationController < ActionController::Base
  before_filter :export_i18n_messages

  def export_i18n_messages
    SimplesIdeias::I18n.export! if Rails.env.development?
  end
end
{% endhighlight %}

###Use it!

Before you can really start using the localizations, you have to set the current locale. Do this in your *application.html.erb* file. (But it doesn't really matter where you set it, just do it before the call to translate)

{% highlight erb %}
<%= javascript_include_tag "i18n" %>
<%= javascript_include_tag "translations" %>
<%= javascript_tag do %>
  I18n.defaultLocale = "<%= I18n.default_locale %>";
  I18n.locale = "<%= I18n.locale %>";
<% end %>
{% endhighlight %}

And now just translate the same way you do in your rails app.

{% highlight javascript %}
I18n.t("user.name") // returns 'Name'
{% endhighlight %}

Here is an example of my en.yml file.

{% highlight yaml %}
en:
  user:
    name: "Name"
    children: 
      zero: "no children"
      one: "%{count} child"
      other: "%{count} children"
{% endhighlight %}

### Other shizzle

Using number in your locales with pluralization.

{% highlight javascript %}
I18n.t("user.children", { count: 0 }); // 'no children'
I18n.t("user.children", { count: 1 }); // '1 child'
I18n.t("user.children", { count: 3 }); // '3 children'
{% endhighlight %}

Use a default value when no translation is present.

{% highlight javascript %}
I18n.t("user.age", { defaultValue: "Age" }); // 'Age'
{% endhighlight %}

Use localizations for number formatting.

{% highlight javascript %}
I18n.l("number", 1990.99); // '1,990.99'
{% endhighlight %}

For more info check [Github](https://github.com/fnando/i18n-js).
