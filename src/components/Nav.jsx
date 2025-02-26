
const Navbar = ({ setActiveTab }) => {
  return (
    <nav className="flex justify-between p-4 bg-gray-800 text-white">
      <div className="text-xl font-bold">Dashboard</div>
      <div className="flex gap-4">
        {["Create Course", "Your Courses", "Wallet", "Profile"].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
