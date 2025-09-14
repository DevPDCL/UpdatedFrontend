# CloudFront Configuration for Maximum Performance

## Current Status
- ✅ Performance Score: 91/100
- 🎯 Target Score: 98-100

## Required CloudFront Settings

### 1. Compression Settings
**Location:** Distribution Settings → General
```
Compress Objects Automatically: Yes
Supported Compression Formats: gzip, brotli (if available)
```

### 2. Cache Behaviors (Order matters!)

#### Behavior 1: Static Assets
```
Path Pattern: /assets/*
Origin Request Policy: None (or CORS-S3Origin if needed)
Cache Policy: CachingOptimized
Response Headers Policy: None
Compress Objects: Yes
TTL Settings:
  - Default TTL: 31536000 (1 year)
  - Maximum TTL: 31536000 (1 year)
  - Minimum TTL: 31536000 (1 year)
```

#### Behavior 2: HTML Files  
```
Path Pattern: *.html
Origin Request Policy: None
Cache Policy: CachingDisabled (or create custom with short TTL)
Response Headers Policy: SecurityHeadersPolicy (recommended)
Compress Objects: Yes
TTL Settings:
  - Default TTL: 300 (5 minutes)
  - Maximum TTL: 3600 (1 hour)
  - Minimum TTL: 0
```

#### Behavior 3: Root/Default (index.html)
```
Path Pattern: Default (*)
Origin Request Policy: None
Cache Policy: Custom policy with short TTL
Response Headers Policy: SecurityHeadersPolicy
Compress Objects: Yes
TTL Settings:
  - Default TTL: 300 (5 minutes)
  - Maximum TTL: 3600 (1 hour)
  - Minimum TTL: 0
```

### 3. Custom Cache Policy (if needed)
**Name:** ReactApp-ShortCache
```
TTL Settings:
  - Default TTL: 300 (5 minutes)
  - Maximum TTL: 3600 (1 hour)
  - Minimum TTL: 0

Cache Key Settings:
  - Query strings: None
  - Headers: None (or Host only)
  - Cookies: None
```

### 4. Security Headers (Optional but recommended)
**Response Headers Policy:**
```
Content-Type-Options: nosniff
Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=63072000; includeSubdomains; preload
```

## Expected Performance Improvements

| Metric | Before | After |
|--------|--------|-------|
| Performance Score | 91 | 98-100 |
| Add Expires headers | 56 | 100 |
| Compress components | 67 | 100 |
| Overall Grade | A | A+ |

## Verification Steps

1. **Check Compression:**
   ```bash
   curl -H "Accept-Encoding: gzip" -I https://your-domain.com/assets/index-[hash].js
   # Should show: Content-Encoding: gzip
   ```

2. **Check Cache Headers:**
   ```bash
   curl -I https://your-domain.com/assets/index-[hash].js
   # Should show: Cache-Control: public, max-age=31536000, immutable
   ```

3. **Test PageSpeed:**
   - Wait 5-10 minutes after deployment
   - Test on: https://pagespeed.web.dev/
   - Expected score: 98-100

## Troubleshooting

### Issue: Compression not working
- Verify "Compress Objects Automatically" is enabled
- Check file is >1KB (CloudFront won't compress smaller files)
- Ensure Content-Type header is set correctly

### Issue: Caching not working
- Check cache behaviors order (most specific first)
- Verify TTL settings in cache policy
- Clear browser cache before testing

### Issue: Still getting cache-related warnings
- Verify S3 metadata includes Cache-Control headers
- Check CloudFront cache policy overrides S3 headers
- Ensure invalidation completed successfully

## Additional Optimizations

1. **Enable HTTP/2:** (Usually enabled by default)
2. **Add HSTS headers:** For security and minor performance boost
3. **Consider IPv6:** Enable IPv6 support in CloudFront
4. **Monitor with CloudWatch:** Set up performance monitoring

## Cost Optimization

- Use Price Class "Use Only US, Canada and Europe" if global reach not needed
- Monitor data transfer costs
- Consider Reserved Capacity for predictable traffic

---

**📊 Expected Result:** PageSpeed Insights score of 98-100 with all performance issues resolved!