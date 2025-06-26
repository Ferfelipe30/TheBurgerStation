import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';

const RegisterPage: React.FC = () => {
    // Estados para los campos del formulario
    const [ fullName, setFullName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState<string | null>(null);

    const navigate = useNavigate();
    const { setUser } = useUser();

    // handleSubmit va aqui
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch('https://theburgerstation.onrender.com/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName,
                    email,
                    password,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Registration failed');
            alert('¡Registro exitoso!');
            //Guardar el usuario en el contexto global
            if (res.ok) {
                setUser({
                    id: data.user.id,
                    email: data.user.email,
                    fullName: data.user.fullName,
                });
                navigate('/menu'); // Redirigir al usuario a la página principal
            };
        } catch (err: any) {
            setError(err.message);
        }
        setLoading(false);
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
                            display: "incline-block",
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
                <form style={{ width: 400, maxWidth: "90%" }} onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "1.2rem" }}>
                        <label style={{ display: "block", marginBottom: 8, color: "#222", fontWeight: 500 }}>Full Name</label>
                        <input 
                            type="text"
                            placeholder='Enter your full name'
                            value={fullName}
                            onChange={e => setFullName(e.target.value)}
                            required
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
                    <div style={{ marginBottom: "1.2rem" }}>
                        <label style={{ display: "block", marginBottom: 8, color: "#222", fontWeight: 500 }}>Email</label>
                        <input 
                            type="email"
                            placeholder='Enter your email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
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
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
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
                    {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}
                    <button
                        type='submit'
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "0.9rem",
                            background: "#1084f6",
                            color: '#fff',
                            border: "none",
                            borderRadius: "10px",
                            fontSize: "1.1rem",
                            fontWeight: 600,
                            cursor: loading ? "not-allowed" : "pointer",
                            marginBottom: "1.2rem"
                        }}
                    >
                        {loading ? "Registering..." : "Register"}
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
};

export default RegisterPage;