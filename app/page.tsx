'use client';

import { useState } from 'react';
import Image from 'next/image';
import { User, Mail } from 'lucide-react';

export default function EventPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Success! Check your email for your ticket.');
        setEmail('');
        setName('');
      } else {
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setMessage('Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 animated-gradient">
      {/* Header with UTIX Logo */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <div className="max-w-6xl mx-auto animate-fade-in">
          <Image
            src="/logo-01.svg"
            alt="UTIX"
            width={150}
            height={50}
            className="h-12 sm:h-14 w-auto"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* Left Column - Image */}
          <div className="w-full animate-scale-in delay-100">
            <div className="rounded-2xl overflow-hidden shadow-xl max-w-md mx-auto md:mx-0">
              <Image
                src="/Untitled design (10).png"
                alt="Event"
                width={600}
                height={400}
                className="w-full h-auto"
                priority
              />
            </div>

            {/* Presented By */}
            <div className="mt-6 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white border-2 border-orange-500 flex items-center justify-center p-1.5 overflow-hidden">
                <Image
                  src="/logo-01.svg"
                  alt="UTIX"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="text-sm text-gray-500">Presented by</p>
                <p className="font-semibold">UTIX</p>
              </div>
            </div>

            {/* Speakers */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-gray-700 mb-3">Featured Speakers</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Image
                    src="/square_blob.jpg"
                    alt="Max Mayhew"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm">Max Mayhew - Founder & MD</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    src="/square_blob (1).jpg"
                    alt="Mihkel Tali"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm">Mihkel Tali - Head of Development</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    src="/square_blob (2).jpg"
                    alt="Jerome Robinson"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm">Jerome Robinson - VP of Sales</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Event Details */}
          <div className="animate-fade-in-up delay-200">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 rounded-full mb-4">
              <span className="text-orange-700 text-sm">💼 Investor Presentation</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              UTIX: The Future of Ticketing
            </h1>

            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <div className="flex items-start gap-3">
                <div className="text-2xl">📅</div>
                <div>
                  <p className="font-semibold text-gray-900">Thursday, October 16, 2025</p>
                  <p className="text-gray-600">4:00 PM EST</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-2xl">💻</div>
                <div>
                  <p className="font-semibold text-gray-900">Online Event</p>
                  <p className="text-gray-600">Webinar link sent day of event</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-2xl">⏱️</div>
                <div>
                  <p className="font-semibold text-gray-900">Duration</p>
                  <p className="text-gray-600">45 mins presentation + 15 mins Q&A</p>
                </div>
              </div>
            </div>

            {/* Registration Box */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 animate-scale-in delay-300">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">🎟️ Get Your Free NFT Access Ticket</h3>

              <p className="text-gray-700 mb-4 text-sm sm:text-base">Sign up below to receive your blockchain-secured ticket and join us for an exclusive investor presentation.</p>

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 flex items-center justify-center text-gray-500">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  />
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 flex items-center justify-center text-gray-500">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    placeholder="future.unicorn@startup.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 text-sm sm:text-base rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : 'Request to Join'}
                </button>

                {message && (
                  <div className={`p-4 rounded-lg ${message.includes('Success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {message}
                  </div>
                )}
              </form>
            </div>

            {/* About Event */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 animate-scale-in delay-400">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">About This Event</h3>
              <div className="prose prose-sm max-w-none text-gray-700 space-y-3 sm:space-y-4 text-sm sm:text-base">
                <p>
                  The global ticketing industry is worth over <strong>$53 billion</strong> and projected to grow at 10.4% CAGR,
                  with more than 70% of sales digital by 2027. Yet it's broken: plagued by rampant fraud, unchecked scalping,
                  and excessive fees that hurt fans and organisers alike.
                </p>

                <p className="font-semibold text-orange-600">
                  UTIX is fixing this.
                </p>

                <p>
                  Built on blockchain, UTIX is a fully operational and revenue-generating platform that creates fraud-proof,
                  immutable NFT tickets, giving organisers full control over resale markets, cutting fees to a maximum of 7.5%
                  vs. 14%+ industry average, and integrating a loyalty token system to reward repeat users.
                </p>

                <h4 className="font-bold text-gray-900 text-base sm:text-lg">Why attend this event?</h4>

                <p>You'll discover:</p>

                <ul className="space-y-2 list-none pl-0">
                  <li>🌍 Why UTIX is one of the first MFSA-regulated Ethereum tokens under the EU/Malta VFA Act</li>
                  <li>💸 How UTIX is saving millions by slashing ticketing fees nearly in half</li>
                  <li>🔒 How blockchain smart contracts eradicate scalping and fraud for good</li>
                  <li>👥 Why UTIX is backed by ex-quant traders, fintech & blockchain veterans with prior exits</li>
                  <li>🤝 Partnerships with Air Baltic and the Latvian Blockchain Association</li>
                  <li>🚀 Growth roadmap: API portal, white-label solutions, ticket insurance & merchandise integration</li>
                </ul>

                <h4 className="font-bold text-gray-900 text-base sm:text-lg">Featured Speakers</h4>

                <div className="space-y-2">
                  <p><strong>Max Mayhew</strong> – Founder & Managing Director (ex-Head of Trading, Ceres Fund; BSc Industrial Economics)</p>
                  <p><strong>Mihkel Tali</strong> – Head of Development (award-winning product developer; fintech & blockchain technologist)</p>
                  <p><strong>Jerome Robinson</strong> – VP of Sales (Certified Sales Professional, global BD experience)</p>
                </div>

                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
                  <p className="font-semibold text-gray-900 mb-2">Takeaway:</p>
                  <p className="text-sm">
                    UTIX isn't just a concept — it's live, regulated, and revenue-generating with global partnerships
                    already in place. This is your opportunity to see why UTIX is set to become the new global standard
                    in ticketing — and how you can be part of the journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
