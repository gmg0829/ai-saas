---
paths:
  - "src/app/api/**/*.ts"
---

# API Conventions

## Response Shape
Always return consistent JSON structure:
```typescript
// Success
{ "data": ..., "error": null }

// Error
{ "data": null, "error": { "message": "...", "code": "..." } }
```

## HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Best Practices
- Validate request body with Zod
- Never expose stack traces to client
- Log errors server-side with appropriate context
- Use appropriate caching headers for GET requests
- Rate limiting for public endpoints
