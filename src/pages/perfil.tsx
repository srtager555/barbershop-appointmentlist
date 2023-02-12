import { NextPage } from "next";
import { useSession } from "next-auth/react";

const Profile: NextPage = () => {
  const session = useSession()

  return <></>
}

export default Profile;