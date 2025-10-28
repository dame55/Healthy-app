
export enum View {
  DASHBOARD = 'DASHBOARD',
  BOOKING = 'BOOKING',
  ORDERS = 'ORDERS',
  RESULTS = 'RESULTS',
  ORDER_DETAIL = 'ORDER_DETAIL',
}

export enum OrderStatus {
  PENDING = 'Pending',
  ACCEPTED = 'Accepted',
  SAMPLE_COLLECTED = 'Sample Collected',
  IN_LAB = 'In Lab',
  RESULT_READY = 'Result Ready',
}

export interface LabTest {
  id: string;
  name: string;
  description: string;
  price: number;
  requiresPrescription: boolean;
}

export interface Order {
  id: string;
  test: LabTest;
  bookingDate: string;
  bookingTime: string;
  address: string;
  status: OrderStatus;
  prescription?: File;
  technician?: {
    name: string;
    phone: string;
  };
}

export interface TestResult {
  id: string;
  orderId: string;
  testName: string;
  date: string;
  pdfUrl: string;
}
