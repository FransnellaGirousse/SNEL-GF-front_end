"use client";

import { Layout } from "@/ui/components/layout/layout";
import { useState } from "react";

const notifications = [
  {
    id: 1,
    name: "Ralph Edwards",
    action: "wants to edit",
    target: "Tetrisly Design System",
    time: "5 min ago",
    type: "request",
    avatar: "https://i.pravatar.cc/40?img=1",
  },
  {
    id: 2,
    name: "Robert Fox",
    action: "added file to",
    target: "Dark mode",
    time: "1 hour ago",
    type: "file",
    avatar: "https://i.pravatar.cc/40?img=2",
    file: {
      name: "Tet_Dark_Mode_v102.fig",
      size: "1.2 MB",
    },
  },
];

const NotificationItem = ({ notification }) => {
  return (
    <div className="flex items-start p-4 border-b border-gray-200">
      <img
        src={notification.avatar}
        alt="avatar"
        className="w-10 h-10 rounded-full"
      />
      <div className="ml-3 flex-1">
        <p className="text-sm text-gray-800">
          <span className="font-semibold">{notification.name}</span>{" "}
          {notification.action}{" "}
          <span className="font-semibold">{notification.target}</span>
        </p>
        <p className="text-xs text-gray-500">{notification.time}</p>
        {notification.type === "request" && (
          <div className="mt-2">
            <button className="px-4 py-1 text-white bg-blue-600 rounded-md mr-2">
              Accept
            </button>
            <button className="px-4 py-1 text-gray-700 bg-gray-200 rounded-md">
              Deny
            </button>
          </div>
        )}
        {notification.type === "file" && (
          <div className="mt-2 flex items-center p-2 border rounded-md bg-gray-100">
            <div className="text-purple-600 text-xl">📁</div>
            <div className="ml-2">
              <p className="text-sm font-medium">{notification.file.name}</p>
              <p className="text-xs text-gray-500">{notification.file.size}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <p className="text-xs text-blue-600 cursor-pointer">
            Mark all as read
          </p>
        </div>
        <div>
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
