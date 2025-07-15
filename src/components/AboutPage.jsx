import { Link } from "react-router-dom";

export const AboutPage = () => (
  <div className="max-w-3xl mx-auto px-4 py-8 text-black">
    <h2 className="text-4xl font-luckiest mb-4">About This Project</h2>
    <p className="mb-4">
      Welcome to the Punk Pizza Ordering App — a hands-on, full-stack project I built to sharpen my React
      skills and push the limits of what I could design for a real-world business tool.
    </p>
    <p className="mb-4">
      This app isn’t just a code exercise. It's a working prototype built around clean user flows, a friendly
      interface, and practical business features like inventory tracking and sales reporting.
    </p>

    <h3 className="text-2xl font-bold mt-6">Key Features</h3>
    <ul className="list-disc ml-6 mb-4">
      <li>🔸 Dynamic Pizza Builder with live pricing</li>
      <li>🔸 Cart Sidebar with editable orders and notes</li>
      <li>🔸 Real-Time Inventory Dashboard based on sales</li>
      <li>🔸 Sales Reports with filters, sorting, and visual charts</li>
      <li>🔸 Stripe Payment Integration (test mode)</li>
    </ul>

    <h3 className="text-2xl font-bold mt-6">Want to Try It?</h3>
    <p className="mb-4">
      Go ahead — build a pizza, play with the cart, and leave me a little note in the "Special Note" box at
      checkout! (Think of it like signing a guestbook — tell me you stopped by 👋)
    </p>

    <h3 className="text-2xl font-bold mt-6">Built With</h3>
    <p>React, Tailwind CSS, JSON Server, Recharts, Day.js, Stripe</p>

    <h3 className="text-2xl font-bold mt-6">GitHub Repository</h3>
    <a
      href="https://www.github.com/kylemims"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline">
      Check out the code on GitHub
    </a>

    <h3 className="text-2xl font-bold mt-6">Let’s Connect!</h3>
    <div className="flex gap-4 mt-2">
      <a href="https://www.linkedin.com/in/kylemims-dev" target="_blank" rel="noopener noreferrer">
        <img src="src/assets/linked-red.svg" alt="LinkedIn" className="w-6 h-6" />
      </a>
      <a href="https://www.github.com/kylemims" target="_blank" rel="noopener noreferrer">
        <img src="src/assets/github-red.svg" alt="GitHub" className="w-6 h-6" />
      </a>
      <a href="mailto:kylemims.dev@gmail.com">
        <img src="src/assets/email-red.svg" alt="Email" className="w-6 h-6" />
      </a>
    </div>

    <div className="mt-6 text-center">
      <Link to="/" className="text-blue-600 underline">
        Back to Home
      </Link>
    </div>
  </div>
);
