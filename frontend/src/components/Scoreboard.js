import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Scoreboard = () => {
  const accessToken = useSelector((store) => store.member.accessToken);
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  return (
    <>
      <Link to="/profile">Go back to profile</Link>
      <h1>Scorboard</h1>
    </>
  );
};

export default Scoreboard;
