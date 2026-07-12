from flask_sqlalchemy import SQLAlchemy  # type: ignore[import]
from datetime import datetime

db = SQLAlchemy()


class EntryPass(db.Model):
    __tablename__ = 'entry_passes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    pass_type = db.Column(db.String(50), nullable=False)
    library_name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    item_details = db.Column(db.String(255), nullable=False)
    entry_date = db.Column(db.String(20), nullable=False)
    duration = db.Column(db.String(50), nullable=False)
    amount = db.Column(db.Float, nullable=False, default=0.0)
    map_query = db.Column(db.String(255), nullable=True)
    qr_code = db.Column(db.String(100), nullable=False, unique=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'pass_type': self.pass_type,
            'library_name': self.library_name,
            'location': self.location,
            'item_details': self.item_details,
            'entry_date': self.entry_date,
            'duration': self.duration,
            'amount': self.amount,
            'map_query': self.map_query,
            'qr_code': self.qr_code,
            'created_at': self.created_at.isoformat()
        }

# User Model
class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), nullable=False, default='student')
    access_code = db.Column(db.String(50), nullable=True)
    government_id_type = db.Column(db.String(50), nullable=True)
    government_id_number = db.Column(db.String(100), nullable=True)
    library_name = db.Column(db.String(100), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationship
    bookings = db.relationship('Booking', backref='user', lazy=True, cascade='all, delete-orphan')
    entry_passes = db.relationship('EntryPass', backref='user', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'role': self.role,
            'government_id_type': self.government_id_type,
            'government_id_number': self.government_id_number,
            'library_name': self.library_name,
            'created_at': self.created_at.isoformat()
        }


# Library Model
class Library(db.Model):
    __tablename__ = 'libraries'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    total_seats = db.Column(db.Integer, nullable=False)
    image = db.Column(db.String(255), nullable=True)
    rating = db.Column(db.Float, nullable=True, default=4.5)
    reviews = db.Column(db.Text, nullable=True, default='Great place to study!')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationship
    bookings = db.relationship('Booking', backref='library', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'location': self.location,
            'total_seats': self.total_seats,
            'image': self.image,
            'rating': self.rating,
            'reviews': self.reviews,
            'created_at': self.created_at.isoformat()
        }


# Booking Model
class Booking(db.Model):
    __tablename__ = 'bookings'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    library_id = db.Column(db.Integer, db.ForeignKey('libraries.id'), nullable=False)
    seat_number = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(20), default='active')  # active, cancelled, completed
    booking_date = db.Column(db.DateTime, default=datetime.utcnow)
    check_in_time = db.Column(db.DateTime, nullable=True)
    check_out_time = db.Column(db.DateTime, nullable=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'library_id': self.library_id,
            'seat_number': self.seat_number,
            'status': self.status,
            'booking_date': self.booking_date.isoformat(),
            'check_in_time': self.check_in_time.isoformat() if self.check_in_time else None,
            'check_out_time': self.check_out_time.isoformat() if self.check_out_time else None
        }


# Function to initialize and populate database
def init_db(app):
    """Initialize database and insert dummy data"""
    with app.app_context():
        # Drop all tables (for fresh start - remove in production)
       
        
        # Create all tables
        db.create_all()
        
        # Create mock libraries
        lib1 = Library(
            name="Central City Library",
            location="Downtown, 123 Main Street",
            total_seats=50,
            image="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80",
            rating=4.7,
            reviews="A quiet and well-maintained library with a great collection of books. The staff is helpful and the seating is comfortable. Perfect for focused study sessions."
        )
        lib2 = Library(
            name="University Study Hub",
            location="Campus, Building A, 2nd Floor",
            total_seats=80,
            image="https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
            rating=4.2,
            reviews="Good for students, but can get crowded during exam season. The Wi-Fi is reliable and there are plenty of power outlets. The cafe inside is a plus."
        )
        
        db.session.add(lib1)
        db.session.add(lib2)
        db.session.commit()
        
        # Create mock users
        user1 = User(
            name="John Doe",
            email="john@example.com",
            password="password123"
        )
        user2 = User(
            name="Jane Smith",
            email="jane@example.com",
            password="password123"
        )
        user3 = User(
            name="Alex Johnson",
            email="alex@example.com",
            password="password123"
        )
        
        db.session.add(user1)
        db.session.add(user2)
        db.session.add(user3)
        db.session.commit()
        
        # Create mock bookings
        booking1 = Booking(
            user_id=user1.id,
            library_id=lib1.id,
            seat_number=5,
            status='active'
        )
        booking2 = Booking(
            user_id=user2.id,
            library_id=lib2.id,
            seat_number=12,
            status='active'
        )
        booking3 = Booking(
            user_id=user3.id,
            library_id=lib1.id,
            seat_number=8,
            status='active'
        )
        
        db.session.add(booking1)
        db.session.add(booking2)
        db.session.add(booking3)
        db.session.commit()
        
        print("✅ Database initialized successfully!")
        print(f"📚 Created {Library.query.count()} libraries")
        print(f"👥 Created {User.query.count()} users")
        print(f"🪑 Created {Booking.query.count()} bookings")
