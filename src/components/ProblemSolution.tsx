
import { Bike, Leaf, Clock, DollarSign, Users, Zap } from 'lucide-react';

const ProblemSolution = () => {
  const problems = [
    {
      title: "Traffic Congestion",
      description: "Nairobi traffic costs 2+ hours daily",
      stat: "50% time saved",
      solution: "Navigate through traffic with dedicated bike lanes and shortcuts"
    },
    {
      title: "Air Pollution",
      description: "Poor air quality affects health",
      stat: "Zero emissions",
      solution: "Electric-powered rides that produce no harmful emissions"
    },
    {
      title: "Last-mile Gaps",
      description: "Getting to final destination is expensive",
      stat: "75% cost reduction",
      solution: "Affordable station-to-station connectivity across the city"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-red-50 to-orange-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            The Urban Mobility <span className="text-red-500">Problem</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            African cities face growing transportation challenges that affect millions of people daily.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            {problems.map((problem, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">!</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{problem.title}</h3>
                  <p className="text-gray-600">{problem.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl p-8">
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div className="w-24 h-24 bg-red-200 rounded-full flex items-center justify-center">
                  <Clock className="w-12 h-12 text-red-600" />
                </div>
                <div className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full">
                  <span className="text-xs font-bold">2h+</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                  <DollarSign className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <span className="text-sm text-gray-600">Expensive</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                  <div className="w-8 h-8 bg-gray-400 rounded-full mx-auto mb-2"></div>
                  <span className="text-sm text-gray-600">Polluted</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              The Breezo <span className="gradient-text">Solution</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Smart e-bikes that transform how you move around the city.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1 bg-gradient-to-br from-breezo-green/10 to-breezo-green-light/20 rounded-2xl p-8">
              <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                  <Bike className="w-24 h-24 text-breezo-green" />
                  <div className="absolute -top-2 -right-2 bg-breezo-green text-white p-2 rounded-full">
                    <Zap className="w-4 h-4" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-md text-center">
                    <Leaf className="w-8 h-8 text-breezo-green mx-auto mb-2" />
                    <span className="text-sm text-gray-600">Clean</span>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-md text-center">
                    <Users className="w-8 h-8 text-breezo-green mx-auto mb-2" />
                    <span className="text-sm text-gray-600">Community</span>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-breezo-green text-white p-4 rounded-xl shadow-lg animate-bounce-gentle">
                <span className="text-sm font-medium">Clean & Green!</span>
              </div>
            </div>

            <div className="space-y-8 order-1 lg:order-2">
              {problems.map((problem, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-breezo-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{problem.title} Solution</h3>
                    <p className="text-gray-600 mb-2">{problem.solution}</p>
                    <span className="inline-block bg-breezo-green/10 text-breezo-green px-3 py-1 rounded-full text-sm font-medium">
                      {problem.stat}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
