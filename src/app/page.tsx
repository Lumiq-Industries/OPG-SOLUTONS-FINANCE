"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Shield, TrendingUp, Users } from "lucide-react";
import { FinanceLogo } from "@/components/finance-logo";
import { services, site, team, values } from "@/lib/site";

export default function FinanceHomePage() {
  return (
    <div className="bg-[#f7f5f1] text-[#2B3A48]">
      <header className="border-b border-[#2B3A48]/10 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <FinanceLogo size="sm" />
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#about" className="hover:text-[#9B7846] transition">About</a>
            <a href="#services" className="hover:text-[#9B7846] transition">Services</a>
            <a href="#team" className="hover:text-[#9B7846] transition">Capacity</a>
            <a href="#contact" className="hover:text-[#9B7846] transition">Contact</a>
          </nav>
          <a
            href="#contact"
            className="rounded-full bg-[#2B3A48] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#9B7846] transition"
          >
            Request Consultation
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(155,120,70,0.12),transparent_55%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-xs uppercase tracking-[0.35em] text-[#9B7846] mb-4">{site.tagline}</p>
            <h1 className="font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Tailored financial solutions for growing businesses
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[#2B3A48]/70">
              OPG Solutions provides innovative financial support to SMMEs, contractors, professionals and
              organisations — unlocking working capital, strengthening financial systems, and enabling successful
              project delivery.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#services" className="inline-flex items-center gap-2 rounded-full bg-[#9B7846] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white">
                Explore Services <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-[#2B3A48]/20 px-8 py-4 text-sm font-semibold uppercase tracking-wider">
                Speak to Us
              </a>
            </div>
          </motion.div>
          <div className="flex justify-center lg:justify-end">
            <FinanceLogo className="h-72 w-auto" size="lg" />
          </div>
        </div>
      </section>

      <section id="about" className="px-4 py-24 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="text-xs uppercase tracking-[0.35em] text-[#9B7846] mb-3">Company Overview</p>
            <h2 className="font-serif text-3xl sm:text-4xl mb-6">Trusted financial partner for SMME growth</h2>
            <p className="text-[#2B3A48]/70 leading-relaxed mb-4">
              OPG Solutions (Pty) Ltd is a South African financial services company delivering structured financial
              solutions, financial administration systems, and funding facilitation for businesses across the public
              and private sectors.
            </p>
            <p className="text-[#2B3A48]/70 leading-relaxed">
              Through advanced financial technology and integrated systems — including Brownstar Cloud Accounting and
              Altron FinTech infrastructure — we provide flexible end-to-end support for operations, infrastructure
              projects, and procurement activities in South Africa and abroad.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { icon: TrendingUp, label: "NCR Registered", value: site.ncr },
              { icon: Building2, label: "Company Reg", value: site.registration },
              { icon: Shield, label: "Secure Platforms", value: "PCI-DSS certified payment infrastructure" },
              { icon: Users, label: "Focus", value: "SMME empowerment & inclusive development" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-2xl border border-[#2B3A48]/10 p-5">
                <Icon className="h-5 w-5 text-[#9B7846] mb-3" />
                <p className="text-xs uppercase tracking-wider text-[#2B3A48]/50">{label}</p>
                <p className="mt-1 font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.35em] text-[#9B7846] mb-3">Our Services</p>
          <h2 className="font-serif text-3xl sm:text-4xl mb-12">Financial solutions that move your business forward</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article key={service.title} className="rounded-2xl border border-[#2B3A48]/10 bg-white p-8 shadow-sm">
                <h3 className="font-serif text-xl mb-3">{service.title}</h3>
                <p className="text-sm leading-relaxed text-[#2B3A48]/70">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8 bg-[#2B3A48] text-white">
        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#9B7846] mb-3">Vision & Mission</p>
            <h2 className="font-serif text-3xl sm:text-4xl mb-6">Building lasting financial value</h2>
            <p className="text-white/70 leading-relaxed mb-6">
              <strong className="text-white">Vision:</strong> To be the trusted partner delivering flexible and
              impactful financial solutions that unlock potential and create lasting value.
            </p>
            <p className="text-white/70 leading-relaxed">
              <strong className="text-white">Mission:</strong> To deliver personalised financial solutions and expert
              guidance that enable businesses and individuals to thrive, locally and internationally.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#9B7846] mb-3">Our Values</p>
            <ul className="space-y-4">
              {values.map((value) => (
                <li key={value} className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-white/80">
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="team" className="px-4 py-24 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.35em] text-[#9B7846] mb-3">Organisational Capacity</p>
          <h2 className="font-serif text-3xl sm:text-4xl mb-12">Experienced bid and delivery team</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#2B3A48]/10 text-xs uppercase tracking-wider text-[#2B3A48]/50">
                  <th className="py-4 pr-6">Role</th>
                  <th className="py-4">Qualification</th>
                </tr>
              </thead>
              <tbody>
                {team.map((member) => (
                  <tr key={member.role} className="border-b border-[#2B3A48]/5">
                    <td className="py-4 pr-6 font-medium">{member.role}</td>
                    <td className="py-4 text-[#2B3A48]/70">{member.qualification}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="contact" className="px-4 py-24 sm:px-6 lg:px-8 bg-[#f7f5f1]">
        <div className="mx-auto max-w-4xl rounded-3xl border border-[#2B3A48]/10 bg-white p-10 text-center shadow-sm">
          <h2 className="font-serif text-3xl sm:text-4xl mb-4">Ready to discuss your funding needs?</h2>
          <p className="text-[#2B3A48]/70 mb-8">
            Contact OPG Solutions Finance for invoice discounting, procurement finance, asset-based funding and
            financial systems support.
          </p>
          <div className="space-y-2 text-sm">
            <p>{site.email}</p>
            <p>{site.phones[0]}</p>
            <p>{site.address}</p>
          </div>
          <a
            href={`mailto:${site.email}?subject=OPG%20Solutions%20Finance%20Enquiry`}
            className="mt-8 inline-flex rounded-full bg-[#9B7846] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white"
          >
            Email Us
          </a>
        </div>
      </section>

      <footer className="border-t border-[#2B3A48]/10 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#2B3A48]/60">
          <FinanceLogo size="sm" />
          <p>© {new Date().getFullYear()} OPG Solutions (Pty) Ltd · NCR {site.ncr}</p>
        </div>
      </footer>
    </div>
  );
}
