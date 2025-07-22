# Full-Stack MERN App (Next.js + MongoDB)

A modern full-stack application built with Next.js (App Router), MongoDB, and NextAuth for authentication. Includes user registration, login, role-based access (admin/user), and a beautiful, responsive UI.

---

## 🚀 Features
- User registration and login (with hashed passwords)
- NextAuth authentication (credentials & Google OAuth)
- Role-based access: `admin` and `user`
- Admin dashboard: view and edit all users, change user roles
- Audit log viewing (for admin)
- Responsive, modern UI with Tailwind CSS

---

## 🛠️ Getting Started

### 1. Clone the repository
```bash
# Clone and enter the project directory
 git clone <your-repo-url>
 cd full-stack-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env.local` file in the root of `full-stack-app`:

```
MONGODB_URI=<your-mongodb-connection-string>
NEXTAUTH_SECRET=<random-string>
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
```
- `MONGODB_URI`: Your MongoDB connection string (Atlas or local)
- `NEXTAUTH_SECRET`: Any random string (for JWT signing)
- `NEXTAUTH_URL`: Your app URL (for local dev, use `http://localhost:3000`)
- `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`: (Optional) For Google OAuth

### 4. Run the development server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 👤 User Features
- Register a new account (`/register`)
- Login with email/password or Google
- View a personalized home page after login
- Logout securely

## 🛡️ Admin Features
- Only users with `role: "admin"` can access `/dashboard`
- View all users in the system
- Edit any user's role (admin/user) and save changes to the database
- View audit logs (if implemented)

## 🗄️ Database Structure
- **users** collection:
  - `name` (string)
  - `email` (string, unique)
  - `password` (hashed string)
  - `role` ("admin" or "user")
  - `createdAt` (date)
- **audit_logs** collection (optional):
  - `actorId`, `targetUserId`, `action`, `timestamp`, `details`

## 🔐 Authentication & Authorization
- Uses [NextAuth.js](https://next-auth.js.org/) for authentication
- Credentials provider (email/password) and Google OAuth
- Role is stored in the JWT/session and checked for admin routes
- Only admins can access `/dashboard` and admin APIs

## 🖌️ UI/UX
- Built with Tailwind CSS for a modern, responsive look
- Glassy navbar, card-based layouts, and smooth transitions
- Mobile-friendly

## 📝 Customization
- Update theme/colors in `globals.css` or Tailwind config
- Add more roles or features as needed

## 🧑‍💻 Development
- All main logic is in `src/app` (App Router)
- API routes in `src/app/api`
- MongoDB connection in `src/lib/mongodb.ts`
- Auth config in `src/app/api/auth/[...nextauth]/route.ts`

## 🆘 Troubleshooting
- If you can't access admin features, make sure your user in the `users` collection has `role: "admin"` (case-insensitive)
- If you change a user's role in the DB, log out and log back in to refresh your session
- Check your environment variables if you get connection/auth errors

## 📦 Deployment
- Ready for deployment on [Vercel](https://vercel.com/) or any Node.js host
- Set environment variables in your deployment platform

---

## 📚 Learn More
- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Tailwind CSS](https://tailwindcss.com/)

---

Feel free to fork, customize, and build on top of this project!
