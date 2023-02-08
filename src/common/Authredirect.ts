import { NextRouter, useRouter } from "next/router";

export const AuthRedirect = (Auth: boolean, router: NextRouter) => {

  if (!Auth) router.push('/login')
}