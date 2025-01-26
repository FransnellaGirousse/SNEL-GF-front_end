import { useSession } from "next-auth/react";

const MyComponent: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <>
          <p>Bienvenue, {session.user.email}!</p>
          <p>Rôle: {session.user.role}</p> {/* Affiche le rôle */}
        </>
      ) : (
        <p>Veuillez vous connecter</p>
      )}
    </div>
  );
};

export default MyComponent;
