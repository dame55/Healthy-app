
import React from 'react';
import { Order, OrderStatus } from '../types';
import { ORDER_STATUS_FLOW } from '../constants';
import { ChevronLeftIcon } from './icons/Icon';

interface OrderDetailProps {
  order: Order;
  onBack: () => void;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ order, onBack }) => {
    const currentStatusIndex = ORDER_STATUS_FLOW.indexOf(order.status);

    const statusDescriptions: Record<OrderStatus, string> = {
        [OrderStatus.PENDING]: "Your booking is received and is awaiting confirmation from a partner lab.",
        [OrderStatus.ACCEPTED]: "Your booking has been accepted. A technician has been assigned for sample collection.",
        [OrderStatus.SAMPLE_COLLECTED]: "Our technician has collected your sample. It is now on its way to the lab.",
        [OrderStatus.IN_LAB]: "Your sample has been received by the lab and is currently being processed.",
        [OrderStatus.RESULT_READY]: "Your test results are ready! You can view them in the 'My Results' section."
    };

  return (
    <div className="p-4 md:p-8 animate-fade-in">
        <button onClick={onBack} className="flex items-center text-teal-600 font-semibold mb-6">
            <ChevronLeftIcon className="w-5 h-5 mr-1" />
            Back to My Orders
        </button>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="border-b pb-4 mb-4">
            <h1 className="text-2xl font-bold text-gray-800">{order.test.name}</h1>
            <p className="text-gray-500 font-mono">Order ID: {order.id}</p>
        </div>

        <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Order Progress</h2>
            <div className="flex items-center">
                {ORDER_STATUS_FLOW.map((status, index) => {
                    const isActive = index <= currentStatusIndex;
                    return (
                        <React.Fragment key={status}>
                            <div className="flex flex-col items-center flex-shrink-0">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${isActive ? 'bg-teal-600 border-teal-600' : 'bg-white border-gray-300'}`}>
                                    {isActive && <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>}
                                </div>
                            </div>
                            {index < ORDER_STATUS_FLOW.length - 1 && (
                                <div className={`flex-auto border-t-2 h-0 mx-2 ${index < currentStatusIndex ? 'border-teal-600' : 'border-gray-300'}`} />
                            )}
                        </React.Fragment>
                    )
                })}
            </div>
             <div className="mt-2 text-center bg-teal-50 text-teal-800 p-4 rounded-md border-l-4 border-teal-500">
                <p className="font-semibold">Current Status: {order.status}</p>
                <p className="text-sm">{statusDescriptions[order.status]}</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">Booking Details</h3>
                <p><span className="font-medium text-gray-600">Date:</span> {order.bookingDate}</p>
                <p><span className="font-medium text-gray-600">Time:</span> {order.bookingTime}</p>
                <p><span className="font-medium text-gray-600">Address:</span> {order.address}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">Technician Details</h3>
                {order.technician ? (
                    <>
                        <p><span className="font-medium text-gray-600">Name:</span> {order.technician.name}</p>
                        <p><span className="font-medium text-gray-600">Phone:</span> {order.technician.phone}</p>
                    </>
                ) : (
                    <p className="text-gray-500">A technician will be assigned once the order is accepted.</p>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
