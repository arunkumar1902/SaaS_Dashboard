import React, { useEffect } from "react";

const Drawer = ({
  isOpen,
  onClose,
  title,
  children,
  position = "right",
  width = "460px",
  footer,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onMouseDown={onClose}>
      <aside
        className={`drawer drawer-${position}`}
        style={{ "--drawer-width": width }}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="drawer-header">
          <h2>{title}</h2>

          <button
            className="drawer-close"
            onClick={onClose}
            aria-label="Close drawer"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="drawer-content">{children}</div>

        {footer && <div className="drawer-footer">{footer}</div>}
      </aside>
    </div>
  );
};

export default Drawer;