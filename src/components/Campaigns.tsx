import { Heart, Users, Clock } from 'lucide-react';

const campaigns = [
  {
    id: 1,
    title: 'Clean Water for Rural Communities',
    description: 'Help bring clean drinking water to 5,000 families in need',
    image: 'https://images.pexels.com/photos/2055389/pexels-photo-2055389.jpeg?auto=compress&cs=tinysrgb&w=800',
    raised: 45000,
    goal: 75000,
    donors: 342,
    daysLeft: 12,
  },
  {
    id: 2,
    title: 'Education for Every Child',
    description: 'Provide school supplies and resources to underprivileged students',
    image: 'https://images.pexels.com/photos/8422219/pexels-photo-8422219.jpeg?auto=compress&cs=tinysrgb&w=800',
    raised: 28500,
    goal: 50000,
    donors: 198,
    daysLeft: 20,
  },
  {
    id: 3,
    title: 'Medical Aid Mission',
    description: 'Support medical teams providing healthcare in underserved areas',
    image: 'https://images.pexels.com/photos/4047146/pexels-photo-4047146.jpeg?auto=compress&cs=tinysrgb&w=800',
    raised: 62000,
    goal: 100000,
    donors: 456,
    daysLeft: 8,
  },
];

export default function Campaigns() {
  return (
    <div id="campaigns" className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Campaigns
          </h2>
          <p className="text-gray-600 text-lg">
            Support causes that are making a real difference
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign) => {
            const progress = (campaign.raised / campaign.goal) * 100;
            return (
              <div
                key={campaign.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow border border-gray-100"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-emerald-600">
                    {Math.round(progress)}% Funded
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {campaign.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {campaign.description}
                  </p>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-semibold text-gray-900">
                        ${campaign.raised.toLocaleString()}
                      </span>
                      <span className="text-gray-600">
                        of ${campaign.goal.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{campaign.donors} donors</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{campaign.daysLeft} days left</span>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2">
                    <Heart className="w-4 h-4" />
                    <span>Support Campaign</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
