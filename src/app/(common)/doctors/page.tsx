
import { DoctorListing } from '@/components/pages/doctors/DoctorListing';

export const metadata = {
  title: 'Search Doctors | HealBridge',
  description: 'Find and book top-rated specialists near you with HealBridge.',
};

const Doctors = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Page Header */}
      <section className="relative py-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-teal-500/10 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px] animate-pulse" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-black tracking-widest text-teal-400 uppercase bg-teal-400/10 rounded-full border border-teal-400/20">
            Expert Medical Care
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight italic mb-6">
            Find Your <span className="text-teal-400 text-glow">Specialist</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
            Search through our verified network of top-rated doctors and book your appointment in seconds.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <DoctorListing />
    </div>
  );
};

export default Doctors;
