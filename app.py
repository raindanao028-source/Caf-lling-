from flask import Flask, jsonify

app = Flask(__name__)

orders = []


@app.route("/")
def home():
    return "Cafélling Python Server is Running!"


@app.route("/orders")
def get_orders():
    return jsonify(orders)


@app.route("/add-order/<customer>/<int:total>")
def add_order(customer, total):

    order = {
        "customer": customer,
        "total": total
    }

    orders.append(order)

    return jsonify({
        "message": "Order added successfully!",
        "order": order
    })


if __name__ == "__main__":
    app.run(debug=True)