import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="bg-[#FAF3E0] text-gray-800 max-w-screen-2xl px-3 mx-auto flex justify-between items-center py-2 mt-4">
      <div className="max-w-screen-2xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Fomato</h2>
          <p className="mt-2 text-gray-600">Order food anytime & anywhere.</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <Link to="/" className="hover:text-[#CB925E]">Home</Link>
            </li>

            <li>
              <Link to="/profile" className="hover:text-[#CB925E]">Profile</Link>
            </li>

            <li>
              <Link to="/order/status" className="hover:text-[#CB925E]">MyOrders</Link>
            </li>

          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900">Contact Us</h3>
          <p className="mt-2 text-gray-600">Email: support@fomato.com</p>
          <p className="text-gray-600">Phone: +91 98765 43210</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-700 hover:text-[#CB925E]">
              <i className="fab fa-facebook text-xl"></i>
            </a>
            <a href="#" className="text-gray-700 hover:text-[#CB925E]">
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a href="#" className="text-gray-700 hover:text-[#CB925E]">
              <i className="fab fa-instagram text-xl"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 border-t pt-4 text-gray-600">
        &copy; 2025 Fomato. All rights reserved.
      </div>
    </footer>

  )
}

export default Footer