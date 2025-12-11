import React from "react";
import {
  LuSparkles,
  LuMail,
  LuGithub,
  LuLinkedin,
  LuTwitter,
} from "react-icons/lu";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Dashboard", href: "/dashboard" },
      { name: "Sessions", href: "/sessions" },
    ],
    company: [
      { name: "About Us", href: "#about" },
      { name: "Blog", href: "#blog" },
      { name: "Careers", href: "#careers" },
      { name: "Contact", href: "#contact" },
    ],
    resources: [
      { name: "Documentation", href: "#docs" },
      { name: "Help Center", href: "#help" },
      { name: "Community", href: "#community" },
      { name: "Status", href: "#status" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Terms of Service", href: "#terms" },
      { name: "Cookie Policy", href: "#cookies" },
      { name: "Licenses", href: "#licenses" },
    ],
  };

  const socialLinks = [
    { icon: LuGithub, href: "#github", label: "GitHub" },
    { icon: LuLinkedin, href: "#linkedin", label: "LinkedIn" },
    { icon: LuTwitter, href: "#twitter", label: "Twitter" },
    { icon: LuMail, href: "mailto:contact@interviewprep.ai", label: "Email" },
  ];

  return (
    <footer className="relative w-full bg-gradient-to-b from-slate-900 to-slate-950 text-gray-50 border-t border-slate-800/50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-cyan-600/10 to-blue-600/10 rounded-full blur-[100px] animate-pulse"></div>
        <div
          className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-tl from-purple-600/10 to-blue-600/10 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none"></div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 py-12 lg:px-8 lg:py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                <LuSparkles className="text-cyan-400" size={28} />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Interview Prep AI
              </h2>
            </div>
            <p className="text-slate-400 text-base leading-relaxed mb-6 max-w-md">
              Master your interviews with AI-powered preparation. Get
              personalized questions, detailed explanations, and expert guidance
              to land your dream job.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="p-3 rounded-xl bg-slate-800/50 hover:bg-gradient-to-br hover:from-cyan-500/10 hover:to-blue-500/10 border border-slate-700/50 hover:border-cyan-500/50 text-slate-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/20 cursor-pointer"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Product Links */}
            <div>
              <h3 className="text-slate-200 font-semibold text-sm uppercase tracking-wider mb-4">
                Product
              </h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 text-sm cursor-pointer"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-slate-200 font-semibold text-sm uppercase tracking-wider mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 text-sm cursor-pointer"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="text-slate-200 font-semibold text-sm uppercase tracking-wider mb-4">
                Resources
              </h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 text-sm cursor-pointer"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-slate-200 font-semibold text-sm uppercase tracking-wider mb-4">
                Legal
              </h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 text-sm cursor-pointer"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider with Gradient */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800/50"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-slate-950 px-4">
              <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm text-center md:text-left">
            © {currentYear} Interview Prep AI. All rights reserved. Powered by
            Advanced AI.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-sm">Made with</span>
            <span className="text-red-400 animate-pulse">❤️</span>
            <span className="text-slate-500 text-sm">
              for job seekers worldwide
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
    </footer>
  );
};

export default Footer;
