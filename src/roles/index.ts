import { RoleListAccess } from "@tawasukha/rbac"
import { user } from "./user"
import { hseAdmin } from "./hseAdmin"
import { dbAdmin } from "./dbAdmin"
import { admin } from "./admin"

export const roles: RoleListAccess[] = [user, hseAdmin, dbAdmin, admin]
