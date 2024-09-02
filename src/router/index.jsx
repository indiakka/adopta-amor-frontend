import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../layout/Layout";
import Adoptar from "../pages/Adoptar";
import AnimalInfo from "../pages/animalInfo/AnimalInfo";
import Casita from "../pages/casita/Casita";
import Donar from "../pages/donar/Donar";
import SobreNosotras from "../pages/sobreNosotras/SobreNosotras";
import Contacto from "../pages/contacto/Contacto";
import EditarInfo from "../pages/editarInfo/editarInfo";



export const router = createBrowserRouter( [ {
    path: "/",
    element: <Layout />,
    children: [
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/adoptar",
            element: <Adoptar />
        },
        {
            path: `/animal-info/:id`,
            element: <AnimalInfo />
        },
        {
            path: "/casita",
            element: <Casita />
        },
        {
            path: "/donar",
            element: <Donar />
        },
        {
            path: "/sobreNosotras",
            element: <SobreNosotras />
        },
        {
            path: "/contacto",
            element: <Contacto />
        },
        {
            path: "/editarInfo/:id",
            element: <EditarInfo/>
        }
    ]
}
] )