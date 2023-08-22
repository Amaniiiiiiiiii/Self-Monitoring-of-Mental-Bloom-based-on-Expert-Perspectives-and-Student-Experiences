import pandas as pd #  importing packages
import numpy as np #""
from collections import Counter # counter is a container for unordered elements
from sklearn.preprocessing import OneHotEncoder #it is used to convert categorical data into numerical data

def get_dataset(): # to read csv
    dataset = pd.read_csv('api\\disease_predection\\dataset.csv', encoding="MacRoman") # single byte text encoding
    dataset = dataset.drop(['Timestamp','Email Address', 'Name'], axis=1) # eliminating first 3 col
    labels = dataset["Outcome"].to_numpy() #used to convert series into numpy array
    data = dataset.drop(['Outcome'], axis=1).to_numpy() #dropping of outcome
    return data, labels

# Finding K-Nearest Neighbour of a instance
def KNN_predict(toPredict:list, k=3): # k=3 accuracy is 81%
    if not all(element == 'Not applicable' for element in toPredict[:-1]):
        data, labels = get_dataset()
        toPredict.append('') # if all inputs are not "not applicable it is reading dataset from last and coming"

        #this is just to convert strings to numeric value and merging both to encode them together
        data = data.tolist()
        data.append(toPredict)
        data = np.array(data)
        enc = OneHotEncoder()
        data = np.array(enc.fit_transform(data).toarray()) #2d array like object where row is sample ad columns is feature 

        toPredict = data[-1] #defining array
        data = data[:-1] #splitting array into two parts

        euclidean_distances = [np.sqrt(np.sum((toPredict-xtrain)**2)) for xtrain in data] #euclidean distance formule 2Va2+b2
        least_distance = np.argsort(euclidean_distances)[:k] # finding least euclidean distance 
        least_distance_label = [labels[i] for i in least_distance] # least distance is calculated and then label is extracted of predicted disease
        knn = Counter(least_distance_label).most_common(1) # using counter to count max occurences of the distance 
        return knn[0][0] #returning disease
    return ''

def KNN_accuracy(k=3): #prediction of disease is done above accuracy is calculated and then comparing predicted and calculated and validating output
    data, labels = get_dataset()
    enc = OneHotEncoder()
    data = np.array(enc.fit_transform(data).toarray())

    predicted_labels = []
    for item in data:
        euclidean_distances = [np.sqrt(np.sum((item-xtrain)**2)) for xtrain in data]
        least_distance = np.argsort(euclidean_distances)[:k]
        least_distance_label = [labels[i] for i in least_distance]
        knn = Counter(least_distance_label).most_common(1)
        predicted_labels.append(knn[0][0])

    num_correct = 0
    num_total = len(labels)
    for i in range(num_total):
        if predicted_labels[i] == labels[i]:
            num_correct += 1

    accuracy = (num_correct / num_total) * 100
    return accuracy


