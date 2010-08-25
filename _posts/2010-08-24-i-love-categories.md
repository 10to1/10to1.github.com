---
layout: post
title: I love Categories
author: Jelle
category: cocoa
---
One thing I really love about Objective-C is Categories.

### What are they?

Categories make it possible to add a method to a class without subclassing.

For example:

Let's assume that you want to create a method `isEmpty`. And you want to find a clean way to ask the NSString instance for it.

Then we'll create a category on the NSString class in which we define a method `isEmpty` that returns a BOOL value.

### How to create them?

Create a header `(NSString+UtilityMethods.h)` and an implementation file `(NSString+UtilityMethods.m)`.

You define the category and the method in the header file like this:

{% highlight objc %}
@interface NSString (UtilityMethods)
- (BOOL)isEmpty;
@end
{% endhighlight %}

And in the implementation file like this:

{% highlight objc %}
@implementation NSString (UtilityMethods)
- (BOOL)isEmpty {
  return [self count] == 0;
}
@end
{% endhighlight %}

Now you can use the `isEmpty` method on every instance of NSString. (Don't forget to include the `NSString+UtilityMethods.h` file)

{% highlight objc %}
NSString *text  = @"";
if ([text isEmpty]) {
  text = @"Categories are awesome";
}
NSLog(text);
{% endhighlight %}

The above snippet will print out "Categories are awesome".

### Another example with UIColor

This is how I clean up my code with categories. I create a category on UIColor to add methods that return every different UIColor used in my application. This way I only have to modify the colors here in orde to change them in the app.

Header file:

{% highlight objc %}
@interface UIColor (ApplicationColors)
+ (UIColor *)backgroundColor;
+ (UIColor *)textColor;
@end
{% endhighlight %}

Implementation file:

{% highlight objc %}
@implementation UIColor (ApplicationColors)
+ (UIColor *)backgroundColor {
  return [UIColor redColor];
}
+ (UIColor *)textColor {
  return [UIColor whiteColor];
}
@end
{% endhighlight %}

Nice isn't it?