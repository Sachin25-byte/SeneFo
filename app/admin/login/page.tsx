'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        // If already logged in, go to dashboard
        const isLoggedIn = localStorage.getItem('admin_logged_in');
        if (isLoggedIn === 'true') {
            router.push('/admin');
        }
    }, [router]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // Default credentials (you can change these)
        if (username === 'admin' && password === 'admin123') {
            localStorage.setItem('admin_logged_in', 'true');
            router.push('/admin');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1>SeneFo Admin</h1>
                    <p>Please enter your credentials to continue</p>
                </div>

                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="login-btn">
                        Login to Dashboard
                    </button>
                </form>
            </div>

            <style jsx>{`
        .login-container {
          height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0f172a;
          font-family: 'Outfit', sans-serif;
        }

        .login-card {
          background: white;
          padding: 3rem;
          border-radius: 24px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
          width: 100%;
          max-width: 450px;
          animation: slideUp 0.6s ease-out;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .login-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .login-header h1 {
          font-size: 2.5rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #7b1fa2 0%, #f06292 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .login-header p {
          color: #64748b;
          font-size: 0.95rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        label {
          font-weight: 600;
          color: #1e293b;
          font-size: 0.9rem;
        }

        input {
          padding: 0.85rem 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
          outline: none;
        }

        input:focus {
          border-color: #7b1fa2;
          box-shadow: 0 0 0 4px rgba(123, 31, 162, 0.1);
        }

        .error-message {
          color: #ef4444;
          font-size: 0.85rem;
          font-weight: 600;
          text-align: center;
        }

        .login-btn {
          margin-top: 1rem;
          padding: 1rem;
          background: linear-gradient(135deg, #7b1fa2 0%, #f06292 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 20px rgba(123, 31, 162, 0.2);
        }

        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(123, 31, 162, 0.3);
          filter: brightness(1.1);
        }

        .login-btn:active {
          transform: translateY(0);
        }
      `}</style>
        </div>
    );
}
