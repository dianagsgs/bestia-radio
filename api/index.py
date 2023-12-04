from flask import Flask, request, Response
from flask_cors import CORS
#from flask_sqlalchemy import SQLAlchemy
#from sqlalchemy.sql import text
#from sqlalchemy import Integer, String
#from sqlalchemy.orm import Mapped, mapped_column
import json
import sys
import psycopg2 


app = Flask(__name__)
CORS(app)

# SECRETS (TODO REMOVE!!!)
DATABASE = "verceldb" #process.env.NEXT_PUBLIC_POSTGRES_DATABASE
USER = "default" #process.env.NEXT_PUBLIC_POSTGRES_USER
PASSWORD = "huBg5wXDkAE7" #process.env.NEXT_PUBLIC_POSTGRES_PASSWORD
HOST = "ep-yellow-silence-34984390-pooler.us-east-1.postgres.vercel-storage.com" #process.env.NEXT_PUBLIC_POSTGRES_HOST
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
    eventos = [
        {
            "id":"1",
            "flyer":"evento1.png",
            "nombre":"Ruido En Casa",
            "fecha":"14 de Octubre, 2023",
            "hora":"7pm",            
            "precio":"Gratis"
        },
        {
            "id":"2",
            "flyer":"evento2.png",
            "nombre":"Ruido En Casa: Halloween",
            "fecha":"20 de Octubre, 2023",
            "hora":"7pm",            
            "precio":"Gratis con disfraz mamalón"
        }
    ]
    resp = Response(response=json.dumps(eventos), status=200, mimetype="text/plain")
    return resp

if __name__ == "__main__":
    app.run(debug=True)