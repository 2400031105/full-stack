import { Heart } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-emerald-50 to-teal-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-full mb-6">
            <Heart className="w-8 h-8 text-white fill-current" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Make a Difference Today
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your generosity can transform lives. Join thousands of donors supporting causes that matter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#donate"
              className="px-8 py-4 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Donate Now
            </a>
            <a
              href="#campaigns"
              className="px-8 py-4 bg-white text-emerald-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
            >
              View Campaigns
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
