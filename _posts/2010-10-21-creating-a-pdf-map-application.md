---
layout: post
title: Creating a PDF map application
author: Jelle
category: cocoa
---
For a recent project I had to create a small PDF 'Google Maps like' viewer for iOS. The viewer needs to handle zooming and dragging to navigate the PDF page. And for performance issues it's best to load the PDF using tiles.

In some code snippets below, I'll show you how it's done. Make sure to check out [Github](http://github.com/10to1/pdf-map-example) for an example XCode project with comments for almost every line of code.

### Setup

This is the setup I used in this tutorial:

- I have a `UIViewController` with an attached XIB file.
- I created a map `UIView` that is a subview belonging to the controller's view (which is a `UIScrollView`).
- I built a `CATiledLayer` that is added as a sublayer to the map view.
- That `CATiledLayer` is responsible for the tiling of the PDF map.

### Create the PDF

Here is how you create the PDF. First grab a `NSURL` instance with the PDF's location, and then you create the `CGPDFDocumentRef` that's needed to construct the `CGPDFPageRef` which represents a page.

{% highlight objc %}
NSString *filePath = [[NSBundle mainBundle] 
                          pathForResource:@"filename"
                          ofType:@"pdf"];
NSURL *pdfURL = [NSURL fileURLWithPath:filePath];
CGPDFDocumentRef *myDocumentRef = 
        CGPDFDocumentCreateWithURL((CFURLRef) pdfURL);
CGPDFPageRef *myPageRef = 
        CGPDFDocumentGetPage(myDocumentRef, 1);
{% endhighlight %}

### Tile everything

I want the PDF to load like the Google Maps application is loaded. That's why you have to use the `CATiledLayer`, this does everything. You can specify the size, level of detail (for vectorized PDF's)... For more info check out the [Apple Developer Reference](http://developer.apple.com/library/mac/#documentation/GraphicsImaging/Reference/CATiledLayer_class/Introduction/Introduction.html)

Don't forget to set the delegate for the `CATiledLayer`, this makes sure the `drawLayer` method is called.

{% highlight objc %}
CATiledLayer *tiledLayer = [CATiledLayer layer];
tiledLayer.delegate = self;
tiledLayer.tileSize = CGSizeMake(200, 200);
tiledLayer.levelsOfDetail = 1000;
tiledLayer.levelsOfDetailBias = 1000;
tiledLayer.frame = 
        CGRectIntegral(CGPDFPageGetBoxRect(myPageRef, 
                kCGPDFCropBox));
{% endhighlight %}

Afterwards the tiled layer delegate will do the rest if you implement this method:

{% highlight objc %}
- (void)drawLayer:(CALayer *)layer 
        inContext:(CGContextRef)context {
  CGContextSetRGBFillColor(context, 1.0, 1.0, 1.0, 1.0);
  CGContextFillRect(context, 
                    CGContextGetClipBoundingBox(ctx));
  CGContextTranslateCTM(context, 
                        0.0, layer.bounds.size.height);
  CGContextScaleCTM(context, 1.0, -1.0);
  CGContextConcatCTM(context, 
        CGPDFPageGetDrawingTransform(myPageRef, 
                        kCGPDFCropBox, layer.bounds, 
                        0, true));
  CGContextDrawPDFPage(context, myPageRef);
}
{% endhighlight %}

It looks a bit low level but it's fairly easy to get it to work.

### Zooming

Now the last thing you have to do is to tell the `UIViewController` which `UIView` has to be zoomed. That is why you need to set the delegate of the `UIScrollView`. This makes sure the following methods is called:

{% highlight objc %}
- (UIView *)viewForZoomingInScrollView:
                (UIScrollView *)scrollView {
	return mapView;
}
{% endhighlight %}

Here you return the `UIView` that needs to zoom depending on the finger gestures.

### References

- You can find an example iPad project on [Github](http://github.com/10to1/pdf-map-example).
- Here's an example project made by [Apple](http://developer.apple.com/library/ios/#samplecode/ZoomingPDFViewer/Introduction/Intro.html).