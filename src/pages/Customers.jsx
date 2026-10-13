import React, { useMemo, useState } from "react";

import PageHeader from "../components/layout/PageHeader";
import SearchBar from "../components/common/SearchBar";
import FilterDropdown from "../components/common/FilterDropdown";
import Pagination from "../components/common/Pagination";
import EmptyState from "../components/common/EmptyState";
import Drawer from "../components/common/Drawer";

import UserTable from "../components/users/UserTable";
import UserDetails from "../components/users/UserDetails";

import { useSaaS } from "../context/SaaSContext";
import {
  filterBySearch,
  paginateItems,
  sortItems,
} from "../utils/filters";

const Customers = () => {
  const { users } = useSaaS();

  const [search, setSearch] = useState("");
  const [plan, setPlan] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] =
    useState(null);

  const itemsPerPage = 8;

  const customers = useMemo(() => {
    let result = filterBySearch(
      users,
      search,
      ["name", "email", "company"]
    );

    if (plan) {
      result = result.filter(
        (customer) => customer.plan === plan
      );
    }

    if (status) {
      result = result.filter(
        (customer) =>
          customer.status === status
      );
    }

    return sortItems(
      result,
      "name",
      "asc"
    );
  }, [users, search, plan, status]);

  const paginatedCustomers = paginateItems(
    customers,
    page,
    itemsPerPage
  );

  const totalPages = Math.ceil(
    customers.length / itemsPerPage
  );

  return (
    <div className="page-container">
      <PageHeader
        title="Customers"
        description="View and manage your SaaS customer base."
      />

      <div className="customer-summary-grid">
        <div className="mini-stat">
          <span>Total Customers</span>
          <strong>{users.length}</strong>
        </div>

        <div className="mini-stat">
          <span>Active Customers</span>
          <strong>
            {
              users.filter(
                (user) =>
                  user.status === "Active"
              ).length
            }
          </strong>
        </div>

        <div className="mini-stat">
          <span>Paid Customers</span>
          <strong>
            {
              users.filter(
                (user) =>
                  user.plan !== "Free"
              ).length
            }
          </strong>
        </div>

        <div className="mini-stat">
          <span>Enterprise</span>
          <strong>
            {
              users.filter(
                (user) =>
                  user.plan === "Enterprise"
              ).length
            }
          </strong>
        </div>
      </div>

      <div className="filter-toolbar">
        <SearchBar
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          placeholder="Search customers..."
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

        <FilterDropdown
          value={status}
          onChange={(value) => {
            setStatus(value);
            setPage(1);
          }}
          placeholder="All Statuses"
          options={[
            "Active",
            "Inactive",
            "Suspended",
            "Pending",
          ]}
        />
      </div>

      <div className="content-card">
        {customers.length === 0 ? (
          <EmptyState
            icon="fa-user-group"
            title="No customers found"
            message="No customers match your current filters."
          />
        ) : (
          <>
            <UserTable
              users={paginatedCustomers}
              onView={(customer) =>
                setSelectedCustomer(customer)
              }
            />

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              totalItems={customers.length}
              itemsPerPage={itemsPerPage}
            />
          </>
        )}
      </div>

      <Drawer
        isOpen={Boolean(selectedCustomer)}
        onClose={() =>
          setSelectedCustomer(null)
        }
        title="Customer Details"
      >
        <UserDetails user={selectedCustomer} />
      </Drawer>
    </div>
  );
};

export default Customers;