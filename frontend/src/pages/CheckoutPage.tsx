import React, { useState } from 'react';
import { useCart } from "../CartContext";
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';

const TAX_RATE = 0.07;
const DELIVERY_FEE = 3.0;

const CheckoutPage: React.FC = () => {
    const { items, clear } = useCart();
    const { user } = useUser();
    const navigate = useNavigate();

    const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax + DELIVERY_FEE;

    const handleConfirmOrder = async () => {
        //Envia la orden al backend
        if (!user?.email) {
            alert("Debes iniciar sesion o registrarte para completar tu pedido.");
            navigate('/login');
            return;
        }
        await fetch('https://theburgerstation.onrender.com/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: user.email,
                items,
                subtotal,
                tax,
                deliveryFee: DELIVERY_FEE,
                total
            }),
        });
        clear();
        navigate('/order-success');
    };

    return (
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
            <main style={{ maxWidth: 700, margin: "3rem auto", padding: "0 1rem" }}>
                <h1 style={{ fontSize: "2.2rem", fontWeight: 700, marginBottom: "2.5rem", color: "#111" }}>
                Checkout
                </h1>
                <div style={{ fontWeight: 700, fontSize: "1.2rem", marginBottom: 18 }}>Order Summary</div>
                <div style={{ marginBottom: 32 }}>
                {items.map((item, idx) => (
                    <div key={idx} style={{ marginBottom: 18 }}>
                    <div style={{ fontWeight: 600 }}>{item.name}</div>
                    <div style={{ color: "#3b82f6", fontSize: 15 }}>
                        Quantity: {item.quantity}
                    </div>
                    <div style={{ float: "right", fontWeight: 500 }}>${(item.unitPrice * item.quantity).toFixed(2)}</div>
                    </div>
                ))}
                </div>
                <div style={{ marginBottom: 10, display: "flex", justifyContent: "space-between" }}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
                </div>
                <div style={{ marginBottom: 10, display: "flex", justifyContent: "space-between" }}>
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
                </div>
                <div style={{ marginBottom: 10, display: "flex", justifyContent: "space-between" }}>
                <span>Delivery Fee</span>
                <span>${DELIVERY_FEE.toFixed(2)}</span>
                </div>
                <div style={{ margin: "30px 0 40px 0", display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 20 }}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
                </div>
                <button
                    style={{
                        width: "100%",
                        padding: "1rem",
                        background: "#1084f6",
                        color: "#fff",
                        border: "none",
                        borderRadius: "10px",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        cursor: "pointer"
                    }}
                    onClick={handleConfirmOrder}
                >
                    Confirmar Orden
                </button>
            </main>
        </div>
    );
};

export default CheckoutPage;