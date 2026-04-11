import { createBrowserRouter } from "react-router";
import { Layout } from './components/shared/Layout.tsx';
import App from './App.tsx';

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

import { EquipmentAllocationList } from './page/project-equipments/List.tsx';
import { EquipmentAllocationCreate } from './page/project-equipments/Create.tsx';
import { EquipmentAllocationEdit } from './page/project-equipments/Edit.tsx';

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: App }, // Dashboard Dashboard
      { 
        path: "equipments", 
        children: [
          { index: true, Component: EquipmentList },
          { path: "create", Component: EquipmentCreate },
          { path: ":id/edit", Component: EquipmentEdit },
        ]
      },
      // Placeholders para futuros módulos
      { 
        path: "projects-equipments", 
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
]);
