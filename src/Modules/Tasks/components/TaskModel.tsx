import { useState, useEffect } from "react";
import { type Task } from "./../../../interfaces/Tasks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTasks,
  faTimes,
  faUser,
  faCalendarAlt,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null | undefined;
}

export function TaskModal({ isOpen, onClose, task }: TaskModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };


  if (!isVisible || !task) return null;

  return (
    <>
      <div
        className="modal-backdrop show"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1050,
        }}
        onClick={onClose}
      />

      <div
        className="modal d-block show"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1055,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content" style={{ borderRadius: 16 }}>
            <div
              className="modal-header border-0"
              style={{ background: "#5a8a7a", color: "white" }}
            >
              <h5 className="modal-title fw-bold">{task.title}</h5>
              <button className="btn btn-close btn-close-white" onClick={onClose}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <div className="modal-body p-4">
              <div className="mb-4">
                <h6 className="text-muted">{task.description}</h6>
              </div>

              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faUser} className="me-2 text-success" />
                    <span>
                      <strong>Assigned:</strong> {task.employee.userName}
                    </span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faTasks} className="me-2 text-primary" />
                    <span>
                      <strong>Status:</strong> {task.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <div className="p-3 rounded bg-light">
                    <FontAwesomeIcon icon={faCalendarAlt} className="me-2 text-success" />
                    <strong>Created:</strong> {formatDate(task.creationDate)}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-3 rounded bg-light">
                    <FontAwesomeIcon icon={faEdit} className="me-2 text-warning" />
                    <strong>Modified:</strong> {formatDate(task.modificationDate)}
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer border-0 p-3 bg-light">
              <button className="btn btn-outline-secondary" onClick={onClose}>
                Close
              </button>
                     <Link
                  state={{ task }}
                  to={`/dashboard/tasks-data`}
                  type="button"
                  className="btn px-4"
                  style={{
                    backgroundColor: "#5a8a7a",
                    borderColor: "#5a8a7a",
                    color: "white",
                  }}

                >
                  <FontAwesomeIcon icon={faEdit} className="me-2" />
                  Edit Task
                </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
