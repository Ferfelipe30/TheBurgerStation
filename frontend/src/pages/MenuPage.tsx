import React, { useState } from "react";
import BurgerCustomizeModal from "../components/BurgerCustomizeModal";
import { useUser } from "../UserContext";

const burgers = [
    {
        name: "La Montañesa",
        description: "Carne de res artesanal, queso suizo, champiñones salteados, cebolla caramelizada y salsa de hierbas.",
        price: 9.5,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJcd16n5c1b9u74U6g7I1lW5-YH5amesSRdLHUYe3eA-rWaouQ2z9tO0_2Cubvw1_Q-hca45z2ak61B53WOqhEGZ-8VGTGh-OP7f4TqZD5jhMeZHA-OV9F7Z5BgVClaJNRAGd5RwU71mXin7YeXF6W__WaJzbhYZQMtDoyLTT1XMrbRSf6MEOBeWf59VloeB4LZC0eAbgw3O8wHMHdhtFvEF3xYupNO7KrdgKO1XWu6Z1ANh06nSuxPO-cvu7tG95fc5d7TpoljrPN",
    },
    {
        name: "El Ranchero",
        description: "Pollo a la parrilla marinado, tocino crujiente, queso provolone, aros de cebolla fritos y salsa ranch.",
        price: 10.0,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLScTyk9LR_kGSQkcmAxQvAj2Nuz5EFw8yDwcCiEBxJI4bu80yvArEjMzDiXD8ajzQ__coUc73xpIvq7vYzesaq6fcMVW_cUyNfyc6Wi7YtCrYWfXAqtMiGf1CD8HUBw44TwmTYUkxt0eXOXbn9xeW1NkysvYmiBsiIFhNX3-tjYhXy-LXVodDFE9CyPRpLPP7ajg8rLDoynEleEyw7mXnMpUDOQhp9nJhsihC54CkOCeq1JkbbDgHYU3THv-8nsQTOlxjyCNNzWxi",
    },
    {
        name: "Veggie Mediterranea",
        description: "Medallon de garbanzos y espinacas, queso feta, aceitunas negras, pimientos asados y tzatziki.",
        price: 8.75,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuBxshy7HiTUa-2X_kKeogNe2e9YYqrC3CQqFchN3n3I_YmvEgbLJHyl26GEnRs_EiapGy612z7gb9eQhEA_Z_gnUq2n4fVpb8xqpeRuHtQkJcZhFg53d7Oa8NkIn0NGUsC_52rx5j1nzGXr7_BptXnPRaNP1VPuyPB69reg-yYCuoOI1b_5HwBVpO_--NYbe4FVOuO1XV5YPNXPt2xkS3_J2lVKEKuOfiaI3LnyTC4vqnpLXQuFCVKgpITEkPEchdpB-Img_brvuK",
    },
    {
        name: "Doble Bufalo",
        description: "Doble carne de res, queso cheddar añejo, pepinillos encurtidos, cebolla roja y salsa bufalo picante.",
        price: 11.75,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZ3ySVIF55_W9aihABsSYlYYpRdwcfkjPDUsl3IJ5TPh9dPYZz89LEnc6Ih3YtmMquc7XG1V63cioaqouUQlnRi_diRyjDu30puWbKesm1s497t_TzK2dn3mRWmcDljeY9aYbdne0jJLmrxt0ZWXTgR_mTC6_7eT1OapyBLCbWxmzfsT5G9OBxkSi2l6y89ByKCMZ0-lq3b_ksPtOTkxl-0Y7oX0MfWz1GZClNNZZCJY1Oh5MvQ5rTkDZZznHwzE99BsQS-mgPFq4Z",
    },
    {
        name: "Mar y Tierra",
        description: "Carne de res, camarones salteados al ajillo, aguacate y salsa rosada de la casa.",
        price: 13.0,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRYvWpdGtiM35mzTwdvn5BEtksdEL3hSO1ORcHGlis3OpV4TmV3U2lxGxcNMN0EsImDO2CAdSK4PWsUZcj3rur4btYrngnsC4X-qM-zqwJi4wdET2SI8M0LRITln7VJr3Cbztq3q13UEJ29SjafqKW0ACOa8dvJ6lenJFRWk0g9hur7h4S-Gp_l8A-g-WitPzRIQn5XhqsYie7qvdGn2sBrGqN6JRJZfPDEE6vCjo0mVE8JcxH0d6DQPnjcJT2OvNXr1O15vwLw2Rs",
    },
];

const MenuPage: React.FC = () => {
    const [ selectedBurger, setSelectedBurger ] = useState<any>(null);
    const { logout } = useUser();

    return (
        <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
            {/* Header */}
            <header style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1.5rem 3rem 1.5rem 2rem",
                borderBottom: "1px solid #f0f0f0",
                background: "#fff"
            }}>
                <div style={{ fontWeight: 600, fontSize: "1.3rem", display: "flex", alignItems: "center", gap: "0.5rem"}}>
                    <a
                        href='/'
                        style={{
                        fontWeight: 600,
                        fontSize: "1.3rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: "#222",
                        textDecoration: "none"
                        }}
                    >
                        <span style={{
                        display: "inline-block",
                        width: 12,
                        height: 12,
                        background: "#222",
                        borderRadius: "3px",
                        marginRight: 6
                        }}/>
                        The Burger Station
                    </a>
                </div>
                <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
                    <a href="/menu" style={{ color: "#222", textDecoration: "none", fontWeight: 500 }}>Menu</a>
                    <a href="/locations" style={{ color: "#222", textDecoration: "none", fontWeight: 500 }}>Locations</a>
                    <a href="/about" style={{ color: "#222", textDecoration: "none", fontWeight: 500 }}>About</a>
                    <a href="/login" style={{
                        marginLeft: "1.5rem",
                        background: "#e3eafc",
                        color: "#222",
                        borderRadius: "2rem",
                        padding: "0.5rem 1.5rem",
                        fontWeight: 600,
                        textDecoration: "none",
                        fontSize: "1rem"
                    }}>Log In</a>
                    <button onClick={logout}>Cerrar sesion</button>
                </nav>
            </header>

            {/* Menu */}
            <main style={{ maxWidth: 1000, margin: "3rem auto", padding: "0 1rem" }}>
                <h1 style={{ fontSize: "2.2rem", fontWeight: 700, marginBottom: "2.5rem", color: "#111" }}>
                Nuestras Hamburguesas Estrella
                </h1>
                <div>
                {burgers.map((burger, idx) => (
                    <div key={burger.name} style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "2.5rem",
                    background: "#fff",
                    borderRadius: "18px",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                    padding: "1.5rem",
                    gap: "2.5rem"
                    }}>
                    <div style={{ flex: 1 }}>
                        <h2 style={{ fontSize: "1.3rem", fontWeight: 600, margin: 0 }}>{burger.name}</h2>
                        <p style={{ color: "#444", margin: "0.5rem 0 1rem 0" }}>{burger.description}</p>
                        <div style={{ fontWeight: 700, color: "#1084f6", marginBottom: "1rem" }}>
                        ${burger.price.toFixed(2)} USD
                        </div>
                        <button
                        style={{
                            background: "#e3eafc",
                            color: "#222",
                            border: "none",
                            borderRadius: "2rem",
                            padding: "0.5rem 1.5rem",
                            fontWeight: 600,
                            fontSize: "1rem",
                            cursor: "pointer"
                        }}
                        onClick={() => setSelectedBurger(burger)}
                        >
                        Personalizar
                        </button>
                    </div>
                    <img
                        src={burger.image}
                        alt={burger.name}
                        style={{
                        width: 170,
                        height: 120,
                        objectFit: "cover",
                        borderRadius: "12px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.10)"
                        }}
                    />
                    </div>
                ))}
                </div>
            </main>
            {selectedBurger && (
                <BurgerCustomizeModal
                    burger={selectedBurger}
                    open={!!selectedBurger}
                    onClose={() => setSelectedBurger(null)}
                />
            )}
        </div>
    );
};

export default MenuPage;