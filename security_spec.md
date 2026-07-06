# PoojaGhar Database & Security Specification

This document details the security model, access controls, and boundary validation rules for PoojaGhar's Firestore database structure.

## 1. Data Invariants

1. **User Ownership Isolation**: Users must only be allowed to read or write their own user profiles, bookings, and subscriptions.
2. **Role Protection**: The `role` field in `users` must be immutable by the client to prevent privilege escalation or spoofing admin privileges.
3. **Pooja Booking Relational Integrity**: A booking cannot exist without a valid `userId` matching the authenticated user during creation.
4. **Subscription Periodicity**: A kid's subscription must bind specifically to the authenticated parent's `userId`.
5. **Terminal State Lockdown**: Bookings marked as `completed` or `cancelled` cannot be altered or reactivated by non-admin users.
6. **Temporal Validation**: All `createdAt` and `updatedAt` timestamps must match the server's time `request.time`.

---

## 2. The "Dirty Dozen" Payloads

Here are 12 malicious payloads that PoojaGhar security rules must successfully reject:

### Category A: Identity Spoofing & Escalation
1. **Admin Persona Injection**: Modifying the user's own profile to set `"role": "admin"`.
2. **Booking Hijacking**: Creating a booking document claiming the `userId` is another victim's UID.
3. **Anonymous Write Attack**: Reading or creating bookings on behalf of an unauthenticated session.

### Category B: State Shortcutting & Value Poisoning
4. **Terminal State Forgery**: Sideloading a pristine booking already structured with `"status": "completed"` to bypass ritual fees.
5. **Price Manipulation**: Initiating a booking for "Maha Mrityunjaya Havan" with `"amount": 1` instead of the required ₹7,500.
6. **Billing Period Spoofing**: Changing a monthly subscription object to free or null status post-authorization.

### Category C: Resource Exhaustion & Data Corruption (Denial of Wallet)
7. **Document ID Poisoning**: Registering a booking with a 2MB binary string as the document ID to clutter index nodes.
8. **Junk Fields Sideloading (Ghost Fields)**: Injecting a stealth key `"isVerifiedByPandit": true` into an allowed update block.
9. **Negative Bounds Tampering**: Setting `childAge` in subscription metadata to `-5` or `9999`.

### Category D: Insecure Query & Privacy Leaks
10. **Broad Booking Harvesting**: Attempting a list query to retrieve all client bookings without a single `userId` field constraint.
11. **PII Collection Scanning**: Running list sweeps over user private details without owner authentication.
12. **Mismatched Sibling Write**: Attempting to alter only the `amount` of a logged booking without updating the `updatedAt` metadata.

---

## 3. Test Cases Spec

Our `firestore.rules` enforces authorization, strictly rejecting the Dirty Dozen:
- `users/{uid}`: `allow read, write: if isSignedIn() && request.auth.uid == uid`.
- `bookings/{bookingId}`: `allow read, list: if isSignedIn() && resource.data.userId == request.auth.uid`.
- `bookings/{bookingId}`: `allow create: if isSignedIn() && incoming().userId == request.auth.uid && incoming().status == "scheduled"`.
- `subscriptions/{subId}`: `allow read, list: if isSignedIn() && resource.data.userId == request.auth.uid`.
