import { GetServerSideProps, NextPage } from "next";

import Layout from "@components/appointments/Layout";

export const getServerSideProps: GetServerSideProps = async () => {
	const DATA = await fetch(`${process.env.URL}api/appointments/hoy`).then((data) => data.json());

	return {
		props: { data: DATA },
	};
};

const Hoy: NextPage<{ data: appointmentData[] }> = ({ data }) => {
  return <Layout data={data} />
}

export default Hoy