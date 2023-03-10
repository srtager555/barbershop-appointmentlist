import { supabase } from "@ddbb/supabase.client";
import { Session } from "next-auth/core/types";
import { RefObject } from "react";
import { DeleteUserImage } from "./deleteUserImage";

export const handlerUploadUserAvatar = async (
	imageInputRef: RefObject<HTMLInputElement>,
	session: Session | null
) => {
	if (!imageInputRef.current) return;

	const image = imageInputRef.current.files;

	if (!image || !session) return;

	try {
		const { data, error } = await supabase.storage
			.from("user-image")
			.upload(`avatar_${session.user.id}.${image[0].type.split("/")[1]}`, image[0], {
				upsert: true,
			});

		if (error) throw error;

		await fetch("/api/user/setImagePath", {
			method: "POST",
			body: JSON.stringify({
				path: data.path,
				user_id: session.user.id,
			}),
		});
	} catch (error) {
		console.log(error);
	}
};
