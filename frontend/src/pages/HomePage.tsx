import React from "react";

const HomePage: React.FC = () => (
    <div>
        {/* Header */}
        <header style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.5rem 3rem 1.5rem 2rem",
            borderBottom: "1px solid #f0f0f0",
            background: "#fff"
        }}>
            <div style={{ fontWeight: 600, fontSize: "1.3rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{
                    display: "inline-block",
                    width: 12,
                    height: 12,
                    background: "#222",
                    borderRadius: "3px",
                    marginRight: 6
                }}/>
                The Burger Station
            </div>
            <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
                <a href="/menu" style={{ color: "#222", textDecoration: "none", fontWeight: 500 }}>Menu</a>
                <a href="/locations" style={{ color: "#222", textDecoration: "none", fontWeight: 500 }}>Locations</a>
                <a href="/about" style={{ color: "#222", textDecoration: "none", fontWeight: 500 }}>About Us</a>
                <a href="/login" style={{
                marginLeft: "1.5rem",
                background: "#e3eafc",
                color: "#222",
                borderRadius: "2rem",
                padding: "0.5rem 1.5rem",
                fontWeight: 600,
                textDecoration: "none",
                fontSize: "1rem"
                }}>Register/Login</a>
            </nav>
        </header>

        {/*Main Content*/}
        <main style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh",
            gap: "3rem"
        }}>
            <img 
                src="https://cdn.pixabay.com/photo/2023/09/25/22/08/ai-generated-8276129_1280.jpg" 
                alt="Burger" 
                style={{ 
                    borderRadius: "20px", 
                    width: "400px", 
                    height: "auto", 
                    boxShadow: "0 4px 24px rgba(0,0,0,0.12)" 
                }}
            />
            <div>
                <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>¡Bienvenido a The Burger Station!</h1>
                <p style={{ fontSize: "1.2rem", marginBottom: "2rem", maxWidth: "500px" }}>
                    Descubre la mejor experiencia para crear y pedir hamburguesas personalizadas, acompañamientos y bebidas. 
                    Regístrate, inicia sesión y arma tu pedido ideal con ingredientes frescos y combinaciones únicas. 
                    ¡Haz tu pedido y disfruta!
                </p>
                <a
                    href="/menu"
                    style={{
                        display: "inline-block",
                        padding: "1rem 2.5rem",
                        background: "#e3eafc",
                        color: "#222",
                        borderRadius: "2rem",
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                        textDecoration: "none",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
                    }}
                >
                    Ver Menú
                </a>
            </div>
        </main>
    </div>
);

export default HomePage;