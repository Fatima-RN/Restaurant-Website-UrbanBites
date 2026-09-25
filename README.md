# The Urban Bites

A modern, responsive, and interactive restaurant web application built with HTML, CSS, and JavaScript. The Urban Bites provides a digital dining experience featuring dynamic menu management, an interactive shopping cart drawer, user authentication simulation, table reservations, and customer testimonials.

## Features

- **Interactive Hero Slider & Testimonials:** Dynamic carousels highlighting signature dishes and real-time customer reviews.
- **Dynamic Menu & Product Catalog:** Browse breakfast, lunch, and dinner selections with detailed product views and pricing.
- **Interactive Shopping Cart Drawer:** 
  - Real-time cart badge counter.
  - Adjust quantities or remove items seamlessly.
  - Persistent data storage via browser `localStorage`.
- **User Authentication Simulation:** Secure signup and login workflows with local validation checks and personalized user avatars.
- **Table Reservation & Contact System:** Interactive forms featuring input validation and success confirmations.
- **Fully Responsive Design:** Optimized layouts for mobile, tablet, and desktop viewports with a dark-accented aesthetic.

## Tech Stack

- **Markup:** HTML5
- **Styling:** CSS3 (Flexbox, CSS Grid, custom properties, media queries)
- **Scripting:** JavaScript (ES6+, DOM manipulation, LocalStorage API)
- **Version Control & Deployment:** Git, GitHub, Vercel

## Live Demo

Explore the live application here: [The Urban Bites Live Website](https://urban-bites-sigma.vercel.app/)

## Getting Started Locally

To run this project locally on your machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/urban-bites.git](https://github.com/YOUR_USERNAME/urban-bites.git)

2. **Navigate to the project directory:**
   ```bash
   cd urban-bites

3. **Open the project:**
   - Open `index.html` directly in your web browser, or use a local development server like Live Server in Visual Studio Code.

  ## How to Push Updates to GitHub

  Whenever you make changes to your project, run these commands in your terminal to update your GitHub repository:

  ```bash
  git add .
  git commit -m "Update: fixed bugs and improved features"
  git push origin main
  ```

## Project Structure

```text
urban-bites/
│
├── index.html         # Landing page (Hero, Featured Menu, Testimonials)
├── menu.html          # Full restaurant menu catalog
├── about.html         # About Us page
├── contact.html       # Contact form & location details
├── login.html         # User login portal
├── signup.html        # New account registration
├── product-detail.html# Individual item view & custom quantity selector
│
├── style.css          # Global styles, layout, and responsive media queries
├── app.js             # Core script logic (Cart, Sliders, Auth, Form validations)
└── productsdata.js    # Data source containing menu items, prices, and descriptions
```
