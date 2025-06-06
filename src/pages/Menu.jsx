import { useEffect, useState} from "react";
import { auth } from '../api/firebase';
import { onAuthStateChanged } from "firebase/auth";
import InfiniteMenu from "../componentes/InfiniteMenu";
import Header from "../componentes/Header";

function Menu() {

    const [currentUser, setCurrentUser] = useState(null);


    useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                setCurrentUser(user);
                if (user) setCurrentUser(user);
            });
            return () => unsubscribe();
        });

        const items = [
                {
                    image: '/Planetas/Planetas.png',
                    link: '/planetas',
                    title: 'Planetas',
                    description: 'Descubre los planetas del universo'
                },
                {
                    image: '/Cinemáticas/1.webp',
                    link: '/historia',
                    title: 'Historia',
                    description: 'Conoces la historia del pingüino?'
                },
                {
                    image: '/Ilustraciones/Inicio.png',
                    link: '/',
                    title: 'Inicio',
                    description: 'Donde todo comenzó',
                },
                {
                    image: '/Iconos/Clasificación.svg',
                    link: '/clasificacion',
                    title: 'Clasificación',
                    description: 'Compite con otros jugadores',
                }
        ];

        if (currentUser) {
        items.push({
            image: '/Iconos/Logout.png',
            link: '/logout',
            title: 'Cerrar Sesión',
            description: '¡Te esperamos pronto de vuelta!',
        });} else{
            items.push({
            image: '/Iconos/Iniciar Sesión.png',
            link: '/login',
            title: 'Iniciar Sesión',
            description: 'Inicia sesión para cargar tu progreso',
            });
            items.push({
            image: '/Iconos/Registrarse.png',
            link: '/registro',
            title: 'Regístrate',
            description: 'Y guarda tu progreso',
            });
        }

    return (
    <div style={{ height: '100dvh', position: 'relative'}}>
    <Header enlace="/planetas" textoEnlace="Ver Planetas"/>
    <InfiniteMenu items={items}/>
    </div>
    );
}

export default Menu;