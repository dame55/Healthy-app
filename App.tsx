import React, { useState } from 'react';
import { View, Order, TestResult } from './types';
import { MOCK_ORDERS, MOCK_RESULTS } from './constants';
import Dashboard from './components/Dashboard';
import BookingFlow from './components/BookingFlow';
import OrderHistory from './components/OrderHistory';
import Results from './components/Results';
import OrderDetail from './components/OrderDetail';
import { BookTestIcon, ChevronLeftIcon, ClipboardListIcon, DocumentTextIcon, HomeIcon, MyOrdersIcon, MyResultsIcon } from './components/icons/Icon';

const App: React.FC = () => {
  const [view, setView] = useState<View>(View.DASHBOARD);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [results, setResults] = useState<TestResult[]>(MOCK_RESULTS);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleBookingComplete = (newOrder: Order) => {
    setOrders(prevOrders => [newOrder, ...prevOrders]);
  };
  
  const handleGoToOrders = () => {
    setView(View.ORDERS);
  }

  const handleSelectOrder = (order: Order) => {
    setSelectedOrder(order);
    setView(View.ORDER_DETAIL);
  }

  const handleBack = () => {
    if (view === View.ORDER_DETAIL) {
        setView(View.ORDERS);
    } else if (view === View.BOOKING || view === View.ORDERS || view === View.RESULTS) {
        setView(View.DASHBOARD);
    }
  };

  const getTitleForView = (currentView: View): string => {
    switch (currentView) {
      case View.DASHBOARD: return 'Dashboard';
      case View.BOOKING: return 'Book a Test';
      case View.ORDERS: return 'My Orders';
      case View.ORDER_DETAIL: return 'Order Details';
      case View.RESULTS: return 'My Results';
      default: return 'EzyLab';
    }
  };

  const renderContent = () => {
    switch (view) {
      case View.BOOKING:
        return <BookingFlow onBookingComplete={handleBookingComplete} onGoToOrders={handleGoToOrders} />;
      case View.ORDERS:
        return <OrderHistory orders={orders} onSelectOrder={handleSelectOrder} />;
      case View.ORDER_DETAIL:
        return selectedOrder ? <OrderDetail order={selectedOrder} /> : <OrderHistory orders={orders} onSelectOrder={handleSelectOrder}/>;
      case View.RESULTS:
        return <Results results={results} />;
      case View.DASHBOARD:
      default:
        return <Dashboard setView={setView} />;
    }
  };
  
  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100 font-sans antialiased">
        <Header 
            title={getTitleForView(view)} 
            showBackButton={view !== View.DASHBOARD}
            onBack={handleBack}
        />

        <main className="flex-1 overflow-y-auto">
            <div key={view} className="animate-fade-in">
                {renderContent()}
            </div>
        </main>

        <MobileBottomNav currentView={view} setView={setView} />
    </div>
  );
};


// --- Sub-components for Layout ---

interface HeaderProps {
    title: string;
    showBackButton: boolean;
    onBack: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton, onBack }) => (
    <header className="bg-teal-600 shadow-md text-white h-16 flex items-center justify-between px-4 flex-shrink-0 z-10">
        <div className="flex items-center">
            {showBackButton ? (
                <button onClick={onBack} className="p-2 -ml-2 mr-2">
                    <ChevronLeftIcon className="w-6 h-6 text-white" />
                </button>
            ) : (
                 <span className="font-bold text-2xl text-white">
                    🧬
                </span>
            )}
             <h1 className="text-xl font-semibold">{title}</h1>
        </div>
    </header>
);


interface MobileBottomNavProps {
    currentView: View;
    setView: (view: View) => void;
}
const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentView, setView }) => {
    const navItems = [
        { view: View.DASHBOARD, label: "Home", icon: <HomeIcon /> },
        { view: View.BOOKING, label: "Book", icon: <BookTestIcon /> },
        { view: View.ORDERS, label: "Orders", icon: <MyOrdersIcon /> },
        { view: View.RESULTS, label: "Results", icon: <MyResultsIcon /> },
    ];

    return (
        <footer className="bg-white border-t border-gray-200 flex justify-around flex-shrink-0 h-16">
            {navItems.map(item => (
                <button
                    key={item.view}
                    onClick={() => setView(item.view)}
                    className={`flex flex-col items-center justify-center text-xs w-1/4 pt-1 transition-colors duration-200 ${
                        currentView === item.view ? 'text-teal-600' : 'text-gray-500 hover:text-teal-500'
                    }`}
                >
                    <div className="w-6 h-6 mb-1">
                        {item.icon}
                    </div>
                    <span className={currentView === item.view ? 'font-bold' : ''}>{item.label}</span>
                </button>
            ))}
        </footer>
    );
};

export default App;