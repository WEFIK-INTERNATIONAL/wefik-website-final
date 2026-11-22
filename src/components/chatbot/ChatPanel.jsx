"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  X,
  Send,
  RotateCcw,
  Sparkles,
  UserCheck,
  CheckCircle,
  AlertCircle,
  Loader2,
  CornerDownLeft,
} from "lucide-react";
import MascotIcon from "./MascotIcon";
import { MASCOT_NAME } from "@/lib/ai/config";

const SUGGESTIONS = [
  "What services does Wefik provide?",
  "How do project timelines work?",
  "How can I book a call?",
];

export default function ChatPanel({ onClose }) {
  const [activeTab, setActiveTab] = useState("ai"); // "ai" | "human"

  // Messages state
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hi, I'm ${MASCOT_NAME}. Ask me about Wefik's services, project timelines or pricing, or switch tabs to message our team directly.`,
      timestamp: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [lastUserQuestion, setLastUserQuestion] = useState("");

  // Human support form state
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    hp_website: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState("idle"); // idle | sending | success | error
  const [formResponseMsg, setFormResponseMsg] = useState("");

  const panelRef = useRef(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const tabAiRef = useRef(null);
  const tabHumanRef = useRef(null);

  // Lock body scroll while panel is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Focus trap inside panel & ESC key handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose?.();
        return;
      }

      if (e.key === "Tab") {
        if (!panelRef.current) return;
        const focusable = panelRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Initial focus
  useEffect(() => {
    if (activeTab === "ai") {
      textareaRef.current?.focus();
    }
  }, [activeTab]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (activeTab === "ai") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, activeTab]);

  // Adjust for visualViewport (virtual keyboard on mobile)
  useEffect(() => {
    if (typeof window === "undefined" || !window.visualViewport) return;

    const handleResize = () => {
      if (!panelRef.current) return;
      const vv = window.visualViewport;
      const height = vv.height;
      // Adjust panel bottom or height if virtual keyboard is open
      if (window.innerHeight - height > 120) {
        panelRef.current.style.maxHeight = `${height - 24}px`;
      } else {
        panelRef.current.style.maxHeight = "";
      }
    };

    window.visualViewport.addEventListener("resize", handleResize);
    window.visualViewport.addEventListener("scroll", handleResize);
    return () => {
      window.visualViewport.removeEventListener("resize", handleResize);
      window.visualViewport.removeEventListener("scroll", handleResize);
    };
  }, []);

  // Handle Tab keyboard navigation (ArrowLeft / ArrowRight)
  const handleTabKeyDown = (e, tab) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      if (tab === "ai") {
        setActiveTab("human");
        tabHumanRef.current?.focus();
      } else {
        setActiveTab("ai");
        tabAiRef.current?.focus();
      }
    }
  };

  // Prefill human form message when switching to human tab if user asked a question
  const switchTab = (newTab) => {
    setActiveTab(newTab);
    if (newTab === "human" && lastUserQuestion && !formState.message.trim()) {
      setFormState((prev) => ({
        ...prev,
        message: `Inquiry from chat: ${lastUserQuestion}`,
      }));
    }
  };

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    setErrorMsg(null);
    setLastUserQuestion(text);

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMessage = { role: "user", content: text, timestamp: timeStr };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    const assistantIndex = updatedMessages.length;
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "", timestamp: timeStr },
    ]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Error ${res.status}`);
      }

      if (!res.body) throw new Error("No readable response received.");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;

        setMessages((prev) => {
          const next = [...prev];
          if (next[assistantIndex]) {
            next[assistantIndex] = {
              ...next[assistantIndex],
              content: accumulated,
            };
          }
          return next;
        });
      }
    } catch (err) {
      setErrorMsg(err.message || "Failed to receive answer.");
      setMessages((prev) => {
        const next = [...prev];
        if (next[assistantIndex] && !next[assistantIndex].content) {
          next[assistantIndex] = {
            role: "assistant",
            content:
              "Sorry, I could not complete this response. You can try asking again or switch to Contact Team.",
            timestamp: timeStr,
          };
        }
        return next;
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => textareaRef.current?.focus(), 40);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        role: "assistant",
        content: `Hi, I'm ${MASCOT_NAME}. Ask me about Wefik's services, project timelines or pricing, or switch tabs to message our team directly.`,
        timestamp: "Just now",
      },
    ]);
    setErrorMsg(null);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.focus();
    }
  };

  // Human support submission with inline validation
  const handleSupportSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!formState.name.trim()) errors.name = "Please enter your name.";
    if (!formState.email.trim()) {
      errors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }
    if (!formState.message.trim()) {
      errors.message = "Please describe your question or project.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setFormStatus("sending");
    setFormResponseMsg("");

    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Failed to dispatch message.");
      }

      setFormStatus("success");
      setFormResponseMsg(
        "Message sent. We will reply to your email within 24 hours."
      );
      setFormState({ name: "", email: "", message: "", hp_website: "" });
    } catch (err) {
      setFormStatus("error");
      setFormResponseMsg(
        err.message || "Failed to send message. Please email info@wefik.in."
      );
    }
  };

  const handleTextareaInput = (e) => {
    setInput(e.target.value);
    // Auto-grow up to ~4 lines (~120px)
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  const handleTextareaKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const hasUserMessages = messages.some((m) => m.role === "user");

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-label="Wefik assistant and contact panel"
      aria-modal="true"
      className="flex h-[min(640px,calc(100dvh-32px))] max-h-[calc(100dvh-24px)] w-[calc(100vw-24px)] flex-col overflow-hidden rounded-2xl border border-[var(--color-border,#dde8c0)] bg-[var(--color-bg-card,#ffffff)] text-[var(--color-text-primary,#0f1a05)] shadow-2xl transition-all select-text sm:h-[620px] sm:w-[400px] sm:rounded-[20px] dark:border-[var(--color-border,#1e1e1e)] dark:bg-[var(--color-bg-card,#141414)] dark:text-white"
      style={{
        boxShadow:
          "0 20px 40px -15px rgba(0, 0, 0, 0.2), 0 0 0 1px var(--color-border,#dde8c0)",
      }}
    >
      {/* 1. HEADER (64px, baseline aligned, 44px hit targets) */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-[var(--color-border,#dde8c0)] bg-[var(--color-bg-secondary,#eef4de)] px-4 dark:border-[var(--color-border,#1e1e1e)] dark:bg-[var(--color-bg-secondary,#111111)]">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent,#51731a)]/15 text-[var(--color-accent,#51731a)] dark:bg-[var(--color-accent,#a3e635)]/20 dark:text-[var(--color-accent,#a3e635)]">
            <MascotIcon className="h-5 w-5" isSpeaking={isLoading} />
          </div>
          <div>
            <div className="flex items-center gap-2 leading-none">
              <span className="text-sm font-semibold tracking-tight">
                {MASCOT_NAME}
              </span>
              <span
                className="h-2 w-2 shrink-0 rounded-full bg-emerald-500"
                aria-label="Online status"
              />
            </div>
            <p className="mt-1 text-[11px] leading-none font-normal text-[var(--color-text-muted,#5a6e3a)] dark:text-[var(--color-text-muted,#c8ccd4)]">
              Virtual assistant
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {activeTab === "ai" && (
            <button
              type="button"
              onClick={handleResetChat}
              aria-label="Restart conversation"
              title="Restart conversation"
              className="flex h-11 w-11 items-center justify-center rounded-xl text-[var(--color-text-muted,#5a6e3a)] transition-colors hover:bg-[var(--color-bg-card,#ffffff)]/60 hover:text-[var(--color-text-primary,#0f1a05)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent,#51731a)] focus-visible:outline-none dark:text-[var(--color-text-muted,#c8ccd4)] dark:hover:bg-[var(--color-bg-card,#141414)]/60 dark:hover:text-white"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close assistant panel"
            className="flex h-11 w-11 items-center justify-center rounded-xl text-[var(--color-text-muted,#5a6e3a)] transition-colors hover:bg-[var(--color-bg-card,#ffffff)]/60 hover:text-[var(--color-text-primary,#0f1a05)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent,#51731a)] focus-visible:outline-none dark:text-[var(--color-text-muted,#c8ccd4)] dark:hover:bg-[var(--color-bg-card,#141414)]/60 dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* 2. TABS (44px, role=tablist, arrow key navigation) */}
      <div
        role="tablist"
        aria-label="Assistant modes"
        className="grid shrink-0 grid-cols-2 border-b border-[var(--color-border,#dde8c0)] bg-[var(--color-bg-primary,#f5f8ee)] p-1 dark:border-[var(--color-border,#1e1e1e)] dark:bg-[var(--color-bg-primary,#0a0a0a)]"
      >
        <button
          ref={tabAiRef}
          role="tab"
          id="tab-ai"
          aria-selected={activeTab === "ai"}
          aria-controls="panel-ai"
          tabIndex={activeTab === "ai" ? 0 : -1}
          onClick={() => switchTab("ai")}
          onKeyDown={(e) => handleTabKeyDown(e, "ai")}
          className={`flex h-9 items-center justify-center gap-2 rounded-lg text-xs transition-all focus-visible:ring-2 focus-visible:ring-[var(--color-accent,#51731a)] focus-visible:outline-none ${
            activeTab === "ai"
              ? "bg-[var(--color-bg-card,#ffffff)] font-semibold text-[var(--color-accent,#51731a)] shadow-sm dark:bg-[var(--color-bg-card,#141414)] dark:text-[var(--color-accent,#a3e635)]"
              : "font-medium text-[var(--color-text-muted,#5a6e3a)] hover:text-[var(--color-text-primary,#0f1a05)] dark:text-[var(--color-text-muted,#c8ccd4)]"
          }`}
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Assistant</span>
        </button>

        <button
          ref={tabHumanRef}
          role="tab"
          id="tab-human"
          aria-selected={activeTab === "human"}
          aria-controls="panel-human"
          tabIndex={activeTab === "human" ? 0 : -1}
          onClick={() => switchTab("human")}
          onKeyDown={(e) => handleTabKeyDown(e, "human")}
          className={`flex h-9 items-center justify-center gap-2 rounded-lg text-xs transition-all focus-visible:ring-2 focus-visible:ring-[var(--color-accent,#51731a)] focus-visible:outline-none ${
            activeTab === "human"
              ? "bg-[var(--color-bg-card,#ffffff)] font-semibold text-[var(--color-accent,#51731a)] shadow-sm dark:bg-[var(--color-bg-card,#141414)] dark:text-[var(--color-accent,#a3e635)]"
              : "font-medium text-[var(--color-text-muted,#5a6e3a)] hover:text-[var(--color-text-primary,#0f1a05)] dark:text-[var(--color-text-muted,#c8ccd4)]"
          }`}
        >
          <UserCheck className="h-3.5 w-3.5" />
          <span>Contact Team</span>
        </button>
      </div>

      {/* 3. BODY (Only scroller in panel) */}
      <div className="flex flex-1 flex-col justify-between overflow-y-auto overscroll-contain p-4">
        {activeTab === "ai" ? (
          <div
            id="panel-ai"
            role="tabpanel"
            aria-labelledby="tab-ai"
            className="flex flex-1 flex-col justify-between"
          >
            {/* Messages log */}
            <div
              role="log"
              aria-live="polite"
              aria-atomic="false"
              className="space-y-3.5 pr-0.5"
            >
              {messages.map((msg, idx) => {
                const isUser = msg.role === "user";
                return (
                  <div
                    key={idx}
                    className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                  >
                    <div className="mb-1 flex items-center gap-1.5 px-1 text-[11px] font-medium text-[var(--color-text-muted,#5a6e3a)] dark:text-[var(--color-text-muted,#c8ccd4)]">
                      <span>{isUser ? "You" : MASCOT_NAME}</span>
                      {msg.timestamp && (
                        <span className="font-mono text-[10px] opacity-60">
                          {msg.timestamp}
                        </span>
                      )}
                    </div>

                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed break-words sm:text-[13px] ${
                        isUser
                          ? "rounded-br-sm bg-[var(--color-accent,#51731a)] text-white"
                          : "rounded-bl-sm border border-[var(--color-border,#dde8c0)] bg-[var(--color-bg-secondary,#eef4de)] text-[var(--color-text-primary,#0f1a05)] dark:border-[var(--color-border,#222222)] dark:bg-[var(--color-bg-secondary,#161616)] dark:text-white"
                      }`}
                    >
                      <span className="sr-only">
                        {isUser ? "You said: " : `${MASCOT_NAME} said: `}
                      </span>
                      {msg.content ? (
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      ) : (
                        <div className="flex items-center gap-1.5 py-1 text-[var(--color-text-muted,#5a6e3a)]">
                          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-85" />
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {errorMsg && (
                <div className="flex items-center justify-between rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-600 dark:text-red-400">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSendMessage(lastUserQuestion)}
                    className="text-[11px] font-semibold underline hover:opacity-80"
                  >
                    Retry
                  </button>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested topics (collapsed after first user question) */}
            {!hasUserMessages && !isLoading && (
              <div className="mt-4 border-t border-[var(--color-border,#dde8c0)] pt-3 dark:border-[var(--color-border,#1e1e1e)]">
                <p className="mb-2 text-[11px] font-medium text-[var(--color-text-muted,#5a6e3a)] dark:text-[var(--color-text-muted,#c8ccd4)]">
                  Suggested topics:
                </p>
                <div className="flex flex-col gap-2">
                  {SUGGESTIONS.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendMessage(s)}
                      className="h-10 rounded-xl border border-[var(--color-border,#dde8c0)] bg-[var(--color-bg-secondary,#eef4de)] px-3.5 text-left text-xs text-[var(--color-text-primary,#0f1a05)] transition-colors hover:bg-[var(--color-accent-subtle,#d4f07a)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent,#51731a)] focus-visible:outline-none active:scale-[0.99] dark:border-[var(--color-border,#222222)] dark:bg-[var(--color-bg-secondary,#161616)] dark:text-white dark:hover:bg-[var(--color-accent-subtle,#1e2e08)]"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Human Support Tab Panel */
          <div
            id="panel-human"
            role="tabpanel"
            aria-labelledby="tab-human"
            className="flex flex-1 flex-col justify-center py-1"
          >
            {formStatus === "success" ? (
              <div className="animate-in fade-in space-y-3 px-4 py-8 text-center">
                <CheckCircle className="mx-auto h-11 w-11 text-emerald-500" />
                <h4 className="text-sm font-semibold">Message Sent</h4>
                <p className="text-xs leading-relaxed text-[var(--color-text-muted,#5a6e3a)] dark:text-[var(--color-text-muted,#c8ccd4)]">
                  {formResponseMsg}
                </p>
                <button
                  type="button"
                  onClick={() => setFormStatus("idle")}
                  className="mt-3 inline-flex items-center rounded text-xs font-semibold text-[var(--color-accent,#51731a)] hover:underline focus-visible:ring-2 focus-visible:ring-[var(--color-accent,#51731a)] focus-visible:outline-none dark:text-[var(--color-accent,#a3e635)]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSupportSubmit}
                className="space-y-3.5"
                noValidate
              >
                <div>
                  <h4 className="mb-0.5 text-sm font-semibold">
                    Contact our team
                  </h4>
                  <p className="text-xs text-[var(--color-text-muted,#5a6e3a)] dark:text-[var(--color-text-muted,#c8ccd4)]">
                    Send a direct message and we will reply within 24 hours.
                  </p>
                </div>

                {/* Honeypot field (hidden from humans) */}
                <input
                  type="text"
                  name="hp_website"
                  value={formState.hp_website}
                  onChange={(e) =>
                    setFormState({ ...formState, hp_website: e.target.value })
                  }
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: "none" }}
                  aria-hidden="true"
                />

                <div>
                  <label
                    htmlFor="support-name"
                    className="mb-1 block text-xs font-semibold text-[var(--color-text-primary,#0f1a05)] dark:text-white"
                  >
                    Your name{" "}
                    <span
                      className="text-[var(--color-accent,#51731a)]"
                      aria-hidden="true"
                    >
                      *
                    </span>
                  </label>
                  <input
                    id="support-name"
                    name="name"
                    type="text"
                    required
                    aria-required="true"
                    aria-describedby={
                      formErrors.name ? "error-name" : undefined
                    }
                    autoComplete="name"
                    autoCapitalize="words"
                    value={formState.name}
                    onChange={(e) => {
                      setFormState({ ...formState, name: e.target.value });
                      if (formErrors.name)
                        setFormErrors({ ...formErrors, name: null });
                    }}
                    placeholder="Your full name"
                    className={`h-11 w-full rounded-xl border bg-[var(--color-bg-primary,#f5f8ee)] px-3.5 text-xs dark:bg-[var(--color-bg-primary,#0a0a0a)] ${
                      formErrors.name
                        ? "border-red-500 focus:ring-red-500"
                        : "border-[var(--color-border,#dde8c0)] focus:ring-[var(--color-accent,#51731a)] dark:border-[var(--color-border,#262626)]"
                    } text-[var(--color-text-primary,#0f1a05)] focus:ring-1 focus:outline-none dark:text-white`}
                  />
                  {formErrors.name && (
                    <p
                      id="error-name"
                      className="mt-1 text-[11px] text-red-600 dark:text-red-400"
                      role="alert"
                    >
                      {formErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="support-email"
                    className="mb-1 block text-xs font-semibold text-[var(--color-text-primary,#0f1a05)] dark:text-white"
                  >
                    Work email{" "}
                    <span
                      className="text-[var(--color-accent,#51731a)]"
                      aria-hidden="true"
                    >
                      *
                    </span>
                  </label>
                  <input
                    id="support-email"
                    name="email"
                    type="email"
                    required
                    aria-required="true"
                    aria-describedby={
                      formErrors.email ? "error-email" : undefined
                    }
                    autoComplete="email"
                    inputMode="email"
                    autoCapitalize="none"
                    spellCheck={false}
                    value={formState.email}
                    onChange={(e) => {
                      setFormState({ ...formState, email: e.target.value });
                      if (formErrors.email)
                        setFormErrors({ ...formErrors, email: null });
                    }}
                    placeholder="name@example.com"
                    className={`h-11 w-full rounded-xl border bg-[var(--color-bg-primary,#f5f8ee)] px-3.5 text-xs dark:bg-[var(--color-bg-primary,#0a0a0a)] ${
                      formErrors.email
                        ? "border-red-500 focus:ring-red-500"
                        : "border-[var(--color-border,#dde8c0)] focus:ring-[var(--color-accent,#51731a)] dark:border-[var(--color-border,#262626)]"
                    } text-[var(--color-text-primary,#0f1a05)] focus:ring-1 focus:outline-none dark:text-white`}
                  />
                  {formErrors.email && (
                    <p
                      id="error-email"
                      className="mt-1 text-[11px] text-red-600 dark:text-red-400"
                      role="alert"
                    >
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="support-message"
                    className="mb-1 block text-xs font-semibold text-[var(--color-text-primary,#0f1a05)] dark:text-white"
                  >
                    Message{" "}
                    <span
                      className="text-[var(--color-accent,#51731a)]"
                      aria-hidden="true"
                    >
                      *
                    </span>
                  </label>
                  <textarea
                    id="support-message"
                    name="message"
                    required
                    aria-required="true"
                    aria-describedby={
                      formErrors.message ? "error-message" : undefined
                    }
                    rows={3}
                    value={formState.message}
                    onChange={(e) => {
                      setFormState({ ...formState, message: e.target.value });
                      if (formErrors.message)
                        setFormErrors({ ...formErrors, message: null });
                    }}
                    placeholder="Describe your project or question"
                    className={`min-h-[96px] w-full rounded-xl border bg-[var(--color-bg-primary,#f5f8ee)] px-3.5 py-2.5 text-xs dark:bg-[var(--color-bg-primary,#0a0a0a)] ${
                      formErrors.message
                        ? "border-red-500 focus:ring-red-500"
                        : "border-[var(--color-border,#dde8c0)] focus:ring-[var(--color-accent,#51731a)] dark:border-[var(--color-border,#262626)]"
                    } resize-none text-[var(--color-text-primary,#0f1a05)] focus:ring-1 focus:outline-none dark:text-white`}
                  />
                  {formErrors.message && (
                    <p
                      id="error-message"
                      className="mt-1 text-[11px] text-red-600 dark:text-red-400"
                      role="alert"
                    >
                      {formErrors.message}
                    </p>
                  )}
                </div>

                {formStatus === "error" && (
                  <div
                    className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400"
                    role="alert"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{formResponseMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-accent,#51731a)] text-xs font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover,#3a5212)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent,#51731a)] focus-visible:outline-none disabled:opacity-50"
                >
                  {formStatus === "sending" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Sending message...</span>
                    </>
                  ) : (
                    <span>Send message</span>
                  )}
                </button>
              </form>
            )}
          </div>
        )}
      </div>

      {/* 4. COMPOSER (Shrink-0, autogrow textarea, 44px hit button, Enter to send) */}
      {activeTab === "ai" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex shrink-0 items-end gap-2 border-t border-[var(--color-border,#dde8c0)] bg-[var(--color-bg-secondary,#eef4de)] p-3 dark:border-[var(--color-border,#1e1e1e)] dark:bg-[var(--color-bg-secondary,#111111)]"
        >
          <div className="relative flex-1">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={handleTextareaInput}
              onKeyDown={handleTextareaKeyDown}
              placeholder="Ask a question..."
              disabled={isLoading}
              className="max-h-[120px] min-h-[42px] w-full resize-none rounded-xl border border-[var(--color-border,#dde8c0)] bg-[var(--color-bg-card,#ffffff)] px-3.5 py-3 text-xs leading-relaxed text-[var(--color-text-primary,#0f1a05)] focus:ring-1 focus:ring-[var(--color-accent,#51731a)] focus:outline-none disabled:opacity-50 dark:border-[var(--color-border,#262626)] dark:bg-[var(--color-bg-card,#141414)] dark:text-white"
            />
          </div>

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            aria-label="Send question"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent,#51731a)] text-white transition-colors hover:bg-[var(--color-accent-hover,#3a5212)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent,#51731a)] focus-visible:outline-none disabled:opacity-40"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </button>
        </form>
      )}
    </div>
  );
}
