'use client';

import * as React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { HBForm } from "@/components/form/HBForm";
import { HBInput } from "@/components/form/HBInput";
import { HBTextarea } from "@/components/form/HBTextarea";
import { Icons } from "@/components/shared/Icons";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCreateContactMutation } from "@/redux/features/contact/contactApi";

const ContactForm = () => {
  const [createContact, { isLoading }] = useCreateContactMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await createContact(data).unwrap();
      if (res?.success) {
        toast.success("Message sent successfully! We'll get back to you soon.");
      } else {
        toast.error("Failed to send message.");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to send message. Please try again.");
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100 dark:border-slate-800">
      <div className="mb-10">
        <h3 className="text-3xl font-black text-slate-900 dark:text-white italic mb-4">
          Send Us a <span className="text-teal-500">Message</span>
        </h3>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          Have a specific question or request? Fill out the form below and our team will respond within 24 hours.
        </p>
      </div>

      <HBForm onSubmit={onSubmit} defaultValues={{ name: "", email: "", subject: "", message: "" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <HBInput
            label="Full Name"
            name="name"
            placeholder="John Doe"
            icon={<Icons.userCheck className="w-4 h-4" />}
            required
          />
          <HBInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="john@example.com"
            icon={<Icons.mail className="w-4 h-4" />}
            required
          />
        </div>

        <div className="mb-6">
          <HBInput
            label="Subject"
            name="subject"
            placeholder="How can we help?"
            icon={<Icons.activity className="w-4 h-4" />}
            required
          />
        </div>

        <div className="mb-8">
          <HBTextarea
            label="Your Message"
            name="message"
            placeholder="Tell us more about your inquiry..."
            required
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-16 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black text-lg uppercase tracking-widest shadow-lg shadow-teal-500/20 transition-all active:scale-95 disabled:opacity-50"
        >
          {isLoading ? (
            <Icons.loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <div className="flex items-center gap-2">
              <span>Send Message</span>
              <Icons.share2 className="w-5 h-5" />
            </div>
          )}
        </Button>
      </HBForm>
    </div>
  );
};

export { ContactForm };
