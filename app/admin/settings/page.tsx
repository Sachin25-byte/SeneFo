'use client';

export default function SettingsPage() {
    return (
        <div className="admin-page">
            <h1 className="page-title">Admin Settings</h1>
            <div className="settings-card">
                <p>Global website settings will appear here.</p>
            </div>
            <style jsx>{`
                .page-title { margin-bottom: 2rem; color: #1a4231; }
                .settings-card { background: white; padding: 2rem; border-radius: 8px; }
            `}</style>
        </div>
    );
}
