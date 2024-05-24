import { RoleListAccess } from "@tawasukha/rbac"

export const hseAdmin: RoleListAccess = {
  role: "[HSEAdmin]",
  inherit: [],
  access: [
    {
      on: "reimbursement",
      can: ["read", "view", "save"],
    },
    {
      on: "bill",
      can: ["read", "view", "save"],
    },
    {
      on: "hospital",
      can: ["read", "view", "save"],
    },
    {
      on: "keyword",
      can: ["read", "view", "save"],
    },
    {
      on: "icd",
      can: ["read", "view", "save"],
    },
    {
      on: "mail",
      can: ["read"],
    },
    {
      on: "workflow",
      can: ["read"],
    },
    {
      on: "user",
      can: ["read"],
    },
  ],
}
