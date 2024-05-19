import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function TransactionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTransaction, setEditedTransaction] = useState({
    transaksi: '',
    jumlah_nominal: '',
    tanggal: ''
  });

  useEffect(() => {
    fetch(`http://localhost:5000/transaction/${id}`)
      .then(response => response.json())
      .then(data => {
        setTransaction(data);
        setEditedTransaction({
          transaksi: data.transaksi,
          jumlah_nominal: data.jumlah_nominal,
          tanggal: data.tanggal.split('T')[0]  // Format tanggal agar sesuai dengan input type="date"
        });
      })
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

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTransaction(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/transaction/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        transaksi: editedTransaction.transaksi,
        jumlah_nominal: editedTransaction.jumlah_nominal,
        tanggal: new Date(editedTransaction.tanggal).toISOString()
      })
    })
    .then(response => response.json())
    .then(data => {
      setTransaction(data);
      setIsEditing(false);
      alert('Transaction updated successfully');
    })
    .catch(err => console.log(err));
  };

  if (!transaction) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Transaction Detail</h1>
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <div>
            <label>Nama Transaksi:</label>
            <input
              type="text"
              name="transaksi"
              value={editedTransaction.transaksi}
              onChange={handleEditChange}
              required
            />
          </div>
          <div>
            <label>Jumlah Nominal:</label>
            <input
              type="number"
              name="jumlah_nominal"
              value={editedTransaction.jumlah_nominal}
              onChange={handleEditChange}
              required
            />
          </div>
          <div>
            <label>Tanggal:</label>
            <input
              type="date"
              name="tanggal"
              value={editedTransaction.tanggal}
              onChange={handleEditChange}
              required
            />
          </div>
          <button type="submit">Update</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <p>ID: {transaction.id}</p>
          <p>Transaksi: {transaction.transaksi}</p>
          <p>Amount: {transaction.jumlah_nominal}</p>
          <p>Date: {new Date(transaction.tanggal).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
}

export default TransactionDetail;
