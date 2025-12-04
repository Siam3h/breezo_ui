// components/KycVerificationLayout.tsx

import {
  CreditCard,
  Camera,
  ChevronRight,
  GraduationCap,
  Mail,
} from "lucide-react";

/**
 * A reusable UI component for a KYC (Know Your Customer) verification process.
 * It features a responsive two-column layout. On desktop, an illustration is
 * shown on the left, with the form on the right. On mobile, it collapses to
 * a single-column view.
 */
const KycVerificationLayout = () => {
  // A reusable component for each verification step/button
  const ActionButton = ({
    icon: Icon,
    title,
    subtitle,
  }: {
    icon: React.ElementType;
    title: string;
    subtitle: string;
  }) => (
    <button className="w-full flex items-center justify-between text-left p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500">
      <div className="flex items-center gap-4">
        <Icon className="w-6 h-6 text-gray-500 flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </button>
  );

  // A simple, clean illustration component for the left column
  const Illustration = () => (
    <div className="hidden md:flex flex-col items-center justify-center bg-purple-50 p-12 text-center border-r">
      <svg
        className="w-48 h-auto"
        viewBox="0 0 200 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="40" y="20" width="120" height="110" rx="12" fill="#E9D5FF" />
        <rect x="55" y="35" width="90" height="7" rx="3.5" fill="#C084FC" />
        <rect x="55" y="52" width="60" height="7" rx="3.5" fill="#A855F7" />
        <circle cx="125" cy="85" r="20" fill="#F3E8FF" />
        <path
          d="M131 82l-8 8m0-8l8 8"
          stroke="#A855F7"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <h2 className="mt-8 text-xl font-bold text-purple-800">
        Verification Made Easy
      </h2>
      <p className="mt-2 text-sm text-purple-600 max-w-xs">
        Securely upload your documents to unlock exclusive student perks and
        features.
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8 sm:p-6 md:p-8">
      {/* --- START: MODIFIED CONTAINER --- */}
      {/* This container is now wider on large screens (lg:w-2/3) and capped at a larger max-width (max-w-7xl) */}
      <div className="w-full lg:w-3/3 max-w-7xl bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2">
        {/* --- END: MODIFIED CONTAINER --- */}

        {/* Left Column: Illustration (Visible on desktop) */}
        <Illustration />

        {/* Right Column: Form Content */}
        <div className="p-8 md:p-10 lg:p-12 space-y-6 flex flex-col justify-center">
          {/* Header Text */}
          <div className="text-center md:text-left">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Verify Your Student Status
            </h1>
            <p className="text-gray-600 mt-1">
              Please submit the following to get started.
            </p>
          </div>

          {/* Verification Steps */}
          <div className="space-y-4">
            {/* Email Input Field */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="Your student email"
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
              />
            </div>

            {/* Valid ID Button */}
            <ActionButton
              icon={CreditCard}
              title="Picture of your valid ID"
              subtitle="To verify your personal information"
            />

            {/* Student ID Button */}
            <ActionButton
              icon={GraduationCap}
              title="Picture of your student ID"
              subtitle="To confirm your enrollment status"
            />

            {/* Selfie Button */}
            <ActionButton
              icon={Camera}
              title="Take a selfie of yourself"
              subtitle="To match your face to your ID photos"
            />
          </div>

          {/* Footer Link */}
          <div className="text-center md:text-left pt-4">
            <a
              href="#"
              className="text-sm font-medium text-purple-600 hover:text-purple-700 underline"
            >
              Why is this needed?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KycVerificationLayout;
