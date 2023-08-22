import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import useFetchSentMails from './useFetchSentMails'; // Import the custom hook

const SentMailInbox = () => {
  const { mails, loading, error } = useFetchSentMails(); // Use the custom hook
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {mails.length > 0 ? (
        mails.map((item) => (
          <div key={item._id} className={` rounded-2xl md:w-[80%] mx-auto p-2 flex justify-between border my-2 cursor-pointer bg-gray-300`}>
            {/* ... Your email content rendering ... */}
          </div>
        ))
      ) : (
        <div className='text-6xl text-gray-800 font-bold text-center w-[50%] mx-auto animate-bounce mt-[30%] '>
          <p>No emails available</p>
        </div>
      )}
    </>
  );
};

export default SentMailInbox;
