import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Icon from '../assets/logo-christmas.png'

const Layout = () => {
    return (
        <div className=" bg-amber-50">
            <nav className="bg-white shadow-sm sticky top-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Link to="/" className="font-bold text-xl text-gray-800">
                                {/* Desktop */}
                                <img className="hidden lg:block h-9 w-auto" src={Icon} alt="Logo Icon" />
                                {/* Mobile */}
                                <img
                                    className="lg:hidden h-9 w-auto"
                                    src="https://www.codingal.com/resources/wp-content/uploads/2021/03/Codingal-logo-with-text.svg"
                                    alt="Codingal Logo"
                                />
                            </Link>
                        </div>
                        <div className="flex space-x-4">
                            <Link to="/posts" className="text-gray-600 hover:text-gray-800">
                                Posts
                            </Link>
                            <Link to="/passengers" className="text-gray-600 hover:text-gray-800">
                                Passengers
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="w-full mx-auto pt-2 pb-14  sm:px-6 lg:px-8 bg-amber-50">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout

