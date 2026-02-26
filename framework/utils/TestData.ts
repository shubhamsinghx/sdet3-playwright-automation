/**
 * Centralized test data used across all test suites.
 * Keep credentials and reusable strings here to avoid duplication.
 */
export const TestData = {
  /** Valid OrangeHRM admin credentials (demo site default). */
  validCredentials: {
    username: 'Admin',
    password: 'admin123',
  },

  /** Known-invalid credentials for negative tests. */
  invalidCredentials: {
    username: 'InvalidUser',
    password: 'WrongPassword',
  },

  /** Expected UI messages. */
  messages: {
    invalidLogin: 'Invalid credentials',
    requiredField: 'Required',
  },

  /** Application routes (appended to baseURL). */
  routes: {
    login: '/web/index.php/auth/login',
    dashboard: '/web/index.php/dashboard/index',
    pim: '/web/index.php/pim/viewEmployeeList',
  },

  /** Search test data. */
  search: {
    existingEmployeeName: 'a',       // partial — guaranteed to match on demo site
    nonExistentEmployeeName: 'ZZZNOTEXIST999',
  },
} as const;
