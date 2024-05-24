import { RoleListAccess } from "@tawasukha/rbac"

export const user: RoleListAccess = {
  role: "[User]",
  inherit: [],
  access: [
    {
      on: "reimbursement",
      can: ["read", "view", "save"],
    },
    {
      on: "icd",
      can: ["read"],
    },
    {
      on: "hospital",
      can: ["read"],
    },
    {
      on: "keyword",
      can: ["read"],
    },
    {
      on: "bill",
      can: ["read"],
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
