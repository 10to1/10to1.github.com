---
layout: post
title: Create UML diagrams from the command line
category: ruby
author: Koen
---
Maybe you know it, maybe you don't but [yUML](http://yuml.me) is awesome!

> Create and share simple UML diagrams in your blogs, wikis, forums, bug-trackers and emails.

Yesterday I was creating a new class diagram using [yUML](http://yuml.me) and besides it's a great product it was a bit cumbersome working in a small textarea and pressing 'Generate!' (all the time). I fired up [textmate](http://macromates.com) and created a diagram using the yUML syntax. A couple of minutes later I had ruby script which generated the diagram using yUML by taking a text file as input.

Thanks to [Jeweler](http://github.com/technicalpickles/jeweler) it's dead easy to create gems and release them to [Gemcutter](http://gemcutter.org/) so [a yumlcmd gem](http://gemcutter.org/gems/yumlcmd) was born.

###Installation###

`sudo gem install yumlcmd`

###Usage###

`yumlme -f your-diagram.txt`

###Example your-diagram.txt###


`[Customer]+1->*[Order]`  
`[Order]++1-items >*[LineItem]`  
`[Order]-0..1>[PaymentMethod]`
	
Syntax overview: [http://yuml.me/diagram/scruffy/class/draw](http://yuml.me/diagram/scruffy/class/draw)

I hope you like it as much as I do :)