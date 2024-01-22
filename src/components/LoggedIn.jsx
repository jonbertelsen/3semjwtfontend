import { useState, useEffect } from 'react';
function LoggedIn({ facade }) {
  const [dataFromServer, setDataFromServer] = useState('data loading ....');

  useEffect(() => {
    facade.fetchData('hotels', 'GET').then((data) => setDataFromServer(data));
  }, []);

  return (
    <div>
      <h2>Data Received from server</h2>
      <h3>Hotels</h3>

      {dataFromServer === 'data loading ....' ? (
        <p>{dataFromServer}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {dataFromServer.map((hotel) => (
              <tr key={hotel.id}>
                <td>{hotel.id}</td>
                <td>{hotel.hotelName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LoggedIn;
