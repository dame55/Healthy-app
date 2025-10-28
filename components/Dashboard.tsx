
import React from 'react';
import { View } from '../types';
import { BookTestIcon, MyOrdersIcon, MyResultsIcon, UploadPrescriptionIcon } from './icons/Icon';

interface DashboardProps {
  setView: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
  return (
    <div className="p-4 md:p-8 animate-fade-in">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Welcome to EzyLab</h1>
        <p className="text-gray-600 mt-2">Your health, at your convenience. What would you like to do today?</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Book a Lab Test"
          description="Schedule a sample collection from your home."
          icon={<BookTestIcon className="w-10 h-10 text-teal-500" />}
          onClick={() => setView(View.BOOKING)}
        />
        <DashboardCard
          title="My Orders"
          description="Track the status of your ongoing tests."
          icon={<MyOrdersIcon className="w-10 h-10 text-teal-500" />}
          onClick={() => setView(View.ORDERS)}
        />
        <DashboardCard
          title="My Results"
          description="View and download your lab results."
          icon={<MyResultsIcon className="w-10 h-10 text-teal-500" />}
          onClick={() => setView(View.RESULTS)}
        />
        <DashboardCard
          title="Upload Prescription"
          description="Add a doctor's prescription for your tests."
          icon={<UploadPrescriptionIcon className="w-10 h-10 text-teal-500" />}
          onClick={() => alert('Feature coming soon!')}
        />
      </div>

      <div className="mt-12 bg-teal-50 border-l-4 border-teal-500 text-teal-800 p-4 rounded-md">
        <h3 className="font-bold">Quick Tips</h3>
        <p className="mt-1 text-sm">Remember to drink plenty of water before any fasting tests. Proper hydration is key for accurate results.</p>
      </div>
    </div>
  );
};

interface DashboardCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    onClick: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, icon, onClick }) => (
    <button onClick={onClick} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-left flex flex-col items-start justify-between">
        <div>
            <div className="mb-4">{icon}</div>
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <p className="text-gray-500 mt-1">{description}</p>
        </div>
        <span className="text-teal-600 font-semibold mt-4 text-sm">Proceed &rarr;</span>
    </button>
)

export default Dashboard;
