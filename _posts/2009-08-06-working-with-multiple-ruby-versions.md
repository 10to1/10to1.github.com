---
layout: post
title: Working with multiple ruby versions
author: Koen
category: rails
---
For a while, I've felt an itch to experiment with Ruby 1.9. It would be better to use it in our day-to-day work, but Ruby 1.9 isn't that far yet. What has hold me back until now, is that I don't want to make an unstable Windows machine out of my Maccie. It's my primary workstation, and I have to work on it constantly.

Via [Dr Nic](http://drnicwilliams.com/) I found [Working With Multiple Ruby Versions Has Never Been This Easy](http://blog.thinkrelevance.com/2009/7/29/ruby-switcher-working-with-multiple-ruby-versions-has-never-been-this-easy/).

With the help of the [RubySwitcher](http://github.com/relevance/etc/blob/26ae85c2f6c7d2640a3c75d619ad7ab8fc1cc570/bash/ruby_switcher.sh) script, it is laughingly easy to use several Ruby versions next to one another. There's no more excuse not to do it.

Out of the box, you can install and use the following versions of Ruby:

* install_ruby_191 (install) <br>
use_ruby_191 (use)
* install_ruby_186 (install) <br>
use_ruby_186 (use)
* install_ruby_187 (install) <br>
use_ruby_187 (use)
* install_jruby (install) <br>
use_jruby (use)
* install_jruby_120 (install) <br>
use_jruby_120 (use)
* install_ree_186 (install) <br>
use use_ree_186 (use)

To use the standard Ruby version: `use_leopard_ruby`