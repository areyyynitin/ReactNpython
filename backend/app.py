from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///friends.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Import and register blueprint after initializing app & db
from .routes import routes_bp
app.register_blueprint(routes_bp)

# Create tables inside the application context
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
