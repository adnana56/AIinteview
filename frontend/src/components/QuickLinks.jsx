import { Link } from 'react-router-dom';

export default function QuickLinksPage() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Quick Links</h2>
          <p className="text-xl text-gray-600">Navigate to key sections of the platform</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <LinkCard to="/" title="Home" gradient="from-violet-500 to-purple-600" />
          <LinkCard to="/practice" title="Practice" gradient="from-orange-500 to-rose-600" />
          <LinkCard to="/about" title="About" gradient="from-cyan-500 to-blue-600" />
        </div>

        <p className="text-center text-gray-500 text-lg mt-12">
          All Rights Reserved • Designed by{' '}
          <a
            href="https://www.linkedin.com/in/mohammedadnanres/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent font-semibold"
          >
            Adnan
          </a>
        </p>
      </div>
    </div>
  );
}

function LinkCard({ to, title, gradient }) {
  return (
    <Link to={to}>
      <div className="glass p-8 rounded-2xl hover-lift smooth-transition text-center group">
        <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center mx-auto mb-4`}>
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
        <span className="text-gray-700 font-semibold text-lg">{title}</span>
      </div>
    </Link>
  );
}
