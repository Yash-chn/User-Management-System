const API_BASE = 'http://localhost:5000/api';

const runTests = async () => {
  console.log('=== STARTING AUTOMATED TEST SUITE FOR USER MANAGEMENT SYSTEM ===\n');
  let passed = 0;
  let failed = 0;

  const assert = (condition, testName, details = '') => {
    if (condition) {
      console.log(`✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName} - ${details}`);
      failed++;
    }
  };

  try {
    // 1. Health Check
    console.log('--- 1. Health Check API ---');
    const healthRes = await fetch(`${API_BASE}/health`);
    const healthData = await healthRes.json();
    assert(healthRes.status === 200 && healthData.status === 'online', 'Health endpoint returns 200 and online');

    // 2. Admin Login
    console.log('\n--- 2. Admin Authentication ---');
    const adminLoginRes = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@example.com', password: 'Admin@123' }),
    });
    const adminLoginData = await adminLoginRes.json();
    assert(adminLoginRes.status === 200 && adminLoginData.token, 'Admin login returns valid JWT token');
    assert(adminLoginData.user.role === 'admin', 'Admin user role is "admin"');
    const adminToken = adminLoginData.token;
    const adminId = adminLoginData.user._id;

    // 3. User Stats
    console.log('\n--- 3. Statistics Aggregations ---');
    const statsRes = await fetch(`${API_BASE}/users/stats`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const statsData = await statsRes.json();
    assert(statsRes.status === 200 && statsData.stats, 'Admin can fetch /api/users/stats');
    assert(statsData.stats.totalUsers >= 1, `Total users count is positive (${statsData.stats.totalUsers})`);
    assert(statsData.stats.totalAdmins >= 1, `Admins count is positive (${statsData.stats.totalAdmins})`);

    // 4. Public Registration
    console.log('\n--- 4. Public User Registration ---');
    const randomEmail = `test.user.${Date.now()}@testcorp.com`;
    const regRes = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Automated Tester',
        email: randomEmail,
        password: 'Password@123',
        confirmPassword: 'Password@123',
      }),
    });
    const regData = await regRes.json();
    assert(regRes.status === 201 && regData.token, 'Registration returns 201 and JWT');
    assert(regData.user.role === 'user', 'Public registration forces "user" role');
    const standardToken = regData.token;
    const standardId = regData.user._id;

    // 5. Standard User RBAC Protection Check
    console.log('\n--- 5. RBAC Protection Check ---');
    const forbiddenRes = await fetch(`${API_BASE}/users`, {
      headers: { Authorization: `Bearer ${standardToken}` },
    });
    assert(forbiddenRes.status === 403, 'Standard user access to /api/users is blocked (403 Forbidden)');

    // 6. User Directory & Filtering
    console.log('\n--- 6. Admin User Directory & Search ---');
    const usersRes = await fetch(`${API_BASE}/users?search=Automated`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const usersData = await usersRes.json();
    assert(usersRes.status === 200 && usersData.users.length > 0, 'Admin can search users by keyword');

    const roleFilterRes = await fetch(`${API_BASE}/users?role=admin`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const roleFilterData = await roleFilterRes.json();
    const allAdmins = roleFilterData.users.every((u) => u.role === 'admin');
    assert(allAdmins && roleFilterData.users.length > 0, 'Role filter "admin" returns exclusively admin accounts');

    // 7. Update User
    console.log('\n--- 7. Update User Profile ---');
    const updateRes = await fetch(`${API_BASE}/users/${standardId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        name: 'Automated Tester Senior',
        role: 'user',
        status: 'active',
      }),
    });
    const updateData = await updateRes.json();
    assert(updateRes.status === 200 && updateData.user.name === 'Automated Tester Senior', 'Admin can update user name');

    // 8. Status Toggle (Deactivate)
    console.log('\n--- 8. Status Toggle ---');
    const toggleRes = await fetch(`${API_BASE}/users/${standardId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({ status: 'inactive' }),
    });
    const toggleData = await toggleRes.json();
    assert(toggleRes.status === 200 && toggleData.user.status === 'inactive', 'User status successfully set to inactive');

    // Verify inactive user cannot log in
    const inactiveLoginRes = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: randomEmail, password: 'Password@123' }),
    });
    assert(inactiveLoginRes.status === 403, 'Inactive user login is correctly rejected with 403');

    // 9. Self Deletion Protection
    console.log('\n--- 9. Self Deletion Protection ---');
    const selfDeleteRes = await fetch(`${API_BASE}/users/${adminId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    assert(selfDeleteRes.status === 400, 'Admin self-deletion attempt is correctly rejected with 400 Bad Request');

    // 10. Delete Standard User
    console.log('\n--- 10. Delete User ---');
    const deleteRes = await fetch(`${API_BASE}/users/${standardId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const deleteData = await deleteRes.json();
    assert(deleteRes.status === 200 && deleteData.success, 'Standard user successfully deleted by Admin');

    // 11. Frontend Server Verification
    console.log('\n--- 11. Frontend Vite Server Check ---');
    const frontendRes = await fetch('http://localhost:5173/');
    assert(frontendRes.status === 200, 'Frontend dev server at http://localhost:5173 returns 200 OK');

  } catch (err) {
    console.error('Test Suite encountered an exception:', err);
    failed++;
  }

  console.log('\n==================================================');
  console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('==================================================\n');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
};

runTests();
