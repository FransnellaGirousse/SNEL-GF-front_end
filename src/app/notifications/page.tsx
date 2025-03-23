"use client";

import useStore, { useNotifStore } from "@/store/useStore";
import { Layout } from "@/ui/components/layout/layout";
import { Avatar } from "@/ui/design-system/avatar/avatar";
import { useEffect, useState } from "react";
import { FaRegBell } from "react-icons/fa";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import clsx from "clsx";
import Link from "next/link";

dayjs.extend(relativeTime);

const convertToIlYa = (dateString) => {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now - past;

  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHrs = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHrs / 24);

  if (diffSec < 60) return `il y a ${diffSec} seconde(s)`;
  if (diffMin < 60) return `il y a ${diffMin} minute(s)`;
  if (diffHrs < 24) return `il y a ${diffHrs} heure(s)`;
  return `il y a ${diffDays} jour(s)`;
};

const NotificationItem = ({ notification }) => {
  const [userRequest, setUserRequest] = useState(null);
  let notif_message: string = "";
  let link_notif = "";
  switch (notification.type) {
    case "TDR":
      notif_message = "vous a envoyé un TDR";
      link_notif = `/approval-missions/${notification.id_type_request}`;
      break;
    case "REQUEST_IN_ADVANCE":
      notif_message = "vous a envoyé une demande d'avance";
      link_notif = `/approval-advance/${notification.id_type_request}`;
      break;
    case "TDR_RESPONSE":
      notif_message = "a repondu a votre TDR";
      link_notif = `/assignment`;
      break;
  }
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/users/${notification.id_user_request}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!res.ok) {
          throw new Error(`Erreur HTTP : ${res.status}`);
        }

        const data = await res.json();
        setUserRequest(data.user); // 👈 ici, on accède à la clé "user"
      } catch (e) {
        console.error("Erreur lors de la récupération de l'utilisateur :", e);
      }
    };

    fetchUser();
  }, [notification.id_user_request]);
  if (!userRequest) return <div>Chargement...</div>;
  return (
    <Link href={link_notif}>
      <div
        className={clsx(
          "flex relative gap-2 items-center p-4 border-b last:border-b-0 border-gray-300 bg-gray-500",
          notification.read === 1 && "bg-white"
        )}
      >
        <Avatar
          size="large"
          src="/assets/images/authentication/default-avatar.jpg"
          alt={userRequest.firstname}
        />
        <div>
          <span className="font-bold">
            {userRequest?.firstname} {userRequest?.lastname}
          </span>
          <span>&nbsp;{notif_message}</span>
        </div>
        <div className="absolute right-4 text-caption4 text-gray-600">
          {convertToIlYa(notification.date_requested)}
        </div>
      </div>
    </Link>
  );
};

const getNotifications = async (user_id) => {
  try {
    const res = await fetch(
      `http://localhost:8000/api/notifications/user-offer/${user_id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

export default function Page() {
  const { user, setUser } = useStore();
  const { read, resetRead } = useNotifStore();
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await getNotifications(user.id);
      if (data) setNotifications(data);
    };

    if (user.id) fetchNotifications();
  }, [user.id]);
  useEffect(() => {
    if (!user?.id) return;

    const updateReadNotifications = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/notifications/mark-as-read/${user.id}`,
          {
            method: "PUT", // Utilisation de POST pour une mise à jour
            headers: {
              "Content-Type": "application/json",
            }, // Si l'API attend un body
          }
        );

        resetRead();

        if (!res.ok) {
          throw new Error(`Erreur HTTP : ${res.status}`);
        }

        console.log("Notifications mises à jour avec succès");
      } catch (error) {
        console.error(
          "Erreur lors de la mise à jour des notifications :",
          error
        );
      }
    };

    updateReadNotifications();
  }, [user]);
  return (
    <Layout>
      <div className="mt-10 max-w-xl mx-auto border border-gray-500 rounded overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-500">
          <h2 className="text-xl flex justify-between items-center gap-2 font-semibold">
            <FaRegBell />
            Notifications
          </h2>
          <p className="text-xs text-blue-600 cursor-pointer">
            <button className="text-primary hover:underline transition-all">
              Tout marquer comme lu
            </button>
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
