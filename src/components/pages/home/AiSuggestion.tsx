import { AIDoctorSuggestion } from "@/app/(dashbord)/patient/_components/AIDoctorSuggestion"
import { Icons } from "@/components/shared/Icons"

const AiSuggestion = () => {
    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-950">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header section explaining the feature and how it works */}
                <div className="text-center mb-16 max-w-6xl mx-auto space-y-4">
                    <span className="inline-block px-4 py-1.5 text-xs font-black tracking-widest text-purple-600 dark:text-purple-400 uppercase bg-purple-50 dark:bg-purple-950/50 rounded-full border border-purple-100 dark:border-purple-900/30">
                        Introducing Smart AI Diagnostics
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic">
                        AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-500 to-teal-500">Doctor Suggestion</span>
                    </h2>
                    <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                        Experience the future of healthcare matching. Seamless, fast, and remarkably precise.
                    </p>

                    {/* How It Works Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 text-left">
                        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm relative group/step hover:shadow-lg transition-all duration-300">
                            <div className="absolute top-4 right-4 text-3xl font-black text-slate-100 dark:text-slate-800 group-hover/step:text-purple-500/10 transition-colors">01</div>
                            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
                                <Icons.scrollText className="w-5 h-5" />
                            </div>
                            <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">State Symptoms</h4>
                            <p className="text-xs text-slate-400 mt-2 font-semibold">Describe your ailments, headache, fever, or physical discomfort in detail inside the secure portal.</p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm relative group/step hover:shadow-lg transition-all duration-300">
                            <div className="absolute top-4 right-4 text-3xl font-black text-slate-100 dark:text-slate-800 group-hover/step:text-teal-500/10 transition-colors">02</div>
                            <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-4">
                                <Icons.brain className="w-5 h-5" />
                            </div>
                            <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Deep AI Analysis</h4>
                            <p className="text-xs text-slate-400 mt-2 font-semibold">Our next-gen neural model parses the symptoms to identify the corresponding clinical specialty area.</p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm relative group/step hover:shadow-lg transition-all duration-300">
                            <div className="absolute top-4 right-4 text-3xl font-black text-slate-100 dark:text-slate-800 group-hover/step:text-indigo-500/10 transition-colors">03</div>
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                                <Icons.users className="w-5 h-5" />
                            </div>
                            <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Specialist Matching</h4>
                            <p className="text-xs text-slate-400 mt-2 font-semibold">Instantly filters and matches you with top certified consultants active under that specialty.</p>
                        </div>
                    </div>
                </div>

                <AIDoctorSuggestion />
            </div>
        </section>
    )
}

export default AiSuggestion;