import { RoleListAccess } from "@tawasukha/rbac"

export const admin: RoleListAccess = {
  role: "[Admin]",
  inherit: ["[User]"],
  access: [
    {
      on: "reimbursement",
      can: ["all"],
    },
    {
      on: "bill",
      can: ["all"],
    },
    {
      on: "hospital",
      can: ["all"],
    },
    {
      on: "keyword",
      can: ["all"],
    },
    {
      on: "icd",
      can: ["all"],
    },
    {
      on: "user",
      can: ["all"],
    },
    {
      on: "mail",
      can: ["all"],
    },
    {
      on: "workflow",
      can: ["all"],
    },
  ],
}
