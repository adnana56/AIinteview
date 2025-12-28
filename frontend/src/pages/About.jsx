import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import AOS from 'aos';
import 'aos/dist/aos.css';
import QuickLinksPage from '../components/QuickLinks';

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />

      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-32 pb-16">
        <div className="text-center mb-16" data-aos="fade-up">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6">
            About
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent"> iQup</span>
          </h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
            Practice your interviews with real-time voice Q&A, smart feedback, and resume-driven questions
          </p>
        </div>

        {/* Goals Section */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12" data-aos="fade-up">
            Our Core Goals
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Goal 1 - Rose to Pink */}
            <div className="glass p-10 rounded-3xl hover-lift smooth-transition" data-aos="fade-up" data-aos-delay="100">
              <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Realistic Interview Simulation</h3>
              <p className="text-lg text-gray-600 mb-4">
                Engage in a fully simulated voice-driven interview experience, tailored to your resume.
              </p>
              <p className="text-base text-gray-500">
                The AI uses your resume to ask personalized questions, mimicking real-time recruiter behavior.
              </p>
            </div>

            {/* Goal 2 - Violet to Purple */}
            <div className="glass p-10 rounded-3xl hover-lift smooth-transition" data-aos="fade-up" data-aos-delay="200">
              <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Smart Feedback & Scoring</h3>
              <p className="text-lg text-gray-600 mb-4">
                Get detailed AI-generated feedback on each answer and overall performance.
              </p>
              <p className="text-base text-gray-500">
                Receive real-time analytics on clarity, coherence, and relevance with actionable suggestions.
              </p>
            </div>

            {/* Goal 3 - Emerald to Teal */}
            <div className="glass p-10 rounded-3xl hover-lift smooth-transition" data-aos="fade-up" data-aos-delay="300">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Privacy-First Design</h3>
              <p className="text-lg text-gray-600 mb-4">
                All data including resumes and audio recordings are deleted after the session.
              </p>
              <p className="text-base text-gray-500">
                Your session runs on secured encrypted APIs ensuring complete GDPR compliance.
              </p>
            </div>
          </div>
        </div>
      </div>

      <QuickLinksPage />
    </div>
  );
};

export default About;
