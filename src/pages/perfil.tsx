import { Loader } from "@common/Loader";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Profile: NextPage = () => {
	const { data: session, status } = useSession();
	const router = useRouter();

	if (status === "loading") return <Loader />;

	if (status === "unauthenticated") router.push("/login");

	return <>?</>;
};

export default Profile;
