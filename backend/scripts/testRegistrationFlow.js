const API_BASE = 'http://localhost:5000/api';

async function testRegistrationFlow() {
  console.log('=== VERIFYING REGISTRATION & ROLE-BASED FLOW ===\n');

  // Test 1: Admin Login
  console.log('1. Testing Admin Login...');
  const adminRes = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@example.com', password: 'Admin@123' }),
  });
  const adminData = await adminRes.json();
  if (adminRes.status === 200 && adminData.user.role === 'admin') {
    console.log(`✅ Admin authenticated: ${adminData.user.name} (${adminData.user.email})`);
    console.log(`   Role: ${adminData.user.role} -> Directs to /dashboard\n`);
  } else {
    throw new Error('Admin login failed');
  }

  // Test 2: Standard User Registration
  console.log('2. Testing Standard User Registration...');
  const testEmail = `standard.user.${Date.now()}@company.io`;
  const regRes = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Emma Watson',
      email: testEmail,
      password: 'Password@123',
      confirmPassword: 'Password@123',
    }),
  });
  const regData = await regRes.json();
  if (regRes.status === 201 && regData.user.role === 'user') {
    console.log(`✅ Standard user registered: ${regData.user.name} (${regData.user.email})`);
    console.log(`   Account Status: ${regData.user.status}`);
    console.log(`   Role: ${regData.user.role} -> Redirects to /user-dashboard\n`);
  } else {
    throw new Error('Standard registration failed');
  }

  // Test 3: Standard User Login
  console.log('3. Testing Standard User Login...');
  const userLoginRes = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: testEmail, password: 'Password@123' }),
  });
  const userLoginData = await userLoginRes.json();
  if (userLoginRes.status === 200 && userLoginData.user.role === 'user') {
    console.log(`✅ Standard user logged in successfully: ${userLoginData.user.name}`);
    console.log(`   Role: ${userLoginData.user.role} -> Directs to /user-dashboard\n`);
  } else {
    throw new Error('Standard user login failed');
  }

  // Test 4: Verify Standard User is Blocked from Admin APIs
  console.log('4. Testing RBAC: Standard User attempting Admin-Only endpoint...');
  const blockedRes = await fetch(`${API_BASE}/users`, {
    headers: { Authorization: `Bearer ${userLoginData.token}` },
  });
  if (blockedRes.status === 403) {
    console.log('✅ Access Denied verified: Standard user is blocked from /api/users (HTTP 403 Forbidden)\n');
  } else {
    throw new Error(`Expected 403 Forbidden, but received HTTP ${blockedRes.status}`);
  }

  // Test 5: Verify Frontend Routes
  console.log('5. Verifying Frontend Route Accessibility...');
  const frontendRes = await fetch('http://localhost:5173/');
  if (frontendRes.status === 200) {
    console.log('✅ Frontend application is active on http://localhost:5173\n');
  } else {
    throw new Error('Frontend server unreachable');
  }

  console.log('==================================================');
  console.log('🎉 ALL REGISTRATION & ROLE-BASED FLOW TESTS PASSED!');
  console.log('==================================================');
}

testRegistrationFlow().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
