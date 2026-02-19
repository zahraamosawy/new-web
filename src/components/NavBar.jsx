import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // لمراقبة تغيير المسار وتحديث الـ Navbar
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // نتحقق من وجود التوكن في كل مرة يتغير فيها المسار (URL)
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // تحويل القيمة إلى true إذا وجد توكن و false إذا لم يوجد
  }, [location]); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <Link to="/">Home</Link>
      {" | "}

      {isLoggedIn && (
        <>
          {" | "}
          <Link to="/dashboard">Dashboard</Link>
          {" | "}
          <button onClick={handleLogout} style={{ cursor: 'pointer' }}>
            Logout
          </button>
        </>
      )}

      {!isLoggedIn && (
        <>
          {" | "}
          <Link to="/login">Login</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;