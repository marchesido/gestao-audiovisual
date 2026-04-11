import { createBrowserRouter } from "react-router";
import { Layout } from './components/shared/Layout.tsx';
import App from './App.tsx';

import { EquipmentList } from './page/equipments/List.tsx';
import { EquipmentCreate } from './page/equipments/Create.tsx';
import { EquipmentEdit } from './page/equipments/Edit.tsx';

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
      { path: "projects-equipments", Component: () => <div>Em Breve: Projetos e Equipamentos</div> },
      { path: "client", Component: () => <div>Em Breve: Clientes</div> },
      { path: "productions", Component: () => <div>Em Breve: Produções</div> },
      { path: "projects", Component: () => <div>Em Breve: Projetos</div> },
    ]
  }
]);
