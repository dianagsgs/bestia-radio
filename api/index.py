from flask import Flask, request, Response
from flask_cors import CORS
#from flask_sqlalchemy import SQLAlchemy
#from sqlalchemy.sql import text
#from sqlalchemy import Integer, String
#from sqlalchemy.orm import Mapped, mapped_column
import json
import sys
import psycopg2 
import os
import numpy as np
from datetime import datetime

app = Flask(__name__)
CORS(app)

# SECRETS
DATABASE = os.environ.get('POSTGRES_DATABASE')
USER = os.environ.get('POSTGRES_USER')
PASSWORD = os.environ.get('POSTGRES_PASSWORD')
HOST = os.environ.get('POSTGRES_HOST')
PORT = "5432"

# HELPERS
def start_connection():
    # Connect to the database 
    conn = psycopg2.connect(database=DATABASE, 
                            user=USER, 
                            password=PASSWORD, 
                            host=HOST,
                            port=PORT) 
    return conn

def execute_query(query, conn):  
    # create a cursor 
    cur = conn.cursor()  
    # EXECUTE QUERY 
    cur.execute(query) 
    # Fetch the data 
    data = cur.fetchall() 
    # close the cursor
    cur.close() 
    #return the data
    return data

# ROUTES

# DATABASE ACTUAL ROUTES
@app.route('/api/get_banners', methods=["GET"])
def get_banners():
    conn = start_connection()
    data = execute_query('''SELECT Mobile_path, Desktop_path, Url FROM banner WHERE Activo = true''', conn)
    transposed_data = np.transpose(np.array(data))
    conn.close()
    resp = Response(response=json.dumps(transposed_data.tolist()), status=200, mimetype="text/plain")
    return resp

@app.route('/api/get_sesiones', methods=["GET"])
def get_sesiones():
    conn = start_connection()
    data = execute_query('''SELECT * FROM sesion WHERE Activo = true''', conn)
    conn.close()
    resp = Response(response=json.dumps(data), status=200, mimetype="text/plain")
    return resp

@app.route('/api/get_locutores', methods=["GET"])
def get_locutores():
    conn = start_connection()
    data = execute_query('''SELECT * FROM locutor''', conn)
    personas = []
    for locutor in data:
        ids_programa = execute_query('''SELECT Programa_id FROM locutor_programa WHERE Locutor_id = '''+str(locutor[0]),conn)
        programas = []
        for i in ids_programa:
            programa = execute_query('''SELECT * FROM programa WHERE Id = '''+str(i[0]),conn)[0]
            programas.append({
                "id":programa[0],
                "nombre":programa[1],
                "horario":programa[2] + " - " + str(programa[3].hour) + "hrs",
                "activo":programa[4]
            })
        persona = {
            "id":locutor[0],
            "nombre":locutor[1],
            "programas": programas,
            "foto":locutor[2],
            "bio":locutor[3],
            "insta":locutor[4]
        }
        personas.append(persona)
    conn.close()
    resp = Response(response=json.dumps(personas), status=200, mimetype="text/plain")
    return resp

@app.route('/api/get_eventos', methods=["GET"])
def get_eventos():
    conn = start_connection()
    data = execute_query('''SELECT * FROM evento''', conn)
    conn.close()
    eventos = []
    for item in data:
        evento = {
            "id":item[0],
            "flyer":item[1],
            "nombre":item[2],
            "lugar":item[3],
            "fecha":item[4].strftime("%Y-%m-%d"),
            "hora":item[5].strftime("%H:%M:%S"),            
            "precio":item[6],
            "registro":item[7]
        }
        eventos.append(evento)
    resp = Response(response=json.dumps(eventos), status=200, mimetype="text/plain")
    return resp

if __name__ == "__main__":
    app.run(debug=True)