
import React from 'react';
import { TestResult } from '../types';

interface ResultsProps {
  results: TestResult[];
}

const Results: React.FC<ResultsProps> = ({ results }) => {
  return (
    <div className="p-4 md:p-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Results</h1>
      {results.length === 0 ? (
         <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">You have no results yet.</p>
          <p className="text-sm text-gray-500 mt-2">Completed test results will appear here.</p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Test Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Download</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.map((result) => (
                <tr key={result.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{result.testName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{result.orderId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href={result.pdfUrl} download className="text-teal-600 hover:text-teal-900 bg-teal-100 hover:bg-teal-200 px-4 py-2 rounded-full font-semibold transition-colors">
                      Download PDF
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Results;
