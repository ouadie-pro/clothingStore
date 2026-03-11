import { Link } from 'react-router-dom';
import { FaShare, FaGlobe } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: '/about', label: 'Our Story' },
    { to: '/shop', label: 'New Arrivals' },
    { to: '/sustainability', label: 'Sustainability' },
    { to: '/contact', label: 'Contact Us' },
  ];

  const customerCare = [
    { to: '/shipping', label: 'Shipping & Returns' },
    { to: '/size-guide', label: 'Size Guide' },
    { to: '/gift-cards', label: 'Gift Cards' },
    { to: '/faq', label: 'FAQ' },
  ];

  return (
    <footer className="bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="flex flex-col gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg text-white">
              <span className="material-symbols-outlined !text-xl">styler</span>
            </div>
            <h2 className="text-slate-900 dark:text-white text-lg font-extrabold tracking-tight">
              MODERN CLOSET
            </h2>
          </Link>
          <p className="text-slate-500 text-sm leading-relaxed">
            Curating timeless minimalist fashion for the modern individual. Quality over quantity, always.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
              <FaShare />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
              <FaGlobe />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-slate-900 dark:text-white">Quick Links</h4>
          <ul className="flex flex-col gap-4 text-sm text-slate-500">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:text-primary transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-slate-900 dark:text-white">Customer Care</h4>
          <ul className="flex flex-col gap-4 text-sm text-slate-500">
            {customerCare.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:text-primary transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-slate-900 dark:text-white">Visit Our Studio</h4>
          <p className="text-sm text-slate-500 mb-4">
            123 Fashion Ave, Design District<br />
            London, SW1A 1AA
          </p>
          <p className="text-sm font-bold text-primary">hello@moderncloset.com</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-slate-400">© {currentYear} Modern Closet. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <span className="material-symbols-outlined text-slate-300">payments</span>
          <span className="material-symbols-outlined text-slate-300">credit_card</span>
          <span className="material-symbols-outlined text-slate-300">local_shipping</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
