---
layout: post
title: Appearance in iOS 5
author: Jelle
category: cocoa
---

Since iOS 5 as a developer you can finally change the tint/design of some elements without much trouble. Changing the background of your `UINavigationBar` just became so much easier.

### @selector(appearance)

The classes that support the `UIAppearance` protocol have access to an appearance selector. This returns the appearance proxy for the receiver.

It's on this proxy that you can call selectors like `setTintColor:`, `setBackgroundImage:forBarMetrics:`, etc…

Here is a list of classes that are supported:

- `UIActivityIndicatorView`
- `UIBarButtonItem`
- `UIBarItem`
- `UINavigationBar`
- `UIPopoverController`
- `UIProgressView`
- `UISearchBar`
- `UISegmentedControl`
- `UISlider`
- `UISwitch`
- `UITabBar`
- `UITabBarItem`
- `UIToolbar`
- `UIView`
- `UIViewController`

### Change the navigation bar background

Here is a quick example how you can easily set the background image of a navigation bar for the whole application.

Add the following line of code to your `application:didFinishLaunchingWithOptions:` in your AppDelegate:

{% highlight objc %}
[[UINavigationBar appearance] 
		setBackgroundImage:[UIImage imageNamed:@"navbar.png"]
		forBarMetrics:UIBarMetricsDefault];
{% endhighlight %}

This will set the navbar.png image as a background on your navigation bar for all the navigation bars in your application.

### Appearance depending on containment

But what if you want your popover to have the default blue `UINavigationBar`, but you just changed the appearance for the application. Than you can add this line of code:

{% highlight objc %}
[[UINavigationBar appearanceWhenContainedIn:
		[UIPopoverController class], nil] 
				setBackgroundImage:nil 
				forBarMetrics:UIBarMetricsDefault];
{% endhighlight %}

When the `UINavigationBar` is used inside a `UIPopoverController`, then the background image for the navigation bar will be nil, and therefore the default background will be shown.

You can use `UIPopoverController`, your custom `UIViewController` classes, etc… as the containment classes.

### What selectors are available on a class

How to find out which selectors can be accessed by the appearance proxy? Just go to XCode and go to the header file of a class, for example `UINavigationBar`.

In this header file you find the methods supported by the proxy by searching for the `UI_APPEARANCE_SELECTOR` constant. This is located behind the method definition.

You notice that the `UINavigationBar` appearance proxy supports the following selectors:

- `tintColor`
- `setTintColor:`
- `setBackgroundImage:forBarMetrics:`
- `backgroundImageForBarMetrics:`
- `titleTextAttributes`
- `setTitleTextAttributes:`
- `setTitleVerticalPositionAdjustment:forBarMetrics:`
- `titleVerticalPositionAdjustmentForBarMetrics:`

### Reference

- [UIAppearance protocol](http://developer.apple.com/library/ios/#documentation/uikit/reference/UIAppearance_Protocol/Reference/Reference.html)
- [UIAppearanceContainer protocol](http://developer.apple.com/library/ios/#recipes/UIAppearanceContainer_Protocol/Reference/Reference.html#//apple_ref/occ/intf/UIAppearanceContainer)
