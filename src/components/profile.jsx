import BankAccounts from "./Bankaccount";
import Transactions from "./Transactions";


const Profile = () => {
  const name = localStorage.getItem("name") || "User";

  return (
    <div className="p-4">
      <h2 className="text-2xl">Hello, {name}</h2>
      <BankAccounts />
      <Transactions />
    </div>
  );
};

export default Profile;
