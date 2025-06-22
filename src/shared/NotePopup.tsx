import { useContext } from "react";
import {
  CrownIcon,
  EditIcon,
  EyeIcon,
  KeyIcon,
  ShieldIcon,
  TrashIcon,
  UserPlusIcon,
  UsersIcon,
} from "../assets/SVGIcons/NotificationIcons";
import { AuthContext } from "../contexts/AuthContext";

interface NotePopupProps {
  showPrivileges: boolean;
  setShowPrivileges: React.Dispatch<React.SetStateAction<boolean>>;
}

const NotePopup: React.FC<NotePopupProps> = ({
  showPrivileges,
  setShowPrivileges,
}) => {
  const auth = useContext(AuthContext);

  const userPrivileges = {
    Manager: [
      {
        text: "Full system access",
        icon: <CrownIcon />,
        description: "You have complete control over the system",
      },
      {
        text: "Add new team members",
        icon: <UserPlusIcon />,
        description: "Invite and create new user accounts",
      },
      {
        text: "Edit user profiles",
        icon: <EditIcon />,
        description: "Modify other users' information and settings",
      },
      {
        text: "Remove team members",
        icon: <TrashIcon />,
        description: "Delete user accounts from the system",
      },
      {
        text: "View all user details",
        icon: <EyeIcon />,
        description: "Access detailed information about any user",
      },
      {
        text: "See your own profile",
        icon: <EyeIcon />,
        description: "View and access your personal information",
      },
      {
        text: "Manage all users",
        icon: <UsersIcon />,
        description: "Oversee and control all user accounts",
      },
      {
        text: "Change passwords",
        icon: <KeyIcon />,
        description: "Reset and update user passwords",
      },
    ],
    Employee: [
      {
        text: "Change your password",
        icon: <KeyIcon />,
        description: "Update your own login password",
      },
      {
        text: "See your own profile",
        icon: <EyeIcon />,
        description: "View your personal information and settings",
      },
      {
        text: "Edit your profile",
        icon: <EditIcon />,
        description: "Update your own personal information",
      },
      {
        text: "Standard user access",
        icon: <UsersIcon />,
        description: "Regular employee permissions",
      },
    ],
  };

  const role = auth?.LoginData?.roles?.[0];
  const privileges =
    userPrivileges[role === "Manager" ? "Manager" : "Employee"];

  return (
    <div>
      {showPrivileges && (
        <div
          className="position-absolute bg-white rounded shadow-lg"
          style={{
            top: "calc(100% + 8px)",
            right: "20%",
            width: "260px",
            zIndex: 1000,
            border: "1px solid rgba(90, 138, 122, 0.15)",
            boxShadow: "0 10px 30px rgba(90, 138, 122, 0.2)",
            animation: "fadeInUp 0.2s ease",
          }}
          onMouseEnter={() => setShowPrivileges(true)}
          onMouseLeave={() => setShowPrivileges(false)}
        >
          {/* Popover Arrow */}
          <div
            className="position-absolute"
            style={{
              top: "-6px",
              right: "16px",
              width: "12px",
              height: "12px",
              backgroundColor: "white",
              border: "1px solid rgba(90, 138, 122, 0.15)",
              borderBottom: "none",
              borderRight: "none",
              transform: "rotate(45deg)",
            }}
          />

          {/* Header */}
          <div
            className="px-3 py-2 rounded-top d-flex align-items-center"
            style={{
              background: "linear-gradient(135deg, #5a8a7a 0%, #6b9b8a 100%)",
              color: "white",
            }}
          >
            <ShieldIcon />
            <span className="ms-2 fw-bold small">What You Can Do</span>
            <span
              className="ms-auto badge rounded-pill"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                fontSize: "0.7rem",
              }}
            >
              {role === "Manager" ? "Manager" : "Employee"}
            </span>
          </div>

          {/* Content */}
          <div className="p-2">
            <div className="small text-muted mb-2">
              Hi{" "}
              <strong style={{ color: "#5a8a7a" }}>
                {auth?.LoginData?.userName}
              </strong>
              ! Here's what you can do:
            </div>

            {/* User-Friendly Permissions */}
            <div className="d-flex flex-column gap-1">
              {privileges.slice(0, 4).map((privilege, index) => (
                <div
                  key={index}
                  className="d-flex align-items-start p-1 rounded"
                  style={{
                    backgroundColor: "#f8fffe",
                    border: "1px solid rgba(90, 138, 122, 0.1)",
                  }}
                  title={privilege.description}
                >
                  <div className="me-2 mt-1">{privilege.icon}</div>
                  <div>
                    <div
                      className="small fw-medium"
                      style={{ color: "#5a8a7a" }}
                    >
                      {privilege.text}
                    </div>
                    <div className="text-muted" style={{ fontSize: "0.7rem" }}>
                      {privilege.description}
                    </div>
                  </div>
                </div>
              ))}

              {privileges.length > 4 && (
                <div
                  className="text-center py-1 px-2 rounded small"
                  style={{
                    backgroundColor: "rgba(90, 138, 122, 0.1)",
                    color: "#5a8a7a",
                    fontSize: "0.75rem",
                  }}
                >
                  ✨ Plus {privileges.length - 4} more capabilities
                </div>
              )}
            </div>

            {/* Footer */}
            <div
              className="mt-2 p-2 rounded text-center"
              style={{
                backgroundColor: "rgba(90, 138, 122, 0.05)",
                fontSize: "0.7rem",
                color: "#5a8a7a",
              }}
            >
              <strong>Your Role:</strong> {role === "Manager" ? "Manager" : "Employee"}
              <br />
              <span className="text-muted">
                {auth?.LoginData?.roles[0] === "Manager"
                  ? "You have full control of the system"
                  : "You can manage your own account"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotePopup;
