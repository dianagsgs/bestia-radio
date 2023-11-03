from flask import Flask, request, Response
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text
from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column
import json
import sys

app = Flask(__name__)
CORS(app)

db = SQLAlchemy()
db_name = 'bestia_radio.db'

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_name
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db.init_app(app)

# MODELS
class Locutor(db.Model):
    ID: Mapped[int] = mapped_column(Integer, primary_key=True)
    nombre: Mapped[str] = mapped_column(String)
    foto: Mapped[str] = mapped_column(String)
    bio: Mapped[str] = mapped_column(String)
    instagram: Mapped[str] = mapped_column(String)

with app.app_context():
    db.create_all()

# ROUTES

# this route will test the database connection - and nothing more
@app.route('/')
def testdb():
    try:
        db.session.query(text('1')).from_statement(text('SELECT 1')).all()
        return '<h1>It works.</h1>'
    except Exception as e:
        # e holds description of the error
        error_text = "<p>The error:<br>" + str(e) + "</p>"
        hed = '<h1>Something is broken.</h1>'
        return hed + error_text

# DATABASE ACTUAL ROUTES
@app.route('/api/get_locutores', methods=["GET"])
def get_locutores():
    locutores = db.session.execute(db.select(Locutor).order_by(Locutor.nombre)).fetchall()
    print(locutores[1], file=sys.stderr)
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