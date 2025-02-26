
const Transactions = () => {
  const transactions = [
    { id: "TXN123", status: "success", bank: "HDFC 1234", time: "12:30 PM" },
    { id: "TXN456", status: "pending", bank: "SBI 5678", time: "01:00 PM" },
    { id: "TXN789", status: "failed", bank: "ICICI 9101", time: "02:15 PM" },
  ];

  const downloadReceipt = (id) => {
    alert(`Downloading receipt for ${id}`);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg mt-4">
      <h3 className="text-xl font-semibold">Transactions</h3>
      {transactions.map((txn) => (
        <div key={txn.id} className="p-2 border-b flex justify-between items-center">
          <div>
            <p>Transaction ID: {txn.id}</p>
            <p>Transferred to: {txn.bank}</p>
            <p>Time: {txn.time}</p>
          </div>
          <div>
            {txn.status === "success" && <button onClick={() => downloadReceipt(txn.id)}>📥</button>}
            <span className={`px-2 py-1 rounded ${
              txn.status === "success" ? "bg-green-500" :
              txn.status === "pending" ? "bg-yellow-500" : "bg-red-500"
            } text-white`}>
              {txn.status.toUpperCase()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Transactions;
