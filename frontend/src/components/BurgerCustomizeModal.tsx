import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";

const ADDITIONS = [
    { name: "Huevo frito", price: 1.0 },
    { name: "Jalabeños", price: 0.5 },
    { name: "Guacamole", price: 1.5 },
    { name: "Piña caramelizada", price: 0.75 },
    { name: "Extra queso (cheddar/mozzarella)", price: 0.8 },
];

const SAUCES = [
    { name: "Ketchup", price: 0.0 },
    { name: "Mayonesa", price: 0.0 },
    { name: "Mostaza Dijon", price: 0.0 },
    { name: "Salsa BBQ ahumada", price: 0.6 },
    { name: "Mayonesa picante", price: 0.6 },
];

type Props = {
    burger: {
        name: string;
        price: number;
        image: string;
        description: string;
    };
    open: boolean;
    onClose: () => void;
};

const BurgerCustomizeModal: React.FC<Props> = ({ burger, open, onClose }) => {
    const [selectedAdditions, setSelectedAdditions] = useState<string[]>([]);
    const [selectedSauces, setSelectedSauces] = useState<string[]>([]);
    const navigate = useNavigate();
    const { addItem } = useCart();

    if (!open) return null;

    const handleAdditionChange = (addition: string) => {
        if (selectedAdditions.includes(addition)) {
            setSelectedAdditions(selectedAdditions.filter(a => a !== addition));
        } else if (selectedAdditions.length < 3) {
            setSelectedAdditions([...selectedAdditions, addition]);
        }
    };

    const handleSauceChange = (sauce: string) => {
        if (selectedSauces.includes(sauce)) {
            setSelectedSauces(selectedSauces.filter(s => s !== sauce));
        } else if (selectedSauces.length < 2) {
            setSelectedSauces([...selectedSauces, sauce]);
        }
    };

    const getTotal = () => {
        let total = burger.price;
        selectedAdditions.forEach(add => {
            const found = ADDITIONS.find(a => a.name === add);
            if (found) total += found.price;
        });
        selectedSauces.forEach(sauce => {
            const found = SAUCES.find(s => s.name === sauce);
            if (found) total += found.price;
        });
        return total;
    };

    return (
        <div style={{
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
            background: "#f8fafc", display: "flex", alignItems: "flex-start", justifyContent: "center", zIndex: 1000
        }}>
            <div style={{
                background: "#fff", 
                borderRadius: 16, 
                padding: "2.5rem 3rem", 
                minWidth: 420, 
                maxWidth: "95vw", 
                marginTop: 48,
                boxShadow: "0 4px 24px rgba(0,0,0,0.10)", 
                position: "relative",
                maxHeight: "90vh",
                overflowY: "auto"
            }}>
                <button onClick={onClose} style={{
                position: "absolute", right: 24, top: 18, background: "#f3f4f6", border: "none", borderRadius: 8, fontSize: 22, cursor: "pointer", width: 36, height: 36
                }}>&times;</button>
                <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 24 }}>Personaliza tu hamburguesa</h1>
                <div style={{ display: "flex", gap: 24, alignItems: "center", marginBottom: 24 }}>
                <img src={burger.image} alt={burger.name} style={{ width: 110, height: 80, objectFit: "cover", borderRadius: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.10)" }} />
                <div>
                    <div style={{ fontWeight: 600, fontSize: "1.2rem" }}>{burger.name}</div>
                    <div style={{ color: "#666", fontSize: 15 }}>{burger.description}</div>
                    <div style={{ fontWeight: 700, color: "#1084f6", marginTop: 8 }}>${burger.price.toFixed(2)} USD</div>
                </div>
                </div>
                <div style={{ marginBottom: 18 }}>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>Agrega adiciones (máx. 3)</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {ADDITIONS.map(add => (
                    <label key={add.name} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16 }}>
                        <input
                        type="checkbox"
                        checked={selectedAdditions.includes(add.name)}
                        disabled={!selectedAdditions.includes(add.name) && selectedAdditions.length >= 3}
                        onChange={() => handleAdditionChange(add.name)}
                        style={{ width: 18, height: 18 }}
                        />
                        {add.name}
                        <span style={{ color: "#888", fontSize: 15, marginLeft: 4 }}>${add.price.toFixed(2)}</span>
                    </label>
                    ))}
                </div>
                </div>
                <div style={{ marginBottom: 18 }}>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>Elige tus salsas (máx. 2)</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {SAUCES.map(sauce => (
                    <label key={sauce.name} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16 }}>
                        <input
                        type="checkbox"
                        checked={selectedSauces.includes(sauce.name)}
                        disabled={!selectedSauces.includes(sauce.name) && selectedSauces.length >= 2}
                        onChange={() => handleSauceChange(sauce.name)}
                        style={{ width: 18, height: 18 }}
                        />
                        {sauce.name}
                        {sauce.price === 0
                        ? <span style={{ color: "#1084f6", fontSize: 15, marginLeft: 4 }}>(Gratis)</span>
                        : <span style={{ color: "#888", fontSize: 15, marginLeft: 4 }}>${sauce.price.toFixed(2)}</span>
                        }
                    </label>
                    ))}
                </div>
                </div>
                <div style={{ marginTop: 24, fontWeight: 600, fontSize: 18, color: "#1084f6" }}>
                Total: ${getTotal().toFixed(2)} USD
                </div>
                <button
                    style={{
                        marginTop: 28,
                        width: "100%",
                        padding: "0.9rem",
                        background: "#1084f6",
                        color: "#fff",
                        border: "none",
                        borderRadius: "10px",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        cursor: "pointer"
                    }}
                    onClick={() => {
                        addItem({
                            name: burger.name,
                            quantity: 1,
                            unitPrice: getTotal(),
                            type: "burger"
                        });
                        onClose();
                        navigate('/sides-drinks');
                    }}
                >
                    Agregar al pedido
                </button>
            </div>
        </div>
    );
};

export default BurgerCustomizeModal;