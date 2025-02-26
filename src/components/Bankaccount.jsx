import  { useState, useEffect } from "react";
import AddBankForm from "./AddBankForm";

const BankAccounts = () => {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [showAddBank, setShowAddBank] = useState(false);

  useEffect(() => {
    fetchBankAccounts();
  }, []);

  const fetchBankAccounts = async () => {
    setTimeout(() => {
      const accounts = [{ id: 1, bankName: "HDFC", accNumber: "1234" }];
      setBankAccounts(accounts);
      setShowAddBank(accounts.length < 2);
    }, 1000);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg mt-4">
      <h3 className="text-xl font-semibold">Bank Accounts</h3>
      {bankAccounts.map((acc) => (
        <div key={acc.id} className="p-2 border-b">{`${acc.bankName} - ****${acc.accNumber.slice(-4)}`}</div>
      ))}
      {showAddBank && <AddBankForm onBankAdded={() => setShowAddBank(false)} />}
    </div>
  );
};

export default BankAccounts;
