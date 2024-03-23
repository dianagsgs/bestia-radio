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

############# HELPERS
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

def execute_insert(query):
    conn = start_connection()
    cur = conn.cursor()  
    cur.execute(query)
    cur.close()
    conn.commit()
    conn.close()

def programas_bonitos(lista):
    nueva_lista = []
    max_id = 0
    for item in lista:
        if item[0] > max_id:
            max_id = item[0]
        programa = {
            "id":item[0],
            "nombre":item[1],
            "hora":item[2].strftime("%H:%M:%S"),
            "activo":item[3]
        }
        nueva_lista.append(programa)
    return nueva_lista, max_id

############# ROUTES

@app.route('/api/login', methods=["GET"])
def login():
    conn = start_connection()
    data = execute_query(request.args["query"], conn)
    conn.close()
    resp = Response(response=json.dumps(str(data)), status=200, mimetype="text/plain")
    return resp

#### GETS

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
        programas_raw = execute_query('''
            SELECT * FROM programa WHERE Activo = true AND Id IN 
              (SELECT Programa_id FROM locutor_programa WHERE Locutor_id = '''+str(locutor[0])+''')
        ''',conn)
        programas = []
        for programa in programas_raw:
            dias = ""
            if programa[4]:
                dias += "Lunes"
            if programa[5]:
                if dias != "":
                    dias += ", "
                dias += "Martes"
            if programa[6]:
                if dias != "":
                    dias += ", "
                dias += "Miercoles"
            if programa[7]:
                if dias != "":
                    dias += ", "
                dias += "Jueves"
            if programa[8]:
                if dias != "":
                    dias += ", "
                dias += "Viernes"
            if programa[9]:
                if dias != "":
                    dias += ", "
                dias += "Sabado"
            if programa[10]:
                if dias != "":
                    dias += ", "
                dias += "Domingo"
            programas.append({
                "id":programa[0],
                "nombre":programa[1],
                "horario":dias + " - " + str(programa[2].hour) + "hrs",
                "activo":programa[3]
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
            "registro":item[7],
            "galeria":item[8]
        }
        eventos.append(evento)
    resp = Response(response=json.dumps(eventos), status=200, mimetype="text/plain")
    return resp

@app.route('/api/get_programas', methods=["GET"])
def get_programas():
    conn = start_connection()
    data_lunes = execute_query('''SELECT Nombre, Hora FROM programa WHERE Lunes = true AND Activo = true''', conn)
    data_martes = execute_query('''SELECT Nombre, Hora FROM programa WHERE Martes = true AND Activo = true''', conn)
    data_miercoles = execute_query('''SELECT Nombre, Hora FROM programa WHERE Miercoles = true AND Activo = true''', conn)
    data_jueves = execute_query('''SELECT Nombre, Hora FROM programa WHERE Jueves = true AND Activo = true''', conn)
    data_viernes = execute_query('''SELECT Nombre, Hora FROM programa WHERE Viernes = true AND Activo = true''', conn)
    conn.close()

    programas = {
        "LUNES":{},
        "MARTES":{},
        "MIERCOLES":{},
        "JUEVES":{},
        "VIERNES":{}
    }
    for item in data_lunes:
        programas["LUNES"][str(item[1].hour)+"hrs"] = item[0]
    for item in data_martes:
        programas["MARTES"][str(item[1].hour)+"hrs"] = item[0]
    for item in data_miercoles:
        programas["MIERCOLES"][str(item[1].hour)+"hrs"] = item[0]
    for item in data_jueves:
        programas["JUEVES"][str(item[1].hour)+"hrs"] = item[0]
    for item in data_viernes:
        programas["VIERNES"][str(item[1].hour)+"hrs"] = item[0]

    resp = Response(response=json.dumps(programas), status=200, mimetype="text/plain")
    return resp

@app.route('/api/get_all_programas', methods=["GET"])
def get_all_programas():
    conn = start_connection()
    data_lunes = execute_query('''SELECT Id, Nombre, Hora, Activo FROM programa WHERE Lunes = true''', conn)
    data_martes = execute_query('''SELECT Id, Nombre, Hora, Activo FROM programa WHERE Martes = true''', conn)
    data_miercoles = execute_query('''SELECT Id, Nombre, Hora, Activo FROM programa WHERE Miercoles = true''', conn)
    data_jueves = execute_query('''SELECT Id, Nombre, Hora, Activo FROM programa WHERE Jueves = true''', conn)
    data_viernes = execute_query('''SELECT Id, Nombre, Hora, Activo FROM programa WHERE Viernes = true''', conn)
    conn.close()

    programas_lunes, max_lunes = programas_bonitos(data_lunes)
    programas_martes, max_martes = programas_bonitos(data_martes)
    programas_miercoles, max_miercoles = programas_bonitos(data_miercoles)
    programas_jueves, max_jueves = programas_bonitos(data_jueves)
    programas_viernes, max_viernes = programas_bonitos(data_viernes)

    programas = {
        "LUNES":programas_lunes,
        "MARTES":programas_martes,
        "MIERCOLES":programas_miercoles,
        "JUEVES":programas_jueves,
        "VIERNES":programas_viernes,
        "max_id": max(max_lunes,max_martes,max_miercoles,max_jueves,max_viernes)
    }

    resp = Response(response=json.dumps(programas), status=200, mimetype="text/plain")
    return resp

@app.route('/api/get_articulos', methods=["GET"])
def get_articulos():
    conn = start_connection()
    data = execute_query('''SELECT Id, Tipo, Titulo, Foto_path, Blurb, Link, Activo, Fecha FROM articulo ORDER BY Fecha DESC, Id DESC''', conn)
    conn.close()
    articulos = []
    for item in data:
        articulo = {
            "id":item[0],
            "tipo":item[1],
            "titulo":item[2],
            "foto_path":item[3],          
            "blurb":item[4],
            "link":item[5],
            "activo":item[6],
            "fecha":item[7].strftime("%Y-%m-%d")
        }
        articulos.append(articulo)
    resp = Response(response=json.dumps(articulos), status=200, mimetype="text/plain")
    return resp

@app.route('/api/get_articulo', methods=["GET"])
def get_articulo():
    conn = start_connection()
    data = execute_query('''SELECT * FROM articulo WHERE Id ='''+ request.args["id"], conn)
    conn.close()
    resp = Response(response=json.dumps(str(data[0])), status=200, mimetype="text/plain")
    return resp

#### POSTS

@app.route('/api/post_programa', methods=["POST"])
def post_programa():
    execute_insert('''INSERT INTO programa (Id, Nombre, Hora, Activo, Lunes, Martes, Miercoles, Jueves, Viernes, Sabado, Domingo)
                VALUES ''' + request.args["values"])
    return "success programa"

@app.route('/api/post_locutor', methods=["POST"])
def post_locutor():
    execute_insert('''INSERT INTO locutor (Id, Nombre, Foto_path, Bio, Instagram)
                VALUES ''' + request.args["values"])
    return "success locutor"

@app.route('/api/link_locutor_programa', methods=["POST"])
def link_locutor_programa():
    execute_insert('''INSERT INTO locutor_programa (Id, Locutor_id, Programa_id)
                VALUES ''' + request.args["values"])
    return "success link"

@app.route('/api/post_evento', methods=["POST"])
def post_evento():
    execute_insert('''INSERT INTO evento (Id, Flyer, Nombre, Lugar, Fecha, Hora, Precio, Registro)
                VALUES ''' + request.args["values"])
    return "success evento"

@app.route('/api/post_articulo', methods=["POST"])
def post_articulo():
    execute_insert('''INSERT INTO articulo (Id, Tipo, Titulo, Foto_path, Blurb, Texto, Fecha, Autor, Link, Activo)
                VALUES ''' + request.args["values"])
    return "success articulo"

#### UPDATES

@app.route('/api/update_articulo', methods=["POST"])
def update_articulo():
    execute_insert('''UPDATE articulo ''' + request.args["set_where"])
    return "success update articulo"

@app.route('/api/update_programa', methods=["POST"])
def update_programa():
    execute_insert('''UPDATE programa ''' + request.args["set_where"])
    return "success update programa"

#### DELETES

@app.route('/api/delete_articulo', methods=["POST"])
def delete_articulo():
    execute_insert(request.args["delete_where"])
    return "success delete articulo"

if __name__ == "__main__":
    app.run(debug=True)