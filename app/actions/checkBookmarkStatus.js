"use server";
import connectDB from "@/config/database";
import User from "@/model/User";
import { getSessionUser } from "@/utils/getSessionUser";

async function checkBookMarkStatus(propertyId) {
    await connectDB();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      throw new Error("User Id is required");
    }
    const { userId } = sessionUser;
  
    const user = await User.findById(userId);
  
    let isBookmarked = user.bookmarks.includes(propertyId);
    return {isBookmarked}
}
export default checkBookMarkStatus; 