from flask import Flask, Response

import json

api = Flask(__name__)

@api.route('/api/get_locutores', methods=["GET"])
def get_locutores():

    personas = [
        {
            "nombre":"Jennifer",
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
    resp.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return resp

if __name__ == "__main__":
    api.run()