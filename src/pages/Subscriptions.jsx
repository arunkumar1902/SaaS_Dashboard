import React, { useMemo, useState } from "react";

import PageHeader from "../components/layout/PageHeader";
import SearchBar from "../components/common/SearchBar";
import FilterDropdown from "../components/common/FilterDropdown";
import Pagination from "../components/common/Pagination";
import Drawer from "../components/common/Drawer";
import ConfirmDialog from "../components/common/ConfirmDialog";
import Toast from "../components/common/Toast";
import EmptyState from "../components/common/EmptyState";
import DateRangeFilter from "../components/common/DateRangeFilter";

import SubscriptionTable from "../components/subscriptions/SubscriptionTable";
import SubscriptionDetails from "../components/subscriptions/SubscriptionDetails";

import { useSaaS } from "../context/SaaSContext";
import {
  filterBySearch,
  paginateItems,
} from "../utils/filters";

const Subscriptions = () => {
  const {
    subscriptions,
    cancelSubscription,
  } = useSaaS();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [plan, setPlan] = useState("");

  const [startDate, setStartDate] =
    useState("");
  const [endDate, setEndDate] =
    useState("");

  const [page, setPage] = useState(1);

  const [selectedSubscription, setSelectedSubscription] =
    useState(null);

  const [cancelTarget, setCancelTarget] =
    useState(null);

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  const itemsPerPage = 8;

  const filteredSubscriptions =
    useMemo(() => {
      let result = filterBySearch(
        subscriptions,
        search,
        [
          "customerName",
          "email",
          "plan",
          "id",
        ]
      );

      if (status) {
        result = result.filter(
          (subscription) =>
            subscription.status === status
        );
      }

      if (plan) {
        result = result.filter(
          (subscription) =>
            subscription.plan === plan
        );
      }

      return result;
    }, [
      subscriptions,
      search,
      status,
      plan,
    ]);

  const paginatedSubscriptions =
    paginateItems(
      filteredSubscriptions,
      page,
      itemsPerPage
    );

  const totalPages = Math.ceil(
    filteredSubscriptions.length /
      itemsPerPage
  );

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

  const handleCancel = () => {
    if (!cancelTarget) return;

    cancelSubscription(cancelTarget.id);

    showToast(
      "Subscription cancelled successfully."
    );

    setCancelTarget(null);
  };

  return (
    <div className="page-container">
      <PageHeader
        title="Subscriptions"
        description="Monitor active, trial, cancelled and past-due subscriptions."
      />

      <div className="subscription-summary-grid">
        <div className="mini-stat">
          <span>Total</span>
          <strong>
            {subscriptions.length}
          </strong>
        </div>

        <div className="mini-stat">
          <span>Active</span>
          <strong>
            {
              subscriptions.filter(
                (item) =>
                  item.status === "Active"
              ).length
            }
          </strong>
        </div>

        <div className="mini-stat">
          <span>Trial</span>
          <strong>
            {
              subscriptions.filter(
                (item) =>
                  item.status === "Trial"
              ).length
            }
          </strong>
        </div>

        <div className="mini-stat">
          <span>Past Due</span>
          <strong>
            {
              subscriptions.filter(
                (item) =>
                  item.status === "PastDue"
              ).length
            }
          </strong>
        </div>
      </div>

      <div className="filter-toolbar subscription-filters">
        <SearchBar
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          placeholder="Search subscriptions..."
        />

        <FilterDropdown
          value={status}
          onChange={(value) => {
            setStatus(value);
            setPage(1);
          }}
          placeholder="All Statuses"
          options={[
            "Active",
            "Trial",
            "PastDue",
            "Cancelled",
            "Expired",
            "Paused",
          ]}
        />

        <FilterDropdown
          value={plan}
          onChange={(value) => {
            setPlan(value);
            setPage(1);
          }}
          placeholder="All Plans"
          options={[
            "Free",
            "Starter",
            "Professional",
            "Enterprise",
          ]}
        />
      </div>

      <div className="date-filter-card">
        <DateRangeFilter
          startDate={startDate}
          endDate={endDate}
          onStartChange={setStartDate}
          onEndChange={setEndDate}
          onClear={() => {
            setStartDate("");
            setEndDate("");
          }}
        />
      </div>

      <div className="content-card">
        {filteredSubscriptions.length === 0 ? (
          <EmptyState
            icon="fa-repeat"
            title="No subscriptions found"
            message="No subscriptions match your current filters."
          />
        ) : (
          <>
            <SubscriptionTable
              subscriptions={
                paginatedSubscriptions
              }
              onView={(subscription) =>
                setSelectedSubscription(
                  subscription
                )
              }
              onCancel={(subscription) =>
                setCancelTarget(subscription)
              }
            />

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              totalItems={
                filteredSubscriptions.length
              }
              itemsPerPage={itemsPerPage}
            />
          </>
        )}
      </div>

      <Drawer
        isOpen={Boolean(
          selectedSubscription
        )}
        onClose={() =>
          setSelectedSubscription(null)
        }
        title="Subscription Details"
        width="520px"
      >
        <SubscriptionDetails
          subscription={selectedSubscription}
        />
      </Drawer>

      <ConfirmDialog
        isOpen={Boolean(cancelTarget)}
        onClose={() => setCancelTarget(null)}
        onConfirm={handleCancel}
        title="Cancel Subscription"
        message={
          cancelTarget
            ? `Are you sure you want to cancel ${cancelTarget.customerName}'s ${cancelTarget.plan} subscription?`
            : ""
        }
        confirmText="Cancel Subscription"
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

export default Subscriptions;