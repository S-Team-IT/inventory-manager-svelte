Last updated 2026.07.02

# References

Production: https://steaminventorymanager.netlify.app <br>
Trello: https://trello.com/b/Wb73cPJ4/inventory-manager

# Content

- [Tech Stack](#tech-stack)
  - [Code](#code)
  - [Packages](#npm-packages)
- [Folder Structure](#folder-structure)
- [Database](#database)
- [Additional Notes](#additional-notes)
- [Missing implementation](#missing-implementationimprovements)
- [Troubleshooting](#troubleshooting)

# Inventory Manager made in Sveltekit

Built with [`sv`](https://github.com/sveltejs/cli). \
Original configuration:

```sh
npx sv@0.15.3 create --template minimal --types ts --add prettier eslint tailwindcss="plugins:none" --install npm ./
```

## Developing

Install dependencies with `npm install`. To start a local development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

## Tech Stack

### Code

- [Svelte & Sveltekit](https://svelte.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [Tailwindcss](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [postgresql](https://www.postgresql.org/)

### NPM Packages

- [TailwindCSS](https://tailwindcss.com/) CSS Framework
- [DaisyUI](https://daisyui.com/) Tailwind Library
- [Iconify](https://iconify.design/docs/icon-components/svelte/) Icon Library, used TailwindCSS in HTML
- [Prettier](https://prettier.io/) Formatting
- [ESLint](https://eslint.org/) Linting
- [postgres.js](https://www.npmjs.com/package/postgres) postgresql client(An ORM was not used)
- [bcrypt](https://www.npmjs.com/package/bcrypt) Password Hashing
- [Supabase.js](https://supabase.com/docs/reference/javascript/introduction) Supabase JS API (For image hosting)
- [Chart.js](https://www.chartjs.org/) Drawing charts
- [date-fns](https://www.npmjs.com/package/date-fns) Date formatting
- [Sharp](https://www.npmjs.com/package/sharp) Optimizing image files
- [Svelte-sonner](https://svelte-sonner.vercel.app/) Notification pop ups
- [SheetJS](https://www.npmjs.com/package/xlsx) Export HTML table to XLSX file
- [zod](https://zod.dev/) Input validation

## Folder Structure

```
-src
  -lib (Server, assets, and utils)
    -assets (img files)
    -components (custom component library)
    -remote (Sveltekit Remote Function API calls)
    -server (Miscellaneous code to run server-side)
    -types (Typescript type definitions)
    -utils (Utility functions)
  -routes (Frontend)
-db (Database schema & data files)
```

## Database

The schema file can be found inside `./db`. The schema makes use of postgresql extensions and shorthands such as CITEXT(case-insensitive text for easier comparisons) and TIMESTAMPTZ(time stamp with timezone).

### Schema Design

It is recommended to view the schema inside a GUI.

### Exporting database

This is specifically for Supabase using a transaction pooler connection.

```
Schema:
pg_dump '[USER]:[PASSWORD]@[HOST]:5432/postgres' \
  --schema=public --no-owner --no-privileges --no-comments \
  --schema-only -f schema.sql

Data:
pg_dump '[USER]:[PASSWORD]@[HOST]:5432/postgres' \
  --schema=public --no-owner --no-privileges \
  --data-only -f data.sql
```

### Table `items`

| Name               | Type          | Constraints      | Remarks                                               |
| :----------------- | :------------ | :--------------- | :---------------------------------------------------- |
| `id`               | `int8`        | Primary Identity |                                                       |
| `name`             | `citext`      | Unique           |                                                       |
| `category_id`      | `int8`        |                  |                                                       |
| `thumbnail`        | `text`        |                  | main photo URL                                        |
| `gallery`          | `jsonb`       | Nullable         | secondary photo URLs                                  |
| `master_number`    | `text`        | Unique           |                                                       |
| `initial_quantity` | `int8`        |                  | quantity before any transactions                      |
| `last_stocked`     | `timestamptz` |                  | update when transactions happen                       |
| `disabled`         | `bool`        |                  |                                                       |
| `minimum_quantity` | `int8`        |                  | minimum quantity that should be in stock at all times |

### Table `incoming_items`

| Name             | Type   | Constraints |
| ---------------- | ------ | ----------- |
| `transaction_id` | `int8` | Primary     |
| `item_id`        | `int8` | Primary     |
| `quantity`       | `int8` |             |

### Table `incoming_transactions`

| Name            | Type          | Constraints      |
| --------------- | ------------- | ---------------- |
| `id`            | `int8`        | Primary Identity |
| `logger_id`     | `int8`        |                  |
| `created_at`    | `timestamptz` |                  |
| `delivery_date` | `date`        |                  |
| `supplier_id`   | `int8`        |                  |
| `delivery_ref`  | `citext`      |                  |

### Table `outgoing_items`

| Name             | Type   | Constraints |
| ---------------- | ------ | ----------- |
| `transaction_id` | `int8` | Primary     |
| `item_id`        | `int8` | Primary     |
| `quantity`       | `int8` |             |

### Table `outgoing_transactions`

| Name          | Type          | Constraints      |
| ------------- | ------------- | ---------------- |
| `id`          | `int8`        | Primary Identity |
| `logger_id`   | `int8`        |                  |
| `created_at`  | `timestamptz` |                  |
| `expend_date` | `date`        |                  |
| `expender`    | `text`        |                  |
| `remarks`     | `text`        | Nullable         |

### Table `users`

| Name            | Type     | Constraints                     |
| --------------- | -------- | ------------------------------- |
| `id`            | `int8`   | Primary Identity                |
| `email`         | `citext` | Unique                          |
| `name`          | `citext` | Unique                          |
| `password_hash` | `text`   |                                 |
| `role`          | `role`   | Admin, QS, Procurement, Project |

### Table `sessions`

| Name          | Type    | Constraints |
| ------------- | ------- | ----------- |
| `id`          | `text`  | Primary     |
| `secret_hash` | `bytea` |             |
| `created_at`  | `int4`  |             |
| `user_id`     | `int8`  |             |

### Table `categories`

| Name   | Type     | Constraints      |
| ------ | -------- | ---------------- |
| `id`   | `int8`   | Primary Identity |
| `name` | `citext` | Unique           |

### Table `suppliers`

| Name   | Type     | Constraints      |
| ------ | -------- | ---------------- |
| `id`   | `int8`   | Primary Identity |
| `name` | `citext` | Unique           |

### Additional Notes

- Sveltekit's experimental Remote Functions feature is used for the majority of client-server communication.
- In their June 2026 changelog, breaking changes were introduced for enhancing forms. As such, Sveltekit has been locked to a previous version.
- Supabase is only used in `$lib/remote/upload.remote.ts` for hosting images.
- Initial loading speed of pages after deployment will take a little long.
- Chart.js's charts are plagued with a [bug](https://github.com/chartjs/Chart.js/pull/12097) where they may shrink slightly.

### Missing Implementation/Improvements

- Account creation is very simple and there is no admin interface. If a new Admin account needs to be added, it has to be done by inserting directly into the database or by manually editing the role of a user. Email confirmation was planned, but never done. Instead, new accounts are created with `12345678`. The password can be changed once the user signs in.
- Password input validation lacks regex.
- There is no inactivity timeout implemented for sessions and expired sessions aren't deleted.
- `itemAccordion` and `transactionAccordion` components share similar code and could be refactored.
- Minimal Postgres.js syntax is used in queries.
- `photoPreview` has not been updated after a rewrite of `/item/new`.
- The queries used for the Chart.js display should be replaced with the newer `/item/timeline` queries.

### Troubleshooting

#### An impossible situation occured

This happens rarely when attempting to import a `$lib/server` module in `./src/routes`

#### PSQL Unhandled error: Prepared statement does not exist

Not fully understood what causes this, appears to happen after querying a lot in a short amount of item(editing through the entire item list). This [commit](https://github.com/S-Team-IT/inventory-manager-svelte/commit/10241feacd5e2a90985c0de9976bf4bbf4121d9b) should fix it, but if not, a server restart will.
