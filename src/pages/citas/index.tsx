import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";

import { Loader } from "@common/Loader";
import Layout from "@components/appointments/Layout";

const fetcher = (url: string, options: object) => fetch(url, options).then((data) => data.json());

const Hoy: NextPage = () => {
	const { data: session, status } = useSession();
	const [isThereError, setIstThereError] = useState(false);

	const { data, error, isLoading } = useSWR(`/api/appointments/hoy`, (url) =>
		fetcher(url, {
			method: "POST",
			body: JSON.stringify({
				role: status === "authenticated" ? session.user.role : undefined,
			}),
		})
	);

	useEffect(() => {
		if (error) setIstThereError(true);
	}, [error]);

	if (error || isLoading) return <Loader isThereError={isThereError} />;

	return <Layout data={data} />;
};

export default Hoy;
