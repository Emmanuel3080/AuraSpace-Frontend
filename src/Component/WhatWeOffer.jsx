import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheckIcon,
  SparklesIcon,
  TicketIcon,
  UsersIcon,
  ChevronDownIcon,
} from "../Common/Icons";

const FEATURES = [
  {
    icon: <TicketIcon className="w-6 h-6 text-[#8065E8]" />,
    title: "Instant Digital Ticketing",
    description:
      "Secure instant ticket issuance with unique encrypted QR codes and automated PDF confirmation stubs for gate check-in.",
  },
  {
    icon: <ShieldCheckIcon className="w-6 h-6 text-[#F45B69]" />,
    title: "Secure Paystack Checkout",
    description:
      "Military-grade 256-bit payment encryption in Nigerian Naira (NGN). We protect both organizers and attendees.",
  },
  {
    icon: <UsersIcon className="w-6 h-6 text-[#8065E8]" />,
    title: "Community & Networking",
    description:
      "Connect with fellow creators, professionals, and fans. Discover where your circle is gathering next.",
  },
];

const FAQS = [
  {
    question: "How do I receive my tickets after purchasing?",
    answer:
      "Tickets are generated instantly upon completed payment. You can access your digital ticket with its QR code on your 'My Ticket' page, download a printable PDF, and receive an email confirmation.",
  },
  {
    question: "How do event organizers withdraw ticket revenue?",
    answer:
      "Organizers can connect their verified Nigerian bank accounts via the Organizer Settings tab. Total sales are tracked in real-time on the organizer dashboard.",
  },
  {
    question: "Can I transfer or cancel my ticket?",
    answer:
      "Each ticket carries a unique encrypted booking reference. Transfer and refund policies depend on the event organizer's policy as noted on the event details page.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "All major debit/credit cards (Mastercard, Visa, Verve), bank transfers, and USSD via the integrated Paystack gateway.",
  },
];

const WhatWeOffer = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <section className="py-24 bg-white border-t border-[#E9E9E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8065E8]/10 text-xs font-bold uppercase tracking-wider text-[#8065E8]">
            <SparklesIcon className="w-3.5 h-3.5" />
            <span>Why AuraSpace</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight">
            Designed for unforgettable live experiences.
          </h2>

          <p className="text-base sm:text-lg text-[#737783] leading-relaxed">
            From underground indie concerts to global developer summits, we equip creators with the tools to sell out and attendees with the joy of discovering.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-[#F7F6F2] border border-[#E9E9E7] hover:border-[#111827]/20 transition-all hover:-translate-y-1 space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-[#111827]">{item.title}</h3>
              <p className="text-sm text-[#737783] leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-6 pt-10">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-[#111827]">
              Frequently Asked Questions
            </h3>
            <p className="text-sm text-[#737783]">
              Everything you need to know about purchasing tickets and hosting events.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-[#E9E9E7] bg-[#F7F6F2] overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#111827] hover:text-[#8065E8] transition-colors bg-transparent border-0 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDownIcon
                      className={`w-5 h-5 text-[#737783] transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? "rotate-180 text-[#8065E8]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-[#737783] leading-relaxed border-t border-[#E9E9E7]/60 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
