---
layout: post
title: 5 Essential Cloud Apps
author: Tom
category: general
---
At the moment 10to1 was started, we decided that we didn't want an internal server. Servers that are internal to your company, cause a lot of headaches. To name a few: connectivity from your home office. Backups. Security. Noise (Server fans whirl. A lot.). Updates. Sysadmin.

This decision has worked out great.

A few of the readers of our blog will think "sure". But most of them will say "What! A successful company like 10to1 doesn't use servers?" For those, I want to give an overview of how we set up the environment for our team.

1 Mail, calendar, essentially everything why people tell you that you need Exchange
----
[Google Apps](http://www.google.com/apps/intl/en/business/index.html)

2 Version control
----
You can't develop software without a decent version control system. If people tell you otherwise, they're wrong. A lot of developers use [Subversion](http://subversion.tigris.org/) or [CVS](http://www.nongnu.org/cvs/), which are both fine version control systems. But setting up a Subversion or a CVS repository is a nightmare for every sysadmin. We use [Git](http://git-scm.com/). And we wouldn't have used Git if [GitHub](http://github.com) didn't exist. The possibilities it offers are endless, and it is a pleasure to work with.

3 Issue tracking
----
Any software company needs a way to keep track of the issues it is working on, or should be working on. We've tried [Basecamp](http://basecamphq.com/), and we found it is fine for general project management. But to handle fine-grained details of issue tracking in a software project, [Lighthouse](http://lighthouseapp.com/) has proven us much more value.

4 File sharing
----
Even with most of our assets in Github and Lighthouse, we occasionally need to share some files amongst ourselves. We need some analysis documents, a way to store our invoices and contracts, etc. It is very important that those documents don't disappear when some hard disk crashes. And ideally, these documents are available also when you're not connected to the internet, like, say, when you're on a train.

We store all these files on [Dropbox](https://www.dropbox.com/home). Dropbox meets all of these requirements, and more.

5 Backchannel
----
Even while we're in a room together, we want to share links, screenshots, and general thoughts in an informal way. You can compare it with 'gathering around the water cooler', but without demanding all our attention at once. Sometimes, when we talk, we want to send a quick link to something we want to show. Sometimes, we just goof around. In all those cases, [Campfire](http://campfirenow.com/) is our tool of choice. We even have some unofficial team members on there: they're not part of 10to1, they're not even in the office, but they are great to talk with.

I've used Campfire to get feedback of our team about this blogpost. Enough said :) 

Wouldn't you want to work in an environment like this? You do know [we're hiring](/general/2010/08/06/developers-developers-developers/), don't you?



