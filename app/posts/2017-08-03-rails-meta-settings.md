The inspiration for this comes from a CS330 class I took on programming
languages here is the original blog post by
[Chris Johnson](http://www.twodee.org/blog/?p=15921)

So lets start with the basics of this idea and a crud summary of Chris's post
with this one ruby class

```ruby
class Meta
    def initialize
        @record = Hash.new
    end

    def method_missing(name, *args)
        if name =~ /^(.*)=$/
            self[$1] = args[0]
        else
            self[name]
        end
    end

    def [](key)
        @record[key]
    end

    def []=(key, value)
        @record[key] = value
    end

end
```
Now this class doesn't do much. All it does is wrap around a hash. But, what it
does do is leverage method missing to basically generate a JS object that class
variables can be made whenever. This is cool but, how could we get this behavior
in Rails and get it to save?

For more information on Ruby's
[`method_missing`](https://ruby-doc.org/core-2.4.0/BasicObject.html#method-i-method_missing)
checkout the [ruby docs](https://ruby-doc.org)

We will start by what we know we know that the hash object real just needs a key
value pair and nothing else so lets start with the migration

```ruby
class CreateVariables < ActiveRecord::Migration[5.1]
  def change
    create_table :variables, id: false do |t|
      t.string :key, null: false
      t.text :value
    end
    add_index :settings, :key, unique: true
  end
end
```

Now this `variables` table only has two columns.

For types we get a key as a `string` because this will always precede the class
such as `Variable.test` so it doesn't make sense for this to exceed 255
characters so we'll save space where we can. We also create a unique index on
this field because we will be using it for all of our queries and making unique
because we can't have two methods with the same name. This will also help with
speed if the database knows no two records can be the same

So then lets get to how we are going to do this. The `method missing` and array
accessors methods will be moved to the `self` scope because there will only be
one database table instance and removing the initialize because it is unneeded

Now the magic behind this is rails `serialize :column` by default this users
`YAML::dump(object)` and `YAML::load(object_yaml)` so now we can store any ruby
object in the `value` column and load it back exactly as we have left it. There
is no limit to this either because you could specify lambdas so that this
object can actually have methods to call and modify other data.

Then all we do is query by the key and assign objects to it like such.

```ruby
class Variable < ApplicationRecord
    self.primary_key = :key
    serialize :value

    def self.method_missing(name, *args)
        if name =~ /^(.*)=$/
            self[$1] = args[0]
        else
            self[name]
        end
    end

    def self.[](key)
        if record = self.find_by(key: key)
            record.value
        else
            nil
        end
    end

    def self.[]=(key, value)
        record = self.find_or_initialize_by(key: key)
        record.value = value
        record.save
    end
end
```

And now we can use it like however we want.
(Log level is set to warn so SQL is omitted)

```irb
Running via Spring preloader in process 28885
Loading development environment (Rails 5.0.2)
 :001 > Variable.test = 1
 => 1
 :002 > Variable.test
 => 1
 :003 > Variable.array = %w(this is an array)
 => ["this", "is", "an", "array"]
 :004 > for var in Variable.array
  :005?>   puts var
  :006?>   end
this
is
an
array
 => ["this", "is", "an", "array"]
```
