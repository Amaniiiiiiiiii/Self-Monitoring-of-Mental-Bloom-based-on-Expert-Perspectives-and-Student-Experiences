from django.apps import AppConfig #appconfig is a class being imported from django.apps module used to configurations of django applications
from django.core.management import call_command #execute Django management commands from within Python code.


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField' # it is specifying that the primary key should be of value BigAutoField which is 64 bit integer type 
    name = 'api' 

    def ready(self): # when everything is preloaded it sends notification of ready 
        from .models import Stats #  This imports the Stats model from the models.py module in the current directory
        from .disease_predection.KNN import KNN_accuracy # importing the accuracy of knn model

        stats = Stats.objects.first() #This retrieves the first Stats object from the database, if any exist.
        if stats is None:
            stats = Stats.objects.create() #if no stats object is present new object is created 
        stats.accuracy = KNN_accuracy() # calling the accuracy model 
        stats.save() # saving the new stats
        