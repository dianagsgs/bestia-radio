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

#db = SQLAlchemy()

#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_name
#app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
#db.init_app(app)

# MODELS
#class Locutor(db.Model):
#    ID: Mapped[int] = mapped_column(Integer, primary_key=True)
#    nombre: Mapped[str] = mapped_column(String)
#    foto: Mapped[str] = mapped_column(String)
#    bio: Mapped[str] = mapped_column(String)
#    instagram: Mapped[str] = mapped_column(String)

#with app.app_context():
#    db.create_all()

# ROUTES

# DATABASE ACTUAL ROUTES
@app.route('/api/get_locutores', methods=["GET"])
def get_locutores():
    # Connect to the database 
    conn = psycopg2.connect(database="verceldb",#process.env.NEXT_PUBLIC_POSTGRES_DATABASE, 
                            user="default",#process.env.NEXT_PUBLIC_POSTGRES_USER, 
                            password="huBg5wXDkAE7",#process.env.NEXT_PUBLIC_POSTGRES_PASSWORD, 
                            host="ep-yellow-silence-34984390-pooler.us-east-1.postgres.vercel-storage.com",#process.env.NEXT_PUBLIC_POSTGRES_HOST,
                            port="5432") 
  
    # create a cursor 
    cur = conn.cursor() 
  
    # Select all products from the table 
    cur.execute('''SELECT * FROM locutor''') 
  
    # Fetch the data 
    data = cur.fetchall() 
  
    # close the cursor and connection 
    cur.close() 
    conn.close() 
    print(data, file=sys.stderr)
    personas = [
        {
            "id":"1",
            "nombre":"Jen",
            "programas": [
                {"nombre":"Lunes Inexpertos","horario":"Lunes 11am"},
                {"nombre":"Playlists Inexpertas","horario":"Viernes 11am"}
            ],
            "foto":"jen.png",
            "bio":"Jen es chida"
        },
        {
            "id":"2",
            "nombre":"Remofis",
            "programas": [
                {"nombre":"La Hora de la Bestia","horario":"Lunes a Viernes 10am"}
            ],
            "foto":"remofis.png",
            "bio":"Es la jefa de la bestia"
        },
        {
            "id":"3",
            "nombre":"Sandy",
            "programas": [
                {"nombre":"Supernova","horario":"Jueves 7pm"}
            ],
            "foto":"sandy.png",
            "bio":"Sandy lleva desde el principio"
        },
    ]
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