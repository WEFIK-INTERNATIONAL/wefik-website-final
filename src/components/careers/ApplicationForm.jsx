"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, CheckCircle, AlertCircle, X } from "lucide-react";
import { submitApplication } from "@/app/actions/careers";

const formSchema = z.object({
  fullName: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  portfolioUrl: z.string().url("Invalid URL").or(z.literal("")),
  resumeUrl: z.string().url("Invalid URL").min(1, "Resume link is required"),
  message: z.string().min(10, "Message is too short"),
});

export default function ApplicationForm({ jobTitle, isOpen, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const result = await submitApplication({ ...data, jobTitle });
      if (result.success) {
        setIsSuccess(true);
        reset();
      } else {
        throw new Error(result.error || "Failed to submit application");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/5 p-6 md:p-8">
          <div>
            <h2 className="font-display text-text-primary text-4xl leading-tight font-black tracking-tighter uppercase">
              Apply for {jobTitle}
            </h2>
            <p className="text-text-muted mt-2 text-[10px] leading-none font-black tracking-[0.2em] uppercase">
              Job Application
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-6 md:p-8">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-accent/20 text-accent mb-6 flex h-20 w-20 items-center justify-center rounded-full">
                <CheckCircle size={40} />
              </div>
              <h2 className="font-display text-text-primary text-4xl font-black tracking-tighter uppercase">
                Application Sent!
              </h2>
              <p className="text-text-muted mt-4 text-lg">
                Thank you for applying. Our team will review your application
                and get back to you soon.
              </p>
              <button
                onClick={onClose}
                className="bg-accent mt-8 inline-flex h-12 items-center justify-center rounded-full px-10 text-xs font-black tracking-[0.2em] text-black uppercase transition-transform hover:scale-105"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-text-muted text-[10px] font-black tracking-[0.2em] uppercase">
                    Full Name *
                  </label>
                  <input
                    {...register("fullName")}
                    placeholder="John Doe"
                    className="text-text-primary focus:border-accent h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 outline-hidden transition-colors"
                  />
                  {errors.fullName && (
                    <span className="text-[10px] font-bold text-red-500 uppercase">
                      {errors.fullName.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-text-muted text-[10px] font-black tracking-[0.2em] uppercase">
                    Email Address *
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="john@example.com"
                    className="text-text-primary focus:border-accent h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 outline-hidden transition-colors"
                  />
                  {errors.email && (
                    <span className="text-[10px] font-bold text-red-500 uppercase">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-text-muted text-[10px] font-black tracking-[0.2em] uppercase">
                    Phone Number
                  </label>
                  <input
                    {...register("phone")}
                    placeholder="+1 234 567 890"
                    className="text-text-primary focus:border-accent h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 outline-hidden transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-text-muted text-[10px] font-black tracking-[0.2em] uppercase">
                    Portfolio / LinkedIn
                  </label>
                  <input
                    {...register("portfolioUrl")}
                    placeholder="https://behance.net/johndoe"
                    className="text-text-primary focus:border-accent h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 outline-hidden transition-colors"
                  />
                  {errors.portfolioUrl && (
                    <span className="text-[10px] font-bold text-red-500 uppercase">
                      {errors.portfolioUrl.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-text-muted text-[10px] font-black tracking-[0.2em] uppercase">
                  Resume Link (Google Drive/Dropbox) *
                </label>
                <input
                  {...register("resumeUrl")}
                  placeholder="https://drive.google.com/..."
                  className="text-text-primary focus:border-accent h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 outline-hidden transition-colors"
                />
                {errors.resumeUrl && (
                  <span className="text-[10px] font-bold text-red-500 uppercase">
                    {errors.resumeUrl.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-text-muted text-[10px] font-black tracking-[0.2em] uppercase">
                  Cover Letter / Message *
                </label>
                <textarea
                  {...register("message")}
                  placeholder="Tell us why you are a great fit..."
                  rows={4}
                  className="text-text-primary focus:border-accent w-full resize-none rounded-xl border border-white/10 bg-white/5 p-4 outline-hidden transition-colors"
                />
                {errors.message && (
                  <span className="text-[10px] font-bold text-red-500 uppercase">
                    {errors.message.message}
                  </span>
                )}
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-xl bg-red-500/10 p-4 text-sm font-bold text-red-500">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-accent flex h-16 w-full items-center justify-center gap-3 rounded-full text-xs font-black tracking-[0.4em] text-black uppercase transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
