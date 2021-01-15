from flask import Flask
from flask import request
from flask import jsonify

from flask_cors import CORS

import random
import string

app = Flask(__name__)
CORS(app)

users = {
   'users_list' :
   [
      {
         'id' : 'xyz789',
         'name' : 'Charlie',
         'job': 'Janitor',
      },
      {
         'id' : 'abc123',
         'name': 'Mac',
         'job': 'Bouncer',
      },
      {
         'id' : 'ppp222',
         'name': 'Mac',
         'job': 'Professor',
      },
      {
         'id' : 'yat999',
         'name': 'Dee',
         'job': 'Aspring actress',
      },
      {
         'id' : 'zap555',
         'name': 'Dennis',
         'job': 'Bartender',
      }
   ]
}

def generateID():
   letters_and_digits = string.ascii_letters +  string.digits
   result_str =  ''.join((random.choice(letters_and_digits) for i in range(6)))
   return result_str

@app.route('/users/<id>', methods=['GET', 'DELETE'])
def get_user(id):
   if id:
      for user in users['users_list']:
         if user['id'] == id:
            if request.method == 'GET':
               return user
            elif request.method == 'DELETE':
               users['users_list'].remove(user)
               resp = jsonify(users['users_list']),204
               return resp
      resp = jsonify({"Msg": "User not found with provided ID."}), 404
      return resp
   return users 

@app.route('/users', methods=['GET', 'POST'])
def get_users():
   if request.method == 'GET':
      search_username = request.args.get('name')
      if search_username :
         subdict = {'users_list' : []}
         for user in users['users_list']:
            if user['name'] == search_username:
                  subdict['users_list'].append(user)
         return subdict
      return users
   elif request.method == 'POST':
      userToAdd = request.get_json()
      print(userToAdd)
      userToAdd["id"] = generateID()
      print(userToAdd)
      users['users_list'].append(userToAdd)
      resp = jsonify(userToAdd),201
      # resp = jsonify(success=True)
      #resp.status_code = 200 #optionally, you can always set a response code. 
      # 200 is the default code for a normal response
      return resp

@app.route('/')
def hello_world():
   return 'Hello World!!! :^)'
