---
layout: post
title: Creating UIColors with CSS strings
author: Dottom
category: cocoa
---

Since Cocoa development is still a bit fresh for me, every little exercise I can get to enhance my skills is welcome. So when [Piet](http://twitter.com/junkiesxl) suggested that somebody should write a Category to create UIColors from a CSS string, I saw it as a perfect challenge.
I assume you know how to create Categories. If you don't, [Jelle](http://twitter.com/fousa) has an [excellent blogpost](http://blog.10to1.be/cocoa/2010/08/24/i-love-categories/) about them.

### Prelude: a UIColor from a (hex) encoded integer	
First step: see if I could create a color from a integer value. This had nothing to do with strings, but I figured it could come in handy later, and from a code point of view it's just as easy to use as a string.  

So, our input is an unsigned integer, and we get a UIColor as a result. The input integer is assumed to have the four color components in it: 
- alpha transparancy
- red 
- blue 
- green 

These are mapped like this in the integer:

        +-------+-------+-------+-------+
        | alpha |  red  | green |  blue |
        +-------+-------+-------+-------+
    bit        24      16       8       0

If we omit the alpha part (that is, if the value passed is equal or smaller than 0xFFFFFF), we assume the user wanted a full solid color, and so we take the default value of `0xFF` for the alpha component. Otherwise, we take the value in the upper 8 bits. This means that it's impossible to a fully transparent color this way, but I don't think that's much of a problem. A solution could be adding an overload to force the alpha part from the value (this is left as an exercise for the reader).

Anyway, it sounds more complicated than it is. We just need a combination of the shift right operator `>>` and the AND operator `&`:

{% highlight objc %}
CGFloat red, green, blue, alpha;

red = ((CGFloat)((hex >> 16) & 0xFF)) / 255.0;
green = ((CGFloat)((hex >> 8) & 0xFF)) / 255.0;
blue = ((CGFloat)((hex >> 0) & 0xFF)) / 255.0;
alpha = hex > 0xFFFFFF 
            ? ((CGFloat)((hex >> 24) & 0xFF)) / 255.0 
            : 1;

return [UIColor colorWithRed:red 
                       green:green 
                        blue:blue
                       alpha:alpha];
{% endhighlight %} 

Since the `colorWithRed:green:blue:alpha:` class method on `UIColor` - which is what we use to create the actual color - expects each component as a float value (ranging from 0.0 to 1.0), all that's left is to divide each component by 0xFF to get to the correct float value. 
And that's about it.

### A UIColor from a CSS string
Now, we want to create a `UIColor` from a CSS like color string. I mean the hex encoded colors, not the named colors: `#ffcc00` or `#345a13` or even `#ccc`. Stuff like that. I also wanted it to take a bit further and allow for transparancy. Something you can't do with CSS encoded colors, but I would be fairly easy to support.

So, how do we parse a string like that. There are several cases to consider:
- a `nil` string
- an empty string
- a string with a # in front, but also without it
- what about non-hex characters?
- there's a number of combination we can use regarding length: 6 and 8 characters are the most obvious, but also 3 and 4 are possible (`#abc` equates to `#aabbcc`). 
- but what when there's less than 3 characters?
- or 5. Or 7?
- and what do we do when we have more than 8?

Let's see how we handle those.

#### The braindead cases
First, the really simple cases:
- `nil` or empty just returns black.
- we strip the `#` in front if it's there. In CSS this is necessary because it indicates a hex encoded color and not a color name. Since we don't support color names, it's of no use to us.
- non-hex character are kept, and are skipped when converting the string to a number. This might not give the "desired" results, but at least it works.
 
#### The common cases
Then, the common cases are 6 or 8 characters. That's either `#abcdef` or `#abcdef01`. The first case is just the three color components, the latter sports an additional alpha component (at the start).
We grab each component as a substring, and convert each component to an actual integer value. 

{% highlight objc %}
// six characters: #aabbcc, default alpha to 'FF'.
a = @"FF";
r = [css substringWithRange:NSMakeRange(0, 2)];
g = [css substringWithRange:NSMakeRange(2, 2)];
b = [css substringWithRange:NSMakeRange(4, 2)];

// eight characters: #22aabbcc
a = [css substringWithRange:NSMakeRange(0, 2)];
r = [css substringWithRange:NSMakeRange(2, 2)];
g = [css substringWithRange:NSMakeRange(4, 2)];
b = [css substringWithRange:NSMakeRange(6, 2)];
{% endhighlight %}

#### The shorthand cases
So far so good. What about the shorthand equivalents: `#abc` (meaning `#aabbcc`) and `#abcd` (meaning `#aabbccdd`). They're quite easy too. Instead of grabbing 2 characters for each component, we just grab one and duplicate it so we get two. And then we convert those to an integer.

{% highlight objc %}
a = [css substringWithRange:NSMakeRange(0, 1)];
a = [a stringByAppendingString:a];
r = [css substringWithRange:NSMakeRange(1, 1)];
r = [r stringByAppendingString:a];
g = [css substringWithRange:NSMakeRange(2, 1)];
g = [g stringByAppendingString:a];
b = [css substringWithRange:NSMakeRange(3, 1)];
b = [b stringByAppendingString:a];

// the code for 3 characters is similar, of course.
{% endhighlight %}

#### Some special cases
Leaves us with some special cases. everything smaller than 3 characters is left-padded with zeroes and treated as a 3 character string afterward. With a fancy goto:

{% highlight objc %}
css = [css stringByPaddingTheLeftToLength:3 
                               withString:@"0" 
                          startingAtIndex:0];	
goto three;
{% endhighlight %}

Using goto: evil, I know. 
I considered using a loop and break statements in each if, but that was just plain ugly. I could also have split the handling of each case into it's own method, and call these where appropriate. That would have been cleaner, but I felt the use of `goto` was okay for constructs like this. The intention of the whole block is clear enough, so I was okay with it.

The cases for 5 and 7 characters are similar. Just pad a zero in front and switch to the cases with either 6 or 8 characters. 
The final case, when we have more than 8 characters is pretty simple too: we just take the last 8 characters and discard everything else. That leaves use with 8 characters which we can process as before.

#### The actual processing
The leaves us with four components. We convert them into a float using scanf (don't forget to prepend `@"0x"`!) and pass them to `colorWithRed:green:blue:alpha:`. And that's it.
Oh, `scanf` wants a c-string, so we have to ask the NSString instances for it. Don't use the `cString` method, since it's deprecated (because it doesn't allow you to choose encoding).

{% highlight objc %}
// parse each component separetely. This gives more 
// accurate results than throwing it all together in 
// one string and use scanf on the global string.
a = [@"0x" stringByAppendingString:a];
r = [@"0x" stringByAppendingString:r];
g = [@"0x" stringByAppendingString:g];
b = [@"0x" stringByAppendingString:b];

uint av, rv, gv, bv;
sscanf([a cStringUsingEncoding:NSASCIIStringEncoding], 
       "%x", 
       &av);
sscanf([r cStringUsingEncoding:NSASCIIStringEncoding], 
       "%x", 
       &rv);
sscanf([g cStringUsingEncoding:NSASCIIStringEncoding], 
       "%x", 
       &gv);
sscanf([b cStringUsingEncoding:NSASCIIStringEncoding], 
       "%x", 
       &bv);

return [UIColor colorWithRed: rv / ((CGFloat)0xFF) 
                       green: gv / ((CGFloat)0xFF) 
                        blue: bv / ((CGFloat)0xFF)
                       alpha: av / ((CGFloat)0xFF)];
{% endhighlight %}
					
Easy as pie.

### Conclusion
It's quite a lot of code for a simple conversion. But each case is different, so it requires different processing. While this means more code, it also means optimized code for each case. But each case is pretty simple, so the whole is still readable enough.

You can see this in action in a simple iPhone project that features a textfield where you can enter the CSS color code, and this color is applied to a textview below. Nothing fancy, but it gets the point across. You can find the project on [GitHub](https://github.com/Inferis/css-colors).
The .h and .m file can also separately be found in a [Gist](https://gist.github.com/778829).

Enjoy. 