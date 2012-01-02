---
layout: post
title: Core Data Versioning
author: Jelle
category: cocoa
---
Every time I have to do a small (read: very simple) migration in an iOS-project I have to dive into Google to find out how it works. I practically never get to it anymore, but I finally decided to write a post about it on this blog.

### Migrating what and when?

I only use migrations and version models when an application is already used in production. Core Data will not automatically update its database when you change something in it. The app will just crash... And I don't think that's what the user wants. The app won't always crash: sometimes the changes just aren't executed and there will occur a problem when you try to call a method related to the changes.

### A new version

Go to Editor > Model Version in order to create a new version of your Core Data Model. Choose a name and select the Model you want to use as the starting point, this will be the database you currently use in the production app.

![A new version](http://blog.10to1.be/img/core-data-versioning-new-version.png)

Now that we've created a new version we can just apply some changes to it. It's just a copy of our old xcdatamodel file.

The last thing we have to do is set this version of the Core Data Model as our default version. In your project navigator select the .xcdatamodeld container in which the 2 versions reside. Open the Utilities pane on the left and select the File Inspector. Here you can change your Current version of your model.

![Set the default version](http://blog.10to1.be/img/core-data-versioning-default-version.png)

## Simple mapping

The mapping model is the place where you tell Core Data how to handle model changes between 2 versions. You don't always need a mapping model, when you add or remove a column/model for example. But when you want to do more complex migrations like renaming a column or filling the added columns with new values, then this is the way to go.

Add a new "Mapping Model" file to your project, and follow the steps to complete the creation.

![Create a mapping model](http://blog.10to1.be/img/core-data-versioning-new-mapping-model.png)

In this model you can see all the Entity Mappings with the changes between the 2 versions.

Here is an example on how you rename a field (name to fullName) and connect the data between the 2 Core Data Models:

![The mapping](http://blog.10to1.be/img/core-data-versioning-mapping.png)

After the migration the field will be renamed, and the data will be preserved.

## Custom mapping

When we want to do a bit more advanced mapping, we'll have to subclass `NSEntityMigrationPolicy` in order to get the result we want.

In the next example we will autofill the newly added field (companyName) with a default value '10to1'.

Create a new file called `CustomPhotoMigration` that subclasses from `NSEntityMigrationPolicy` and add the following code to the implementation class. You can choose the name of the file, doesn't really matter. 

<div class="highlight" style="width: 720px"><pre><code class="objc"><span class="o">-</span> <span class="p">(</span><span class="kt">BOOL</span><span class="p">)</span><span class="nl">createDestinationInstancesForSourceInstance:</span><span class="p">(</span><span class="n">NSManagedObject</span> <span class="o">*</span><span class="p">)</span><span class="n">instance</span>
                                      <span class="nl">entityMapping:</span><span class="p">(</span><span class="n">NSEntityMapping</span> <span class="o">*</span><span class="p">)</span><span class="n">mapping</span>
                                            <span class="nl">manager:</span><span class="p">(</span><span class="n">NSMigrationManager</span> <span class="o">*</span><span class="p">)</span><span class="n">manager</span>
                                              <span class="nl">error:</span><span class="p">(</span><span class="n">NSError</span> <span class="o">**</span><span class="p">)</span><span class="n">error</span> <span class="p">{</span>
    <span class="n">NSArray</span> <span class="o">*</span><span class="n">_properties</span> <span class="o">=</span> <span class="p">[</span><span class="n">mapping</span> <span class="n">attributeMappings</span><span class="p">];</span>
    <span class="k">for</span> <span class="p">(</span><span class="n">NSPropertyMapping</span> <span class="o">*</span><span class="n">_property</span> <span class="k">in</span> <span class="n">_properties</span><span class="p">)</span> <span class="p">{</span>
        <span class="k">if</span> <span class="p">([[</span><span class="n">_property</span> <span class="n">name</span><span class="p">]</span> <span class="nl">isEqualToString:</span><span class="s">@"companyName"</span><span class="p">])</span> <span class="p">{</span>
            <span class="n">NSExpression</span> <span class="o">*</span><span class="n">_expression</span> <span class="o">=</span> <span class="p">[</span><span class="n">NSExpression</span> <span class="nl">expressionForConstantValue:</span><span class="s">@"10to1"</span><span class="p">];</span>
            <span class="p">[</span><span class="n">_property</span> <span class="nl">setValueExpression:</span><span class="n">_expression</span><span class="p">];</span>
        <span class="p">}</span>
    <span class="p">}</span>
    
    <span class="k">return</span> <span class="p">[</span><span class="n">super</span> <span class="nl">createDestinationInstancesForSourceInstance:</span><span class="n">instance</span> 
                                                <span class="nl">entityMapping:</span><span class="n">mapping</span> 
                                                      <span class="nl">manager:</span><span class="n">manager</span> 
                                                        <span class="nl">error:</span><span class="n">error</span><span class="p">];</span>
<span class="p">}</span>
</code></pre>
</div>

Once the file is created you'll have to tell the mapping model to use our custom policy. Go to your `.xcmappingmodel` file and click on the entity mapping you would like to customize. In the Mapping Model Inspector pane on the right, just fill in the class name of your custom policy. In our case this will be `CustomPhotoMigration`.

![The custom mapping policy](http://blog.10to1.be/img/core-data-versioning-custom-policy.png)

This should auto fill the companyName field on every existing record with "10to1" the next time you run the app.

For the record: you don't have to run a script or something like that to perform the migration. Just run your application and it will be executed for you.
