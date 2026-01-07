import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import QuickLinksPage from '../components/QuickLinks';

export default function UploadPage() {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('resume', resume);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/resume/upload`, formData, {
        withCredentials: true,
      });

      if (res.data.sessionId) {
        localStorage.setItem('sessionId', res.data.sessionId);
        navigate('/interview');
      }
    } catch (err) {
      console.error('Upload failed:', err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />

      <div className="container mx-auto px-6 pt-32 pb-16">
        <div className="max-w-2xl mx-auto">
          <div className="glass-strong p-12 rounded-3xl text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>

            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Upload Your Resume
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Upload your PDF resume to begin your AI-powered interview preparation
            </p>

            <div className="mb-10">
              <label className="glass px-8 py-5 rounded-2xl cursor-pointer hover-lift smooth-transition inline-block">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setResume(e.target.files[0])}
                  className="hidden"
                />
                <div className="flex items-center gap-4">
                  <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-gray-700 font-medium text-lg">
                    {resume ? resume.name : 'Choose PDF File'}
                  </span>
                </div>
              </label>
            </div>

            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-3xl blur-xl opacity-50"></div>
              <button
                onClick={handleUpload}
                disabled={!resume || loading}
                className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white px-10 py-5 rounded-3xl font-bold text-xl hover-lift smooth-transition disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl flex items-center gap-3"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating first question...
                  </>
                ) : (
                  'Start Interview →'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <QuickLinksPage />
    </div>
  );
}
