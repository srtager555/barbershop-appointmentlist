import mysql from 'mysql2/promise'


export default async function excuteQuery({
  query,
	values,
}: {
  query: string;
	values?: string[] | string;
}) {
  const CONNECTION = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });

	try {
		const [rows, fields] = await CONNECTION.execute(query, values);

		CONNECTION.end()

		return { rows, fields};
	} catch (error) {
		return { error };
	}
}
