---
layout: post
title: Vim Flog Plugin
category: ruby
author: jelle
---

A couple of days ago I found a nice Vim plugin to show the flog scores of your Ruby code insise your Vim editor. 

But because it wasn't really displayed the way I wanted, I forked and customized it.

**Now what is [Flog](http://ruby.sadi.st/Flog.html)?**

> Flog shows you the most torturous code you wrote. The more painful the code, the higher the score. The higher the score, the harder it is to test.

For more information on the scores, you can read some interesting blog posts [here](http://jakescruggs.blogspot.com/2008/08/whats-good-flog-score.html) and [here](http://www.railsinside.com/tutorials/487-how-to-score-your-rails-apps-complexity-before-refactoring.html).

**Vim Plugin**

Here is a screenshot of what flog integration looks like in Vim:

![Vim Flog Plugin](https://assets2.github.com/img/f4d68ac0e77039c0ac3437a7d39cb50a6045be25?repo=&url=http%3A%2F%2F10to1.blog.s3.amazonaws.com%2Fvim-flog.png&path= "Vim Flog Plugin")

As you can see you now always have a number in front of each `def` block. This number is the flog score, the higher, the more complex your code is.

In case you would like to use it, you can install it by following these [steps](https://github.com/fousa/vim-flog#installation).

**Credits**

All the credits for this plugin go to [@skammer](http://www.twitter.com/skammer) because he initially wrote the plugin, I just jumped on it and changed it a bit.

**Emacs**

In case you're using emacs, [Piet](http://blog.10to1.be/author/piet/) recommends using the [Emacs Ruby Complexity Plugin](https://github.com/topfunky/emacs-starter-…).

**Resources**

* [Flog](http://ruby.sadi.st/Flog.html)
* [Emacs Ruby Complexity Plugin](https://github.com/topfunky/emacs-starter-kit/tree/master/vendor/ruby-complexity/)
* [Pycomplexity Plugin](https://github.com/garybernhardt/pycomplexity)
* [Ruby Cyclomatic Complexity Vim Plugin](https://github.com/skammer/vim-ruby-complexity)
* [The Source of this Vim Plugin](https://github.com/fousa/vim-flog)
