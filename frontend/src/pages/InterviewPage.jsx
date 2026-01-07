import { useEffect, useState, useRef } from 'react';
import WebcamFeed from '../components/WebcamFeed';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import QuickLinksPage from '../components/QuickLinks';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition || null;

function InterviewPage() {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(true);
  const [webcamOn, setWebcamOn] = useState(true);
  const [recording, setRecording] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [interviewCompleted, setInterviewCompleted] = useState(false);
  const [evaluationReady, setEvaluationReady] = useState(true);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recognitionRef = useRef(null);

  const sessionId = localStorage.getItem('sessionId');
  const navigate = useNavigate();

  const fetchQuestion = async () => {
    if (!sessionId) return;

    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/question/${sessionId}`, {
        withCredentials: true,
      });
      if (res.data.question) {
        setQuestion(res.data.question);
        setInterviewCompleted(res.data.question === 'Interview completed');
      } else {
        setQuestion(res.data.message);
      }
      setRecognizedText('');
      setRecording(false);
    } catch (error) {
      console.error('Error fetching question:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  const sendAnswerToBackend = async (text) => {
    if (!sessionId) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/question/${sessionId}`,
        { answer: text },
        { withCredentials: true }
      );
      console.log('Answer saved:', text);
      fetchQuestion();
    } catch (error) {
      console.error('Error sending answer:', error);
    }
  };

  const startRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('Your browser does not support audio recording');
      return;
    }
    if (!SpeechRecognition) {
      alert('Your browser does not support Speech Recognition');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.start();

      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.interimResults = false;
      recognitionRef.current.maxAlternatives = 1;

      recognitionRef.current.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        setRecognizedText(speechResult);
        sendAnswerToBackend(speechResult);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
      };

      recognitionRef.current.start();

      setRecording(true);
    } catch (error) {
      console.error('Error accessing microphone or speech recognition:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
    if (recognitionRef.current) recognitionRef.current.stop();
    setRecording(false);
  };

  const toggleWebcam = () => setWebcamOn((prev) => !prev);

  const handleNextQuestion = () => fetchQuestion();

  const handleShowEvaluation = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/evaluate/${sessionId}`, {
        withCredentials: true,
      });
      if (res.data.evaluation) {
        navigate('/evaluation', { state: { evaluation: res.data.evaluation } });
      }
    } catch (error) {
      console.error('Error fetching evaluation:', error);
      alert('Failed to fetch evaluation result.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />

      <div className="container mx-auto px-6 pt-24 pb-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Webcam Section */}
          <div className="glass-strong p-8 rounded-3xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Video Feed</h3>
            {webcamOn ? (
              <div className="rounded-2xl overflow-hidden">
                <WebcamFeed />
              </div>
            ) : (
              <div className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center">
                <p className="text-gray-500">Camera is off</p>
              </div>
            )}
            <button
              onClick={toggleWebcam}
              className="mt-6 w-full glass px-6 py-3 rounded-xl text-gray-700 font-medium hover-lift smooth-transition"
            >
              {webcamOn ? 'Turn Off Camera' : 'Turn On Camera'}
            </button>
          </div>

          {/* Interview Section */}
          <div className="glass-strong p-8 rounded-3xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Interview Question</h3>
            <div className="glass p-6 rounded-2xl mb-6 min-h-[120px] flex items-center justify-center">
              {loading ? (
                <div className="flex flex-col items-center gap-4">
                  <svg className="animate-spin h-10 w-10 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="text-purple-600 font-semibold text-lg">Generating your question...</p>
                </div>
              ) : (
                <p className="text-gray-700 text-lg">{question || 'Loading...'}</p>
              )}
            </div>

            <div className="space-y-4">
              <button
                onClick={recording ? stopRecording : startRecording}
                disabled={question === 'Interview completed' || question === ''}
                className={`w-full px-6 py-4 rounded-xl font-semibold smooth-transition ${recording
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {recording ? '⏹ Stop Recording' : '🎤 Answer Question (Record Voice)'}
              </button>

              <button
                onClick={handleNextQuestion}
                disabled={recording || interviewCompleted || question === ''}
                className="w-full glass px-6 py-4 rounded-xl text-gray-700 font-semibold hover-lift smooth-transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Question →
              </button>

              {evaluationReady && (
                <button
                  onClick={handleShowEvaluation}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-xl font-semibold hover-lift smooth-transition"
                >
                  Show Evaluation Result
                </button>
              )}
            </div>

            {recognizedText && (
              <div className="mt-6 glass p-6 rounded-2xl">
                <h4 className="font-semibold text-gray-900 mb-2">Recognized Text:</h4>
                <p className="text-gray-700">{recognizedText}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <QuickLinksPage />
    </div>
  );
}

export default InterviewPage;
