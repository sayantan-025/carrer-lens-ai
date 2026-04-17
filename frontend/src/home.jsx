import React from 'react';
import { Link } from 'react-router';
import { 
  Search, Mail, Terminal, Layout, MessageSquare, Cloud, Command, 
  ShieldCheck, Zap, Sparkles, BrainCircuit, ArrowRight,
  TrendingUp, CheckCircle, FileText, ChevronDown, Check
} from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-brand-neon selection:text-black">
      
      {/* Clario-style Floating Navbar */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50">
        <nav className="flex justify-between items-center px-6 py-4 bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brand-neon flex items-center justify-center">
              <Sparkles size={16} className="text-black" />
            </div>
            <span className="text-xl font-bold tracking-tight">CareerLens</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#product" className="text-zinc-400 text-sm font-medium hover:text-white transition-colors">Product</a>
            <a href="#features" className="text-zinc-400 text-sm font-medium hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-zinc-400 text-sm font-medium hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="flex gap-3 items-center">
            <Link to="/login" className="hidden sm:block text-white text-sm font-medium px-4 py-2 border border-white/10 rounded-full hover:bg-white/5 transition-colors">
              Log in
            </Link>
            <Link to="/register">
              <button className="bg-brand-neon text-black px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-transform hover:scale-105">
                Start Free <ArrowRight size={14} />
              </button>
            </Link>
          </div>
        </nav>
      </div>

      <main className="flex flex-col items-center w-full relative pt-40 px-6 max-w-7xl mx-auto">
        
        {/* Clario Minimal Hero Text */}
        <section className="w-full flex flex-col md:flex-row items-end justify-between mb-16 gap-10">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-[#0A0A0A] border border-white/10 px-4 py-2 rounded-full text-xs font-semibold text-brand-neon mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-neon animate-pulse"></span> CareerLens AI V2
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]">
              Nail the <br/>
              <span className="text-zinc-500">Interview.</span>
            </h1>
          </div>
          <div className="flex-1 md:max-w-md pb-4">
            <p className="text-lg text-zinc-400 leading-relaxed font-light mb-8">
              The only AI platform that reverse-engineers your target job profile, identifies critical skill gaps, and prepares you through ultra-realistic mock scenarios.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity">
                Start Building Profile
              </button>
            </div>
          </div>
        </section>

        {/* Clario Hero Mockup (Giant Rounded Card) */}
        <section className="w-full aspect-[16/9] md:aspect-[21/9] bg-[#0A0A0A] border border-white/5 rounded-[40px] relative overflow-hidden mb-32 shadow-[0_40px_100px_rgba(0,0,0,0.5)] flex flex-col pt-8 px-8">
          <div className="flex justify-between items-center mb-6">
             <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#1A1A1A]"></div>
                <div className="w-3 h-3 rounded-full bg-[#1A1A1A]"></div>
                <div className="w-3 h-3 rounded-full bg-[#1A1A1A]"></div>
             </div>
             <div className="bg-[#141414] px-4 py-2 rounded-full flex gap-4 text-xs font-medium text-zinc-500">
               <span className="text-brand-neon">Profile Analysis</span>
               <span>Mock Interviews</span>
               <span>Skill Gap Mapping</span>
             </div>
          </div>
          {/* Mockup Dashboard Content (Light-mode inset to contrast dark UI) */}
          <div className="flex-1 w-full bg-[#FAFAFA] rounded-t-3xl border border-white/10 p-8 flex gap-6 relative overflow-hidden">
             {/* Simple visual mock of dashboard */}
             <div className="w-64 h-full bg-white rounded-2xl border border-zinc-200 p-6 flex flex-col gap-4 shadow-sm">
                <div className="h-4 w-24 bg-zinc-200 rounded-full mb-4"></div>
                <div className="h-10 w-full bg-zinc-100 rounded-xl"></div>
                <div className="h-10 w-full bg-brand-neon/10 border border-brand-neon/20 rounded-xl"></div>
                <div className="h-10 w-full bg-zinc-100 rounded-xl"></div>
                <div className="mt-auto h-24 w-full bg-zinc-100 rounded-xl"></div>
             </div>
             <div className="flex-1 h-full bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm flex flex-col">
                <div className="flex justify-between items-center mb-8">
                   <div className="h-6 w-48 bg-zinc-800 rounded-lg"></div>
                   <div className="h-8 w-24 bg-brand-neon rounded-full"></div>
                </div>
                {/* Chart Mock */}
                <div className="flex-1 border-b border-zinc-100 flex items-end gap-4 pb-4">
                   <div className="w-12 h-1/3 bg-zinc-200 rounded-t-lg hover:bg-brand-neon transition-colors"></div>
                   <div className="w-12 h-2/3 bg-brand-neon rounded-t-lg"></div>
                   <div className="w-12 h-1/2 bg-zinc-200 rounded-t-lg hover:bg-brand-neon transition-colors"></div>
                   <div className="w-12 h-full bg-zinc-800 rounded-t-lg"></div>
                </div>
             </div>
             {/* Gradient glow from bottom to blend it slightly */}
             <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FAFAFA] to-transparent"></div>
          </div>
        </section>

        {/* Bento Grid Features (Clario Struct) */}
        <section className="w-full flex flex-col gap-6 mb-32">
          
          {/* Row 1 */}
          <div className="flex flex-col md:flex-row gap-6 h-auto md:h-[500px]">
            {/* Massive Card (Span 8) */}
            <div className="flex-[2] bg-[#0A0A0A] border border-white/5 rounded-[32px] p-10 flex flex-col relative overflow-hidden group">
               <div className="absolute right-0 top-0 w-96 h-96 bg-brand-neon/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-brand-neon/20 transition-all duration-700"></div>
               <BrainCircuit size={40} className="text-zinc-400 mb-6" />
               <h3 className="text-3xl font-bold tracking-tight mb-4">Semantic Context Extraction</h3>
               <p className="text-zinc-500 max-w-sm mb-12">
                 We don't just read your resume. CareerLens builds a knowledge graph matching your exact profile against real-world target requirements.
               </p>
               {/* UI Graphic */}
               <div className="mt-auto w-full aspect-[2/1] bg-[#141414] rounded-t-2xl border border-white/5 border-b-0 relative overflow-hidden flex justify-center items-end pb-4">
                  <div className="w-[80%] h-3/4 rounded-t-xl bg-gradient-to-t from-brand-neon/20 to-transparent border-t border-x border-brand-neon/50"></div>
                  <div className="w-[60%] h-1/2 absolute bottom-0 rounded-t-xl bg-zinc-800 border-t border-x border-white/10"></div>
               </div>
            </div>

            {/* Side Card (Span 4) */}
            <div className="flex-[1] bg-[#0A0A0A] border border-white/5 rounded-[32px] p-10 flex flex-col relative overflow-hidden">
               <Zap size={40} className="text-zinc-400 mb-6" />
               <h3 className="text-3xl font-bold tracking-tight mb-4">Live Feedback</h3>
               <p className="text-zinc-500">
                 Instant metric-driven scores on your mock answers. Fix your tone and pacing before the real interview.
               </p>
               <div className="mt-auto pt-10">
                 <div className="w-24 h-24 rounded-full border-8 border-zinc-800 border-t-brand-neon flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(0,255,102,0.2)]">
                   <span className="text-2xl font-bold">94</span>
                 </div>
               </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col md:flex-row gap-6 h-auto md:h-[400px]">
            {/* Side Card */}
            <div className="flex-[1] bg-brand-neon text-black rounded-[32px] p-10 flex flex-col relative overflow-hidden">
               <MessageSquare size={40} className="mb-6 opacity-80" />
               <h3 className="text-3xl font-bold tracking-tight mb-4">Enterprise AI Voice</h3>
               <p className="font-medium opacity-80">
                 Conversational mock interviews simulating FAANG-level engineering metrics and behavioral questions.
               </p>
            </div>
            
            {/* Span Card */}
            <div className="flex-[2] bg-[#0A0A0A] border border-white/5 rounded-[32px] p-10 flex flex-col relative overflow-hidden">
               <Terminal size={40} className="text-zinc-400 mb-6" />
               <h3 className="text-3xl font-bold tracking-tight mb-4 flex justify-between items-center w-full">
                 Connect your tools <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-zinc-300">12+ Native Integrations</span>
               </h3>
               <div className="flex items-center gap-4 mt-auto justify-center">
                  <div className="p-4 bg-[#141414] rounded-2xl text-blue-400"><FileText size={32}/></div>
                  <div className="w-12 border-t border-dashed border-zinc-700"></div>
                  <div className="p-4 bg-brand-neon/20 rounded-2xl text-brand-neon shadow-[0_0_20px_rgba(0,255,102,0.3)]"><Sparkles size={32}/></div>
                  <div className="w-12 border-t border-dashed border-zinc-700"></div>
                  <div className="p-4 bg-[#141414] rounded-2xl text-red-400"><Mail size={32}/></div>
               </div>
            </div>
          </div>

        </section>

        {/* Steps/Workflow Section (Clario Minimalist Sequence) */}
        <section className="w-full flex flex-col gap-24 mb-32 items-center">
           <div className="text-center mb-8">
             <h2 className="text-4xl md:text-6xl font-bold tracking-tight">The playbook is simple.</h2>
           </div>

           {/* Step 1 */}
           <div className="flex flex-col md:flex-row items-center gap-12 w-full max-w-5xl">
              <div className="w-full md:w-1/2 flex items-center justify-center">
                 <div className="text-[12rem] font-bold text-zinc-800 leading-none">1</div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col">
                 <h3 className="text-3xl font-bold mb-4">Upload the target</h3>
                 <p className="text-zinc-400 text-lg">Drop in the job description or LinkedIn URL of the role you want. Our engine slices it into core competencies and semantic keywords.</p>
              </div>
           </div>

           {/* Step 2 */}
           <div className="flex flex-col md:flex-row-reverse items-center gap-12 w-full max-w-5xl">
              <div className="w-full md:w-1/2 flex items-center justify-center">
                 <div className="text-[12rem] font-bold text-zinc-800 leading-none">2</div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col">
                 <h3 className="text-3xl font-bold mb-4">Generate the gap map</h3>
                 <p className="text-zinc-400 text-lg">We cross-reference the target with your uploaded resume and linked repos to instantly highlight areas you need to study and polish.</p>
              </div>
           </div>

           {/* Step 3 */}
           <div className="flex flex-col md:flex-row items-center gap-12 w-full max-w-5xl">
              <div className="w-full md:w-1/2 flex items-center justify-center">
                 <div className="text-[12rem] font-bold text-zinc-800 leading-none">3</div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col">
                 <h3 className="text-3xl font-bold mb-4">Run the gauntlet</h3>
                 <p className="text-zinc-400 text-lg">Enter dynamic voice-based mock interviews. We hammer you on your weakest points until your delivery is flawless.</p>
              </div>
           </div>
        </section>

        {/* Giant Footer CTA */}
        <section className="w-full bg-[#050505] border border-white/5 rounded-[40px] px-6 py-32 flex flex-col items-center text-center mb-10 overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_100%,rgba(0,255,102,0.1),transparent)] pointer-events-none"></div>
          <h2 className="text-7xl font-bold tracking-tighter mb-8 max-w-3xl">Ready to secure the offer?</h2>
          <p className="text-zinc-400 text-lg mb-12">Join thousands of engineers landing roles at leading tech companies.</p>
          <div className="flex gap-4">
             <button className="bg-brand-neon text-black px-10 py-5 rounded-full font-bold text-lg flex items-center gap-2 hover:scale-105 transition-transform shadow-[0_0_30px_rgba(0,255,102,0.4)]">
               Get Started Free <ArrowRight size={20} />
             </button>
             <button className="bg-transparent border border-white/20 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/5 transition-colors">
               View Pricing
             </button>
          </div>
        </section>

        {/* Tiny Minimal Links Map */}
        <footer className="w-full flex flex-col md:flex-row justify-between items-center py-8 border-t border-white/5 text-sm font-medium text-zinc-500 mb-8">
          <div className="mb-4 md:mb-0">© 2026 CareerLens. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </footer>

      </main>
    </div>
  );
};

export default Home;
