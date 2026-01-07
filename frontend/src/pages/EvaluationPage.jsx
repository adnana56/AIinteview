import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import QuickLinksPage from '../components/QuickLinks';
import ReactMarkdown from 'react-markdown';

const EvaluationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const evaluation = location.state?.evaluation;

  useEffect(() => {
    if (!evaluation) {
      alert("No evaluation data found.");
      navigate('/interview');
    }
  }, [evaluation, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />

      <div className="container mx-auto px-6 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Header Card */}
          <div className="glass-strong p-8 rounded-3xl text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Interview Evaluation</h1>
            <p className="text-gray-600">Your detailed performance analysis</p>
          </div>

          {/* Evaluation Content */}
          {evaluation ? (
            <div className="glass-strong p-10 rounded-3xl">
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                <ReactMarkdown>
                  {evaluation}
                </ReactMarkdown>
              </div>

              <div className="mt-10 flex justify-center gap-4">
                <button
                  onClick={() => navigate('/')}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold hover-lift smooth-transition"
                >
                  Go to Home
                </button>
                <button
                  onClick={() => navigate('/upload')}
                  className="glass px-8 py-4 rounded-2xl text-gray-700 font-semibold hover-lift smooth-transition"
                >
                  Start New Interview
                </button>
              </div>
            </div>
          ) : (
            <div className="glass-strong p-12 rounded-3xl text-center">
              <p className="text-gray-600">Loading evaluation...</p>
            </div>
          )}
        </div>
      </div>

      <QuickLinksPage />
    </div>
  );
};

export default EvaluationPage;
