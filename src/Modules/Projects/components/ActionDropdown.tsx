"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisV, faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"

interface ActionDropdownProps {
  projectId: number
  onView: (id: number) => void
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

export function ActionDropdown({ projectId, onView, onEdit, onDelete }: ActionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpen(!isOpen)
  }

  const handleAction = (action: () => void, e: React.MouseEvent) => {
    e.stopPropagation()
    action()
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="position-relative" ref={dropdownRef}>
      <button
        className="btn btn-link text-secondary p-2 action-menu-btn"
        onClick={toggleDropdown}
        style={{
          border: "none",
          background: "none",
          borderRadius: "6px",
          transition: "all 0.2s ease",
        }}
      >
        <FontAwesomeIcon icon={faEllipsisV} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="position-fixed top-0 start-0 w-100 h-100"
            style={{ zIndex: 1040 }}
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Menu */}
          <div
            className="dropdown-menu show position-absolute"
            style={{
              top: "100%",
              right: "0",
              zIndex: 1050,
              minWidth: "180px",
              marginTop: "4px",
              border: "none",
              borderRadius: "12px",
              backgroundColor: "#ffffff",
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
              padding: "8px",
              animation: "dropdownSlideIn 0.2s ease-out",
            }}
          >
            {/* View Button */}
            <button
              className="dropdown-item d-flex align-items-center px-2 py-1 action-item-view"
              onClick={(e) => handleAction(() => onView(projectId), e)}
              style={{
                border: "none",
                background: "none",
                width: "100%",
                textAlign: "left",
                borderRadius: "8px",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div className="d-flex align-items-center w-100">
                <div
                  className="icon-wrapper d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "6px",
                    backgroundColor: "#f0f8f6",
                    transition: "all 0.3s ease",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faEye}
                    style={{
                      color: "#5a8a7a",
                      fontSize: "14px",
                      transition: "all 0.3s ease",
                    }}
                  />
                </div>
                <div>
                  <span
                    className="action-text"
                    style={{
                      color: "#333",
                      fontSize: "14px",
                      fontWeight: "500",
                      transition: "all 0.3s ease",
                    }}
                  >
                    View Details
                  </span>
                  <div
                    className="action-subtitle"
                    style={{
                      color: "#888",
                      fontSize: "12px",
                      marginTop: "2px",
                      opacity: 0,
                      transform: "translateY(-5px)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    View project information
                  </div>
                </div>
              </div>
            </button>

            {/* Update Button */}
            <button
              className="dropdown-item d-flex align-items-center px-2 py-1 action-item-edit"
              onClick={(e) => handleAction(() => onEdit(projectId), e)}
              style={{
                border: "none",
                background: "none",
                width: "100%",
                textAlign: "left",
                borderRadius: "8px",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
                marginTop: "4px",
              }}
            >
              <div className="d-flex align-items-center w-100">
                <div
                  className="icon-wrapper d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "6px",
                    backgroundColor: "#fef7e6",
                    transition: "all 0.3s ease",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faEdit}
                    style={{
                      color: "#f39c12",
                      fontSize: "14px",
                      transition: "all 0.3s ease",
                    }}
                  />
                </div>
                <div>
                  <span
                    className="action-text"
                    style={{
                      color: "#333",
                      fontSize: "14px",
                      fontWeight: "500",
                      transition: "all 0.3s ease",
                    }}
                  >
                    Update Project
                  </span>
                  <div
                    className="action-subtitle"
                    style={{
                      color: "#888",
                      fontSize: "12px",
                      marginTop: "2px",
                      opacity: 0,
                      transform: "translateY(-5px)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    Edit project details
                  </div>
                </div>
              </div>
            </button>

            {/* Divider */}
            <hr
              className="dropdown-divider my-2"
              style={{
                margin: "8px 0",
                borderColor: "#f0f0f0",
                opacity: 0.5,
              }}
            />

            {/* Delete Button */}
            <button
              className="dropdown-item d-flex align-items-center px-2 py-1 action-item-delete"
              onClick={(e) => handleAction(() => onDelete(projectId), e)}
              style={{
                border: "none",
                background: "none",
                width: "100%",
                textAlign: "left",
                borderRadius: "8px",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div className="d-flex align-items-center w-100">
                <div
                  className="icon-wrapper d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "6px",
                    backgroundColor: "#fef2f2",
                    transition: "all 0.3s ease",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{
                      color: "#dc3545",
                      fontSize: "14px",
                      transition: "all 0.3s ease",
                    }}
                  />
                </div>
                <div>
                  <span
                    className="action-text"
                    style={{
                      color: "#dc3545",
                      fontSize: "14px",
                      fontWeight: "500",
                      transition: "all 0.3s ease",
                    }}
                  >
                    Delete Project
                  </span>
                  <div
                    className="action-subtitle"
                    style={{
                      color: "#888",
                      fontSize: "12px",
                      marginTop: "2px",
                      opacity: 0,
                      transform: "translateY(-5px)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    Remove permanently
                  </div>
                </div>
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  )
}
