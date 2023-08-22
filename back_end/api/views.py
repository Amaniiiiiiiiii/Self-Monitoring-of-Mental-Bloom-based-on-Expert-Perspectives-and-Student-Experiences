import json
import random
from django.http import JsonResponse #to communicate with website django http module mei se json response 
from django.views.decorators.csrf import csrf_exempt #cross site request forgery since website is offline we wont be having malicious internet attacks so csrf is exempt
from .models import User, Stats #importing user and stats from model.py file 
from .disease_predection.KNN import KNN_predict #disease prediction folder under the knn file the 'knn_predict' function importing is happening 

@csrf_exempt
def add_user(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        # Check if a user with the same email already exists
        if User.objects.filter(email=data['email']).exists():
            return JsonResponse({'success': False, 'message': 'A user with this email already exists.'}, status=400)

        user = User(email=data['email'], name=data['name'], password=data['password'])
        user.save()

        user_dict = {
            'email': user.email,
            'name': user.name,
            'password': user.password,
        }

        stats = Stats.objects.first() # checking if object is present and then validating with entered data
        if stats is None:
            stats = Stats.objects.create()
        stats.usersCount += 1
        stats.save()

        return JsonResponse({'success': True, 'user': user_dict})
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method.'}, status=400)

@csrf_exempt
def get_users(request): #displaying all registered user 
    if request.method == 'GET':
        users = list(User.objects.all().values())
        return JsonResponse({'success': True, 'users': users})
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method.'}, status=400)
    
@csrf_exempt
def authenticate_user(request): #authenticate is email and password entered is correct else display invalid credentials 
    if request.method == 'POST':
        data = json.loads(request.body)
        if User.objects.filter(email=data['email'], password=data['password']).values().exists():
            return JsonResponse({'success': True, 'message': 'Login Successful'})
        else:
            return JsonResponse({'success': False, 'message': 'Invalid credentials'}, status=401)
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method.'}, status=400)
     
@csrf_exempt
def predict_disease(request): #predicting disease and displaying tasks if disease is present if all not applicable no tasks are displayed 
    if request.method == 'POST':
        data = json.loads(request.body)
        answers = data['answers']
        disease = KNN_predict(answers, k=3)

        stats = Stats.objects.first()
        if stats is None:
            stats = Stats.objects.create()
        stats.modelUsedCount +=1
        stats.save()

        tasks = ["Restart an old hobby", "meet a friend you haven't met from long time", "try to learn a new skill", "Register for a workshop / class", "finish incomplete chores", "try a new cuisine", "learn a new sport", "Try to go on a holiday", "Spend more time with family", "Try new forms of entertainment", "yoga", "Arts and crafts", "Journalling", "Treat yourself to something you've wanted to purchase for a long time", "do one activity out of comfort zone", "Watch your favourite movie / new movie", "Redecorate your living space"]
        if disease!='':
            return JsonResponse({'success': True, 'disease':disease, 'tasks':random.sample(tasks, 3)})
        else :
            return JsonResponse({'success': True, 'disease':disease, 'tasks':[]})
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method.'}, status=400)

@csrf_exempt
def get_stats(request): # get stats of acitve user, modelcount and accuracy of model
    if request.method == 'GET':
        stats = Stats.objects.first()
        stats_dict = {
            'usersCount': stats.usersCount,
            'modelUsedCount': stats.modelUsedCount,
            'accuracy' : f'{stats.accuracy}%'
        }

        return JsonResponse({'success': True, 'stats': stats_dict})
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method.'}, status=400)