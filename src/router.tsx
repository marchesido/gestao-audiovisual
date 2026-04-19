import { createBrowserRouter } from "react-router";
import { Layout } from './components/shared/Layout.tsx';
import { ProtectedRoute } from './components/shared/ProtectedRoute.tsx';
import App from './App.tsx';

import { Login } from './page/auth/Login.tsx';
import { Profile } from './page/users/Profile.tsx';
import { UserList } from './page/users/List.tsx';
import { UserCreate } from './page/users/Create.tsx';
import { UserEdit } from './page/users/Edit.tsx';

import { EquipmentList } from './page/equipments/List.tsx';
import { EquipmentCreate } from './page/equipments/Create.tsx';
import { EquipmentEdit } from './page/equipments/Edit.tsx';

import { ClientList } from './page/clients/List.tsx';
import { ClientCreate } from './page/clients/Create.tsx';
import { ClientEdit } from './page/clients/Edit.tsx';

import { ProjectList } from './page/projects/List.tsx';
import { ProjectCreate } from './page/projects/Create.tsx';
import { ProjectEdit } from './page/projects/Edit.tsx';

import { ProductionList } from './page/productions/List.tsx';
import { ProductionCreate } from './page/productions/Create.tsx';
import { ProductionEdit } from './page/productions/Edit.tsx';

import { EquipmentAllocationList } from './page/production-equipments/List.tsx';
import { EquipmentAllocationCreate } from './page/production-equipments/Create.tsx';
import { EquipmentAllocationEdit } from './page/production-equipments/Edit.tsx';

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: ProtectedRoute,
    children: [
      {
        path: "",
        Component: Layout,
        children: [
          { index: true, Component: App }, // Dashboard
          {
            path: "profile",
            Component: Profile,
          },
          {
            path: "users",
            children: [
              { index: true, Component: UserList },
              { path: "new", Component: UserCreate },
              { path: ":id/edit", Component: UserEdit },
            ]
          },
          {
            path: "equipments",
            children: [
              { index: true, Component: EquipmentList },
              { path: "create", Component: EquipmentCreate },
              { path: ":id/edit", Component: EquipmentEdit },
            ]
          },
          {
            path: "production-equipments",
            children: [
              { index: true, Component: EquipmentAllocationList },
              { path: "create", Component: EquipmentAllocationCreate },
              { path: ":id/edit", Component: EquipmentAllocationEdit },
            ]
          },
          {
            path: "client",
            children: [
              { index: true, Component: ClientList },
              { path: "create", Component: ClientCreate },
              { path: ":id/edit", Component: ClientEdit },
            ]
          },
          {
            path: "productions",
            children: [
              { index: true, Component: ProductionList },
              { path: "create", Component: ProductionCreate },
              { path: ":id/edit", Component: ProductionEdit },
            ]
          },
          {
            path: "projects",
            children: [
              { index: true, Component: ProjectList },
              { path: "create", Component: ProjectCreate },
              { path: ":id/edit", Component: ProjectEdit },
            ]
          },
        ]
      }
    ]
  }
]);
