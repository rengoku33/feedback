import React, { useEffect, useState } from 'react';

const AdminTable = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch('http://localhost:5000/admin');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRecords(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  if (loading) return <div className='text-center mt-16 text-xl text-white font-semibold bg-green-600'>Loading...</div>;
  if (error) return <div className='text-center mt-16 text-xl text-white font-semibold bg-red-600'>Error: {error}</div>;

  return (
    <div className="max-w-[90%] mx-auto px-4 py-8">
      <h1 className="text-2xl text-center bg-white py-4">Feedback Records</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Full Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Phone Number</th>
            <th className="py-2 px-4 border-b">Products</th>
            <th className="py-2 px-4 border-b">Feedback</th>
            <th className="py-2 px-4 border-b">PQ</th>
            <th className="py-2 px-4 border-b">SF</th>
            <th className="py-2 px-4 border-b">OE</th>
            <th className="py-2 px-4 border-b">Signature</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {records.map((record) => (
            <tr key={record.id}>
              <td className="py-2 px-4 border-b">{record.id}</td>
              <td className="py-2 px-4 border-b">{record.fullName}</td>
              <td className="py-2 px-4 border-b">{record.email}</td>
              <td className="py-2 px-4 border-b">{record.phoneNumber}</td>
              <td className="py-2 px-4 border-b">{JSON.parse(record.products).join(', ')}</td>
              <td className="py-2 px-4 border-b">{record.feedback}</td>
              <td className="py-2 px-4 border-b">{record.productQuality}</td>
              <td className="py-2 px-4 border-b">{record.staffFriendliness}</td>
              <td className="py-2 px-4 border-b">{record.overallExperience}</td>
              <td className="py-2 px-4 border-b">
                <img src={record.signature} alt="Signature" width="100" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
