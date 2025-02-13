import React from "react";

const Logout = () => {
  const navigate = useNavigate();
  const setIsLoggedIn = useContext(SetIsLoggedInContext);
  const handleLogout = () => {
    axios
      .post("http://localhost:5173/logout", {}, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(false);
          navigate("/"); //navigates to home page
        }
      })

      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <button className="btn btn-outline btn-primary" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
