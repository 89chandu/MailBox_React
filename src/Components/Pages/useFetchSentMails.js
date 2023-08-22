import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchSentMails = () => {
  const [mails, setMails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMails = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token'));
        const response = await axios.get('http://localhost:3000/email/getSentMail', { headers: { "Authorization": token } });
        setMails(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError('Could not fetch mails');
        setLoading(false);
      }
    };

    fetchMails();
  }, []);

  return { mails, loading, error };
};

export default useFetchSentMails;
