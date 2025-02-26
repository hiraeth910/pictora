import { useState } from "react";
import { Button, Input, message } from "antd"; // Assuming Ant Design is used
import useStore from "../store/authStore"; // Adjust path based on your project structure

const ProfilePage = () => {
  const { user, bankAccounts } = useStore();
  const [banks, setBanks] = useState(bankAccounts);
  const [newBank, setNewBank] = useState("");

  const handleDeleteBank = (id) => {
    const updated = banks.filter((b) => b.id !== id);
    useStore.setState({ bankAccounts: updated });
    setBanks(updated);
  };

  const handleAddBank = () => {
    if (banks.length >= 2) {
      message.error("Maximum two bank accounts allowed");
      return;
    }
    if (newBank.trim() === "") {
      message.error("Enter bank details");
      return;
    }
    const newAccount = {
      id: Date.now(),
      accountNumber: newBank,
      bankName: "New Bank",
    };
    const updated = [...banks, newAccount];
    useStore.setState({ bankAccounts: updated });
    setBanks(updated);
    setNewBank("");
    message.success("Bank account added!");
  };

  return (
    <div>
      <h2>Profile</h2>
      {user ? (
        <div className="mb-3">
          <p>Name: {user.nameAsPerPan || "N/A"}</p>
          <p>Phone: {user.phone}</p>
          <p>PAN: {user.pan || "N/A"}</p>
          <p>UserID: {user.pan || "N/A"}</p>
        </div>
      ) : (
        <p>No user data</p>
      )}
      <h3>Bank Accounts</h3>
      <ul className="list-group mb-3">
        {banks.map((b) => (
          <li
            key={b.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {b.bankName} - {b.accountNumber}
            <Button onClick={() => handleDeleteBank(b.id)}>Delete</Button>
          </li>
        ))}
      </ul>
      {banks.length < 2 && (
        <div className="d-flex gap-2">
          <Input
            value={newBank}
            onChange={(e) => setNewBank(e.target.value)}
            placeholder="New bank account number"
          />
          <Button onClick={handleAddBank}>Add Bank Account</Button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
