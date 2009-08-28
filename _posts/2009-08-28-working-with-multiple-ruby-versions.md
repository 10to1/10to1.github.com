---
layout: post
title: Working with multiple ruby versions
author: Tom
category: rails
---
Remember when we [talked](/rails/2009/08/06/working-with-multiple-ruby-versions/) about how to use multiple versions of Ruby on your Mac?

Well, apparently that post is already outdated. Now all you have to do is to install the [rvm gem](http://rvm.beginrescueend.com/)

I've just tried it, and it works <del>without a hickup</del>. I've noticed one little thing: the installation of the gem creates a file `~/.bash_profile`. This, apparently, overrides `~/.bashrc` on my Mac. I lost all of my neatly-crafted terminal environment. Deleting `~/.bash_profile` fixed this. Happy camper!