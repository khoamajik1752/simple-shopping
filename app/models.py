from django.db import models

# Create your models here.
class Product(models.Model):
    id=models.IntegerField(primary_key=True)
    image=models.CharField(max_length=200)
    name=models.CharField(max_length=50)
    description=models.CharField(max_length=100)
    price=models.FloatField()
    color=models.CharField(max_length=10)