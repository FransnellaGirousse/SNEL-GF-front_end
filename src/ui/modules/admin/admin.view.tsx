
import { AdminSubscriptions } from "./components/AdminSubscriptions";
import { AdminListComponents } from "./components/adminlistComponents";
import { UserListComponents } from "./components/userlistComponents";

export const AdminView = () => {
  return (
    <>
      <UserListComponents/>
      <AdminListComponents />
      <AdminSubscriptions />
    </>
  );
};
