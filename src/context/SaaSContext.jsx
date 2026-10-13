import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { initialUsers } from "../data/users";
import { initialPlans } from "../data/plans";
import { initialSubscriptions } from "../data/subscriptions";

const SaaSContext = createContext(null);

const getStorage = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);

    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

export const SaaSProvider = ({ children }) => {
  const [users, setUsers] = useState(() =>
    getStorage("saasUsers", initialUsers)
  );

  const [plans, setPlans] = useState(() =>
    getStorage("saasPlans", initialPlans)
  );

  const [subscriptions, setSubscriptions] =
    useState(() =>
      getStorage(
        "saasSubscriptions",
        initialSubscriptions
      )
    );

  useEffect(() => {
    localStorage.setItem(
      "saasUsers",
      JSON.stringify(users)
    );
  }, [users]);

  useEffect(() => {
    localStorage.setItem(
      "saasPlans",
      JSON.stringify(plans)
    );
  }, [plans]);

  useEffect(() => {
    localStorage.setItem(
      "saasSubscriptions",
      JSON.stringify(subscriptions)
    );
  }, [subscriptions]);

  const addUser = (user) => {
    const newUser = {
      ...user,
      id: `USR-${Date.now()}`,
      joinedAt: new Date().toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }
      ),
      lastLogin: "Never",
      usage: 0,
    };

    setUsers((previous) => [
      newUser,
      ...previous,
    ]);

    return newUser;
  };

  const updateUser = (id, updates) => {
    setUsers((previous) =>
      previous.map((user) =>
        user.id === id
          ? { ...user, ...updates }
          : user
      )
    );
  };

  const deleteUser = (id) => {
    setUsers((previous) =>
      previous.filter((user) => user.id !== id)
    );
  };

  const addPlan = (plan) => {
    const newPlan = {
      ...plan,
      id: `PLAN-${Date.now()}`,
      subscribers: Number(plan.subscribers || 0),
      revenue: 0,
    };

    setPlans((previous) => [
      ...previous,
      newPlan,
    ]);

    return newPlan;
  };

  const updatePlan = (id, updates) => {
    setPlans((previous) =>
      previous.map((plan) =>
        plan.id === id
          ? { ...plan, ...updates }
          : plan
      )
    );
  };

  const deletePlan = (id) => {
    setPlans((previous) =>
      previous.filter((plan) => plan.id !== id)
    );
  };

  const addSubscription = (subscription) => {
    const newSubscription = {
      ...subscription,
      id: `SUB-${Date.now()}`,
    };

    setSubscriptions((previous) => [
      newSubscription,
      ...previous,
    ]);

    return newSubscription;
  };

  const updateSubscription = (
    id,
    updates
  ) => {
    setSubscriptions((previous) =>
      previous.map((subscription) =>
        subscription.id === id
          ? {
              ...subscription,
              ...updates,
            }
          : subscription
      )
    );
  };

  const cancelSubscription = (id) => {
    setSubscriptions((previous) =>
      previous.map((subscription) =>
        subscription.id === id
          ? {
              ...subscription,
              status: "Cancelled",
              autoRenew: false,
            }
          : subscription
      )
    );
  };

  const activeSubscriptions =
    subscriptions.filter(
      (subscription) =>
        subscription.status === "Active"
    );

  const totalRevenue = subscriptions.reduce(
    (total, subscription) => {
      if (
        subscription.status === "Active" ||
        subscription.status === "PastDue"
      ) {
        return total + Number(subscription.amount || 0);
      }

      return total;
    },
    0
  );

  return (
    <SaaSContext.Provider
      value={{
        users,
        plans,
        subscriptions,

        addUser,
        updateUser,
        deleteUser,

        addPlan,
        updatePlan,
        deletePlan,

        addSubscription,
        updateSubscription,
        cancelSubscription,

        activeSubscriptions,
        totalRevenue,
      }}
    >
      {children}
    </SaaSContext.Provider>
  );
};

export const useSaaS = () => {
  const context = useContext(SaaSContext);

  if (!context) {
    throw new Error(
      "useSaaS must be used inside SaaSProvider"
    );
  }

  return context;
};