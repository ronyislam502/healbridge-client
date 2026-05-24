import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: "How do I book an appointment with a doctor?",
    answer: "You can easily book an appointment by searching for your desired doctor and clicking the 'Book Appointment' button."
  },
  {
    question: "Can I request a specific doctor when booking my appointment?",
    answer: "Yes, you can search for a specific doctor by name and book an appointment directly from their profile."
  },
  {
    question: "What should I do if I need to cancel or reschedule my appointment?",
    answer: "You can manage your appointments from your user dashboard. From there, you can cancel or reschedule as needed."
  },
  {
    question: "What if I'm running late for my appointment?",
    answer: "Please contact the doctor's clinic directly to inform them. Some clinics may have a grace period."
  },
  {
    question: "Can I book appointments for family members or dependents?",
    answer: "Yes, you can manage multiple patient profiles under your account and book appointments for them."
  }
];

const FAQ = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h4 className="text-[#0eb0f0] font-bold text-sm uppercase tracking-wide mb-2">
            Frequently Asked Questions
          </h4>
          <div className="flex items-center justify-center gap-1">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1b4e6b]">
              Get Your Answer
            </h2>
            <div className="relative w-8 h-8 -mt-6">
              {/* Plus decoration */}
              <div className="absolute top-0 right-0 text-[#0eb0f0] text-2xl font-bold leading-none">+</div>
              <div className="absolute top-2 right-3 text-[#0eb0f0]/50 text-xl font-bold leading-none">+</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Left: Image & Badge */}
          <div className="w-full lg:w-1/2 relative">
            {/* Outline Box Decoration */}
            <div className="absolute -top-6 -right-6 w-full h-full border border-slate-200 rounded-lg hidden md:block"></div>
            <div className="absolute -top-3 -right-3 w-full h-full border border-slate-200 rounded-lg hidden md:block"></div>
            
            <div className="relative z-10 rounded-lg overflow-hidden shadow-xl aspect-[4/3]">
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop" 
                alt="Doctor and patient looking at a tablet" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* 95k+ Happy Patients Badge */}
            <div className="absolute -bottom-8 left-12 z-20 bg-white p-4 pr-8 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] flex items-center gap-4">
              <div className="text-4xl">😊</div>
              <div>
                <div className="font-bold text-xl text-slate-800 leading-tight">95k+</div>
                <div className="text-xs text-slate-500 font-medium">Happy Patients</div>
              </div>
            </div>
          </div>

          {/* Right: Accordion FAQs */}
          <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="border-none bg-slate-50/80 px-6 rounded-lg data-[state=open]:bg-white data-[state=open]:shadow-md transition-all duration-200"
                >
                  <AccordionTrigger className="hover:no-underline py-5 text-slate-700 data-[state=open]:text-[#02b39b]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-500 pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;
