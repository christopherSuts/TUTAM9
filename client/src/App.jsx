import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TransactionDetail from './components/TransactionDetail.jsx'; 
import AddTransaction from './components/AddTransaction.jsx'; 
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
    <div class="topnav">
      <a class="active" href="/">Home</a>
      <a href="/transaction">Add</a>
      <br></br>
      <br></br>
    
        {typeof backendData === "undefined" ? (
          <h1>Loading...</h1>
        ) : (
          backendData.map((transaksi, index) => (
            <div key={index}>
              <Link to={`/transaction/${transaksi.id}`}>
                <p>ID: {transaksi.id}</p>
              </Link>
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
              
            </div>
          ))
        )}
      </div>
      <Routes>
        <Route path="/transaction/:id" element={<TransactionDetail />} />
      </Routes>
      <Routes>
        <Route path="/transaction" element={<AddTransaction />} />
      </Routes>
    </Router>
  );
}

export default App;
