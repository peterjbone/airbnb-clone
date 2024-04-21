# Airbnb clone

This is a clone of the official Airbnb clone

**Deployment**: N/A

🚨 **Attention: Test account** 🚨

Take into account that if you want to test all the features of the app in production, you MUST create an account with credentials because the sign up and login with Google and Github do not work in production (they only work locally)

## Installation

Clone the project

```bash
git clone https://github.com/peterjbone/airbnb-clone.git
```

Install the dependencies

```bash
npm install
```

Set the Prisma with MongoDB Atlas

```bash
npm i --save-dev prisma@latest
npm i @prisma/client@latest
npx prisma db push
```

## Set the environment variables

- DATABASE_URL
- GITHUB_ID
- GITHUB_SECRET
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

## Tech

- [Next JS](https://nextjs.org/)
- [Tailwindcss](https://tailwindcss.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [MongoDB](https://www.mongodb.com/)

## Features

- Create account with credentials, with google and with github
- Create a listing to rent your house
- Create a reservation at someone else's property

## License

[MIT](https://choosealicense.com/licenses/mit/)
