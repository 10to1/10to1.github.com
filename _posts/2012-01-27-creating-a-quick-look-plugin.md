---
layout: post
title: Creating a Quick Look plugin
author: Jelle
category: cocoa
---

I've been searching for some decent documentation on how to create a Quick Look plugin. It took me several months before I finally found a way to develop the plugin. With many thanks to a soon to be [released book](http://my.safaribooksonline.com/book/programming/cocoa/9780321706607) by [The Big Nerd Ranch](http://www.bignerdranch.com/). 

For those wondering on what Quick Look does, [here](http://www.apple.com/findouthow/mac/#quicklook) is Apple's explanation.

In this blog post I'll show you how to...

- create a simple Quick Look plugin

- support a custom file type

- debug your plugin with Xcode

### Setup your Xcode project

Now let's start developing!

- Create a new Quick Look project
![Quick Look Project](http://blog.10to1.be/img/quick-look/setup.png)

- Change the extension for both `GenerateThumbnailForURL.c` & `GeneratePreviewForURL.c` to .m. (This allows you to use Objective-C code and frameworks in these files)

### Support an extension

In this example I want to support the `.10to1` extension so that I can preview this file as a text file.

Below is an example on what you have to add to the `Info.plist` to support the `.10to1` extension.

{% highlight bash %}
<key>UTImportedTypeDeclarations</key>
<array>
  <dict>
    <key>UTTypeIdentifier</key>
    <string>be.10to1.quicklook</string>
    <key>UTTypeDescription</key>
    <string>10to1 document</string>
    <key>UTTypeConformsTo</key>
    <array>
      <string>public.data</string>
    </array>
    <key>UTTypeTagSpecification</key>
    <dict>
      <key>public.filename-extension</key>
      <array>
        <string>10to1</string>
      </array>
    </dict>
  </dict>
</array>	
<key>CFBundleDocumentTypes</key>
<array>
  <dict>
    <key>CFBundleTypeRole</key>
    <string>QLGenerator</string>
    <key>LSItemContentTypes</key>
    <array>
      <string>be.10to1.quicklook</string>
    </array>
  </dict>
</array>
{% endhighlight %}

Be aware, the default project template for a Quick Look plugin already has the following line of code included in the plist.

{% highlight bash %}
<key>CFBundleDocumentTypes</key>
<array>
  <dict>
    <key>CFBundleTypeRole</key>
    <string>QLGenerator</string>
    <key>LSItemContentTypes</key>
    <array>
      <string>SUPPORTED_UTI_TYPE</string>
    </array>
  </dict>
</array>
{% endhighlight %}

If you want to create a plugin for an existing UTI type, you just have to change `SUPPORTED_UTI_TYPE` string with for example public.png for a PNG image.

But if your plugin supports a non existing UTI type you have to define it in the plist under the `UTImportedTypeDeclarations` key. If you want to find out to what UTI type your file conforms to, just use the `mdsl` executable and you'll find the UTI type(s) in key `kMDItemContentTypeTree`.

{% highlight bash %}
mdls FILENAME
{% endhighlight %}

More information can be found [here](http://developer.apple.com/library/mac/documentation/General/Reference/InfoPlistKeyReference/InfoPlistKeyReference.pdf).

### Render the preview

This is the view shown after the space button is pressed. This will display the content of the `.10to1` file.

- Add the Cococa framework

- Import `<Cocoa/Cocoa.h>` in the `GeneratePreviewForURL.m` file

- Add some generation code inside the `GeneratePreviewForURL` function as done in [this file](https://github.com/fousa/thong/blob/master/thong/GeneratePreviewForURL.m)

### Render the thumbnail

This is the icon with a generated content that is shown in your Finder window.

- Add the WebKit framework

- Import `<Cocoa/Cocoa.h>` & `<WebKit/WebKit>` in the `GenerateThumbnailForURL.m` file

- Add some generation code inside the `GenerateThumbnailForURL` function as done in [this file](https://github.com/fousa/thong/blob/master/thong/GenerateThumbnailForURL.m)

### Debugging

But how do we debug a Quick Look plugin? You can't just run it as an executable. Therefore we use `qlmanage` provided by Apple.

We first have to copy the plugin to `~/Library/QuickLook` after a successfull build, otherwise your plugin will not run correctly with Xcode.

- Add a New Copy Files build phase to your target

- Select Absolute Path and enter ~/Library/QuickLook as the Subpath

- Add the generated file to the files list

	![Copy Files](http://blog.10to1.be/img/quick-look/copy-files.png)	

Run the plugin using `qlmanage`.

- Because you can't select qlmanage in the Finder you have to copy the binary to your project root

{% highlight bash %}
cp /usr/bin/qlmanage PROJECT_ROOT/.
{% endhighlight %}

- Edit your scheme and select the Run/Info tab

- Select the qlmanage executable in your project root

	![qlmanage](http://blog.10to1.be/img/quick-look/executable.png)

- In the Run/Arguments tab you can add the folling `Arguments Passed On Launch` to render the preview:

{% highlight bash %}
-p dummy.10to1
{% endhighlight %}

Next up, run the application and the `dummy.10to1` file will be used as the selected file.

To test the thumbnail generation you could to the same, add the same argument but with `-t` in the Arguments tab:

{% highlight bash %}
-t dummy.10to1
{% endhighlight %}

But this didn't to the trick (I have no idea why…), so you can manually run this command in your Terminal in order to test the preview generation:

{% highlight bash %}
qlmanage -t dummy.10to1
{% endhighlight %}

### The result

After all this we have created our Quick Look plugin.

If you want do distribute the plugin, just Archive & Save it.

Open a `.10to1` file and enjoy the plugin! :)

![The plugin](http://blog.10to1.be/img/quick-look/result.png)

### Some utilities

- Reload the Quick Look generator list

{% highlight bash %}
qlmanage -r
{% endhighlight %}

- List the UTI types for the given file, very handy when defining your supported UTI format

{% highlight bash %}
mdls FILE
{% endhighlight %}

### Reference

* [More Cocoa Programming for Mac OS X](http://my.safaribooksonline.com/book/programming/cocoa/9780321706607)

* [Quick Look Programming Guide](http://developer.apple.com/library/mac/#DOCUMENTATION/UserExperience/Conceptual/Quicklook_Programming_Guide/Articles/QLDebugTest.html)

* [Thong Quick Look Github repo](http://github.com/fousa/thong)
