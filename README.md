# SimpleGrants.xyz

### Developing

```sh
npm run dev
```

### Testing

```sh
# Unit / Integration / Components (Vitest)
npm run test

# End-to-End (Playwright)
npm run test:e2e

# E2E codegen (launches a browser to record clicks)
npm run test:codegen
```

### Stripe Webhooks

Simulate a successful checkout

```sh
stripe listen --forward-to localhost:3000/api/stripe/webhook

stripe trigger payment_intent.succeeded
```

### Prisma Studio

```sh
npm run db:studio
```
