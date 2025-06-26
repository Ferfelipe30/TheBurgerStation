import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';

const LoginPage: React.FC = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState<string | null>(null);

    const navigate = useNavigate();
    const { setUser } = useUser();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch('https://theburgerstation.onrender.com/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Login failed');
            alert('¡Login Exitoso!');
            // Guardar el usuario en el contexto global
            if (res.ok) {
                setUser({
                    id: data.user.id,
                    email: data.user.email,
                    fullName: data.user.fullName
                });
                navigate('/menu');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
            {/*Header*/}
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
                    <a href="/about" style={{ color: "#222", textDecoration: "none", fontWeight: 500 }}>About Us</a>
                    <a href="/order" style={{
                    marginLeft: "1.5rem",
                    background: "#e3eafc",
                    color: "#222",
                    borderRadius: "2rem",
                    padding: "0.5rem 1.5rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    fontSize: "1rem"
                    }}>Order Online</a>
                </nav>
            </header>

            {/* Login Form */}
            <main style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "4rem"
            }}>
                <h2 style={{ fontSize: "2rem", fontWeight: 600, marginBottom: "2.5rem", color: "#111" }}>¡Bienvenido a The Burger Station!</h2>
                <form style={{ width: 400, maxWidth: "90% "}} onSubmit={handleSubmit}>
                    <input 
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: "1rem",
                            marginBottom: "1.2rem",
                            border: "none",
                            borderRadius: "10px",
                            background: "#e9eff6",
                            fontSize: "1.1rem",
                            outline: "none"
                        }}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: "1rem",
                            marginBottom: "0.7rem",
                            border: "none",
                            borderRadius: "10px",
                            background: "#e9eff6",
                            fontSize: "1.1rem",
                            outline: "none"
                        }}
                    />
                    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1.5rem"}}>
                        <a href='/forgot-password' style={{ color: "#3b82f6", fontSize: "0.98rem", textDecoration: "none"}}>
                            Forgot Password?
                        </a>
                    </div>
                    {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}
                    <button
                        type='submit'
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "0.9rem",
                            background: "#1084f6",
                            color: "#fff",
                            border: "none",
                            borderRadius: "10px",
                            fontSize: "1.1rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            marginBottom: "1.2rem"
                        }}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                    <div style={{ textAlign: "center", marginTop: "0.5rem"}}>
                        <span style={{ color: "#555", fontSize: "0.98rem" }}>
                            Don't have an account?{" "}
                            <a href='/signup' style={{ color: "#3b82f6", textDecoration: "underline" }}>
                                Sign up
                            </a>
                        </span>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default LoginPage;