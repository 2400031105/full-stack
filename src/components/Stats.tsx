import { Users, DollarSign, Target, TrendingUp } from 'lucide-react';

const stats = [
  {
    icon: DollarSign,
    value: '$2.5M+',
    label: 'Total Raised',
    color: 'emerald',
  },
  {
    icon: Users,
    value: '12,000+',
    label: 'Active Donors',
    color: 'blue',
  },
  {
    icon: Target,
    value: '150+',
    label: 'Active Campaigns',
    color: 'orange',
  },
  {
    icon: TrendingUp,
    value: '95%',
    label: 'Success Rate',
    color: 'teal',
  },
];

export default function Stats() {
  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Our Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 bg-${stat.color}-100 rounded-full mb-4`}>
                  <Icon className={`w-7 h-7 text-${stat.color}-600`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
