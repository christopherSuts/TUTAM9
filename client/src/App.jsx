import { useEffect, useState } from 'react'

function App() {
  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch('http://localhost:5000/transaction')
      .then(response => response.json())
      .then(data => setBackendData(data))
      .catch(err => console.log(err));
  }, [])

  return (
    <div>
      {(typeof backendData === 'undefined') ? (
        <h1>Loading...</h1>
      ): (
        backendData.map((transaksi, index) => (
          <div key={index}>
            <p>ID: {transaksi.id}</p>
            <p>Transaksi: {transaksi.transaksi}</p>
            <p>Amount: {transaksi.jumlah_nominal}</p>
            <p>Date: {new Date(transaksi.tanggal).toLocaleDateString('id-ID', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
            <br></br>
          </div>
        ))
      )}
    </div>
  )
}

export default App
