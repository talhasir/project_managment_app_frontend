import { useContext } from "react";

import context from "../ContextProvider";
import PageComponent from "../Layouts/ViewLayout";

export default function Dashboard() {
  const { currentUser } = useContext(context);
  console.log(currentUser);
  return (
    <>
      <PageComponent heading="Dashboard"></PageComponent>
    </>
  );
}
