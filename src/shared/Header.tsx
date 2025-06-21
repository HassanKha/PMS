import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import type { HeaderProps } from "../interfaces/HeaderProps";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Header: React.FC<HeaderProps> = ({
  Title,
  BtnTitle,
}) => {
  const location = useLocation();
  const auth = useContext(AuthContext);

  return (
    <div className="d-flex flex-column rounded-2 flex-lg-row w-100 font-mont justify-content-between bg-white p-3 px-lg-4 py-lg-3 align-items-start align-items-lg-center mb-4">
      <h1 className="h4 h2-lg fw-bold text-dark mb-2 mb-lg-0">{Title}</h1>

      {auth?.LoginData?.roles[0] === "Manager" && BtnTitle ?   (
        <Link
          type="button"
          className="btn LinkBTM text-white d-flex align-items-center gap-2 px-3 px-lg-4 py-2"
          style={{
            border: "none",
            borderRadius: "8px",
          }}
          to={
            location.pathname == "/dashboard/projects"
              ? "/dashboard/project-data"
              : "/dashboard/tasks"
          }
        >
          <FontAwesomeIcon
            icon={faPlus}
            style={{ color: "#fff", fontSize: "18px" }}
          />
          <span>{BtnTitle}</span>
        </Link>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
