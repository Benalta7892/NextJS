import { redirect } from "next/navigation";
import { sessionInfo } from "@/lib/serverMethods/session/sessionMethods";

const layout = async ({ children }) => {
  const session = await sessionInfo();

  if (!session.success) {
    redirect("/signin");
  }

  return <>{children}</>;
};
export default layout;
