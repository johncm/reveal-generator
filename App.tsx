import React, { useState } from 'react';
import { Presentation as PresentationIcon, Wand2, LayoutTemplate, Palette, PlayCircle, AlertCircle } from 'lucide-react';
import { generatePresentation } from './services/geminiService';
import PresentationView from './components/PresentationView';
import { Loader } from './components/Loader';
import { PresentationData, RevealTheme } from './types';

function App() {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [presentationData, setPresentationData] = useState<PresentationData | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<RevealTheme>(RevealTheme.Black);
  const [showPresentation, setShowPresentation] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsGenerating(true);
    setError(null);
    try {
      const data = await generatePresentation(topic);
      setPresentationData(data);
      // Optionally auto-start
      // setShowPresentation(true);
    } catch (err) {
      setError("Failed to generate presentation. Please try again or check your API key.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const startPresentation = () => {
    if (presentationData) {
      setShowPresentation(true);
    }
  };

  const resetApp = () => {
    setPresentationData(null);
    setTopic('');
    setShowPresentation(false);
  };

  if (showPresentation && presentationData) {
    return (
      <PresentationView 
        data={presentationData} 
        theme={selectedTheme} 
        onClose={() => setShowPresentation(false)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-blue-500/30">
      {/* Navbar */}
      <header className="border-b border-white/5 bg-neutral-900/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-400 cursor-pointer" onClick={resetApp}>
            <PresentationIcon className="w-6 h-6" />
            <span className="font-bold text-lg text-white tracking-tight">InstantDeck AI</span>
          </div>
          <div className="flex items-center gap-4">
             <a 
              href="https://revealjs.com" 
              target="_blank" 
              rel="noreferrer"
              className="text-xs font-medium text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              Powered by Reveal.js
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        
        {!presentationData ? (
          // INITIAL STATE: Input Form
          <div className="flex flex-col items-center text-center space-y-8 fade-in">
            <div className="space-y-4 max-w-2xl">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent pb-2">
                Presentations at <br className="hidden md:block" /> the speed of thought.
              </h1>
              <p className="text-lg text-neutral-400 max-w-xl mx-auto leading-relaxed">
                Describe your topic, and our AI will build a beautiful, interactive slide deck for you in seconds.
              </p>
            </div>

            <div className="w-full max-w-xl relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <form onSubmit={handleGenerate} className="relative">
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. The Future of Sustainable Energy"
                  disabled={isGenerating}
                  className="w-full bg-neutral-900 border border-white/10 text-white px-6 py-5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-lg placeholder:text-neutral-600 shadow-2xl"
                />
                <button
                  type="submit"
                  disabled={!topic.trim() || isGenerating}
                  className="absolute right-2 top-2 bottom-2 bg-white text-black px-6 rounded-lg font-semibold hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isGenerating ? (
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      <Wand2 size={18} />
                      <span>Generate</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 bg-red-950/30 px-4 py-2 rounded-lg border border-red-900/50">
                <AlertCircle size={16} />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mt-12">
              {[
                { icon: Wand2, label: "AI Generated", desc: "Instant structured content" },
                { icon: LayoutTemplate, label: "Smart Layouts", desc: "Optimized for readability" },
                { icon: Palette, label: "Themable", desc: "Multiple visual styles" }
              ].map((feature, i) => (
                <div key={i} className="p-6 rounded-2xl bg-neutral-900/40 border border-white/5 flex flex-col items-center gap-3 hover:bg-neutral-800/40 transition-colors">
                  <feature.icon className="w-8 h-8 text-blue-500" />
                  <h3 className="font-semibold">{feature.label}</h3>
                  <p className="text-sm text-neutral-500">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // SUCCESS STATE: Review & Launch
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Ready to present?</h2>
                <p className="text-neutral-400">Review your deck settings before launching.</p>
              </div>
              <button 
                onClick={resetApp}
                className="text-sm text-neutral-500 hover:text-white underline"
              >
                Start Over
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Preview Card */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-neutral-900 rounded-xl border border-white/10 overflow-hidden aspect-video relative group shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-black flex items-center justify-center">
                     <div className="text-center p-8">
                       <h3 className="text-2xl font-bold mb-2 text-white">{presentationData.title}</h3>
                       <p className="text-blue-400">{presentationData.subtitle}</p>
                       <div className="mt-8 flex gap-2 justify-center">
                         {presentationData.slides.map((_, i) => (
                           <div key={i} className="w-2 h-2 rounded-full bg-white/20"></div>
                         ))}
                       </div>
                     </div>
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <button 
                      onClick={startPresentation}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 transform scale-90 group-hover:scale-100 transition-all shadow-xl shadow-blue-900/20"
                    >
                      <PlayCircle size={24} />
                      Launch Presentation
                    </button>
                  </div>
                </div>
                
                <div className="bg-neutral-900/50 rounded-xl border border-white/5 p-6">
                  <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">Slide Outline</h3>
                  <div className="space-y-3">
                    {presentationData.slides.map((slide, idx) => (
                      <div key={idx} className="flex gap-4 items-start p-3 rounded-lg hover:bg-white/5 transition-colors group">
                        <span className="text-neutral-600 font-mono text-sm mt-1">0{idx + 1}</span>
                        <div>
                          <p className="font-medium text-neutral-200 group-hover:text-blue-400 transition-colors">{slide.title}</p>
                          <p className="text-sm text-neutral-500 line-clamp-1">{slide.content.join(', ')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Settings Panel */}
              <div className="space-y-6">
                <div className="bg-neutral-900/80 rounded-xl border border-white/10 p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Palette size={18} className="text-blue-400" />
                    Visual Theme
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.values(RevealTheme).map((theme) => (
                      <button
                        key={theme}
                        onClick={() => setSelectedTheme(theme)}
                        className={`text-sm text-left px-3 py-2 rounded-md capitalize transition-all ${
                          selectedTheme === theme 
                            ? 'bg-blue-600 text-white shadow-lg' 
                            : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-neutral-200'
                        }`}
                      >
                        {theme}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-950/20 rounded-xl border border-blue-900/30 p-6">
                  <h3 className="text-blue-200 font-semibold mb-2">Pro Tip</h3>
                  <p className="text-sm text-blue-400/80">
                    Use the 's' key during presentation to open the speaker notes window. Navigate with arrow keys.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;