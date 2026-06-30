"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface MeetingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SERVICES = [
  "GPU Optimization Service",
  "CUDA Development Service",
  "AI/ML Development",
  "AI Consulting",
];

export default function MeetingDrawer({ isOpen, onClose }: MeetingDrawerProps) {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate sending message
    setStatus("sent");
  };

  // Reset status when drawer opens/closes
  useEffect(() => {
    if (isOpen) {
      setStatus("idle");
    }
  }, [isOpen]);

  // Lock body scroll while the drawer is open
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  // Handle Escape key close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/40 backdrop-blur-[2px] z-[100]"
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "120%", opacity: 0.8 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "120%", opacity: 0.8 }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            className="fixed right-4 md:right-6 top-4 md:top-6 bottom-4 md:bottom-6 z-[101] w-[calc(100%-2rem)] sm:w-[500px] md:w-[45%] max-w-[560px] bg-white border border-line shadow-[0_20px_50px_rgba(17,17,19,0.15)] rounded-2xl flex flex-col overflow-hidden"
            style={{
              background: "#ffffff",
              color: "#111113",
              borderColor: "#e4e3de",
              // Force light/white theme CSS variables inside the modal
              "--bg-primary": "#F7F7F4",
              "--bg-secondary": "#ffffff",
              "--bg-tertiary": "#eceae4",
              "--text-primary": "#111113",
              "--text-secondary": "#5e5d59",
              "--text-tertiary": "#9b9994",
              "--border-default": "#e4e3de",
              "--accent-cta": "#18181c",
              "--btn-border": "#7f7e79",
            } as React.CSSProperties}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-line bg-white">
              <div>
                <h2 className="font-mono font-medium text-base md:text-lg text-ink uppercase tracking-wider">
                  Schedule a Meeting
                </h2>
                <p className="text-xs text-ink-3 mt-0.5">
                  Start a project or talk to our experts
                </p>
              </div>
              <button
                onClick={onClose}
                className="group flex items-center justify-center w-8 h-8 border border-line bg-tint hover:bg-ink hover:text-warmwhite text-ink transition-all duration-200"
                aria-label="Close drawer"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform duration-300 group-hover:rotate-90"
                >
                  <path
                    d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.50002L3.21846 10.9685C2.99391 11.193 2.99391 11.5571 3.21846 11.7816C3.44301 12.0062 3.80708 12.0062 4.03164 11.7816L7.50005 8.31322L10.9685 11.7816C11.193 12.0062 11.5571 12.0062 11.7816 11.7816C12.0062 11.5571 12.0062 11.193 11.7816 10.9685L8.31322 7.50002L11.7816 4.03157Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-center">
              {status === "sent" ? (
                <div className="flex flex-col items-center justify-center text-center p-6 border border-line bg-linen rounded-xl">
                  <div className="w-12 h-12 border border-line rounded-full flex items-center justify-center mb-4 bg-tint text-ink">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.4669 3.72684C11.7175 3.91484 11.771 4.27125 11.583 4.52184L6.58302 11.1885C6.49575 11.3049 6.36246 11.3765 6.21951 11.3838C6.07657 11.3911 5.93514 11.3333 5.83407 11.2268L3.33407 8.56015C3.12921 8.34163 3.12921 7.98734 3.33407 7.76882C3.53893 7.5503 3.87107 7.5503 4.07593 7.76882L6.10842 9.93681L10.6719 3.84299C10.8599 3.5924 11.2163 3.53884 11.4669 3.72684Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="font-mono text-xl uppercase tracking-wider text-ink mb-2">
                    Message received
                  </h3>
                  <p className="text-ink-2 text-sm max-w-[36ch]">
                    Thank you — our team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={onClose}
                    className="btn btn-secondary mt-6 !py-2 !px-4"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="drawer-name" className="text-xs font-medium text-ink-2">
                        Name *
                      </label>
                      <input
                        id="drawer-name"
                        name="name"
                        required
                        autoComplete="name"
                        className="field-j !py-2 text-sm"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="drawer-email" className="text-xs font-medium text-ink-2">
                        Email *
                      </label>
                      <input
                        id="drawer-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="field-j !py-2 text-sm"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="drawer-company" className="text-xs font-medium text-ink-2">
                        Company
                      </label>
                      <input
                        id="drawer-company"
                        name="company"
                        autoComplete="organization"
                        className="field-j !py-2 text-sm"
                        placeholder="Company name"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="drawer-phone" className="text-xs font-medium text-ink-2">
                        Phone
                      </label>
                      <input
                        id="drawer-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        className="field-j !py-2 text-sm"
                        placeholder="+91"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="drawer-service" className="text-xs font-medium text-ink-2">
                      Service interest *
                    </label>
                    <select
                      id="drawer-service"
                      name="service"
                      required
                      defaultValue=""
                      className="field-j !py-2 text-sm"
                    >
                      <option value="" disabled>
                        Select a service
                      </option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="drawer-message" className="text-xs font-medium text-ink-2">
                      Project description *
                    </label>
                    <textarea
                      id="drawer-message"
                      name="message"
                      rows={3}
                      required
                      className="field-j !py-2 text-sm resize-y"
                      placeholder="What are you running, and how fast does it need to be?"
                    />
                  </div>

                  <div className="pt-3 border-t border-line/60 flex flex-col gap-3">
                    <p className="text-[0.7rem] text-ink-3">
                      * Required fields. Your details are used only to respond to this inquiry.
                    </p>
                    <button 
                      type="submit" 
                      className="w-full py-3 text-[0.8rem] uppercase tracking-wider font-mono font-medium bg-[#111113] hover:bg-black text-white hover:text-white border border-[#111113] transition-colors duration-200 cursor-pointer"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
