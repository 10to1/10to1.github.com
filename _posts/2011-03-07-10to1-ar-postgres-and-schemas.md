---
layout: post
title: ActiveRecord, Postgres and schemas, lots of them
author: Bob
category: Rails
---

### The problem ###
One of the projects I'm working on requires me to read a lot of data from multiple [d2r servers](http://www4.wiwiss.fu-berlin.de/bizer/d2r-server/) using [SPARQL](http://www.w3.org/TR/rdf-sparql-query/).
Because the data on these servers can sometimes be similar the data has to be filtered before it is made available to a Rails app that will be displaying the data.

I didn't want to litter the database of the Rails app with this duplicate data (because it will feed a d2r server in the future),
and fetching 10 rows of the server already took some seconds. So fetching all of the data from multiple servers would take quite a long time.

So I needed a place to store this temporary data separately where it wouldn't bother the data of the Rails app, and be available for filtering
when all of the data was fetched. A separate schema for each of the servers would do the job.

### Here's how it goes ###
I didn't load the entire Rails environment for this; this way AR doesn't automatically load the database connection parameters
and we can easily adjust them ourself:

{% highlight ruby %}
dbconfig = YAML::load(File.open(File.dirname(__FILE__) 
		+ "/../../config/database.yml"))
@database_connection = dbconfig[Rails.env]
AR::Base.establish_connection(@database_connection)
{% endhighlight %}
	
Creating the schema wasn't that difficult, executing some SQL on the connection did the trick...

{% highlight ruby %}
AR::Base.connection.execute("DROP SCHEMA 
	IF EXISTS #{@server_name} CASCADE")
AR::Base.connection.execute("CREATE SCHEMA #{@server_name}")
{% endhighlight %}

After that we have to alter the connection so AR does all future operations on the newly created schema.

{% highlight ruby %}
@database_connection[:schema_search_path] = @server_name
AR::Base.clear_all_connections!
AR::Base.establish_connection(@database_connection)
{% endhighlight %}

If you do intend to use the entire Rails environment, be sure to do this before the classes are loaded, so they inherit the 
correct connection. If not you could unload the classes using `ActiveSupport::Dependencies.clear`.

But in this case I was loading the classes manually, and fetching the data from different servers in different processes.
That way the loaded model classes couldn't interfere with each other.

With all the fetching processes finished, the data is ready to be filtered and loaded into the database of the Rails app, and 
be the source database for another D2R server.