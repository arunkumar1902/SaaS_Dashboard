import React, { useMemo, useState } from "react";

import PageHeader from "../components/layout/PageHeader";
import Button from "../components/common/Button";
import SearchBar from "../components/common/SearchBar";
import FilterDropdown from "../components/common/FilterDropdown";
import Pagination from "../components/common/Pagination";
import Modal from "../components/common/Modal";
import Drawer from "../components/common/Drawer";
import ConfirmDialog from "../components/common/ConfirmDialog";
import Toast from "../components/common/Toast";
import EmptyState from "../components/common/EmptyState";

import UserTable from "../components/users/UserTable";
import UserForm from "../components/users/UserForm";
import UserDetails from "../components/users/UserDetails";

import { useSaaS } from "../context/SaaSContext";
import {
  filterBySearch,
  paginateItems,
  sortItems,
} from "../utils/filters";

const Users = () => {
  const {
    users,
    addUser,
    updateUser,
    deleteUser,
  } = useSaaS();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [plan, setPlan] = useState("");
  const [sortField, setSortField] =
    useState("name");
  const [sortDirection, setSortDirection] =
    useState("asc");

  const [page, setPage] = useState(1);

  const [showForm, setShowForm] =
    useState(false);
  const [editingUser, setEditingUser] =
    useState(null);

  const [selectedUser, setSelectedUser] =
    useState(null);

  const [deleteTarget, setDeleteTarget] =
    useState(null);

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  const itemsPerPage = 8;

  const filteredUsers = useMemo(() => {
    let result = filterBySearch(
      users,
      search,
      ["name", "email", "company", "role"]
    );

    if (status) {
      result = result.filter(
        (user) => user.status === status
      );
    }

    if (plan) {
      result = result.filter(
        (user) => user.plan === plan
      );
    }

    return sortItems(
      result,
      sortField,
      sortDirection
    );
  }, [
    users,
    search,
    status,
    plan,
    sortField,
    sortDirection,
  ]);

  const paginatedUsers = paginateItems(
    filteredUsers,
    page,
    itemsPerPage
  );

  const totalPages = Math.ceil(
    filteredUsers.length / itemsPerPage
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

  const handleSubmit = (form) => {
    if (editingUser) {
      updateUser(editingUser.id, form);

      showToast(
        "User updated successfully."
      );
    } else {
      addUser(form);

      showToast(
        "User created successfully."
      );
    }

    setShowForm(false);
    setEditingUser(null);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;

    deleteUser(deleteTarget.id);

    showToast(
      `${deleteTarget.name} was deleted.`,
      "success"
    );

    setDeleteTarget(null);
  };

  const handleSort = (event) => {
    const value = event.target.value;

    if (!value) return;

    const [field, direction] =
      value.split("-");

    setSortField(field);
    setSortDirection(direction);
    setPage(1);
  };

  return (
    <div className="page-container">
      <PageHeader
        title="User Management"
        description="Manage users, accounts, plans and access."
        action={
          <Button
            icon="fa-plus"
            onClick={() => {
              setEditingUser(null);
              setShowForm(true);
            }}
          >
            Add User
          </Button>
        }
      />

      <div className="filter-toolbar">
        <SearchBar
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          placeholder="Search users..."
          onClear={() => {
            setSearch("");
            setPage(1);
          }}
        />

        <FilterDropdown
          label=""
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

        <FilterDropdown
          label=""
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

        <select
          className="sort-select"
          value={`${sortField}-${sortDirection}`}
          onChange={handleSort}
        >
          <option value="name-asc">
            Name A-Z
          </option>

          <option value="name-desc">
            Name Z-A
          </option>

          <option value="company-asc">
            Company A-Z
          </option>

          <option value="usage-desc">
            Usage High-Low
          </option>

          <option value="usage-asc">
            Usage Low-High
          </option>
        </select>
      </div>

      <div className="content-card">
        {filteredUsers.length === 0 ? (
          <EmptyState
            icon="fa-users"
            title="No users found"
            message="Try changing your search or filters."
          />
        ) : (
          <>
            <UserTable
              users={paginatedUsers}
              onView={(user) =>
                setSelectedUser(user)
              }
              onEdit={(user) => {
                setEditingUser(user);
                setShowForm(true);
              }}
              onDelete={(user) =>
                setDeleteTarget(user)
              }
            />

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              totalItems={filteredUsers.length}
              itemsPerPage={itemsPerPage}
            />
          </>
        )}
      </div>

      <Modal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingUser(null);
        }}
        title={
          editingUser
            ? "Edit User"
            : "Add New User"
        }
        size="large"
      >
        <UserForm
          user={editingUser}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingUser(null);
          }}
        />
      </Modal>

      <Drawer
        isOpen={Boolean(selectedUser)}
        onClose={() => setSelectedUser(null)}
        title="User Details"
      >
        <UserDetails user={selectedUser} />
      </Drawer>

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete User"
        message={
          deleteTarget
            ? `Are you sure you want to delete ${deleteTarget.name}? This action cannot be undone.`
            : ""
        }
        confirmText="Delete User"
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

export default Users;