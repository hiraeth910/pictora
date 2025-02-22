import { useEffect, useState } from "react";
import useAuthStore from "../store";


// eslint-disable-next-line react/prop-types
const Loader = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const { token, name, mobileNumber } = useAuthStore();

  useEffect(() => {
    setLoading(false);
  }, [token, name, mobileNumber]);

  if (loading) {
    return <div>Loading...</div>; // Prevent rendering before store is loaded
  }

  return children;
};

export default Loader;
