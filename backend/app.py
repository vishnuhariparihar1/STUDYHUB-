import os
from flask import Flask, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from email_validator import validate_email, EmailNotValidError
from flask_cors import CORS


# Initialize Flask app
app = Flask(__name__)
CORS(app)


# This is your data source. 
# Later, you will replace this list with: db.session.query(Library).all()
libraries = [
    { ... },
    { ... },
    { ... }
]

@app.route('/api/libraries', methods=['GET'])
def get_libraries():
    return jsonify(libraries)

@app.route('/api/libraries/<int:lib_id>', methods=['GET'])
def get_library(lib_id):
    lib = next((l for l in libraries if l["id"] == lib_id), None)
    return jsonify(lib) if lib else (jsonify({"error": "Not found"}), 404)

from database import db, init_db, User, Library, Booking, EntryPass


# Get the absolute path to the instance folder
basedir = os.path.abspath(os.path.dirname(__file__))
instance_path = os.path.join(basedir, 'instance')

# Create instance folder if it doesn't exist
os.makedirs(instance_path, exist_ok=True)

# Configuration
DATABASE_URL = os.environ.get("DATABASE_URL")

if DATABASE_URL:
    app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
else:
    app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{os.path.join(instance_path, 'studyhub.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JSON_SORT_KEYS'] = False

# Initialize extensions
db.init_app(app)

# Initialize database with dummy data
init_db(app)


# ==================== ROUTES ====================

# Health check endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'success',
        'message': 'StudyHub Backend is running!'
    }), 200


# Get all libraries
@app.route('/api/libraries', methods=['GET'])
def get_libraries():
    libraries = Library.query.all()
    return jsonify({
        'status': 'success',
        'data': [lib.to_dict() for lib in libraries]
    }), 200


# Authentication
@app.route('/api/auth/signup', methods=['POST'])
def signup_user():
    data = request.get_json(silent=True) or {}
    if not data.get('name') or not data.get('email') or not data.get('password'):
        return jsonify({'status': 'error', 'message': 'Name, email and password are required'}), 400
    # Validate email

    # Validate email
            # Validate email
    try:
        valid = validate_email(
            data["email"],
            check_deliverability=True
        )
        data["email"] = valid.normalized

    except EmailNotValidError as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 400

    if data.get('access_code') != 'STUDYHUB2026':
        return jsonify({'status': 'error', 'message': 'Unauthorized signup blocked'}), 403
    if data.get('password') and len(data['password']) < 8:
        return jsonify({'status': 'error', 'message': 'Password must be at least 8 characters long'}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({'status': 'error', 'message': 'Email already exists'}), 409

    user = User(
        name=data['name'],
        email=data['email'],
        password=generate_password_hash(data['password']),
        role=data.get('role', 'student'),
        access_code=data.get('access_code'),
        government_id_type=data.get('government_id_type'),
        government_id_number=data.get('government_id_number'),
        library_name=data.get('library_name')
    )
    db.session.add(user)
    db.session.commit()

    return jsonify({'status': 'success', 'message': 'Account created successfully', 'user': user.to_dict()}), 200


@app.route('/api/auth/login', methods=['POST'])
def login_user():
    data = request.get_json(silent=True) or {}
    email = data.get('email', '')
    password = data.get('password', '')

    if not email or not password:
        return jsonify({'status': 'error', 'message': 'Email and password are required'}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({'status': 'error', 'message': 'Invalid credentials'}), 401

    return jsonify({'status': 'success', 'message': 'Login successful', 'user': user.to_dict()}), 200


# Get all users
@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify({
        'status': 'success',
        'data': [user.to_dict() for user in users]
    }), 200


# Get all bookings
@app.route('/api/bookings', methods=['GET'])
def get_bookings():
    bookings = Booking.query.all()
    return jsonify({
        'status': 'success',
        'data': [booking.to_dict() for booking in bookings]
    }), 200


# Entry passes
@app.route('/api/entry-passes', methods=['POST'])
def create_entry_pass():
    data = request.get_json(silent=True) or {}
    user = User.query.get(data.get('user_id'))
    if not user:
        return jsonify({'status': 'error', 'message': 'User not found'}), 404

    qr_code = data.get('qr_code') or f"STH-{user.id}-{len(user.entry_passes) + 1}"
    pass_entry = EntryPass(
        user_id=user.id,
        pass_type=data.get('pass_type', 'Seat Booking'),
        library_name=data.get('library_name', 'StudyHub Library'),
        location=data.get('location', 'Unknown'),
        item_details=data.get('item_details', 'Entry'),
        entry_date=data.get('entry_date', ''),
        duration=data.get('duration', 'N/A'),
        amount=data.get('amount', 0),
        map_query=data.get('map_query'),
        qr_code=qr_code
    )
    db.session.add(pass_entry)
    db.session.commit()
    return jsonify({'status': 'success', 'message': 'Entry pass created', 'pass': pass_entry.to_dict()}), 200


@app.route('/api/users/<int:user_id>/entry-passes', methods=['GET'])
def get_user_entry_passes(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'status': 'error', 'message': 'User not found'}), 404

    passes = EntryPass.query.filter_by(user_id=user_id).order_by(EntryPass.created_at.desc()).all()
    return jsonify({'status': 'success', 'user': user.to_dict(), 'passes': [p.to_dict() for p in passes]}), 200


# Get bookings for a specific user
@app.route('/api/users/<int:user_id>/bookings', methods=['GET'])
def get_user_bookings(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({
            'status': 'error',
            'message': 'User not found'
        }), 404
    
    bookings = Booking.query.filter_by(user_id=user_id).all()
    return jsonify({
        'status': 'success',
        'user': user.to_dict(),
        'bookings': [booking.to_dict() for booking in bookings]
    }), 200


# Get available seats in a library
@app.route('/api/libraries/<int:library_id>/available-seats', methods=['GET'])
def get_available_seats(library_id):
    library = Library.query.get(library_id)
    if not library:
        return jsonify({
            'status': 'error',
            'message': 'Library not found'
        }), 404
    
    # Get booked seats
    booked_seats = Booking.query.filter_by(
        library_id=library_id,
        status='active'
    ).all()
    
    booked_seat_numbers = [b.seat_number for b in booked_seats]
    all_seats = list(range(1, library.total_seats + 1))
    available_seats = [seat for seat in all_seats if seat not in booked_seat_numbers]
    
    return jsonify({
        'status': 'success',
        'library': library.to_dict(),
        'available_seats': available_seats,
        'booked_seats': booked_seat_numbers,
        'available_count': len(available_seats),
        'booked_count': len(booked_seat_numbers)
    }), 200


# Error handler
@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'status': 'error',
        'message': 'Endpoint not found'
    }), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        'status': 'error',
        'message': 'Internal server error'
    }), 500


if __name__ == '__main__':
    print("🚀 Starting StudyHub Backend Server...")
    print("📡 Server running...")
    app.run(debug=False, host='0.0.0.0', port=int(os.environ.get("PORT", 5000)))