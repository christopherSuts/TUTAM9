import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TransactionDetail from './components/TransactionDetail.jsx'; 
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function App() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("http://localhost:5000/transaction")
      .then((response) => response.json())
      .then((data) => setBackendData(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Router>
        {typeof backendData === "undefined" ? (
          <h1>Loading...</h1>
        ) : (
          backendData.map((transaksi, index) => (
            <div key={index}>
              <Link to={`/transaction/${transaksi.id}`}>
                <p>ID: {transaksi.id}</p>
                <p>Transaksi: {transaksi.transaksi}</p>
                <p>Amount: {transaksi.jumlah_nominal}</p>
                <p>
                  Date:{" "}
                  {new Date(transaksi.tanggal).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <br></br>
              </Link>
            </div>
          ))
        )}
      <Routes>
        <Route path="/transaction/:id" element={<TransactionDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
