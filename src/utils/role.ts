export const ROLES = {
  USER: "user",
  DIRECTOR: "director",
  MANAGER: "manager",
  ACCOUNTANT: "accountant",
  VISITOR: "visitor",
};

export const PERMISSIONS = {
   ACCESS_DASHBOARD: "access_dashboard",
  ACCES_APPROVAL: "acces_approval",
  ACCESS_MISSION_REPORT: "access_mission_report",
  ACCESS_EXPENSE: "access_expense",
  ACCESS_PURCHASE_REQUEST: "access_purchase_request",
  ACCESS_REQUEST_IN_ADVANCE: "access_request_in_advance",
};

export const ROLE_PERMISSIONS = {
  [ROLES.USER]: [
    PERMISSIONS.ACCESS_DASHBOARD,
    PERMISSIONS.ACCESS_MISSION_REPORT,
    PERMISSIONS.ACCESS_EXPENSE,
    PERMISSIONS.ACCESS_PURCHASE_REQUEST,
    PERMISSIONS.ACCESS_REQUEST_IN_ADVANCE,
  ],
  [ROLES.DIRECTOR]: [PERMISSIONS.ACCESS_DASHBOARD, PERMISSIONS.ACCES_APPROVAL],
  [ROLES.MANAGER]: [PERMISSIONS.ACCESS_DASHBOARD],
  [ROLES.ACCOUNTANT]: [PERMISSIONS.ACCESS_DASHBOARD],
  [ROLES.VISITOR]: [],
};

export const hasPermission = (role: string, permission: string): boolean => {
  return ROLE_PERMISSIONS[role]?.includes(permission) || false;
};

