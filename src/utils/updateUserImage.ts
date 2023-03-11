import { supabase } from "@ddbb/supabase.client";
import { Session } from "next-auth/core/types";
import { RefObject } from "react";

interface UpdateUserImageProps {
	session: Session;
	imageInputRef: RefObject<HTMLInputElement>;
}

export async function handlerUpdateUserImage({ session, imageInputRef }: UpdateUserImageProps) {
	const IMAGE = imageInputRef.current?.files;

	if (typeof session.user.image != "string") return;
	if (!IMAGE || IMAGE?.length === 0) return;

	const { data, error } = await supabase.storage
		.from("user-image")
		.update(session.user.image, IMAGE[0], {
			upsert: true,
		});
}
