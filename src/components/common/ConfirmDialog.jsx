import React from "react";
import Modal from "./Modal";
import Button from "./Button";

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = true,
  loading = false,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="small"
      footer={
        <div className="confirm-actions">
          <Button variant="secondary" onClick={onClose}>
            {cancelText}
          </Button>

          <Button
            variant={danger ? "danger" : "primary"}
            onClick={onConfirm}
            loading={loading}
          >
            {confirmText}
          </Button>
        </div>
      }
    >
      <div className="confirmation-content">
        <div
          className={`confirmation-icon ${
            danger ? "confirmation-danger" : "confirmation-warning"
          }`}
        >
          <i
            className={`fa-solid ${
              danger ? "fa-triangle-exclamation" : "fa-circle-question"
            }`}
          ></i>
        </div>

        <p>{message}</p>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;