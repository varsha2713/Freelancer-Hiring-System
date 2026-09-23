import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import Portfolio from './pages/Portfolio';
import Contracts from './pages/Contracts';
import ContractDetailPage from './pages/ContractDetailPage';
import Payment from './pages/Payment';
import PostProject from './pages/PostProject';
import Proposal from './pages/Proposal';
import About from './pages/About';
import FreelancerDashboard from './pages/FreelancerDashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import HeroPage from './pages/HeroPage';
import Services from './pages/Services';
import Packages from './pages/Packages';
import './App.css';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HeroPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="/freelancer-dashboard" element={<FreelancerDashboard />} />
            <Route path="/company-dashboard" element={<CompanyDashboard />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contracts" element={<Contracts />} />
            <Route path="/contracts/:id" element={<ContractDetailPage />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/post-project" element={<PostProject />} />
            <Route path="/proposal" element={<Proposal />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/packages" element={<Packages />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;
