from products.models import Product

"""

Performance Optimization

"""
# Preload related objects
Product.objects.select_related("...")
Product.objects.prefetch_related("...")


# Load only what you need
Product.objects.only("title")
Product.objects.defer("description")

# Use values
# If you don't need the methods or actions that you can do with Django ORM it's better to use the python datatypes than django stuff
Product.objects.values()  # Dictionary of values
Product.objects.values_list()  # list of values

# Count properly
Product.objects.count()
len(Product.objects.all())      # BAD approach


# Bulk create/update
# Instead of querying the database for each item in a loop you should use this to decrease the number of queries to the database
Product.objects.bulk_create([])
Product.objects.bulk_update([])


# If after all of this the queries are slow we should rewrite our query django orm may be slow.
# If it's still slow we should check our database and optimize tables or use indexes
# and final way is caching 
