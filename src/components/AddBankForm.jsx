import  { useState } from "react";

const AddBankForm = ({ onBankAdded }) => {
  const [formData, setFormData] = useState({
    bankName: "",
    holderName: "",
    accountNumber: "",
    confirmAccountNumber: "",
    ifsc: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleAddBank = () => {
    if (Object.values(formData).some((val) => !val) || !agreed) {
      alert("Please fill all fields and agree to the terms.");
      return;
    }
    alert("Bank added successfully!");
    onBankAdded();
  };

  return (
    <div className="mt-4 p-4 border rounded">
      <input
        type="text"
        placeholder="Bank Name"
        value={formData.bankName}
        onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        placeholder="Account Holder Name"
        value={formData.holderName}
        onChange={(e) => setFormData({ ...formData, holderName: e.target.value })}
        className="border p-2 w-full mb-2"
      />
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Account Number"
          value={formData.accountNumber}
          onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <button
          className="absolute right-2 top-2"
          onClick={() => setShowPassword(!showPassword)}
        >
          👁️
        </button>
      </div>
      <input
        type="text"
        placeholder="Re-enter Account Number"
        value={formData.confirmAccountNumber}
        onChange={(e) => setFormData({ ...formData, confirmAccountNumber: e.target.value })}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        placeholder="IFSC Code"
        value={formData.ifsc}
        onChange={(e) => setFormData({ ...formData, ifsc: e.target.value })}
        className="border p-2 w-full mb-2"
      />
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} />
        I am aware and the bank account belongs to me.
      </label>
      <button className="mt-4 p-2 bg-green-500 text-white w-full" onClick={handleAddBank}>
        Done
      </button>
    </div>
  );
};

export default AddBankForm;
