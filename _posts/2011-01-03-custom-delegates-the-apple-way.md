---
layout: post
title: Custom delegates, the Apple way
author: Jelle
category: cocoa
---
When you get into Mac or iOS development, you'll soon be confronted with delegates. And after a certain period of time when you gain more experience, you'll start creating your own custom delegate calls.

### How Apple uses delegates

Let's say we want to log the number of characters entered in a `UITextView`. We'll have to assign a delegate to the `UITextView` instance and then implement the `textViewDidChange` method.

{% highlight objc %}
UITextView *textView = [[UITextView alloc] init];
textView.frame = CGRectMake(0, 0, 100, 30);
textView.delegate = self;
[self.view addSubview:textView];
{% endhighlight %}

This code snippet creates the `UITextView` somewhere in the `viewDidLoad` method from out main `UIViewController`. Next up: implement the `textViewDidChange` method.

{% highlight objc %}
- (void)textViewDidChange:(UITextView *)textView {
  NSLog(@"number of chars: %i", [textView.text length]);
}
{% endhighlight %}

This will log the number of characters entered every time you change something in the `UITextView`.

### But there is a warning

The code above will work perfectly but there will be a warning.

![Delegate warning](http://10to1.blog.s3.amazonaws.com/delegate-warning.png)

 The warning thrown is this one: _class 'ExampleViewController' does not implement the 'UITextViewDelegate' protocol_. It means we have to follow the `UITextViewDelegate` protocol and set it in the header file like this:

The solution to remove the warning is fairly easy, just add the `UITextViewDelegate` protocol to the header file.

{% highlight objc %}
@interface ExampleViewController :
                   UIViewController <UITextViewDelegate>
{% endhighlight %}

To make a class conform to a protocol, you just have to add it in between the < and >.

### Create your custom delegate call

Now what if you want a custom view class to call a method in your controller because you think the code functionality belongs to the controller. You'll first create a property where you can assign the delegate:

{% highlight objc %}
@property (nonatomic, retain) NSObject *customDelegate;
{% endhighlight %}

Your delegate instance is now available in your class, so when you call the `setColor:` method on your instance, than you want to call the delegate's `changeColor:` method if available in the `customDelegate:` instance.

You can find more info on the difference between `id` and `NSObject` on [this blog](http://unixjunkie.blogspot.com/2008/03/id-vs-nsobject-vs-id.html). There reason I'm using NSObject is because it doesn't generate warnings when using the `respondsToSelector:`.

In the code below we'll first check if the method is available, and if so we call it and pass the the current color so the controller can do the rest.

{% highlight objc %}
- (void)setColor:(UIColor *)color {
  SEL method = @selector(changeColor:);
  if ([customDelegate respondsToSelector:method]) {
    [customDelegate performSelector:method
                    withObject:color];
  }
}
{% endhighlight %}

For those that don't really know what selectors are, they can read it [here](http://developer.apple.com/library/mac/#documentation/Cocoa/Conceptual/ObjectiveC/Articles/ocSelectors.html)

### But I want a warning!

It can come in handy to throw a warning to notify the developer that he can or has to implement certain methods in order for the delegate to work properly.

You should first create a protocol that defines the `@required` and `@optional` methods that the delegate class can or has to implement. And you can do this in the header file (or in another file).

{% highlight objc %}
@protocol ExampleViewDelegate
@required 
- (void)changeColor:(UIColor *)color;
@optional
- (void)clearColor;
@end
{% endhighlight %}

The methods below the `@required` directive are all obligatory. The ones below `@optional` are not. Now this won't throw any warning it's just a preparation for what is coming.

Now you have to do a small modification to the `@property` where the customDelegate is defined. We have to tell the customDelegate that it should implement the `ExampleViewDelegate` protocol.

{% highlight objc %}
@property (nonatomic, retain)
                  id<ExampleViewDelegate> customDelegate;
{% endhighlight %}

When we now assign the delegate, a warning is thrown when the protocol is not implemented (cfr. `How Apple uses delegates`). So we just have to implement the protocol to stop the warning from appearing.

{% highlight objc %}
@interface ExampleViewController
                 : UIViewController <ExampleViewDelegate>
{% endhighlight %}

And when we don't implement the `changeColor:` method, then another warning will arise, because this method is set to required in the protocol.

Now let's go and delegate!

### Reference

- [Selectors](http://developer.apple.com/library/mac/#documentation/Cocoa/Conceptual/ObjectiveC/Articles/ocSelectors.html)
- [id vs NSObject](http://unixjunkie.blogspot.com/2008/03/id-vs-nsobject-vs-id.html)

You can find a small project with the `UITextView` and the custom delegate examples on [Github](https://github.com/10to1/custom-delegates-the-apple-way)
