// src/App.jsx
import Background3D from './components/Background3D';

function App() {
  return (
    <main className="relative min-h-screen bg-black">
      <Background3D />
      
      {/* UI Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-4xl p-4">
          <h1 className="text-6xl font-bold text-white mb-4">
            Ashi's Portfolio
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            3D Game Designer & Artist
          </p>
          <button className="bg-white/10 backdrop-blur-md text-white font-bold py-3 px-8 rounded-xl border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300">
            View My Work
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;