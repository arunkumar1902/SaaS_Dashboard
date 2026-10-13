import React from "react";

const PageHeader = ({
  title,
  description,
  action,
  breadcrumbs = [],
}) => {
  return (
    <div className="page-header">
      <div className="page-header-content">
        {breadcrumbs.length > 0 && (
          <div className="breadcrumbs">
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={index}>
                <span
                  className={
                    index === breadcrumbs.length - 1
                      ? "breadcrumb-current"
                      : ""
                  }
                >
                  {item}
                </span>

                {index < breadcrumbs.length - 1 && (
                  <i className="fa-solid fa-chevron-right"></i>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        <h1>{title}</h1>

        {description && <p>{description}</p>}
      </div>

      {action && (
        <div className="page-header-action">
          {action}
        </div>
      )}
    </div>
  );
};

export default PageHeader;