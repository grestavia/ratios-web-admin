import { SESSION_COOKIENAME, SESSION_PASSWORD } from "@/environment";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export const getSession = async () => {
  const session = await getIronSession(cookies(), {
    password: SESSION_PASSWORD,
    cookieName: SESSION_COOKIENAME,
  });

  return session;
};

export const setSession = async (token) => {
  const session = await getIronSession(cookies(), {
    password: SESSION_PASSWORD,
    cookieName: SESSION_COOKIENAME,
  });

  session.token = token;

  await session.save();
};

export const clearSession = async () => {
  const session = await getIronSession(cookies(), {
    password: SESSION_PASSWORD,
    cookieName: SESSION_COOKIENAME,
  });

  session.destroy();
};
