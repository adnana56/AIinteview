import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import QuickLinksPage from '../components/QuickLinks';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />

      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-24 pb-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6">
            AI-Powered Interview
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent"> Preparation</span>
          </h1>
          <p className="text-2xl text-gray-600 max-w-2xl mx-auto mb-10">
            Practice with AI, get instant feedback, and ace your next interview with confidence
          </p>

          {/* Large CTA Button with Premium Gradient */}
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-3xl blur-xl opacity-50"></div>
            <button
              onClick={() => navigate('/upload')}
              className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white px-12 py-6 rounded-3xl text-xl font-bold hover-lift smooth-transition shadow-2xl"
            >
              Start Your Interview →
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Feature 1 - Cyan to Blue */}
          <div className="glass p-10 rounded-3xl hover-lift smooth-transition">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Upload Resume</h3>
            <p className="text-lg text-gray-600">Upload your resume and let AI analyze your skills and experience</p>
          </div>

          {/* Feature 2 - Purple to Pink */}
          <div className="glass p-10 rounded-3xl hover-lift smooth-transition">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">AI Interview</h3>
            <p className="text-lg text-gray-600">Answer personalized questions tailored to your background</p>
          </div>

          {/* Feature 3 - Emerald to Teal */}
          <div className="glass p-10 rounded-3xl hover-lift smooth-transition">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Get Feedback</h3>
            <p className="text-lg text-gray-600">Receive detailed analysis and improvement suggestions</p>
          </div>
        </div>

        {/* About Section */}
        <div className="glass-strong p-12 rounded-3xl mt-16 max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Our Mission</h2>
          <p className="text-xl text-gray-700 leading-relaxed text-center">
            <span className="font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">iQup</span> revolutionizes interview preparation using artificial intelligence.
            We provide a realistic and intelligent mock interview platform that helps individuals gain confidence,
            improve communication skills, and get personalized feedback — all in a stress-free and accessible environment.
          </p>
        </div>
      </div>

      <QuickLinksPage />
    </div>
  );
}
