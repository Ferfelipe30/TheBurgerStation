import React from "react";

const OrderSuccessPage: React.FC = () => (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
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
            }} />
            The Burger Station
        </div>
        <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <a href="/menu" style={{ color: "#222", textDecoration: "none", fontWeight: 500 }}>Menu</a>
            <a href="/locations" style={{ color: "#222", textDecoration: "none", fontWeight: 500 }}>Locations</a>
            <a href="/about" style={{ color: "#222", textDecoration: "none", fontWeight: 500 }}>About</a>
        </nav>
        </header>
        <main style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "70vh"
        }}>
            <h1 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#1084f6", marginBottom: 24 }}>
                ¡Orden Confirmada!
            </h1>
            <p style={{ fontSize: "1.2rem", color: "#222", marginBottom: 32 }}>
                Tu pedido ha sido recibido exitosamente.<br />
                ¡Gracias por elegir The Burger Station!
            </p>
            <a
                href="/"
                style={{
                padding: "0.9rem 2.5rem",
                background: "#1084f6",
                color: "#fff",
                borderRadius: "10px",
                fontWeight: 600,
                fontSize: "1.1rem",
                textDecoration: "none"
                }}
            >
                Volver al inicio
            </a>
        </main>
    </div>
);

export default OrderSuccessPage;