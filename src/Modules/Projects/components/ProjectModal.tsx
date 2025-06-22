"use client"

import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTimes,
  faCalendarAlt,
  faEdit,
  faTasks,
  faUser,
  faCheckCircle,
  faExclamationCircle,
  faClock,
} from "@fortawesome/free-solid-svg-icons"
import type { Project } from "../../../interfaces/Project"
import { Link, useNavigate } from "react-router-dom"



interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: Project | null | undefined
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Done":
        return "#28a745"
      case "InProgress":
        return "#f39c12"
      case "ToDo":
        return "#6c757d"
      default:
        return "#6c757d"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Done":
        return faCheckCircle
      case "InProgress":
        return faExclamationCircle
      case "ToDo":
        return faClock
      default:
        return faClock
    }
  }

  if (!isVisible) return null

  return (
    <>

      <div
        className={`modal-backdrop ${isOpen ? "show" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1050,
          opacity: isOpen ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
        onClick={onClose}
      />


      <div
        className={`modal d-block ${isOpen ? "show" : ""}`}
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
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          style={{
            maxWidth: "900px",
            width: "100%",
            transform: isOpen ? "scale(1)" : "scale(0.9)",
            opacity: isOpen ? 1 : 0,
            transition: "all 0.3s ease",
          }}
        >
          <div
            className="modal-content"
            style={{
              borderRadius: "16px",
              border: "none",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)",
              overflow: "hidden",
            }}
          >

            <div
              className="modal-header border-0 position-relative"
              style={{
                background: "linear-gradient(135deg, #5a8a7a 0%, #4a7a6a 100%)",
                color: "white",
                padding: "2rem 2rem 1rem 2rem",
              }}
            >
              <div className="w-100">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="flex-grow-1">
                    <h4 className="modal-title mb-2 fw-bold" style={{ fontSize: "1.5rem" }}>
                      {project?.title}
                    </h4>
                    <p className="mb-0 opacity-90" style={{ fontSize: "1rem" }}>
                      {project?.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn-close btn-close-white ms-3"
                    onClick={onClose}
                    style={{
                      fontSize: "1.2rem",
                      opacity: 0.8,
                      transition: "opacity 0.2s ease",
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>


                <div className="row g-lg-3 justify-content-center align-items-center g-1 ">
                  <div className="col-md-4  col-sm-4 ">
                    <div className="d-flex align-items-center ">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center me-2"
                        style={{
                          width: "32px",
                          height: "32px",
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                        }}
                      >
                        <FontAwesomeIcon icon={faTasks} size="sm" />
                      </div>
                      <div>
                        <div className="fw-semibold">{project?.task.length || 0}</div>
                        <small className="opacity-90">Total Tasks</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div className="d-flex align-items-center">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center me-2"
                        style={{
                          width: "32px",
                          height: "32px",
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                        }}
                      >
                        <FontAwesomeIcon icon={faCheckCircle} size="sm" />
                      </div>
                      <div>
                        <div className="fw-semibold">
                          {project?.task.filter((task) => task.status === "Done").length || 0}
                        </div>
                        <small className="opacity-90">Completed</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div className="d-flex align-items-center">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center me-2"
                        style={{
                          width: "32px",
                          height: "32px",
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                        }}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} size="sm" />
                      </div>
                      <div>
                        <div className="fw-semibold">ID: {project?.id}</div>
                        <small className="opacity-90">Project ID</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

    
            <div className="modal-body p-0">
          
              <div className="p-4 border-bottom">
                <h5 className="mb-3 d-flex align-items-center">
                  <FontAwesomeIcon icon={faCalendarAlt} className="me-2 text-muted" />
                  Project Timeline
                </h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="p-3 rounded" style={{ backgroundColor: "#f8f9fa" }}>
                      <div className="d-flex align-items-center mb-2">
                        <FontAwesomeIcon icon={faUser} className="me-2 text-success" />
                        <strong className="text-success">Created</strong>
                      </div>
                      <div className="text-muted">{project && formatDate(project.creationDate)}</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-3 rounded" style={{ backgroundColor: "#f8f9fa" }}>
                      <div className="d-flex align-items-center mb-2">
                        <FontAwesomeIcon icon={faEdit} className="me-2 text-warning" />
                        <strong className="text-warning">Last Modified</strong>
                      </div>
                      <div className="text-muted">{project && formatDate(project.modificationDate)}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="mb-0 d-flex align-items-center">
                    <FontAwesomeIcon icon={faTasks} className="me-2 text-muted" />
                    Tasks ({project?.task.length || 0})
                  </h5>
                </div>

                {project?.task && project.task.length > 0 ? (
                  <div className="row g-3">
                    {project.task.map((task, index) => (
                      <div key={task.id} className="col-12">
                        <div
                          className="card border-0 shadow-sm task-card"
                          style={{
                            transition: "transform 0.2s ease, box-shadow 0.2s ease",
                            animationDelay: `${index * 0.1}s`,
                          }}
                        >
                          <div className="card-body p-3">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <div className="flex-grow-1">
                                <h6 className="card-title mb-1 d-flex align-items-center">
                                  <FontAwesomeIcon
                                    icon={getStatusIcon(task.status)}
                                    className="me-2"
                                    style={{ color: getStatusColor(task.status) }}
                                  />
                                  {task.title}
                                </h6>
                                <p className="card-text text-muted mb-2" style={{ fontSize: "0.9rem" }}>
                                  {task.description}
                                </p>
                              </div>
                              <span
                                className="badge px-3 py-1 ms-3"
                                style={{
                                  backgroundColor: getStatusColor(task.status),
                                  color: "white",
                                  borderRadius: "20px",
                                  fontSize: "0.75rem",
                                }}
                              >
                                {task.status}
                              </span>
                            </div>
                            <div className="d-flex justify-content-between text-muted" style={{ fontSize: "0.8rem" }}>
                              <span>
                                <FontAwesomeIcon icon={faUser} className="me-1" />
                                Created: {formatDate(task.creationDate)}
                              </span>
                              <span>
                                <FontAwesomeIcon icon={faEdit} className="me-1" />
                                Modified: {formatDate(task.modificationDate)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <FontAwesomeIcon icon={faTasks} size="3x" className="text-muted mb-3" />
                    <h6 className="text-muted">No tasks found</h6>
                    <p className="text-muted mb-0">This project doesn't have any tasks yet.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="modal-footer border-0 bg-light p-4">
              <div className="d-flex justify-content-end gap-2 w-100">
                <button type="button" className="btn btn-outline-secondary px-4" onClick={onClose}>
                  Close
                </button>
                <Link
                  state={{ project }}
                  to={`/dashboard/project-data`}
                  type="button"
                  className="btn px-4"
                  style={{
                    backgroundColor: "#5a8a7a",
                    borderColor: "#5a8a7a",
                    color: "white",
                  }}

                >
                  <FontAwesomeIcon icon={faEdit} className="me-2" />
                  Edit Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
