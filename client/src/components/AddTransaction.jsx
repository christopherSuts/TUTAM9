import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddTransaction() {
  const [namaTransaksi, setNamaTransaksi] = useState('');
  const [jumlahNominal, setJumlahNominal] = useState('');
  const [tanggal, setTanggal] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      transaksi: namaTransaksi,
      jumlah_nominal: jumlahNominal,
      tanggal: new Date(tanggal).toISOString(),
    };

    fetch('http://localhost:5000/transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTransaction),
    })
      .then((response) => response.json())
      .then(() => {
        alert('Transaction added successfully');
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Add New Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nama Transaksi:</label>
          <input
            type="text"
            value={namaTransaksi}
            onChange={(e) => setNamaTransaksi(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Jumlah Nominal:</label>
          <input
            type="number"
            value={jumlahNominal}
            onChange={(e) => setJumlahNominal(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tanggal:</label>
          <input
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
}

export default AddTransaction;
