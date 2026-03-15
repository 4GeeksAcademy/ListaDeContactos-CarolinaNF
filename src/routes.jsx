import { createBrowserRouter } from "react-router-dom";
import Contacts from "./views/Contacts";
import AddContacts from "./views/AddContacts";
import EditContacts from "./views/EditContacts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Contacts />
  },
  {
    path: "/add",
    element: <AddContacts />
  },
  {
    path: "/edit/:id",
    element: <EditContacts />
  }
]);