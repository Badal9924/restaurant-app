import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function MainLayout() {
    return (
        <div className="min-h-screen">
            {/* Navbar */}
            <header>
                <Navbar />
            </header>

            {/* Content */}
            <div>
                <Outlet/>
            </div>

            {/* Footer */}
            <div>
                <Footer/>
            </div>
        </div>
    )
}

export default MainLayout