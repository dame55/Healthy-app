
import React from 'react';
import { Order, OrderStatus } from '../types';
import { ORDER_STATUS_FLOW } from '../constants';
import { CalendarIcon } from './icons/Icon';

interface OrderHistoryProps {
  orders: Order[];
  onSelectOrder: (order: Order) => void;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders, onSelectOrder }) => {
  return (
    <div className="p-4 md:p-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">You have no orders yet.</p>
          <p className="text-sm text-gray-500 mt-2">Book a new lab test to see it here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onSelectOrder(order)}>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                    <div>
                        <p className="font-semibold text-lg text-gray-800">{order.test.name}</p>
                        <p className="text-sm text-gray-500 font-mono">ID: {order.id}</p>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mt-2 sm:mt-0">
                        <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{order.bookingDate} at {order.bookingTime}</span>
                    </div>
                </div>
                <OrderStatusTracker currentStatus={order.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

interface OrderStatusTrackerProps {
    currentStatus: OrderStatus;
}

const OrderStatusTracker: React.FC<OrderStatusTrackerProps> = ({ currentStatus }) => {
    const currentStatusIndex = ORDER_STATUS_FLOW.indexOf(currentStatus);
    return (
        <div className="mt-4">
            <div className="flex items-center">
                {ORDER_STATUS_FLOW.map((status, index) => {
                    const isActive = index <= currentStatusIndex;
                    return (
                        <React.Fragment key={status}>
                            <div className="flex flex-col items-center">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isActive ? 'bg-teal-600' : 'bg-gray-300'}`}>
                                    {isActive && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>}
                                </div>
                                <p className={`text-xs mt-2 text-center ${isActive ? 'text-teal-700 font-semibold' : 'text-gray-500'}`}>{status}</p>
                            </div>
                            {index < ORDER_STATUS_FLOW.length - 1 && (
                                <div className={`flex-auto border-t-2 h-0 ${index < currentStatusIndex ? 'border-teal-600' : 'border-gray-300'}`} />
                            )}
                        </React.Fragment>
                    )
                })}
            </div>
        </div>
    );
};

export default OrderHistory;
