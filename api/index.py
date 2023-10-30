from flask import Flask, request, Response
from flask_cors import CORS

import json

app = Flask(__name__)
CORS(app)

@app.route('/api/get_locutores', methods=["GET"])
def get_locutores():
    personas = [
        {
            "nombre":"Jen",
            "programas": [
                {"nombre":"Lunes Inexpertos","horario":"Lunes 11am"},
                {"nombre":"Playlists Inexpertas","horario":"Viernes 11am"}
            ],
            "foto":"jen.png",
            "bio":"Jen es chida"
        },
        {
            "nombre":"Remofis",
            "programas": [
                {"nombre":"La Hora de la Bestia","horario":"Lunes a Viernes 10am"}
            ],
            "foto":"remofis.png",
            "bio":"Es la jefa de la bestia"
        },
        {
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
    app.run()