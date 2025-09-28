import React from 'react';

const HowItWorks = () => {
  const steps = [
    { title: 'Login', description: 'Sign in to your account to start shopping.' },
    { title: 'Browse', description: 'Explore our wide range of products.' },
    { title: 'Choose', description: 'Select the items you love.' },
    { title: 'Pay', description: 'Complete your purchase securely.' },
    { title: 'Delivery', description: 'Get your order delivered to your door.' },
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-[#111111] mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-[#FFF9F4] rounded-xl shadow-lg p-6 text-center transform transition hover:-translate-y-1"
            >
              <div className="bg-[#FFDC26] text-[#111111] rounded-full w-10 h-10 flex items-center justify-center font-bold mx-auto mb-4">
                {index + 1}
              </div>
              <h3 className="text-xl font-medium text-[#111111] mb-2">
                {step.title}
              </h3>
              <p className="text-[#111111] text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;