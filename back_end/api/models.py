from django.db import models #importing models class from django database

# Create your models here.
class User(models.Model): 
    email = models.EmailField(primary_key=True)
    name = models. CharField (max_length=30)
    password= models. CharField (max_length=20)
    

class Stats(models.Model): # landing page stats validation
    usersCount = models.IntegerField(default=0) 
    modelUsedCount = models.IntegerField(default=0)
    accuracy = models.IntegerField(default=0)