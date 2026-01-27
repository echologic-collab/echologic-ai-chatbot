import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {
  Route as RouteIcon,
  Server,
  Shield,
  Sparkles,
  Waves,
  Zap,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const auth = useAuth()
  const navigate = useNavigate()
  const features = [
    {
      icon: <Sparkles className="w-12 h-12 text-violet-400" />,
      title: 'AI-Powered Conversations',
      description:
        'Engage with intelligent agents that understand context and nuance. Experience natural, fluid dialogue.',
    },
    {
      icon: <Zap className="w-12 h-12 text-violet-400" />,
      title: 'Real-time Responses',
      description:
        'Instant answers to your queries. No waiting, just seamless communication at the speed of thought.',
    },
    {
      icon: <Shield className="w-12 h-12 text-violet-400" />,
      title: 'Secure & Private',
      description:
        'Your conversations are encrypted and private. We prioritize your data security above all else.',
    },
    {
      icon: <Waves className="w-12 h-12 text-violet-400" />,
      title: 'Voice Integration',
      description:
        'Speak naturally to Echo Logic. Our advanced voice recognition makes hands-free interaction a breeze.',
    },
    {
      icon: <RouteIcon className="w-12 h-12 text-violet-400" />,
      title: 'Smart Routing',
      description:
        'Intelligently routes complex queries to the most capable models for the best possible results.',
    },
    {
      icon: <Server className="w-12 h-12 text-violet-400" />,
      title: 'Cloud Sync',
      description:
        'Access your chat history from any device. Your conversations stay synchronized across all platforms.',
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950">
      <section className="relative py-32 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-slate-950 to-slate-950"></div>
        <div className="relative max-w-5xl mx-auto flex flex-col items-center">
          <div className="mb-8 relative group">
             <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-slate-950 rounded-full p-4 ring-1 ring-white/10">
               <img 
                 src="/src/assets/logo.png" 
                 alt="Echo Logic" 
                 className="w-24 h-24 object-contain"
               />
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-8">
            Echo
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
              Logic
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            The next evolution in conversational AI. articulate, intelligent, and designed to understand you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => {
                if (auth.isAuthenticated) {
                  // Navigate to chat
                  navigate({ to: '/chat' })
                } else {
                  navigate({ to: '/login' })
                }
              }}
              className="px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-full font-semibold transition-all shadow-[0_0_40px_-10px_rgba(139,92,246,0.3)] hover:shadow-[0_0_60px_-15px_rgba(139,92,246,0.5)] translation-transform hover:-translate-y-1"
            >
              {auth.isAuthenticated ? 'Go to Chat' : 'Start Chatting'}
            </button>
            <button className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-semibold transition-colors border border-slate-800">
              Learn More
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-violet-500/50 transition-all duration-300 hover:bg-slate-900/80"
            >
              <div className="mb-6 p-4 rounded-xl bg-slate-950 inline-block ring-1 ring-white/5 group-hover:ring-violet-500/20 transition-all">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
