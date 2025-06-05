# EduTech Job Portal

A modern job portal web application built with **React**, **Vite**, and **Tailwind CSS**. EduTech connects job seekers, employers, and educational institutions, offering features like job listings, applications, company management, and AI-driven career insights.

## Features

- User authentication (candidates, companies, admins)
- Browse and search jobs by category, company, or keyword
- Post and manage job listings (for employers)
- Apply for jobs and track applications (for candidates)
- Company and admin management dashboards
- Skill assessments and upskilling courses
- Responsive UI with animated transitions
- Toast notifications for user feedback

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Framer Motion, Swiper
- **State Management:** React Context API
- **HTTP Client:** Axios ([`src/api/apiClient.js`](src/api/apiClient.js))
- **Backend:** Node.js/Express (API endpoints expected at `http://localhost:5000/api`)
- **Other:** React Router, React Toastify

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd EDUTECH
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Configure environment:**
   - By default, API requests are sent to `http://localhost:5000/api`. Change the `baseURL` in [`src/api/apiClient.js`](src/api/apiClient.js) if needed.

4. **Start the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser:**
   - Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## Project Structure

```
EDUTECH/
├── public/                # Static assets
├── src/
│   ├── api/               # Axios client and token service
│   ├── assets/            # Images and icons
│   ├── components/        # Reusable UI components
│   ├── context/           # React context providers
│   ├── pages/             # Main route pages (Home, About, Register, etc.)
│   ├── services/          # Business logic/services
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles (Tailwind)
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build

## Customization

- **API URL:** Change the `baseURL` in [`src/api/apiClient.js`](src/api/apiClient.js) to point to your backend.
- **Branding:** Update images in [`src/assets/`](src/assets/) and logo in [`src/assets/logos/`](src/assets/logos/).

## License

This project is for educational/demo purposes. Please contact the author for production/commercial use.

---

Made with ❤️ by the Infoziant team.