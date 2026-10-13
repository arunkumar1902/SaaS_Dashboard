import React, { useMemo, useState } from "react";

import PageHeader from "../components/layout/PageHeader";
import Button from "../components/common/Button";
import SearchBar from "../components/common/SearchBar";
import FilterDropdown from "../components/common/FilterDropdown";
import Modal from "../components/common/Modal";
import Drawer from "../components/common/Drawer";
import ConfirmDialog from "../components/common/ConfirmDialog";
import Toast from "../components/common/Toast";
import EmptyState from "../components/common/EmptyState";

import PlanCard from "../components/plans/PlanCard";
import PlanForm from "../components/plans/PlanForm";
import PlanDetails from "../components/plans/PlanDetails";

import { useSaaS } from "../context/SaaSContext";

const Plans = () => {
  const {
    plans,
    addPlan,
    updatePlan,
    deletePlan,
  } = useSaaS();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [billingCycle, setBillingCycle] =
    useState("");

  const [showForm, setShowForm] =
    useState(false);

  const [editingPlan, setEditingPlan] =
    useState(null);

  const [selectedPlan, setSelectedPlan] =
    useState(null);

  const [deleteTarget, setDeleteTarget] =
    useState(null);

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  const filteredPlans = useMemo(() => {
    return plans.filter((plan) => {
      const searchMatch =
        !search ||
        plan.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        plan.description
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const statusMatch =
        !status || plan.status === status;

      const billingMatch =
        !billingCycle ||
        plan.billingCycle === billingCycle;

      return (
        searchMatch &&
        statusMatch &&
        billingMatch
      );
    });
  }, [
    plans,
    search,
    status,
    billingCycle,
  ]);

  const showToast = (
    message,
    type = "success"
  ) => {
    setToast({
      visible: true,
      message,
      type,
    });
  };

  const handleSubmit = (form) => {
    if (editingPlan) {
      updatePlan(editingPlan.id, form);

      showToast(
        "Plan updated successfully."
      );
    } else {
      addPlan(form);

      showToast(
        "Plan created successfully."
      );
    }

    setShowForm(false);
    setEditingPlan(null);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;

    deletePlan(deleteTarget.id);

    showToast(
      `${deleteTarget.name} was deleted.`
    );

    setDeleteTarget(null);
  };

  return (
    <div className="page-container">
      <PageHeader
        title="Pricing Plans"
        description="Create and manage your SaaS pricing plans."
        action={
          <Button
            icon="fa-plus"
            onClick={() => {
              setEditingPlan(null);
              setShowForm(true);
            }}
          >
            Add Plan
          </Button>
        }
      />

      <div className="filter-toolbar">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search plans..."
        />

        <FilterDropdown
          value={status}
          onChange={setStatus}
          placeholder="All Statuses"
          options={[
            "Active",
            "Inactive",
          ]}
        />

        <FilterDropdown
          value={billingCycle}
          onChange={setBillingCycle}
          placeholder="All Billing Cycles"
          options={[
            "Monthly",
            "Yearly",
          ]}
        />
      </div>

      {filteredPlans.length === 0 ? (
        <div className="content-card">
          <EmptyState
            icon="fa-layer-group"
            title="No plans found"
            message="Try changing your search or filters."
            actionText="Create Plan"
            onAction={() => {
              setEditingPlan(null);
              setShowForm(true);
            }}
          />
        </div>
      ) : (
        <div className="plans-grid">
          {filteredPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              featured={plan.featured}
              onView={setSelectedPlan}
              onEdit={(currentPlan) => {
                setEditingPlan(currentPlan);
                setShowForm(true);
              }}
              onDelete={setDeleteTarget}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingPlan(null);
        }}
        title={
          editingPlan
            ? "Edit Pricing Plan"
            : "Create Pricing Plan"
        }
        size="large"
      >
        <PlanForm
          plan={editingPlan}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingPlan(null);
          }}
        />
      </Modal>

      <Drawer
        isOpen={Boolean(selectedPlan)}
        onClose={() => setSelectedPlan(null)}
        title="Plan Details"
      >
        <PlanDetails plan={selectedPlan} />
      </Drawer>

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Plan"
        message={
          deleteTarget
            ? `Are you sure you want to delete the ${deleteTarget.name} plan?`
            : ""
        }
        confirmText="Delete Plan"
      />

      <Toast
        {...toast}
        onClose={() =>
          setToast((previous) => ({
            ...previous,
            visible: false,
          }))
        }
      />
    </div>
  );
};

export default Plans;