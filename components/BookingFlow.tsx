import React, { useState } from 'react';
import { LabTest, Order, OrderStatus } from '../types';
import { LAB_TESTS } from '../constants';
import { ChevronLeftIcon, CalendarIcon, CheckCircleIcon } from './icons/Icon';

interface BookingFlowProps {
  onBookingComplete: (newOrder: Order) => void;
  onGoToOrders: () => void;
}

type BookingStep = 'SELECT_TEST' | 'SCHEDULE' | 'CONFIRMATION';

const BookingFlow: React.FC<BookingFlowProps> = ({ onBookingComplete, onGoToOrders }) => {
  const [step, setStep] = useState<BookingStep>('SELECT_TEST');
  const [selectedTest, setSelectedTest] = useState<LabTest | null>(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [address, setAddress] = useState('');
  const [prescription, setPrescription] = useState<File | undefined>(undefined);
  const [newOrderId, setNewOrderId] = useState('');

  const handleTestSelect = (test: LabTest) => {
    setSelectedTest(test);
    setStep('SCHEDULE');
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTest && bookingDate && bookingTime && address) {
      const generatedId = `EZ-AD-${Math.floor(10000 + Math.random() * 90000)}`;
      setNewOrderId(generatedId);
      const newOrder: Order = {
        id: generatedId,
        test: selectedTest,
        bookingDate,
        bookingTime,
        address,
        status: OrderStatus.PENDING,
        prescription
      };
      onBookingComplete(newOrder);
      setStep('CONFIRMATION');
    }
  };

  const renderSelectTest = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-1">Select a Test</h2>
      <p className="text-gray-600 mb-6">Choose from our available laboratory tests.</p>
      <div className="space-y-4">
        {LAB_TESTS.map((test) => (
          <div key={test.id} onClick={() => handleTestSelect(test)} className="p-4 border rounded-lg hover:bg-teal-50 hover:border-teal-500 cursor-pointer transition-colors bg-white">
            <h3 className="font-semibold text-lg text-gray-800">{test.name}</h3>
            <p className="text-gray-500 text-sm mt-1">{test.description}</p>
            <p className="text-teal-600 font-bold mt-2">ETB {test.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm">
        <button onClick={() => setStep('SELECT_TEST')} className="flex items-center text-teal-600 font-semibold mb-4">
            <ChevronLeftIcon className="w-5 h-5 mr-1" />
            Back to test selection
        </button>
      <h2 className="text-2xl font-bold text-gray-800 mb-1">Schedule Collection</h2>
      <p className="text-gray-600 mb-6">Choose a date, time, and location for sample collection.</p>
      <div className="bg-blue-50 p-4 rounded-md mb-6 border border-blue-200">
          <p className="font-semibold text-blue-800">Selected Test:</p>
          <p className="text-blue-700">{selectedTest?.name}</p>
      </div>
      <form onSubmit={handleScheduleSubmit} className="space-y-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input type="date" id="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm" min={new Date().toISOString().split('T')[0]} />
        </div>
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
          <select id="time" value={bookingTime} onChange={(e) => setBookingTime(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm">
            <option value="">Select a time slot</option>
            <option>08:00 AM - 09:00 AM</option>
            <option>09:00 AM - 10:00 AM</option>
            <option>10:00 AM - 11:00 AM</option>
            <option>11:00 AM - 12:00 PM</option>
          </select>
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Collection Address</label>
          <textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} required rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm" placeholder="e.g., Bole, Addis Ababa, Kebele 04"></textarea>
        </div>
        {selectedTest?.requiresPrescription && (
          <div>
            <label htmlFor="prescription" className="block text-sm font-medium text-gray-700">Upload Prescription</label>
            <input type="file" id="prescription" onChange={(e) => setPrescription(e.target.files?.[0])} required className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"/>
            <p className="text-xs text-gray-500 mt-1">This test requires a doctor's prescription.</p>
          </div>
        )}
        <button type="submit" className="w-full bg-teal-600 text-white py-3 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 font-semibold">
          Confirm Booking
        </button>
      </form>
    </div>
  );

  const renderConfirmation = () => (
    <div className="text-center">
        <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
      <p className="text-gray-600 mb-6">Your lab test has been successfully scheduled.</p>
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-left mb-6">
        <p className="text-sm text-gray-500">Order ID</p>
        <p className="font-mono text-lg font-semibold text-gray-800 mb-4">{