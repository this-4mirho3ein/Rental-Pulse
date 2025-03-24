"use server";
import connectDB from "@/config/database";
import User from "@/model/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function bookmarkProperty(propertyId) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User Id is required");
  }
  const { userId } = sessionUser;

  const user = await User.findById(userId);

  let isBookmarked = user.bookmarks.includes(propertyId);
  let message;
  if (isBookmarked) {
    //if already bookmarked then remove
    user.bookmarks.pull(propertyId);
    message = "Bookmark Removed";
    isBookmarked = false;
  } else {
    //if not bookmarked then add
    user.bookmarks.push(propertyId);
    message = "Bookmark Added";
    isBookmarked = true;
  }
  await user.save();
  revalidatePath("/properties/save", "page");
  return {
    message,
    isBookmarked,
  };
}

export default bookmarkProperty;
