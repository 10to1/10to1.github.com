---
layout: post
title: Roleify, a Rails authorization plugin
author: Koen
category: rails
---
Today I've pushed a few updates to the [Roleify rails plugin](http://github.com/10to1/roleify/tree/master).

The changes are

* you can now use 'namespaced' controllers
* I added a helper method to hide/show blocks for a specified role

### Example

#### The initializer
{% highlight ruby %}
Roleify::Role.configure("role_a", "role_b") do
  {
    :role_a => { :dashboard_issues =>  :all },
    :role_b => { :issues => "index" }
  }
end
{% endhighlight %}

So, `role_a` refers to a `Dashboard::IssuesController` and `role_b` refers to an `IssuesController`.

#### The helper
{% highlight ruby %}
module ApplicationHelper
  include Roleify::RoleifyableHelper
end
{% endhighlight %}

#### The view
{% highlight ruby %}
<% allowed?(Roleify::Role::ROLE_A) do %>
  // whatever you want for role_a eyes only
<% end %>
{% endhighlight %}

More info on [GitHub](http://github.com/10to1/roleify/tree/master).
