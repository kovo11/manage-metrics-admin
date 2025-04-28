
import React from "react";
import { Link } from "react-router-dom";
import UserHomePage from "@/components/UserHomePage";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">My Platform</h1>
        <div className="flex gap-4">
          <Button variant="outline" asChild>
            <Link to="/admin/login">Admin Login</Link>
          </Button>
          <Button asChild>
            <Link to="/admin/dashboard">Dashboard</Link>
          </Button>
        </div>
      </header>
      
      <main>
        <UserHomePage />
      </main>
      
      <footer className="bg-gray-100 py-6 px-6 mt-8">
        <div className="container mx-auto text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} My Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
