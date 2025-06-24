import React from 'react';

const RegisterPage: React.FC = () => (
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
                <span style={{
                    display: "incline-block",
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

        {/* Register Form */}
        <main style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "4rem"
        }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 600, marginBottom: "2.5rem", color: "#111" }}>Create Your Account</h2>
            <form style={{ width: 400, maxWidth: "90%" }}>
                <div style={{ marginBottom: "1.2rem" }}>
                    <label style={{ display: "block", marginBottom: 8, color: "#222", fontWeight: 500 }}>Full Name</label>
                    <input 
                        type="text"
                        placeholder='Enter your full name'
                        style={{
                            width: "100%",
                            padding: "1rem",
                            border: "none",
                            borderRadius: "10px",
                            background: "#e9eff6",
                            fontSize: "1.1rem",
                            outline: "none"
                        }}
                    />
                </div>
                <div style={{ marginBottom: "2rem" }}>
                    <label style={{ display: "block", marginBottom: 8, color: "#222", fontWeight: 500 }}>Password</label>
                    <input 
                        type='password'
                        placeholder='Create a password'
                        style={{
                            width: "100%",
                            padding: "1rem",
                            border: "none",
                            borderRadius: "10px",
                            background: "#e9eff6",
                            fontSize: "1.1rem",
                            outline: "none"
                        }}
                    />
                </div>
                <button
                    type='submit'
                    style={{
                        width: "100%",
                        padding: "0.9rem",
                        background: "#1084f6",
                        color: '#fff',
                        border: "none",
                        borderRadius: "10px",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        marginBottom: "1.2rem"
                    }}
                >
                    Register
                </button>
                <div style={{ textAlign: "center", marginTop: "1.5rem", color: "#5a6e8c", fontSize: "1rem" }}>
                    Already have an account? {" "}
                    <a href='/login' style={{ color: "#3b82f6", textDecoration: "underline", fontWeight: 500}}>
                        Log In
                    </a>
                </div>
            </form>
        </main>
    </div>
);

export default RegisterPage;