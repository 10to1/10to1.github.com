---
layout: post
title: Stop worrying about Core Data
author: Jelle
category: cocoa
---

Core Data is one of the frameworks I find a bit scary to use when I'm developing iOS applications. I always felt like I was developing something that wasn't really under my control. That was until [Piet](http://www.twitter.com/junkiesxl) pointed out this framework to me: [Mogenerator](http://rentzsch.github.com/mogenerator/).

### Draw your models

The first thing you should do is create your models in the XCode Modelling Tool. More information on this topic can be found [here](http://developer.apple.com/library/ios/#documentation/DeveloperTools/Conceptual/XcodeCoreDataTools/Introduction/Introduction.html).

Here is an example of my Core Data model:

![Core Data model](http://10to1.blog.s3.amazonaws.com/core-data-model.png)

### Let's generate

When you created a model with some attributes, you can use mogenerator to generate your classes (or regenerate them, when you did some editing).

I pass two arguments to mogenerator to generate the files.

* -m _the location of your data model_
* -O _the location of your model classes_

Here is an example:

{% highlight objc %}
mogenerator -m TestProject.xcdatamodel -O Classes
{% endhighlight %}

This command generates all the classes for your models created with the modelling tool. Be aware: You still have to add them to your XCode project in orde to use them.

### What is generated?

For each model four class files are generated. The 2 class files starting with a _dash_ should never be modified. When you want to add custom methods/logix, you can do this in the other 2 generated classes. They extend from the _dashed_-classes.

![Generated Files](http://10to1.blog.s3.amazonaws.com/core-data-files.png)

Every attribute can now be accessed as a property on the object. This makes it very easy to assign new values.

Don't forget that when you change your model in the modelling tool, that you'll have to run the mogenerator command again in orde to regenerate the _dashed_ files.

### Some code

The code snippet below will create a Person object and assigns some values to the attributes. When everything is assigned the changes are saved.

{% highlight objc %}
// NSManagedObjectContext from somewhere in your system
NSManagedObjectContext *moc = ...

Person *p = [Person insertInManagedObjectContext:moc];

p.firstName = @"Zot";
p.lastName = @"Franske";
p.age = [NSNumber numberWithInt:25];

[moc save:nil];
{% endhighlight %}

### Check these out!

Here are some links that helped me during development:

* [Blog post by Aral Balkan](http://aralbalkan.com/2152)
* [Github repo for mogenerator](http://rentzsch.github.com/mogenerator/)
* [Modelling your data in XCode](http://developer.apple.com/library/ios/#documentation/DeveloperTools/Conceptual/XcodeCoreDataTools/Introduction/Introduction.html) 
* [Core Data Programming Guide](https://developer.apple.com/library/mac/#documentation/Cocoa/Conceptual/CoreData/cdProgrammingGuide.html)
