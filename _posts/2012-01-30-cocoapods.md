---
layout: post
title: Cocoapods
author: Bob
category: cocoa
---
### Cocoapods ###
In all of our apps, whether they are web-apps or iOS apps, we make extensive use of different frameworks. These help us to save time by abstracting out stuff that's needed in a lot of different projects.

We also maintain some of our own frameworks:
* [Tin](https://github.com/pjaspers/tin) Makes consuming webservices in iOS a lot easier.
* [Coby](https://github.com/pjaspers/coby) Adds some functionality we know and love from Ruby into several default Obj-C classes.

But these frameworks grow together with our projects, so copying these into several projects can become tedious and managing different versions would make things too complicated.

Ruby has [Bundler](http://gembundler.com/) to solve this problem. Just create a gemfile that lists every "gem" you use, Bundler will install these gems and keep track of the versions in the "Gemfile.lock".

Now there is a similar system for Cocoa, called [Cocoapods](https://github.com/CocoaPods/CocoaPods).

### Installing cocoapods ###
Cocoapods runs on macruby, so installing it using RVM is a breeze:

{% highlight sh %}

$ rvm install macruby

{% endhighlight %}

Then simply setup cocoapods like this:

{% highlight sh %}

$ rvm use macruby
$ macgem install cocoapods
$ pod setup

{% endhighlight %}

And now we're ready to start using Cocoapods.

### Adding Cocoapods to a project ###
Using Cocoapods in a new project is quite similar to using Bundler in a rails project.
We start by adding a Podfile which could look like this:

{% highlight ruby %}

platform :ios

dependency "AFnetworking",
  :git => "git://github.com/AFNetworking/AFNetworking.git"

dependency 'Tin',
  :git => "git://github.com/Reprazent/Tin.git",
  :commit => "baf1c407f74dd6ca6c6c8c46bc0a3a565e79d3b6"

dependency 'coby',
  :git => "git://github.com/pjaspers/coby.git"

dependency "MagicalRecord"

{% endhighlight %}

The platform can either be `:ios` or `:osx`.

Note that, just like with Bundler, you can specify a git repository, and even a commit or tag to reference your dependency. This makes it a lot easier to fix versions and avoid breaking the project when updating the dependencies.

The dependencies referencing a git repository must contain a ".podspec" file. When no repository is specified, Cocoapods looks for the podspec in [it's own spec-repository](https://github.com/CocoaPods/Specs). There's already a bunch of frameworks that are available, and more are sure to follow.

Now we can enable Cocoapods for our project by running `pod install` for the first time.

{% highlight sh %}

$ pod install demoproject.xcodeproj

{% endhighlight %}

This will clone the git repositories of the pods specified in a new "Pods" directory in your project root.
Just like Bundler it will create a "Podfile.lock" which holds the references to the current version of the pods and its dependecies. Together with a new workspace we can use to open our project in XCode.
There we will see that there are actually two projects added to the workspace.

![screenshot workspace](http://f.cl.ly/items/143q1S3e311O3m1O1X1q/Screen%20Shot%202012-01-05%20at%2021.06.36.png)

One containing your regular project, and one containing the pods, this makes it easier to view the source code of these pods while working.

When building your project your pods will be built into "libPods.a" before building the project itself.

![screenshot libPods](http://f.cl.ly/items/0d2l0S2M2G3W28152F0m/Screen%20Shot%202012-01-05%20at%2021.15.14.png)

Now you're good to go. When adding new pods or updating existing ones in your podfile just run `pod install` again to update your "Podfile.lock" and adding or updating the Pods.

When multiple build configurations are needed, we also need to add these in the "Pods.xcodeproj".

![screenshot build configuration](http://f.cl.ly/items/0y2L3A0l2e3N3F2u0e2R/Screen%20Shot%202012-01-05%20at%2021.18.30.png)

You should also set "Skip Install" to yes in your build target in order to create archives for different build types.

![screenshot skip install](http://f.cl.ly/items/0i0O3P0o0R1N2w313U1L/Screen%20Shot%202012-01-05%20at%2021.32.44.png)

_thanks [Verbeeckx](/author/jelle/) for figuring these last two out_

### Creating your own Cocoapods ###

To be able to add our own frameworks into our own projects easily, we had to add a ".podspec" to the repos.
These podspecs look very similar to the gemspecs in Ruby.

{% highlight ruby %}

Pod::Spec.new do |s|
  s.name     = 'Tin'
  s.version  = '0.0.1'
  s.license  = 'MIT'
  s.summary  = 'Tin makes the internet easier in Cocoa.'
  s.homepage = 'https://github.com/pjaspers/Tin'
  s.author   = { 'pjaspers' => 'piet@jaspe.rs' }

  s.description = 'An optional longer description of Tin.'

  s.source   = { :git => 'https://github.com/pjaspers/Tin.git' }

  s.source_files = 'Classes',
                   'Classes/**/*.{h,m}',
                   "Tin",
                   "*.{h,m}"

  s.dependency 'JSONKit'
  s.dependency "AFNetworking", "~> 0.8.0"
end

{% endhighlight %}

In this podspec we set the source, where Cocoapods can find the repository to clone.
We specify where the required classes can be found within the repository.
We can also set several dependencies, specifying the tags that should be used.

Note that adding a dependency like this, it needs to be present in the [spec repository](https://github.com/CocoaPods/Specs) of Cocoapods.
When the correct tag or framework isn't present in the repo yet, we can add it ourselves in the Podfile of the project we are using the framework in.
In the case of Tin, we had to add "AFNetworking" separately in the Podfile because the highest available version from Cocoapods was 0.7.0.

I suspect Cocoapods will gain a lot in popularity in the future, because it makes adding dependencies to projects much easier. As it gains in popularity, more frameworks will become available.

I suggest you get over to the Cocoapods [github](https://github.com/CocoaPods/CocoaPods) and give it a try.
