import { NextPage } from "next";

import Layout from "@components/appointments/Layout";
import useSWR from "swr";
import { Loader } from "@common/Loader";
import { useEffect, useState } from "react";

const fetcher = (url: string) => fetch(url).then((data) => data.json());

const Hoy: NextPage = () => {
	const { data, error, isLoading } = useSWR(`/api/appointments/hoy`, fetcher);
	const [isThereError, setIstThereError] = useState(false);

	useEffect(() => {
		if (error) setIstThereError(true);
	}, [error]);

	if (error || isLoading) return <Loader isThereError={isThereError} />;

	return <Layout data={data} />;
};

export default Hoy;
