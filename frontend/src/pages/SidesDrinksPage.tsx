import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";

const SIDES = [
    {
        name: "Papas Fritas Corte Casero",
        price: 2.75,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnz-keBikEc_gkMF3X8eYuwl-saA2cDcTXo2_NXn0rQHzyqXZntYQ7j9YBHRKOKWpSEPh0YrNI0gVSABdwehvXo5vqdAgNetOBQoZ68CIBKZ_Supnz3l6aG302bU0IeSfAOoWeFVmKhiKU-G_ATNyM1sMM0o-slivuuz-FRrNiRNqn0W4IEin7oo3FySWWO0G2bLIRAata2ATu_eJ-CxYRlAT-i_ykusFqc3ntlgiHdY5dfa2M4qCv1isy9KlW5z5vkDDkgw507dWM",
    },
    {
        name: "Papas en Cascos con Piel",
        price: 3.25,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxDAFnBywFMIxoy3tcy8rmQIVCejB7MXqvOTuXGWwdWuskxTlrTvYzlinowvilS5AY67d6iuWOGGoDIkZW2r9lwiwWMnUN4EqSVavSnPXDTp_6UvmGRAAfZVsaHzvdLbu2VE_Jnsg5G_ithy2YZG9_Ba28Xsvnb9g44Y9bQYy6OgJsIYiLQrsm2I5tgVeqojQORr6iiiIkTlw0lrzXWpjHH5JW8wKWAm8DeG1fw3MagQDrYUXgs5Q22Y3WscSfJYy82lAYSu3nPlzI",
    },
    {
        name: "Batatas Fritas",
        price: 3.5,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMlElAuFebfyZwZMvaR7yb9_yvAHCq3qB5b4lXZ2DRQTOEVuLuS3e4vST2X7gR2CbBsUM5lRtZ0Jw4ExeBS0M1VxFS6aLqX1Q9xfjqHCrsap8zMX0Rv2RhjwDFazTINren_-LoOfKzSDrhFBN6MhyU0NOq1MxPdBm3PeW7sLtRTFkpvsm5RPfi8HEfWJmG7BHxer4_xp_4ngqm_fcjZJQGA-qMJU3Xba2jzu5k6X32k-eXSkOAQHUz4rJVHhEub9lkJRADtvy3H1-w",
    },
];

const DRINKS = [
    {
        name: "Limonada Natural",
        price: 2.25,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0xx1tHGRkJ8GZHSLn8idU5dY5g5dzuH1ktT_mXzJSfPtkMfPtKG4qCRDSewyCFw23jKMCj7lmgvOx3isOlQ3ys04ytB3M41J_HeF9aUX3f8mCTgbS1vVDOk5ijutkx3VumFoCt5tFgRjUX_CE3CSmyRRvzTdNbLMeLqEdgcjbpiSviysAhH1cXt6-A0dQtSraRy2Gljx4A1G00KO-NILUY-3z0uCqWFUnj_KyCzlNUjWo3LJz8TlsWsejxCf367iqDHwAElh668gz",
    },
    {
        name: "Gaseosa (Cola, Naranja, Lima-Limon)",
        price: 2.0,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDEav1EgWnQeZUWXfAi2K958z7KjcXj02ndpp2AZbaSOczzwbDP6qB8_RbccB1k0AAXi6bwFDJiowv-p2WaaN_U30vGj5IrIzXy_HVILyPFBrYO1F3p1vwCDSFunLiKMq6ITu6h9g2TljnTk6t46d13emzG6sHPl0R6AqP_PhRPgaDDY-9bqtzajG6ij2BG_RArfnVdMIpBOzV2mM1mqbjnK4mrbknt7wk2_vdaobdzzBAiWuKl5LdmcWgd_fLfNv9_dWjywN998IPv",
    },
    {
        name: "Té Helado (Durazno/Limón)",
        price: 2.0,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtXrD2eianEyT2xL9l9OfpHa_PHMQUHmeXh-G81976A3pra_EjRIV1Xg_WNBD-VNBGUZqPPNWLwU1Qbfe_SSyXI-WW0r1hNIMjvDPMKdQxkdax56dSSljhfmUYX6sgWGGiv9h8HaPlua7luUXwzK040v6Jd28x12H-VjA4CzpYIFLcyo-7PwoIVwADUTlqevF9CrSvQ4Tw9FdDVxWE3hReHjfmYr5MilBpJTBEI3qH3P1u-tf_mFX8b8RIiJNLPbh74L49QCl31taj",
    },
    {
        name: "Agua Embotellada",
        price: 1.5,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAThIz5YPq_89eiRllGnjrQH1JMQ6qfTham8H7tZcxXw9sSf0EWo-UtJDBEWua53XqPx7jntZ88wWzSJ7Ko11k-UFyYp3ONs-kGC_wXd-1BSbrN0MRgpAjTSa4CnewfroqLTBkjtZm0PLe4kGKELm3hkOwNMrFAqEJy8gnj8ftzVfM22HxkfF2meLFUIIE0WYM4w6il8eS9bYW0iGLsJdzFPh-SiHIiTXznvLstRrXm0CkfymTpO6uLpiHJDTVCWPvN_Ois8xpSawRJ",
    },
    {
        name: "Cerveza Artezanal (sin alcohol)",
        price: 4.0,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdK1JMG5TR6ZRdXgny7IHs1dYDP8ujnFzBnEhn7vFK1-nQ6dgSSEGGx6WpgRXp3Haf5-xAC8gzgV31fA88KYCx4jtUBnNBxWDvbKHLVGKSyjq5Av7KGGM2C3kubUYMqfw54wfVqkRXC5vna08mc9zXNafyZNi7RWd1Y5_VNm1usHzCYluSp2eYaZerNxBy4U73X4FyCef0qvcObRIB7gsRKhL342HfQ-xz4fDUdWVwuiBE9Ia5StvVPqmvI1GVGB6W0vvvMVWHhcuS",
    },
];

const SidesDrinksPage: React.FC = () => {
    const [selectedSide, setSelectedSide] = useState<string | null>(null);
    const [selectedDrink, setSelectedDrink] = useState<string | null>(null);
    const navigate = useNavigate();
    const { addItem } = useCart();

    const getTotal = () => {
        let total = 0;
        if (selectedSide) {
            total += SIDES.find((s) => s.name === selectedSide)?.price || 0;
        }
        if (selectedDrink) {
            total += DRINKS.find((d) => d.name === selectedDrink)?.price || 0;
        }
        return total;
    };

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
                <div style={{ fontWeight: 600, fontSize: "1.3rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
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
                    }} />
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
                </nav>
            </header>

            {/* Main */}
            <main style={{ maxWidth: 700, margin: "3rem auto", padding: "0 1rem" }}>
                <h1 style={{ fontSize: "2.2rem", fontWeight: 700, marginBottom: "2.5rem", color: "#111" }}>
                Acompañamientos y Bebidas
                </h1>
                <div>
                <div style={{ fontWeight: 700, fontSize: "1.3rem", marginBottom: 18 }}>Papas</div>
                {SIDES.map((side) => (
                    <div
                    key={side.name}
                    onClick={() => setSelectedSide(side.name)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 18,
                        background: selectedSide === side.name ? "#e3eafc" : "#fff",
                        borderRadius: 12,
                        padding: "0.7rem 1rem",
                        marginBottom: 10,
                        cursor: "pointer",
                        boxShadow: selectedSide === side.name ? "0 2px 8px rgba(16,132,246,0.10)" : "0 2px 8px rgba(0,0,0,0.04)",
                        border: selectedSide === side.name ? "2px solid #1084f6" : "1px solid #f0f0f0"
                    }}
                    >
                    <img src={side.image} alt={side.name} style={{ width: 54, height: 54, borderRadius: 10, objectFit: "cover" }} />
                    <div>
                        <div style={{ fontWeight: 600 }}>{side.name}</div>
                        <div style={{ color: "#1084f6", fontWeight: 500, fontSize: 15 }}>${side.price.toFixed(2)} USD</div>
                    </div>
                    </div>
                ))}
                </div>
                <div style={{ marginTop: 36 }}>
                <div style={{ fontWeight: 700, fontSize: "1.3rem", marginBottom: 18 }}>Bebidas</div>
                {DRINKS.map((drink) => (
                    <div
                    key={drink.name}
                    onClick={() => setSelectedDrink(drink.name)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 18,
                        background: selectedDrink === drink.name ? "#e3eafc" : "#fff",
                        borderRadius: 12,
                        padding: "0.7rem 1rem",
                        marginBottom: 10,
                        cursor: "pointer",
                        boxShadow: selectedDrink === drink.name ? "0 2px 8px rgba(16,132,246,0.10)" : "0 2px 8px rgba(0,0,0,0.04)",
                        border: selectedDrink === drink.name ? "2px solid #1084f6" : "1px solid #f0f0f0"
                    }}
                    >
                    <img src={drink.image} alt={drink.name} style={{ width: 54, height: 54, borderRadius: 10, objectFit: "cover" }} />
                    <div>
                        <div style={{ fontWeight: 600 }}>{drink.name}</div>
                        <div style={{ color: "#1084f6", fontWeight: 500, fontSize: 15 }}>${drink.price.toFixed(2)} USD</div>
                    </div>
                    </div>
                ))}
                </div>
                <div style={{ marginTop: 40, display: "flex", justifyContent: "flex-end" }}>
                <div>
                    <div style={{ color: "#1084f6", fontWeight: 600, fontSize: 18, marginBottom: 12 }}>
                    Total acompañamientos: ${getTotal().toFixed(2)} USD
                    </div>
                    <button
                        style={{
                            background: "#1084f6",
                            color: "#fff",
                            border: "none",
                            borderRadius: "10px",
                            padding: "0.8rem 2.2rem",
                            fontWeight: 600,
                            fontSize: "1.1rem",
                            cursor: selectedSide && selectedDrink ? "pointer" : "not-allowed",
                            opacity: selectedSide && selectedDrink ? 1 : 0.6
                        }}
                        disabled={!selectedSide || !selectedDrink}
                        onClick={() => {
                            if (selectedSide) {
                                const side = SIDES.find(s => s.name === selectedSide)!;
                                addItem({ name: side.name, quantity: 1, unitPrice: side.price, type: "side" });
                            }
                            if (selectedDrink) {
                                const drink = DRINKS.find(d => d.name === selectedDrink)!;
                                addItem({ name: drink.name, quantity: 1, unitPrice: drink.price, type: "drink" });
                            }
                            navigate('/checkout');
                        }}
                    >
                    Continuar
                    </button>
                </div>
                </div>
            </main>
        </div>
    );
};

export default SidesDrinksPage;