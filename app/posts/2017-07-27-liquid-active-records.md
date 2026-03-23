For anyone that has used [liquid](http://liquidmarkup.org/) all records need to
either need to inherit from `Liquid::Drop` or have a `to_liquid` method. A usual
way for the `to_liquid` is just making it aliased to the `as_json` method.

```ruby
class ApplicationRecord < ActiveRecord::Base
    self.abstract_class = true

    alias_method :to_liquid, :as_json
end
```
This is a really simple and crude way but this both exposes all of your columns
to liquid to substitute in but it has the unfortunate result of not being able
to access nested associations.

So then we can do a method in the specific class. That just include the one
association.
```ruby
class Author < ApplicationRecord
    has_many :books

    def to_liquid
        as_json include: :books
    end
end
```
Though now this doesn't solve the entire problem. So lets say we want this
behavior on all of our models being able to drill down.

Well, now we can make a `Liquid::Drop` for every class with inheritance and
expose all methods so then the nested associations return there version.
```ruby
class ApplicationRecord < ActiveRecord::Base
    self.abstract_class = true

    class LiquidDrop < Liquid::Drop
        def initialize(model)
            @model = model
        end
        def invoke_drop(method_or_key)
            # Just call methods by name whilly nilly if we have one
            if @model.respond_to? method_or_key.to_sym
                @model.send method_or_key
            else
                # Instead of throwing the normal method
                # not found throw liquids instead so we don't fail unless
                # render! is called and will only show up in errors if the
                # render is called with { strict_variables: true }
                liquid_method_missing(method_or_key)
            end
        end
        alias_method :[], :invoke_drop
    end
    def to_liquid
        LiquidDrop.new self
    end
end
```
This is really not preferred because now this exposes all the class methods that
may not return values that are useful and can be a vulnerability.

So lets try and whitelist the columns and methods we want and convert this to a
module instead
```ruby
module Liquify
    class LiquidDrop < Liquid::Drop
        def initialize(model)
            @model = model
        end
        def invoke_drop(method_or_key)
            if (defined? @model.class::LIQUID_METHODS &&
                @model.class::LIQUID_METHODS.include?(method_or_key.to_sym))
                @model.send(method_or_key)
            else
                # Instead of throwing the normal method
                # not found throw liquids instead so we don't fail unless
                # render! is called and will only show up in errors if the
                # render is called with { strict_variables: true }
                liquid_method_missing(method_or_key)
            end
        end
        alias_method :[], :invoke_drop
    end
    def to_liquid
        LiquidDrop.new(self)
    end
end
```
```ruby
class Author < ApplicationRecord
    include Liquify
    LIQUID_METHODS = :books, :last_name, :first_name, :name, :id

    has_many :books

    def name
        "#{first_name} #{last_name}"
    end
end
```
```ruby
class Book < ApplicationRecord
    include Liquify
    LIQUID_METHODS = :author, :title, :description, :bestsellers, :id

    belongs_to :author

    scope :bestsellers, -> { where ny_times: true }

end
```
The beauty of this option its all opt in whitelist and it allows you to include
custom methods and scopes that you want to expose while letting you keep others
hidden.

Now we can allow users to create pages with liquid.
```ruby
sanitize Liquid::Template.parse(@author.page).render('author' => @author)
```
{% raw %}
```liquid
<h1>Books by {{ author.name }}</h1>
<ul>
    {% for book in author.books %}
        <li>
            <a href="/books/{{ book.id }}">
                {{ book.title }}
            </a>
        </li>
    {% endfor %}
</ul>
```
```ruby
sanitize Liquid::Template.parse(Books.bestseller).render('book' => Book)
```
```liquid
<h1>Time Bestsellers</h1>
<ul>
    {% for book in book.bestsellers %}
        <li>
            <a href="/books/{{ book.id }}">
                <h2>{{ book.title }}</h2>
                by, {{ book.author.name }}
            </a>
        </li>
    {% endfor %}
</ul>
```
{% endraw %}
Lets just make sure that when we display out the result we use rails
[`sanitize`](http://api.rubyonrails.org/classes/ActionView/Helpers/SanitizeHelper.html#method-i-sanitize)
so we don't expose ourselves up to html injection after being so careful to
explicitly whitelist our params

Now I know that the second example of the bestsellers is unlikely to ever be an
editable view and not written in `erb` but its more of a proof of concept
