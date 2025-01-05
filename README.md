## OTP Authentication with NestJS

involves implementing a secure mechanism for verifying user identities using One-Time Passwords (OTPs)

1. **OTP Generation**: A random OTP is generated and sent to the user's registered contact (email).
2. **Storage and Expiration**: The OTP is stored temporarily in a database or cache with an expiration time.
3. **Verification**: The user submits the received OTP for verification. The backend validates the OTP against the stored value and checks its expiration.

This method ensures a secure and user-friendly authentication flow, often used in login processes, transaction verifications, and account recovery scenarios.


## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```


## Here a medium link:

- Medium - [Navigate To Medium](https://medium.com/@thekinv21/otp-authentication-with-nestjs-email-9d24b3ea0aa2)






