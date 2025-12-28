import Editor from "@monaco-editor/react";
import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import QuickLinksPage from "../components/QuickLinks";
import { FaPlay } from "react-icons/fa";

const languageOptions = {
  python: 71,
  javascript: 63,
  c: 50,
  cpp: 54,
  java: 62,
};

const initialCode = {
  python: "# Write your Python code here\nprint('Hello, World!')",
  javascript: "// Write your JavaScript code here\nconsole.log('Hello, World!');",
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  c: `#include <stdio.h>
int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
  cpp: `#include <iostream>
using namespace std;
int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
};

const OnlineIDE = () => {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(initialCode[language]);
  const [output, setOutput] = useState("");

  const handleLanguageChange = (e) => {
    const selected = e.target.value;
    setLanguage(selected);
    setCode(initialCode[selected]);
  };

  const runCode = async () => {
    setOutput("⏳ Running...");
    try {
      const response = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        {
          source_code: code,
          language_id: languageOptions[language],
        },
        {
          headers: {
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            "X-RapidAPI-Key": import.meta.env.VITE_JUDGE0_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      setOutput(response.data.stdout || response.data.stderr || "⚠️ No output.");
    } catch (error) {
      setOutput("❌ Error running code: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />

      <div className="container mx-auto px-6 pt-32 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Online <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">Code Editor</span>
          </h1>
          <p className="text-xl text-gray-600">Write, run, and test your code in multiple languages</p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Editor Section */}
            <div className="glass-strong p-6 rounded-3xl">
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-3">Select Language</label>
                <select
                  className="w-full glass px-4 py-3 rounded-xl text-gray-700 font-medium smooth-transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={language}
                  onChange={handleLanguageChange}
                >
                  <option value="python">Python</option>
                  <option value="javascript">JavaScript</option>
                  <option value="java">Java</option>
                  <option value="c">C</option>
                  <option value="cpp">C++</option>
                </select>
              </div>

              <div className="rounded-2xl overflow-hidden border-2 border-gray-200">
                <Editor
                  height="500px"
                  language={language}
                  value={code}
                  theme="vs-light"
                  onChange={(value) => setCode(value || "")}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: "'Fira Code', monospace",
                    fontLigatures: true,
                    padding: { top: 16, bottom: 16 },
                  }}
                />
              </div>
            </div>

            {/* Output Section */}
            <div className="glass-strong p-6 rounded-3xl flex flex-col">
              <button
                onClick={runCode}
                className="bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-semibold px-8 py-4 rounded-2xl hover-lift smooth-transition flex items-center justify-center gap-3 mb-6"
              >
                <FaPlay /> Run Code
              </button>

              <div className="flex-1 glass p-6 rounded-2xl">
                <h3 className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Output
                </h3>
                <div className="bg-gray-900 text-green-400 rounded-xl p-4 h-[420px] overflow-y-auto font-mono text-sm whitespace-pre-wrap">
                  {output || "// Output will appear here..."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <QuickLinksPage />
    </div>
  );
};

export default OnlineIDE;
