import { supabase } from "@ddbb/supabase.client";
import { Session } from "next-auth/core/types";

export async function DeleteUserImage(session: Session) {
	const { data: rawImageList } = await supabase.storage.from("user-image").list("", {
		offset: 0,
		search: `avatar_${session.user.id}`,
	});

	if (!rawImageList) return;

	const ImageList = rawImageList.map((el) => el.name);

	// idk that I can do with data and error
	// const { data, error } =
	await supabase.storage.from("user-image").remove(ImageList);
}
