---
layout: post
title: Capfire: post deploy notifications to Campfire
category: ruby
author: Piet
---

We use [github](http://github.com) for all our projects, and we use [Campfire](http://campfirenow.com/) as our office backchannel. So when we saw [this post](http://github.com/blog/609-tracking-deploys-with-compare-view) we (or maybe it was just me, I'm a sucker for this kind of stuff) knew we had to have a way to easily use this on all our projects; so here it is: [Capfire](http://github.com/pjaspers/capfire)

### What it does ###

Besides being a kickass gem name, it sends a message to Campfire each time you deploy an application. In this message is a link to Github's compare-view, so you can easily scan just what has changed since your previous deployment. Since it's being sent to Campfire everyone can take a peek. Great !

### Installation ###

First install the gem:

`gem install capfire`

#### First run ####

`script/generate capfire -k campfiretoken -a campfireaccount -r campfireroom`

This will add a snippet to your `config/deploy.rb` to include the capfire capistrano script and will create a file in your home folder named .campfire containing your token, account, room and a configurable message (the parts between ##'s are substituted).

Like this (be careful with your spaces):
<pre>
campfire:
  account: 10to1
  token: thishastobeyourtoken
  room: General
  message: "I (#deployer#) deployed #application#
 with `cap #args#` (#compare_url#)"
</pre>

If you're not sure about this automagically thing, you can do it by hand as well, create the `~/.campfire` file and add the following to your `config/deploy.rb`:

<pre>
begin
  require 'capfire/capistrano'
rescue Object
  # Don't force other users to install Capfire.
end
</pre>

#### Subsequent runs ####

Since a `~/.campfire` file already exists you can just run `script/generate capfire` to add the snippet to your deploy script in each app. You can run this as much you want it will only add the snippet once. No worries.

If someone else on your team doesn't have `capfire` installed, he won't notice a thing (but be sure to mock him).

I hope you, dear reader, like it as much as we do :)
