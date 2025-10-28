
import { LabTest, Order, TestResult, OrderStatus } from './types';

export const LAB_TESTS: LabTest[] = [
  { id: 'lt-001', name: 'Complete Blood Count (CBC)', description: 'Evaluates your overall health and detects a wide range of disorders.', price: 250, requiresPrescription: false },
  { id: 'lt-002', name: 'Fasting Blood Sugar (FBS)', description: 'Measures blood sugar levels after an overnight fast.', price: 150, requiresPrescription: false },
  { id: 'lt-003', name: 'Lipid Profile', description: 'Measures the amount of cholesterol and other fats in your blood.', price: 400, requiresPrescription: true },
  { id: 'lt-004', name: 'Thyroid Function Test (TFT)', description: 'Checks how well your thyroid gland is working.', price: 500, requiresPrescription: true },
  { id: 'lt-005', name: 'Typhoid Test', description: 'Detects the presence of Salmonella typhi bacteria.', price: 200, requiresPrescription: false },
  { id: 'lt-006', name: 'Urinalysis', description: 'A test of your urine to detect and manage a wide range of disorders.', price: 100, requiresPrescription: false },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'EZ-AD-12345',
    test: LAB_TESTS[0],
    bookingDate: '2023-10-26',
    bookingTime: '09:00 AM',
    address: 'Bole, Addis Ababa, Ethiopia',
    status: OrderStatus.RESULT_READY,
    technician: { name: 'Abebe Kebede', phone: '+251911123456' },
  },
  {
    id: 'EZ-BS-67890',
    test: LAB_TESTS[1],
    bookingDate: '2023-10-27',
    bookingTime: '11:00 AM',
    address: 'Kebele 04, Bishoftu, Ethiopia',
    status: OrderStatus.SAMPLE_COLLECTED,
     technician: { name: 'Chaltu Tadesse', phone: '+251912654321' },
  },
  {
    id: 'EZ-AD-54321',
    test: LAB_TESTS[3],
    bookingDate: '2023-10-28',
    bookingTime: '08:30 AM',
    address: 'CMC, Addis Ababa, Ethiopia',
    status: OrderStatus.ACCEPTED,
     technician: { name: 'Abebe Kebede', phone: '+251911123456' },
  },
];

export const MOCK_RESULTS: TestResult[] = [
    { id: 'res-001', orderId: 'EZ-AD-12345', testName: 'Complete Blood Count (CBC)', date: '2023-10-26', pdfUrl: '#' }
];

export const ORDER_STATUS_FLOW: OrderStatus[] = [
    OrderStatus.PENDING,
    OrderStatus.ACCEPTED,
    OrderStatus.SAMPLE_COLLECTED,
    OrderStatus.IN_LAB,
    OrderStatus.RESULT_READY,
];
