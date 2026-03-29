# 🍼 BabyBliss - Full Stack Baby Products Website

React (Frontend) + Django REST Framework (Backend)

---

## 📁 Folder Structure

```
baby-products/
├── frontend/                  ← React App (Port 3000)
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js + .css
│   │   │   └── ProductCard.js + .css
│   │   ├── context/
│   │   │   └── AuthContext.js       ← Login, Cart state
│   │   ├── pages/
│   │   │   ├── Home.js + .css
│   │   │   ├── Products.js + .css
│   │   │   ├── ProductDetail.js + .css
│   │   │   ├── Cart.js + .css
│   │   │   ├── Checkout.js + .css
│   │   │   ├── Login.js + Auth.css
│   │   │   ├── Register.js
│   │   │   └── Profile.js + .css
│   │   ├── services/
│   │   │   └── api.js               ← Axios instance
│   │   ├── App.js                   ← Routes
│   │   └── index.js
│   └── package.json
│
└── backend/                   ← Django API (Port 8000)
    ├── baby_api/
    │   ├── settings.py
    │   ├── urls.py
    │   └── wsgi.py
    ├── products/              ← Products app
    │   ├── models.py
    │   ├── serializers.py
    │   ├── views.py
    │   ├── urls.py
    │   └── admin.py
    ├── users/                 ← Custom Auth app
    │   ├── models.py
    │   ├── serializers.py
    │   ├── views.py
    │   ├── urls.py
    │   └── admin.py
    ├── orders/                ← Orders app
    │   ├── models.py
    │   ├── serializers.py
    │   ├── views.py
    │   ├── urls.py
    │   └── admin.py
    ├── seed_data.py           ← Sample product data
    ├── manage.py
    ├── requirements.txt
    └── .env.example
```

---

## 🚀 Step-by-Step Setup

### Step 1 — Clone / Open the project

```bash
cd baby-products
```

---

### Step 2 — Backend Setup (Django)

```bash
# Go into backend folder
cd backend

# Create virtual environment
python -m venv venv

# Activate it
# On Mac/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install all packages
pip install -r requirements.txt

# Copy env file
cp .env.example .env

# Run database migrations
python manage.py makemigrations users
python manage.py makemigrations products
python manage.py makemigrations orders
python manage.py migrate

# Create admin user
python manage.py createsuperuser
# (Enter email, name, password when prompted)

# Load sample products (20 products across 7 categories)
python manage.py shell < seed_data.py

# Start Django server
python manage.py runserver
# Runs at: http://localhost:8000
```

✅ Backend is ready!  
- API: `http://localhost:8000/api/`  
- Admin panel: `http://localhost:8000/admin/`

---

### Step 3 — Frontend Setup (React)

Open a **new terminal tab**:

```bash
# Go into frontend folder
cd frontend

# Install packages
npm install

# Start React app
npm start
# Runs at: http://localhost:3000
```

✅ Frontend is ready at `http://localhost:3000`

---

## 🔗 API Endpoints

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products/` | List all products |
| GET | `/api/products/?category=Toys` | Filter by category |
| GET | `/api/products/?search=bottle` | Search products |
| GET | `/api/products/?min_price=100&max_price=500` | Filter by price |
| GET | `/api/products/?ordering=-price` | Sort by price |
| GET | `/api/products/?featured=true` | Featured products |
| GET | `/api/products/{id}/` | Product detail |
| POST | `/api/products/{id}/add_review/` | Add review (auth) |

### Users / Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register/` | Register new user |
| POST | `/api/users/login/` | Login → returns token |
| POST | `/api/users/logout/` | Logout (auth) |
| GET | `/api/users/me/` | Get my profile (auth) |
| PATCH | `/api/users/me/` | Update profile (auth) |
| GET | `/api/users/addresses/` | My saved addresses (auth) |
| POST | `/api/users/addresses/` | Add address (auth) |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders/` | Place new order (auth) |
| GET | `/api/orders/my_orders/` | My order history (auth) |
| GET | `/api/orders/{id}/` | Order detail (auth) |
| PATCH | `/api/orders/{id}/cancel/` | Cancel order (auth) |

---

## 🗂️ Pages & Features

| Page | URL | Features |
|------|-----|----------|
| Home | `/` | Hero, categories, featured products, banner |
| Products | `/products` | Filter, search, sort, sidebar |
| Product Detail | `/products/:id` | Images, rating, add to cart, reviews |
| Cart | `/cart` | Quantity controls, price breakdown |
| Checkout | `/checkout` | 3-step: address → payment → review |
| Login | `/login` | Email + password, token auth |
| Register | `/register` | Name, email, password, confirm |
| Profile | `/profile` | Order history, profile info, addresses |

---

## 🛒 How Cart Works

Cart is stored in **localStorage** (no login required to add to cart).  
On checkout, user must be logged in.

```
Add to cart → AuthContext → localStorage → Cart page → Checkout → POST /api/orders/
```

---

## 🔐 How Authentication Works

1. User registers/logs in → Django returns a **Token**
2. Token is saved in `localStorage`
3. `api.js` automatically attaches token to every request:
   ```
   Authorization: Token abc123xyz...
   ```
4. On 401 error → user is redirected to `/login`

---

## 🛠️ Tech Stack

### Frontend
- **React 18** — UI framework
- **React Router v6** — Client-side routing
- **Axios** — HTTP requests
- **React Hot Toast** — Notifications
- **Lucide React** — Icons
- **Google Fonts** — Playfair Display + DM Sans

### Backend
- **Django 4.2** — Web framework
- **Django REST Framework** — API
- **django-cors-headers** — CORS for React
- **django-filter** — Product filtering
- **djangorestframework-simplejwt** — JWT (optional)
- **Pillow** — Image handling
- **python-decouple** — Environment variables
- **SQLite** (dev) / **PostgreSQL** (production)

---

## 🌐 Production Deployment

### Frontend → Vercel / Netlify
```bash
cd frontend
npm run build
# Upload the `build/` folder to Vercel or Netlify
```

### Backend → Railway / Render / Heroku
```bash
# Set these environment variables in your host:
SECRET_KEY=your-long-random-secret-key
DEBUG=False
DATABASE_URL=postgres://...
ALLOWED_HOSTS=yourdomain.com
CORS_ORIGINS=https://yourfrontend.com

# Collect static files
python manage.py collectstatic
```

---

## 🐛 Common Issues & Fixes

| Problem | Fix |
|---------|-----|
| CORS error | Make sure `CORS_ORIGINS=http://localhost:3000` in `.env` |
| "Module not found" | Run `npm install` in frontend folder |
| Migration error | Run `makemigrations users` before `migrate` |
| Token not working | Check `Authorization: Token <token>` header format |
| Images not loading | Run `python manage.py collectstatic` |
| Port 8000 in use | `python manage.py runserver 8001` and update proxy |

---

## 📸 Admin Panel

Go to `http://localhost:8000/admin/` after creating superuser.

You can:
- ➕ Add / edit products with images
- 📦 View and update order status
- 👥 Manage users
- 🏷️ Create categories

---

## 💡 Next Features to Add

- [ ] Razorpay / Stripe payment integration
- [ ] Email order confirmation (Django email)
- [ ] Wishlist functionality
- [ ] Product image gallery upload
- [ ] Push notifications
- [ ] Admin dashboard with charts
- [ ] Coupon / discount codes
- [ ] Product recommendations

---

Made with ❤️ for BabyBliss
