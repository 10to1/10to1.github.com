---
layout: post
title: PDFKit and Ruby on Rails
author: Jelle
category: rails
---
I finally found some time to write my first blog post for my awesome company! Here we go...

For a recent project I decided to use PDFKit to generate PDF files in Ruby on Rails. I'm used to generating these with Prawn, but as we all know it can be very hard to get it styled correctly.

### Installation

First things first, we have to install the gem and then the wkhtmltopdf binary.

Installing the gem is easy:

`gem install pdfkit`<br />

Hey, installing the binary is as easy:

`sudo pdfkit --install-wkhtmltopdf`<br />

Now we can use PDFKit on our system.

### Manual generation

To generate a pdf from a HTML web page just create the kit instance:

{% highlight ruby %}
kit = PDFKit.new "<p>This is an awesome pdf.</p>"
{% endhighlight %}

And then convert it to a pdf file:

{% highlight ruby %}
pdf = kit.to_file file_path
{% endhighlight %}

You can also pass an URL of a file to the PDFKit initializer method:

{% highlight ruby %}
kit = PDFKit.new "http://www.10to1.be"
kit = PDFKit.new File.new(file_path)
{% endhighlight %}

### Some Rails magic

But here is some real magic. You can just attach the pdf format to your controller actions. When you go to http://test.be/people/jelle.pdf, the PDF will be downloaded (or your browser will open it in a window).

Just include the following lines of code in your environment.rb (for Rails 2.x) or application.rb (for Rails 3.x):

{% highlight ruby %}
require "pdfkit"
config.middleware.use PDFKit::Middleware
{% endhighlight %}

What happens now is that your show.html.erb file is rendered as usual but it is converted to the PDF format afterwards. So the PDf file gets the same style as the HTML page (with CSS styling included).

I used this for a project, and it works great!

### Changing the filename

Now another handy way to change the filename for the PDF file. When you go to http://test.be/people/1.pdf, the downloaded filename will be 1.pdf. But what if I want the filename to be jelle-vandebeeck.pdf? Well, just include this line of code somewhere in your action:

{% highlight ruby %}
def show
  @person = Person.find params[:id]
	
  # Change the filename of the downloaded pdf file
  headers["Content-Disposition"] = 
    "attachment; filename=\"#{@person.name}\""
end
{% endhighlight %}

For more information visit the [Github](http://github.com/jdpace/PDFKit) page.
