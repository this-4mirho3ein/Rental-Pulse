"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import markMessageAsRead from "@/app/actions/MarkMessageAsRead";
import deleteMessage from "@/app/actions/deleteMessage";
import { useGlobalContext } from "@/context/GlobalContext";

const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);

  const {setUnreadCount} = useGlobalContext

   const handleReadClick = async () => {
    const read = await markMessageAsRead(message._id);
    setIsRead(read);
    setUnreadCount((prevCount)=>(read ? prevCount -1 : prevCount + 1))
    toast.success(`Mark As ${read ? "Read" : "New"}`);
  };

  const handleDeleteClick = async () => {
    await deleteMessage(message._id);
    setIsDeleted(true);
    setUnreadCount((prevCount)=>(isRead ? prevCount: prevCount - 1))

    toast.success("Message Deleted");
  };
  if (isDeleted) {
    return <p>Deleted message</p>;
  }
  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border-gray-200">
      <h2 className="text-xl mb-4">
        {!isRead && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
            New
          </div>
        )}
        <span className="font-bold">Property Inquiry : </span>{" "}
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>
      <ul className="mt-4">
        <li>
          <strong>Reply Email :</strong>{" "}
          <Link href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </Link>
        </li>
        <li>
          <strong>Reply Phone :</strong>{" "}
          <Link href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </Link>
        </li>
        <li>
          <strong>Recived :</strong>{" "}
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button
        onClick={handleReadClick}
        className="mt-4 mr-3 bg-blue-500 text-white py01 px-3 rounded-md"
      >
        {isRead ? "Mark As New" : "Mark As Read"}
      </button>
      <button
        onClick={handleDeleteClick}
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
