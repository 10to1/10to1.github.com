---
layout: post
title: Safe type casting in Obj-C
author: Toon
category: cocoa
---

Althought Swift is gradually taking over Objective-C, we still use
Objective-C for most of our iOS apps. And recently we ran into the
following problem.

Normally to safe-cast an object in Objective-C, you would write
something like:

```objc
- (void)someAction:(id)sender {
    if ([sender isKindOfClass:[UIButton class]]) {
        ((UIButton *)sender).enabled = false;
    }
}
```

This is quite lengthy and cumbersome to write. So someone mentioned
the following on our Slack channel: 

> We need `dynamic_cast` in Objective-C.

So, after a quick search on [DuckDuckGo](https://duckduckgo.com), we
found an elegant solution on
[Stack Overflow](http://stackoverflow.com/a/12171194/89376).

Create a category for `NSObject`, named `NSObject+Cast`. In the header
file place the following class method definition:

```objc
#import <Foundation/Foundation.h>

@interface NSObject (Cast)

+ (instancetype)cast:(id)from;

@end
```

And in the implementation file:

```objc
#import "NSObject+Cast.h"

@implementation NSObject (Cast)

+ (instancetype)cast:(id)from {
    if ([from isKindOfClass:self]) {
        return from;
    }
    return nil;
}
```

Now you can rewrite the example at the top as:

```objc
#import "NSObject+Cast.h"

//...

- (void)someAction:(id)sender {
    [UIButton cast:sender].enabled = false;
}
```

Look how elegant this is.
