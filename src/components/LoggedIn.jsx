import { useState, useEffect } from 'react';
function LoggedIn({ facade }) {
  const [dataFromServer, setDataFromServer] = useState('Loading...');

  useEffect(() => {
    facade.fetchData('hotels', 'GET').then((data) => setDataFromServer(data));
  }, []);

  return (
    <div>
      <h2>Data Received from server</h2>
      <h3>{console.log(dataFromServer)}</h3>
    </div>
  );
}

export default LoggedIn;
