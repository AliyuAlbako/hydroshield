import  {useState} from 'react';
import axios from 'axios';
export default function SmsAlert(){
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const send = async () => {
    try {
      const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:5000';
      await axios.post(apiBase + '/api/alerts/send-sms', { phone, message });
      setStatus('SMS sent');
    } catch (err) {
      console.error(err);
      setStatus('Failed to send SMS');
    }
  };
  return (
    <div>
      <h3>Send SMS Alert</h3>
      <input placeholder="+234..." value={phone} onChange={e=>setPhone(e.target.value)} />
      <textarea placeholder="Message" value={message} onChange={e=>setMessage(e.target.value)} style={{height:120, marginTop:8}} />
      <button onClick={send} style={{marginTop:8}}>Send SMS</button>
      <p>{status}</p>
    </div>
  );
}
