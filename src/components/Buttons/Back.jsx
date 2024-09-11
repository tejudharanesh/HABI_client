import { useNavigate } from "react-router-dom";
import back from "../../assets/images/back.png";

function Back() {
  const navigate = useNavigate();

  return (
    <button
      className="absolute top-3 left-5 md:hidden"
      onClick={() => navigate(-1)}
    >
      <img src={back} alt="back" />
    </button>
  );
}

export default Back;
