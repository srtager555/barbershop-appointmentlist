import { supabase } from "@ddbb/supabase.client";
import { Session } from "next-auth/core/types";
import { RefObject } from "react";

export const handlerUploadUserAvatar = async (
	imageInputRef: RefObject<HTMLInputElement>,
	session: Session
) => {
	if (!imageInputRef.current) return;

	const image = imageInputRef.current.files;

	if (!image) return;

	const { data, error } = await supabase.storage
		.from("user-image")
		.upload(`avatar_${session.user.id}`, image[0]);
};
