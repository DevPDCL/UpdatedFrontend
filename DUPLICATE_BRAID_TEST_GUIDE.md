# Duplicate braID Test Guide

## Issue Fixed
Fixed duplicate braID issue where multiple branches shared the same braID, causing incorrect branch selection and API routing.

## Affected Branches (4 duplicate braIDs)

### braID: 9
- **Shantinagar** (uses akhil/legacy API)
  - Composite Key: `9::Shantinagar`
  - Expected API: Legacy (https://api.populardiagnostic.com)
  - AKHIL_API_BRANCHES list: ✅ **Yes (should use Akhil API per requirements)**

- **Shyamoli** (uses prosoft)
  - Composite Key: `9::Shyamoli`
  - Expected API: Legacy (not in AKHIL_API_BRANCHES list)
  - AKHIL_API_BRANCHES list: ❌ No

### braID: 12
- **English Road** (uses akhil/legacy API)
  - Composite Key: `12::English Road`
  - Expected API: Akhil (192.168.5.81:1050)
  - AKHIL_API_BRANCHES list: ✅ **Yes**

- **Bogura** (uses prosoft)
  - Composite Key: `12::Bogura`
  - Expected API: Legacy (not in AKHIL_API_BRANCHES list)
  - AKHIL_API_BRANCHES list: ❌ No

### braID: 15
- **Chattogram** (uses akhil/legacy API)
  - Composite Key: `15::Chattogram`
  - Expected API: Akhil (192.168.5.81:1050)
  - AKHIL_API_BRANCHES list: ✅ **Yes**

- **Rangpur** (uses prosoft)
  - Composite Key: `15::Rangpur`
  - Expected API: Legacy (not in AKHIL_API_BRANCHES list)
  - AKHIL_API_BRANCHES list: ❌ No

### braID: 19
- **Jatrabari** (uses akhil/legacy API)
  - Composite Key: `19::Jatrabari`
  - Expected API: Akhil (192.168.5.81:1050)
  - AKHIL_API_BRANCHES list: ✅ **Yes**

- **Dinajpur** (uses prosoft)
  - Composite Key: `19::Dinajpur`
  - Expected API: Legacy (not in AKHIL_API_BRANCHES list)
  - AKHIL_API_BRANCHES list: ❌ No

## Test Scenarios

### Test 1: Branch Selection for braID 9
**Steps:**
1. Navigate to "Test Prices" tab
2. Open branch dropdown
3. Select "Shantinagar"
4. Verify services load successfully
5. Open browser DevTools > Network tab
6. Check API endpoint called:
   - Expected: `192.168.5.81:1050/api/VCP/GetServiceTariff` (Akhil API)
   - Payload should include: `{ "facilityId": "9", "serviceName": "", "pageNo": 1 }`

**Expected Result:** ✅ Services from Shantinagar branch load using Akhil API

**Steps:**
1. Change selection to "Shyamoli"
2. Verify services load successfully
3. Check Network tab
4. Expected: `api.populardiagnostic.com/api/test-service-charges?token=...&branch_id=9` (Legacy API)

**Expected Result:** ✅ Services from Shyamoli branch load using Legacy API

### Test 2: Search Functionality
**Steps:**
1. Select "English Road" (braID 12)
2. Wait for all pages to load
3. Search for "CT Scan"
4. Verify search results appear
5. Check Network tab - should call Akhil API with:
   - POST `192.168.5.81:1050/api/VCP/GetServiceTariff`
   - Payload: `{ "facilityId": "12", "serviceName": "CT Scan", "pageNo": 1 }`

**Expected Result:** ✅ Search works correctly with Akhil API for English Road

**Steps:**
1. Change to "Bogura" (braID 12)
2. Search for "MRI"
3. Check Network tab - should call Legacy API with:
   - GET `api.populardiagnostic.com/api/test-service-charges?token=...&branch_id=12&name=MRI&fast_search=yes`

**Expected Result:** ✅ Search works correctly with Legacy API for Bogura

### Test 3: Pagination
**Steps:**
1. Select "Chattogram" (braID 15)
2. Monitor Network tab
3. Wait for background pagination to complete
4. Verify multiple API calls to Akhil API:
   - First page loads immediately
   - Subsequent pages load in background
5. Check status indicator shows total count

**Expected Result:** ✅ Pagination works with Akhil API

### Test 4: All Duplicate Scenarios
Test each pair:
- ✅ Shantinagar (9) vs Shyamoli (9)
- ✅ English Road (12) vs Bogura (12)
- ✅ Chattogram (15) vs Rangpur (15)
- ✅ Jatrabari (19) vs Dinajpur (19)

**For each:**
1. Select first branch → verify correct API endpoint
2. Select second branch → verify correct API endpoint
3. Verify different services load for each
4. Search functionality works independently

## Console Debugging

Open browser console and check for these logs:

### Akhil API branches:
```
Akhil API token fetched successfully
```

### Check which branch was selected:
```javascript
// In browser console, after selecting a branch:
console.log(serviceState.selectedBranch);
// Should show: "9::Shantinagar" or "9::Shyamoli" etc.
```

## Known Issues to Watch For

### ❌ Wrong Branch Selected
**Symptom:** Selecting "Shyamoli" but "Shantinagar" services appear
**Cause:** Composite key parsing failed
**Check:** Console should show `selectedBranch: "9::Shyamoli"` not just `9`

### ❌ Wrong API Called
**Symptom:** Akhil API branch calls Legacy API or vice versa
**Cause:** Branch name not found in AKHIL_API_BRANCHES list
**Check:** Verify branch.braName matches exactly (case-sensitive)

### ❌ 401 Authentication Error (Akhil API)
**Symptom:** API calls fail with 401 Unauthorized
**Cause:** Token fetch failed or invalid credentials
**Check:**
- Verify `.env` has correct `VITE_AKHIL_API_USERNAME` and `VITE_AKHIL_API_PASSWORD`
- Check network tab for `192.168.5.81:1050/api/Token/GetToken` call
- Response should include `access_token`

### ❌ Network Error (Akhil API)
**Symptom:** Cannot connect to 192.168.5.81:1050
**Cause:** Internal API not accessible from current network
**Solution:** Must be on PDCL internal network or VPN

## Success Criteria

✅ All 23 branches can be selected individually
✅ Duplicate braID branches load different services
✅ Akhil API branches (16 total) call 192.168.5.81:1050
✅ Legacy API branches (7 total) call api.populardiagnostic.com
✅ Search works for both API types
✅ Pagination works for both API types
✅ No console errors
✅ Build succeeds without warnings

## Files Modified

1. `src/components/Search.jsx` (Line 436)
   - Changed: `value: branch.braID` → `value: \`${branch.braID}::${branch.braName}\``

2. `src/hooks/useServiceSearch.js` (Lines 74-98, 178-185)
   - Added composite key parsing in `handleBranchChange`
   - Added composite key parsing in `debouncedServiceSearch`
   - Use both braID and braName to find correct branch object

3. No changes to `serviceService.js` (already correct)
