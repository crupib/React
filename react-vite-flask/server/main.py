from flask import Flask, jsonify, request
from flask_cors import CORS
app = Flask(__name__)
cors = CORS(app, origins='*')
@app.route("/api/users",methods=['GET'])

def users():
   return jsonify(
     {
       "users": 
       [
		     'shit',
		     'hole',
		     'cunt'
		   ]
     }
   )
if __name__ == "__main__":
  app.run(debug=True, port=8000) 
