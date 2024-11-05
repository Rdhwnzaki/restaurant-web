# Next.js Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses `next/font` to automatically optimize and load Geist, a new font family for Vercel.

## Technologies Used

- **[Next.js](https://nextjs.org)** - Framework for server-rendered React applications.
- **[Zustand](https://github.com/pmndrs/zustand)** - State management library.
- **[React Hot Toast](https://react-hot-toast.com/)** - For notifications and toast messages.
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework for styling.
- **[daisyUI](https://daisyui.com/)** - Component library built on Tailwind CSS for UI elements.
- **[Prettier](https://prettier.io/)** - Code formatter for consistent code style.

## Features

### 1. Register

Allows new users to create an account in the application. The registration data is stored in the application's state using Zustand, ensuring that user information is saved and accessible across different parts of the app.

### 2. Login

Users can log into their accounts with previously registered credentials. The login feature saves the user state, allowing for personalized sessions and retaining user preferences or access rights during their session.

### 3. Search Food

Allows users to search for specific food items within the app. Users can enter keywords related to the food they are looking for, and the search feature will return relevant results.

### 4. Filter by Category

Users can filter food items by different categories, making it easy to navigate and find specific types of food, such as Dessert, Italian Food, Fast Food, Asian Food, and Barbecue.

### 5. Sort by

Enables users to sort food items based on different criteria, such as:
- **Price** 
- **Travel Time**
- **Review**
- **Stars**

These features allow for a more intuitive browsing experience, helping users easily find and explore the items they want.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial.

You can check out the [Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
