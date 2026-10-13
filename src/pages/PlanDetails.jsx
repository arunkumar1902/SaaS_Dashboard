import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "../components/layout/PageHeader";
import Button from "../components/common/Button";
import EmptyState from "../components/common/EmptyState";
import PlanDetailsComponent from "../components/plans/PlanDetails";

import { useSaaS } from "../context/SaaSContext";

const PlanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { plans } = useSaaS();

  const plan = plans.find(
    (item) => item.id === id
  );

  if (!plan) {
    return (
      <div className="page-container">
        <EmptyState
          icon="fa-layer-group"
          title="Plan not found"
          message="The requested pricing plan does not exist."
          actionText="Back to Plans"
          onAction={() => navigate("/plans")}
        />
      </div>
    );
  }

  return (
    <div className="page-container">
      <PageHeader
        title={plan.name}
        description="Detailed pricing plan information."
        breadcrumbs={[
          "Plans",
          plan.name,
        ]}
        action={
          <Button
            variant="secondary"
            icon="fa-arrow-left"
            onClick={() => navigate("/plans")}
          >
            Back to Plans
          </Button>
        }
      />

      <div className="content-card plan-detail-page">
        <PlanDetailsComponent plan={plan} />
      </div>
    </div>
  );
};

export default PlanDetails;