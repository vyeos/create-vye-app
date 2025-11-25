import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/index";
// import { schema } from "@/db/schema";
import { nextCookies } from "better-auth/next-js";

// export const database = createClient(
//   process.env.NEXT_PUBLIC_DATABASE_URL!,
//   process.env.NEXT_PUBLIC_DATABASE_ANON_KEY!,
// );

// const resend = new Resend(process.env.RESEND_API_KEY!);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    // schema,
  }),
  // user: {
  //   deleteUser: {
  //     enabled: true,
  //   },
  // changeEmail: {
  //   enabled: true,
  //   sendChangeEmailVerification: async ({ newEmail, url }) => {
  //     await resend.emails.send({
  //       from: "",
  //       to: ,
  //       subject: "",
  //       text: "",
  //     });
  //   },
  // },
  // },
  // emailAndPassword: {
  //   enabled: true,
  //   authSignIn: true,
  //   requireEmailVerification: true,
  // },
  // socialProviders: {
  //   google: {
  //     clientId: process.env.GOOGLE_CLIENT_ID as string,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  //   },
  // },
  // emailVerification: {
  //   sendVerificationEmail: async ({ user, url }) => {
  //     await resend.emails.send({
  //       from: "",
  //       to: ,
  //       subject: "",
  //       react: ,
  //     });
  //   },
  //   sendOnSignUp: true,
  // },
  // session: {
  //   expiresIn: 60 * 60 * 24 * 7,
  //   updateAge: 60 * 60 * 24,
  // },
  plugins: [nextCookies()],
});
