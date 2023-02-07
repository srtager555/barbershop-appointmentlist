interface userDDBBResult {
	rows: {
		id: number;
		name: string;
		password: string;
		phone: number;
		appointment: number | null;
		admin: string;
	}[];
}
