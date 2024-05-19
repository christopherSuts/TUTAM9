import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function TransactionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/transaction/${id}`)
      .then(response => response.json())
      .then(data => setTransaction(data))
      .catch(err => console.log(err));
  }, [id]);

  const handleDelete = () => {
    fetch(`http://localhost:5000/transaction/${id}`, { method: 'DELETE' })
      .then(() => {
        alert('Transaction deleted');
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  if (!transaction) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Transaction Detail</h1>
      <p>ID: {transaction.id}</p>
      <p>Transaksi: {transaction.transaksi}</p>
      <p>Amount: {transaction.jumlah_nominal}</p>
      <p>Date: {new Date(transaction.tanggal).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default TransactionDetail;
