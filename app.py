from flask import Flask, render_template, request, jsonify, redirect, url_for
from datetime import datetime

app = Flask(__name__)

# In-memory data simulation (you can replace this with a real database)
models = [
    {"name": "BMW X5", "price": "$60,000", "type": "SUV"},
    {"name": "BMW M3", "price": "$72,000", "type": "Sedan"},
    {"name": "BMW i8", "price": "$140,000", "type": "Hybrid Sports"},
    {"name": "BMW 7 Series", "price": "$86,000", "type": "Luxury Sedan"},
]

bookings = []

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/shop")
def shop():
    return render_template("shop.html", models=models)

@app.route("/test-ride", methods=["GET", "POST"])
def test_ride():
    if request.method == "POST":
        name = request.form.get("name")
        email = request.form.get("email")
        model = request.form.get("model")
        date = request.form.get("date")

        bookings.append({
            "name": name,
            "email": email,
            "model": model,
            "date": date,
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        })

        return render_template("success.html", name=name, model=model, date=date)

    return render_template("test_ride.html", models=models)

@app.route("/history")
def history():
    return render_template("history.html", bookings=bookings)

@app.route("/api/modes", methods=["POST"])
def save_mode():
    mode = request.json.get("mode")
    return jsonify({"status": "ok", "mode": mode})

if __name__ == "__main__":
    app.run(debug=True)
