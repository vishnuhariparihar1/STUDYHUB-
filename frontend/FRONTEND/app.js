// ==========================================
// 1. DUMMY DATABASE (Libraries & Books)
// ==========================================
const libraries = [
    { id: 1, name: "Central City Library", location: "Connaught Place, New Delhi", seats: 50, availableSeats: 23, priceHourly: 50, image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80", mapQuery: "Connaught+Place+New+Delhi" },
    { id: 2, name: "University Study Hub", location: "North Campus, Delhi", seats: 80, availableSeats: 45, priceHourly: 40, image: "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80", mapQuery: "Delhi+University+North+Campus" },
    { id: 3, name: "Quiet Corner Library", location: "Green Park, New Delhi", seats: 30, availableSeats: 5, priceHourly: 60, image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80", mapQuery: "Green+Park+New+Delhi" },
    { id: 4, name: "Knowledge Tree Room", location: "Koramangala, Bengaluru", seats: 40, availableSeats: 12, priceHourly: 55, image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80", mapQuery: "Koramangala+Bengaluru" },
    { id: 5, name: "Scholars Hub", location: "Andheri West, Mumbai", seats: 100, availableSeats: 60, priceHourly: 70, image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&q=80", mapQuery: "Andheri+West+Mumbai" },
    { id: 6, name: "The Reading Pod", location: "Salt Lake, Kolkata", seats: 25, availableSeats: 5, priceHourly: 35, image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&q=80", mapQuery: "Salt+Lake+Kolkata" },
    { id: 7, name: "Focus Workspace", location: "Anna Nagar, Chennai", seats: 60, availableSeats: 30, priceHourly: 45, image: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=800&q=80", mapQuery: "Anna+Nagar+Chennai" },
    { id: 8, name: "Elite Study Center", location: "Viman Nagar, Pune", seats: 75, availableSeats: 20, priceHourly: 50, image: "https://images.unsplash.com/photo-1532012197267-da84d127e9b5?w=800&q=80", mapQuery: "Viman+Nagar+Pune" },
    { id: 9, name: "Banjara Reading Room", location: "Banjara Hills, Hyderabad", seats: 45, availableSeats: 10, priceHourly: 65, image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80", mapQuery: "Banjara+Hills+Hyderabad" },
    { id: 10, name: "Zenith Library", location: "Sector 17, Chandigarh", seats: 55, availableSeats: 40, priceHourly: 40, image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80", mapQuery: "Sector+17+Chandigarh" }
];

const booksData = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Fiction", price: 80, location: "Central City Library", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80" },
    { id: 2, title: "Indian Polity", author: "M. Laxmikanth", category: "Competitive", price: 200, location: "University Study Hub", cover: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&q=80" },
    { id: 3, title: "Python Crash Course", author: "Eric Matthes", category: "Reference", price: 150, location: "Knowledge Tree Room", cover: "https://images.unsplash.com/photo-1532012197267-da84d127e9b5?w=400&q=80" },
    { id: 4, title: "Atomic Habits", author: "James Clear", category: "Reference", price: 120, location: "The Reading Pod", cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&q=80" },
    { id: 5, title: "A Brief History of Time", author: "Stephen Hawking", category: "Reference", price: 110, location: "Elite Study Center", cover: "https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?w=400&q=80" },
    { id: 6, title: "To Kill a Mockingbird", author: "Harper Lee", category: "Fiction", price: 90, location: "Central City Library", cover: "https://images.unsplash.com/photo-1495640452828-3df6795cf69b?w=400&q=80" },
    { id: 7, title: "1984", author: "George Orwell", category: "Fiction", price: 85, location: "Scholars Hub", cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80" },
    { id: 8, title: "Quantitative Aptitude", author: "R.S. Aggarwal", category: "Competitive", price: 250, location: "Focus Workspace", cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80" },
    { id: 9, title: "Word Power Made Easy", author: "Norman Lewis", category: "Competitive", price: 100, location: "University Study Hub", cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80" },
    { id: 10, title: "Clean Code", author: "Robert C. Martin", category: "Reference", price: 300, location: "Banjara Reading Room", cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80" }
];

// Enrich Library Data Dynamically
libraries.forEach(l => {
    l.bookedSeats = l.seats - l.availableSeats;
    l.rating = (Math.random() * (5.0 - 4.1) + 4.1).toFixed(1);
    l.facilities = {
        ac: "Yes",
        ro: "Yes",
        wifi: "Free High-Speed",
        cafe: Math.random() > 0.5 ? "Yes" : "No",
        clean: (Math.random() * (5.0 - 4.5) + 4.5).toFixed(1) + "/5"
    };
    l.pricing = {
        oneHr: l.priceHourly,
        twoHr: Math.round(l.priceHourly * 1.8),
        halfDay: Math.round(l.priceHourly * 3.5),
        fullDay: Math.round(l.priceHourly * 6.5),
        night: Math.round(l.priceHourly * 5),
        weekly: Math.round(l.priceHourly * 25),
        monthly: Math.round(l.priceHourly * 80)
    };
    // Fetch stored reviews from local storage or use defaults
    const storedReviews = JSON.parse(localStorage.getItem(`reviews_${l.id}`)) || [];
    l.reviews = storedReviews.length > 0 ? storedReviews : [
        { user: "Aman", rating: 5, text: "Excellent environment for serious studying.", date: "10/07/2026" },
        { user: "Priya", rating: 4, text: "Good wifi and clean desks.", date: "05/07/2026" }
    ];
});


// ==========================================
// 2. GLOBAL STATE & LOCAL STORAGE SYNC
// ==========================================
let state = {
    isLoggedIn: false,
    userRole: 'student',
    userName: '',
    userEmail: '',
    userPassword: '',
    userPhone: '',
    userGoal: '',
    selectedLibraryId: null,
    darkMode: false,
    pendingPayment: null,
    reviewTargetId: null,
    selectedStars: 5
};

let entryPasses = JSON.parse(localStorage.getItem('studyHubPasses')) || [];
let paymentHistory = JSON.parse(localStorage.getItem('studyHubPayments')) || [];

// ==========================================
// 3. UTILITIES & MODALS
// ==========================================
function showToast(msg, type = 'info') {
    const container = document.getElementById('toast-container');
    const el = document.createElement('div');
    el.className = 'toast ' + type;
    el.textContent = msg;
    container.appendChild(el);
    setTimeout(() => {
        el.style.opacity = '0';
        el.style.transform = 'translateX(20px)';
        setTimeout(() => el.remove(), 300);
    }, 3000);
}

function toggleTheme() {
    state.darkMode = !state.darkMode;
    document.body.classList.toggle('dark', state.darkMode);
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}


// ==========================================
// 4. NAVIGATION & UI STATE
// ==========================================
function applyAuthState() {
    const pubActions = document.getElementById('auth-actions-public');
    const privActions = document.getElementById('auth-actions-private');
    const desktopNav = document.getElementById('desktop-nav');
    const bottomNav = document.getElementById('bottom-nav');
    const userDisplay = document.getElementById('user-display');

    if (state.isLoggedIn) {
        pubActions.style.display = 'none';
        privActions.style.display = 'flex';
        desktopNav.style.display = window.innerWidth > 767 ? 'flex' : 'none';
        bottomNav.style.display = window.innerWidth > 767 ? 'none' : 'flex';
        userDisplay.innerText = "👋 " + state.userName;
        
        // Sync profile fields
        document.getElementById('prof-name').value = state.userName;
        document.getElementById('prof-email').value = state.userEmail;
        document.getElementById('prof-phone').value = state.userPhone || '';
        document.getElementById('prof-goal').value = state.userGoal || '';
    } else {
        pubActions.style.display = 'flex';
        privActions.style.display = 'none';
        desktopNav.style.display = 'none';
        bottomNav.style.display = 'none';
    }
}

function navigateTo(pageId) {
    const protectedPages = ['home', 'details', 'seats', 'entry', 'books', 'settings'];
    if (protectedPages.includes(pageId) && !state.isLoggedIn) {
        showToast('Please login to continue.', 'danger');
        pageId = 'overview';
    }

    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-' + pageId);
    if (target) {
        target.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Trigger renders based on page
    if (pageId === 'home') renderLibraries();
    if (pageId === 'books') renderBooks();
    if (pageId === 'seats') renderSeatMap();
    if (pageId === 'entry') renderEntryPasses();
    if (pageId === 'settings') renderPaymentHistory();
}


// ==========================================
// 5. AUTHENTICATION & PROFILE
// ==========================================
function toggleRole(role) {
    state.userRole = role;
    document.getElementById('tab-student').classList.toggle('active', role === 'student');
    document.getElementById('tab-owner').classList.toggle('active', role === 'owner');
    document.getElementById('form-student-fields').classList.toggle('hidden', role !== 'student');
    document.getElementById('form-owner-fields').classList.toggle('hidden', role !== 'owner');
}

function signupUser() {
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const pass = document.getElementById('signup-password').value;
    const studyGoal = document.getElementById('signup-study').value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showToast('Please enter a valid email address', 'danger');
        return;
    }
    if (pass.length < 8) {
        showToast('Password must be at least 8 characters', 'danger');
        return;
    }

    // Save to local storage mock DB
    localStorage.setItem('studyHubUser', JSON.stringify({ 
        name: name, 
        email: email, 
        password: pass,
        goal: studyGoal
    }));

    showToast('Account created! Please log in.', 'success');
    navigateTo('login');
}

function loginUser() {
    const email = document.getElementById('login-email').value.trim();
    const pass = document.getElementById('login-password').value;

    const storedData = localStorage.getItem('studyHubUser');
    const storedUser = storedData ? JSON.parse(storedData) : null;

    if (!storedUser || storedUser.email !== email || storedUser.password !== pass) {
        // Fallback validation for missing DB entries
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showToast('Please enter a valid email address', 'danger');
            return;
        }
        if (pass.length < 8) {
            showToast('Invalid credentials. Password is too short.', 'danger');
            return;
        }
        state.userName = email.split('@')[0].toUpperCase();
        state.userEmail = email;
        state.userPassword = pass;
    } else {
        state.userName = storedUser.name;
        state.userEmail = storedUser.email;
        state.userPassword = storedUser.password;
        state.userGoal = storedUser.goal || '';
        state.userPhone = storedUser.phone || '';
    }

    state.isLoggedIn = true;
    applyAuthState();
    showToast('Login successful!', 'success');
    navigateTo('home');
}

function loginWithGoogle() {
    const email = prompt('Enter your Google email to simulate login:');
    if (email) {
        state.isLoggedIn = true;
        state.userEmail = email;
        state.userName = email.split('@')[0].toUpperCase();
        applyAuthState();
        showToast('Google Login successful!', 'success');
        navigateTo('home');
    }
}

function logoutUser() {
    state.isLoggedIn = false;
    state.userName = '';
    state.userEmail = '';
    applyAuthState();
    showToast('Logged out successfully.');
    navigateTo('overview');
}

function saveProfile() {
    const newName = document.getElementById('prof-name').value.trim();
    const newEmail = document.getElementById('prof-email').value.trim();
    const newPhone = document.getElementById('prof-phone').value.trim();
    const newGoal = document.getElementById('prof-goal').value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!newName) {
        showToast('Name cannot be empty', 'danger');
        return;
    }
    if (!emailPattern.test(newEmail)) {
        showToast('Please enter a valid email address', 'danger');
        return;
    }

    // Update Global State
    state.userName = newName;
    state.userEmail = newEmail;
    state.userPhone = newPhone;
    state.userGoal = newGoal;

    // Save to DB
    localStorage.setItem('studyHubUser', JSON.stringify({
        name: state.userName,
        email: state.userEmail,
        password: state.userPassword,
        phone: state.userPhone,
        goal: state.userGoal
    }));

    applyAuthState();
    showToast('Profile updated successfully!', 'success');
}


// ==========================================
// 6. LIBRARIES & DETAILS
// ==========================================
function renderLibraries() {
    const list = document.getElementById('library-list');
    list.innerHTML = '';
    libraries.forEach(l => {
        const card = document.createElement('div');
        card.className = 'card animate-fade';
        card.innerHTML = `
        <img class="card-image" src="${l.image}" alt="${l.name}" />
        <div style="padding:1rem;">
          <div style="display:flex; justify-content:space-between;">
            <h3 style="margin-bottom:0.25rem;">${l.name}</h3>
            <span class="badge ${l.availableSeats > 0 ? 'badge-success' : ''}" style="${l.availableSeats === 0 ? 'background:var(--danger);color:white;' : ''}">
              ${l.availableSeats} seats
            </span>
          </div>
          <p style="font-size:0.8rem; color:var(--text-secondary); margin-bottom:1rem;">📍 ${l.location}</p>
          <button class="btn btn-primary btn-block" onclick="openLibraryDetails(${l.id})">View Details</button>
        </div>
      `;
        list.appendChild(card);
    });
}

function switchDetailTab(tabId) {
    document.querySelectorAll('.detail-tab').forEach(t => t.classList.add('hidden'));
    document.querySelectorAll('#page-details .chip').forEach(c => c.classList.remove('active'));

    document.getElementById('tab-' + tabId).classList.remove('hidden');
    document.getElementById('btn-tab-' + tabId).classList.add('active');
}

function openLibraryDetails(id) {
    state.selectedLibraryId = id;
    const l = libraries.find(x => x.id === id);
    if (!l) return;

    document.getElementById('detail-image').src = l.image;
    document.getElementById('detail-name').textContent = l.name;
    document.getElementById('detail-location').textContent = `📍 ${l.location}`;
    document.getElementById('detail-rating').textContent = l.rating;

    // Overview
    document.getElementById('overview-seats').textContent = l.seats;
    document.getElementById('overview-available').textContent = l.availableSeats;
    document.getElementById('overview-booked').textContent = l.bookedSeats;

    // Facilities
    document.getElementById('fac-ac').textContent = l.facilities.ac;
    document.getElementById('fac-ro').textContent = l.facilities.ro;
    document.getElementById('fac-wifi').textContent = l.facilities.wifi;
    document.getElementById('fac-cafe').textContent = l.facilities.cafe;
    document.getElementById('fac-clean').textContent = l.facilities.clean;

    // Pricing
    document.getElementById('price-1h').textContent = `₹${l.pricing.oneHr}`;
    document.getElementById('price-2h').textContent = `₹${l.pricing.twoHr}`;
    document.getElementById('price-half').textContent = `₹${l.pricing.halfDay}`;
    document.getElementById('price-full').textContent = `₹${l.pricing.fullDay}`;
    document.getElementById('price-night').textContent = `₹${l.pricing.night}`;
    document.getElementById('price-week').textContent = `₹${l.pricing.weekly}`;
    document.getElementById('price-month').textContent = `₹${l.pricing.monthly}`;

    switchDetailTab('overview');
    renderReviews(id);
    navigateTo('details');
}


// ==========================================
// 7. SEATS, PRICING & RAZORPAY SIMULATION
// ==========================================
function renderSeatMap() {
    const grid = document.getElementById('seat-grid');
    grid.innerHTML = '';
    grid.style.gridTemplateColumns = 'repeat(6, 1fr)';

    const l = libraries.find(x => x.id === state.selectedLibraryId);
    if (!l) return;

    const mapUrl = `https://www.google.com/maps?q=${l.mapQuery}&output=embed`;
    document.getElementById('booking-map-frame').src = mapUrl;
    document.getElementById('maps-dir-link').href = `https://www.google.com/maps/dir/?api=1&destination=${l.mapQuery}`;

    // Generate random seats dynamically based on library data
    for (let i = 1; i <= 24; i++) {
        const seat = document.createElement('div');
        const isBooked = Math.random() < 0.4; // 40% chance of being booked
        seat.className = 'seat';
        seat.textContent = "A" + i;
        seat.dataset.status = isBooked ? 'booked' : 'available';

        if (!isBooked) {
            seat.onclick = () => {
                document.querySelectorAll('.seat[data-status="selected"]').forEach(s => s.dataset.status = 'available');
                seat.dataset.status = 'selected';
                updatePrice();
            };
        }
        grid.appendChild(seat);
    }
    updatePrice();
}

function updatePrice() {
    const selected = document.querySelector('.seat[data-status="selected"]');
    const l = libraries.find(x => x.id === state.selectedLibraryId);
    const plan = document.getElementById('duration-select').value;

    if (!selected || !l) {
        document.getElementById('summary-base').textContent = "₹0";
        document.getElementById('summary-total').textContent = "₹0";
        return;
    }

    const base = l.pricing[plan];
    const gst = Math.round(base * 0.18);
    const total = base + gst;

    document.getElementById('summary-base').textContent = `₹${base}`;
    document.getElementById('summary-total').textContent = `₹${total}`;
}

function openPaymentForSeat() {
    const selected = document.querySelector('.seat[data-status="selected"]');
    if (!selected) { showToast('Please select a seat first.', 'danger'); return; }

    const totalText = document.getElementById('summary-total').textContent;
    const l = libraries.find(x => x.id === state.selectedLibraryId);

    state.pendingPayment = {
        type: "Seat Booking",
        libraryId: l.id,
        library: l.name,
        detail: "Seat " + selected.textContent,
        amount: totalText
    };

    document.getElementById('payment-desc').textContent = `Pay ${totalText} for ${l.name} (${selected.textContent})`;
    document.getElementById('payment-amount-display').textContent = totalText;
    document.getElementById('payment-qr').src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=studyhub@upi&am=${totalText.replace('₹', '')}`;
    document.getElementById('payment-modal').classList.add('active');
}

function openPaymentForBook(id) {
    const b = booksData.find(x => x.id === id);
    if (!b) return;

    const matchedLib = libraries.find(l => l.name === b.location);
    const libId = matchedLib ? matchedLib.id : null;

    const amount = `₹${b.price}`;
    state.pendingPayment = {
        type: "Book Rental",
        libraryId: libId,
        library: b.location,
        detail: b.title,
        amount: amount
    };

    document.getElementById('payment-desc').textContent = `Pay ${amount} to rent "${b.title}" from ${b.location}`;
    document.getElementById('payment-amount-display').textContent = amount;
    document.getElementById('payment-qr').src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=studyhub@upi&am=${b.price}`;
    document.getElementById('payment-modal').classList.add('active');
}

function simulatePaymentSuccess() {
    if (!state.pendingPayment) return;
    const passId = "QR-" + Math.floor(Math.random() * 100000);

    // Save Pass
    entryPasses.push({
        id: passId,
        libraryId: state.pendingPayment.libraryId,
        type: state.pendingPayment.type,
        library: state.pendingPayment.library,
        detail: state.pendingPayment.detail,
        date: new Date().toLocaleDateString()
    });
    localStorage.setItem('studyHubPasses', JSON.stringify(entryPasses));

    // Save Payment Record
    paymentHistory.push({
        id: "TXN" + Date.now(),
        desc: `${state.pendingPayment.type} - ${state.pendingPayment.detail}`,
        amount: state.pendingPayment.amount,
        date: new Date().toLocaleDateString()
    });
    localStorage.setItem('studyHubPayments', JSON.stringify(paymentHistory));

    closeModal('payment-modal');
    showToast('Payment successful! Pass generated.', 'success');
    navigateTo('entry');
}


// ==========================================
// 8. BOOK RENTALS
// ==========================================
function renderBooks() {
    const list = document.getElementById('book-list');
    list.innerHTML = '';
    booksData.forEach(b => {
        const card = document.createElement('div');
        card.className = 'card animate-fade';
        card.style.padding = '1rem';
        card.innerHTML = `
        <img class="book-cover" src="${b.cover}" alt="${b.title}" />
        <div style="font-weight:700; font-size:0.9rem;">${b.title}</div>
        <div style="font-size:0.8rem; color:var(--text-secondary); margin-bottom:0.25rem;">${b.author}</div>
        <div style="font-size:0.75rem; color:var(--primary); margin-bottom:0.75rem;">📍 Shop: ${b.location}</div>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <strong style="color:var(--text);">₹${b.price}</strong>
          <button class="btn btn-primary" style="padding:0.4rem 0.75rem;" onclick="openPaymentForBook(${b.id})">Rent QR</button>
        </div>
      `;
        list.appendChild(card);
    });
}


// ==========================================
// 9. ENTRY PASSES & REVIEWS
// ==========================================
function renderEntryPasses() {
    const container = document.getElementById('entry-pass-history');
    container.innerHTML = '';

    if (entryPasses.length === 0) {
        container.innerHTML = '<div class="card" style="padding:1rem;"><p style="color:var(--text-secondary);">No active passes. Rent a book or book a seat via Razorpay!</p></div>';
        return;
    }

    entryPasses.slice().reverse().forEach(pass => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.padding = '1.5rem';
        card.style.marginBottom = '1rem';
        card.style.textAlign = 'center';

        const passQrImg = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${pass.id}`;
        
        // Show Review button if pass is linked to a library
        const reviewBtn = pass.libraryId
            ? `<button class="btn btn-outline btn-block" style="margin-top: 1rem;" onclick="openReviewModal(${pass.libraryId}, '${pass.library}')">Rate & Review</button>`
            : ``;

        card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; text-align: left;">
          <h3 style="color:var(--primary); margin:0;">${pass.type}</h3>
          <span class="badge badge-success">Active Pass</span>
        </div>
        <div style="margin-top:0.5rem; font-size:0.9rem; text-align: left;">
          <strong>${pass.library}</strong><br>
          <span style="color:var(--text-secondary);">${pass.detail} • ${pass.date}</span>
        </div>
        <div style="margin-top:1.5rem;">
           <p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0.5rem;">Scan for Entry</p>
           <img src="${passQrImg}" alt="Entry Pass QR" style="width: 150px; height: 150px; border-radius: 10px; border: 2px solid var(--border);" />
        </div>
        <div style="margin-top:1rem; padding:0.5rem; background:var(--surface-2); text-align:center; font-weight:bold; letter-spacing: 2px;">
          ${pass.id}
        </div>
        ${reviewBtn}
      `;
        container.appendChild(card);
    });
}

// Review Logic
document.querySelectorAll('.star-rating').forEach(star => {
    star.onclick = function () {
        let val = parseInt(this.getAttribute('data-value'));
        state.selectedStars = val;
        document.querySelectorAll('.star-rating').forEach(s => {
            s.classList.toggle('selected', parseInt(s.getAttribute('data-value')) <= val);
        });
    };
});

function openReviewModal(libId, libName) {
    if (!libId) { showToast('Cannot review this location.', 'danger'); return; }
    state.reviewTargetId = libId;
    document.getElementById('review-desc').textContent = `How was your experience at ${libName}?`;
    document.getElementById('review-text').value = '';

    state.selectedStars = 5;
    document.querySelectorAll('.star-rating').forEach(s => s.classList.add('selected'));

    document.getElementById('review-modal').classList.add('active');
}

function submitReview() {
    const text = document.getElementById('review-text').value.trim();
    if (!text) { showToast('Please write something.', 'danger'); return; }

    const l = libraries.find(x => x.id === state.reviewTargetId);
    if (l) {
        l.reviews.push({
            user: state.userName || "Student",
            rating: state.selectedStars,
            text: text,
            date: new Date().toLocaleDateString()
        });
        // Save back to local storage
        localStorage.setItem(`reviews_${l.id}`, JSON.stringify(l.reviews));
    }

    closeModal('review-modal');
    showToast('Thank you! Review saved to database.', 'success');
}

function renderReviews(libId) {
    const l = libraries.find(x => x.id === libId);
    const container = document.getElementById('reviews-container');
    container.innerHTML = '';

    if (l.reviews.length === 0) {
        container.innerHTML = '<p style="color:var(--text-secondary);">No reviews yet.</p>';
        return;
    }

    l.reviews.slice().reverse().forEach(r => {
        let stars = '';
        for (let i = 1; i <= 5; i++) stars += i <= r.rating ? '⭐' : '☆';

        container.innerHTML += `
          <div class="review-card">
              <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
                  <strong>${r.user}</strong>
                  <span style="font-size: 0.8rem; color:var(--text-secondary);">${r.date}</span>
              </div>
              <div style="margin-bottom:0.5rem;">${stars}</div>
              <p style="font-size:0.9rem; color:var(--text-secondary);">${r.text}</p>
          </div>
      `;
    });
}


// ==========================================
// 10. SETTINGS / PAYMENT HISTORY
// ==========================================
function renderPaymentHistory() {
    const list = document.getElementById('payment-history-list');
    list.innerHTML = '';
    
    if (paymentHistory.length === 0) {
        list.innerHTML = '<p style="color:var(--text-secondary); font-size: 0.9rem;">No recent payments.</p>';
        return;
    }
    
    paymentHistory.slice().reverse().forEach(txn => {
        const el = document.createElement('div');
        el.className = 'list-item';
        el.innerHTML = `
          <div>
              <div style="font-weight: 600; font-size: 0.9rem;">${txn.desc}</div>
              <div style="font-size: 0.8rem; color: var(--text-secondary);">${txn.date} | ${txn.id}</div>
          </div>
          <div style="font-weight: bold; color: var(--success);">${txn.amount}</div>
      `;
        list.appendChild(el);
    });
}

// --- 11. INITIALIZATION ---
window.addEventListener('DOMContentLoaded', () => {
    // 1. Restore user session if it exists
    const storedUser = JSON.parse(localStorage.getItem('studyHubUser'));
    if(storedUser && storedUser.email) {
        state.isLoggedIn = true;
        state.userName = storedUser.name;
        state.userEmail = storedUser.email;
        state.userPassword = storedUser.password;
    }
    
    // 2. Fetch real data from your Python backend instead of using the dummy 'libraries' array
    fetch('http://127.0.0.1:5000/api/libraries')
        .then(response => response.json())
        .then(data => {
            // This replaces the old renderLibraries() call
            // We pass the REAL data from Python to your render function
            renderLibraries(data); 
        })
        .catch(err => {
            console.error("Backend not connected:", err);
            showToast("Backend not connected! Using offline mode.", "danger");
            renderLibraries(); // Fallback to local dummy data if backend is off
        });
    
    applyAuthState();
    window.addEventListener('resize', applyAuthState);
});