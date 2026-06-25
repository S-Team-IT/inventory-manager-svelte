# https://steaminventorymanager.netlify.app/

# Sections

- [Tech Stack](#tech-stack)
  - [Code](#code)
  - [Packages](#npm-packages)
- [Folder Structure](#folder-structure)
- [Database](#database)

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

### Additional Notes

- Sveltekit's experimental Remote Functions feature is used for the majority of client-server communication.
- In their June 2026 changelog, breaking changes were introduced for enhancing forms. As such, Sveltekit has been locked to a previous version.
  Supabase is only used in `./lib/remote/upload.remote.ts` for hosting images.
- Initial loading speed of pages after deployment will take a little long.

### Not implemented

- Account creation is very simple and there is no admin interface. If a new Admin account needs to be added, it has to be done by inserting directly into the database or by manually editing the role of a user. Email confirmation was planned, but never done. Instead, new accounts are created with `12345678`. The password can be changed once the user signs in.
- Password input validation lacks regex.
- There is no inactivity timeout implemented for sessions.

## Database

### Schema Design

It is suggested to view this in a psql GUI. \

## Table `categories`

### Columns

| Name   | Type     | Constraints      |
| ------ | -------- | ---------------- |
| `id`   | `int8`   | Primary Identity |
| `name` | `citext` | Unique           |

## Table `incoming_items`

### Columns

| Name             | Type   | Constraints |
| ---------------- | ------ | ----------- |
| `transaction_id` | `int8` | Primary     |
| `item_id`        | `int8` | Primary     |
| `quantity`       | `int8` |             |

## Table `incoming_transactions`

### Columns

| Name            | Type          | Constraints      |
| --------------- | ------------- | ---------------- |
| `id`            | `int8`        | Primary Identity |
| `logger_id`     | `int8`        |                  |
| `created_at`    | `timestamptz` |                  |
| `delivery_date` | `date`        |                  |
| `supplier_id`   | `int8`        |                  |
| `delivery_ref`  | `citext`      |                  |

## Table `items`

### Columns

| Name               | Type          | Constraints      |
| ------------------ | ------------- | ---------------- |
| `id`               | `int8`        | Primary Identity |
| `name`             | `citext`      | Unique           |
| `category_id`      | `int8`        |                  |
| `thumbnail`        | `text`        |                  |
| `gallery`          | `jsonb`       | Nullable         |
| `master_number`    | `text`        | Unique           |
| `initial_quantity` | `int8`        |                  |
| `last_stocked`     | `timestamptz` |                  |
| `disabled`         | `bool`        |                  |
| `minimum_quantity` | `int8`        |                  |

## Table `outgoing_items`

### Columns

| Name             | Type   | Constraints |
| ---------------- | ------ | ----------- |
| `transaction_id` | `int8` | Primary     |
| `item_id`        | `int8` | Primary     |
| `quantity`       | `int8` |             |

## Table `outgoing_transactions`

### Columns

| Name          | Type          | Constraints      |
| ------------- | ------------- | ---------------- |
| `id`          | `int8`        | Primary Identity |
| `logger_id`   | `int8`        |                  |
| `created_at`  | `timestamptz` |                  |
| `expend_date` | `date`        |                  |
| `expender`    | `text`        |                  |
| `remarks`     | `text`        | Nullable         |

## Table `sessions`

### Columns

| Name          | Type    | Constraints |
| ------------- | ------- | ----------- |
| `id`          | `text`  | Primary     |
| `secret_hash` | `bytea` |             |
| `created_at`  | `int4`  |             |
| `user_id`     | `int8`  |             |

## Table `suppliers`

### Columns

| Name   | Type     | Constraints      |
| ------ | -------- | ---------------- |
| `id`   | `int8`   | Primary Identity |
| `name` | `citext` | Unique           |

## Table `users`

### Columns

| Name               | Type     | Constraints      |
| ------------------ | -------- | ---------------- |
| `id`               | `int8`   | Primary Identity |
| `email`            | `citext` | Unique           |
| `name`             | `citext` | Unique           |
| `password_hash`    | `text`   |                  |
| `role`             | `role`   |                  |
| `initial_quantity` | `int8`   |                  |
