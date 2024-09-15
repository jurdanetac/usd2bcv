import sqlite3

from flask import Flask, jsonify, request

app = Flask(__name__)

# TODO move this to instance folder, only for testing
app.config["SECRET_KEY"] = "PHpy3oUkWhb4vboO-qywRw"


@app.get("/")
def index():
    con = sqlite3.connect("data/database.db")
    cur = con.cursor()
    all_entries = cur.execute("SELECT * FROM '1996-2023' ORDER BY date").fetchall()
    list_of_entries = []
    columns = ("date", "source", "bolivar", "buy", "sell")

    for entry in all_entries:
        entry_dict = dict(zip(columns, entry))
        list_of_entries.append(entry_dict)

    return jsonify(list_of_entries)
