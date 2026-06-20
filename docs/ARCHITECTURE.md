# Tuffly Architecture (Organized Structure)

## Feature-first folders

- `src/features/auth/*`: auth context, social auth services, avatar generation
- `src/features/marketplace/*`: listing/category logic and persistence client
- `src/features/teamup/*`: TeamUp models and matching UI
- `src/features/chat/*`: chat UI and storage services

## Shared and server

- `src/shared/config/*`: centralized feature flags
- `src/shared/types/*`: cross-feature type exports
- `src/server/db/*`: database connection adapters
- `src/server/lib/*`: persistence helpers (JSON fallback)

## App router shells

- `src/app/*` stays route-oriented and imports from features/shared.
