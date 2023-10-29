from flask import Flask, request, Response
from flask_cors import CORS

import json

app = Flask(__name__)
CORS(app)

@app.route('/api/get_locutores', methods=["GET"])
def get_locutores():
    print("I am entering get locutores")
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
    print("Set personas")
    resp = Response(response=json.dumps(personas), status=200, mimetype="text/plain")
    print("created a response")
    return resp

#@app.route("/api/healthchecker", methods=["GET"])
#def healthchecker():
#    return {"status": "success", "message": "Integrate Flask Framework with Next.js"}

if __name__ == "__main__":
    app.run()