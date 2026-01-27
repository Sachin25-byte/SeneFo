'use client';

import { useState } from 'react';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('account');
    const [saved, setSaved] = useState(false);

    // Account & Security State
    const [accountData, setAccountData] = useState({
        username: 'admin',
        email: 'admin@senefo.com',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // Site Branding State
    const [brandingData, setBrandingData] = useState({
        siteName: 'SENEFO',
        tagline: 'Smart Shopping Starts Here',
        logoUrl: '/logo.png',
        primaryColor: '#D4AF37',
        secondaryColor: '#0a0a0a'
    });

    // Affiliate Disclosure State
    const [disclosureData, setDisclosureData] = useState({
        programName: 'Amazon Services LLC Associates Program',
        disclosureText: 'SENEFO participates in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. As an Amazon Associate, we earn from qualifying purchases.',
        showInFooter: true,
        showOnProductPages: false
    });

    // General Settings State
    const [generalData, setGeneralData] = useState({
        siteDescription: 'A product review site helping you make informed shopping decisions',
        postsPerPage: 12,
        enableComments: false,
        maintenanceMode: false,
        googleAnalyticsId: '',
        facebookPixelId: ''
    });

    const handleSave = (section: string) => {
        // Here you would save to your backend/database
        console.log(`Saving ${section} settings...`);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="settings-page">
            <h1 className="page-title">⚙️ Admin Settings</h1>

            {saved && (
                <div className="save-notification">
                    ✓ Settings saved successfully!
                </div>
            )}

            <div className="settings-container">
                {/* Tabs Navigation */}
                <div className="tabs-nav">
                    <button
                        className={`tab ${activeTab === 'account' ? 'active' : ''}`}
                        onClick={() => setActiveTab('account')}
                    >
                        🔐 Account & Security
                    </button>
                    <button
                        className={`tab ${activeTab === 'branding' ? 'active' : ''}`}
                        onClick={() => setActiveTab('branding')}
                    >
                        🎨 Site Branding
                    </button>
                    <button
                        className={`tab ${activeTab === 'disclosure' ? 'active' : ''}`}
                        onClick={() => setActiveTab('disclosure')}
                    >
                        📋 Affiliate Disclosure
                    </button>
                    <button
                        className={`tab ${activeTab === 'general' ? 'active' : ''}`}
                        onClick={() => setActiveTab('general')}
                    >
                        🌐 General Settings
                    </button>
                </div>

                {/* Tab Content */}
                <div className="tab-content">
                    {/* Account & Security Tab */}
                    {activeTab === 'account' && (
                        <div className="settings-section">
                            <h2>Account & Security</h2>
                            <p className="section-desc">Manage your account credentials and security settings</p>

                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    type="text"
                                    value={accountData.username}
                                    onChange={(e) => setAccountData({ ...accountData, username: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    value={accountData.email}
                                    onChange={(e) => setAccountData({ ...accountData, email: e.target.value })}
                                />
                            </div>

                            <hr />

                            <h3>Change Password</h3>
                            <div className="form-group">
                                <label>Current Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter current password"
                                    value={accountData.currentPassword}
                                    onChange={(e) => setAccountData({ ...accountData, currentPassword: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>New Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter new password"
                                    value={accountData.newPassword}
                                    onChange={(e) => setAccountData({ ...accountData, newPassword: e.target.value })}
                                />
                                <small>Must be at least 8 characters long</small>
                            </div>

                            <div className="form-group">
                                <label>Confirm New Password</label>
                                <input
                                    type="password"
                                    placeholder="Confirm new password"
                                    value={accountData.confirmPassword}
                                    onChange={(e) => setAccountData({ ...accountData, confirmPassword: e.target.value })}
                                />
                            </div>

                            <button className="save-btn" onClick={() => handleSave('account')}>
                                💾 Save Account Settings
                            </button>
                        </div>
                    )}

                    {/* Site Branding Tab */}
                    {activeTab === 'branding' && (
                        <div className="settings-section">
                            <h2>Site Branding</h2>
                            <p className="section-desc">Customize your website's visual identity</p>

                            <div className="form-group">
                                <label>Site Name</label>
                                <input
                                    type="text"
                                    value={brandingData.siteName}
                                    onChange={(e) => setBrandingData({ ...brandingData, siteName: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Tagline</label>
                                <input
                                    type="text"
                                    value={brandingData.tagline}
                                    onChange={(e) => setBrandingData({ ...brandingData, tagline: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Site Logo</label>
                                <div className="image-upload-wrapper">
                                    <div className="file-input-box">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const data = new FormData();
                                                    data.append('file', file);
                                                    try {
                                                        const res = await fetch('/api/upload', {
                                                            method: 'POST',
                                                            body: data
                                                        });
                                                        const result = await res.json();
                                                        if (result.url) {
                                                            setBrandingData({ ...brandingData, logoUrl: result.url });
                                                        }
                                                    } catch (err) {
                                                        console.error('Upload failed', err);
                                                        alert('Logo upload failed');
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        value={brandingData.logoUrl}
                                        onChange={(e) => setBrandingData({ ...brandingData, logoUrl: e.target.value })}
                                        placeholder="Image URL or Upload File"
                                    />
                                </div>
                                {brandingData.logoUrl && (
                                    <div className="logo-preview">
                                        <img src={brandingData.logoUrl} alt="Logo Preview" />
                                    </div>
                                )}
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Primary Color (Gold)</label>
                                    <div className="color-input">
                                        <input
                                            type="color"
                                            value={brandingData.primaryColor}
                                            onChange={(e) => setBrandingData({ ...brandingData, primaryColor: e.target.value })}
                                        />
                                        <input
                                            type="text"
                                            value={brandingData.primaryColor}
                                            onChange={(e) => setBrandingData({ ...brandingData, primaryColor: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Secondary Color (Black)</label>
                                    <div className="color-input">
                                        <input
                                            type="color"
                                            value={brandingData.secondaryColor}
                                            onChange={(e) => setBrandingData({ ...brandingData, secondaryColor: e.target.value })}
                                        />
                                        <input
                                            type="text"
                                            value={brandingData.secondaryColor}
                                            onChange={(e) => setBrandingData({ ...brandingData, secondaryColor: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button className="save-btn" onClick={() => handleSave('branding')}>
                                💾 Save Branding Settings
                            </button>
                        </div>
                    )}

                    {/* Affiliate Disclosure Tab */}
                    {activeTab === 'disclosure' && (
                        <div className="settings-section">
                            <h2>Affiliate Disclosure</h2>
                            <p className="section-desc">Configure your Amazon affiliate disclosure settings</p>

                            <div className="form-group">
                                <label>Program Name</label>
                                <input
                                    type="text"
                                    value={disclosureData.programName}
                                    onChange={(e) => setDisclosureData({ ...disclosureData, programName: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Disclosure Text</label>
                                <textarea
                                    rows={6}
                                    value={disclosureData.disclosureText}
                                    onChange={(e) => setDisclosureData({ ...disclosureData, disclosureText: e.target.value })}
                                />
                                <small>This text will appear in your footer and disclosure page</small>
                            </div>

                            <div className="form-group checkbox-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={disclosureData.showInFooter}
                                        onChange={(e) => setDisclosureData({ ...disclosureData, showInFooter: e.target.checked })}
                                    />
                                    Show disclosure in footer
                                </label>
                            </div>

                            <div className="form-group checkbox-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={disclosureData.showOnProductPages}
                                        onChange={(e) => setDisclosureData({ ...disclosureData, showOnProductPages: e.target.checked })}
                                    />
                                    Show disclosure on product pages
                                </label>
                            </div>

                            <div className="alert-info">
                                <strong>ℹ️ Amazon Policy Reminder:</strong> You must clearly disclose your affiliate relationship on every page where you include affiliate links.
                            </div>

                            <button className="save-btn" onClick={() => handleSave('disclosure')}>
                                💾 Save Disclosure Settings
                            </button>
                        </div>
                    )}

                    {/* General Settings Tab */}
                    {activeTab === 'general' && (
                        <div className="settings-section">
                            <h2>General Settings</h2>
                            <p className="section-desc">Configure general website preferences</p>

                            <div className="form-group">
                                <label>Site Description</label>
                                <textarea
                                    rows={3}
                                    value={generalData.siteDescription}
                                    onChange={(e) => setGeneralData({ ...generalData, siteDescription: e.target.value })}
                                />
                                <small>Used for SEO meta descriptions</small>
                            </div>

                            <div className="form-group">
                                <label>Posts Per Page</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="50"
                                    value={generalData.postsPerPage}
                                    onChange={(e) => setGeneralData({ ...generalData, postsPerPage: parseInt(e.target.value) })}
                                />
                            </div>

                            <div className="form-group checkbox-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={generalData.enableComments}
                                        onChange={(e) => setGeneralData({ ...generalData, enableComments: e.target.checked })}
                                    />
                                    Enable comments on blog posts
                                </label>
                            </div>

                            <div className="form-group checkbox-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={generalData.maintenanceMode}
                                        onChange={(e) => setGeneralData({ ...generalData, maintenanceMode: e.target.checked })}
                                    />
                                    <span className="danger-text">Enable maintenance mode (site will be offline)</span>
                                </label>
                            </div>

                            <hr />

                            <h3>Analytics & Tracking</h3>

                            <div className="form-group">
                                <label>Google Analytics ID</label>
                                <input
                                    type="text"
                                    placeholder="G-XXXXXXXXXX"
                                    value={generalData.googleAnalyticsId}
                                    onChange={(e) => setGeneralData({ ...generalData, googleAnalyticsId: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Facebook Pixel ID</label>
                                <input
                                    type="text"
                                    placeholder="XXXXXXXXXXXXXXX"
                                    value={generalData.facebookPixelId}
                                    onChange={(e) => setGeneralData({ ...generalData, facebookPixelId: e.target.value })}
                                />
                            </div>

                            <button className="save-btn" onClick={() => handleSave('general')}>
                                💾 Save General Settings
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .settings-page {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 2rem;
                }

                .page-title {
                    font-size: 2rem;
                    color: var(--royal-gold);
                    margin-bottom: 2rem;
                }

                .save-notification {
                    background: #10b981;
                    color: white;
                    padding: 1rem;
                    border-radius: 8px;
                    margin-bottom: 1.5rem;
                    text-align: center;
                    font-weight: 600;
                    animation: slideDown 0.3s ease;
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .settings-container {
                    background: white;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                }

                .tabs-nav {
                    display: flex;
                    border-bottom: 2px solid #f1f5f9;
                    background: #f8fafc;
                    overflow-x: auto;
                }

                .tab {
                    padding: 1rem 2rem;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    font-weight: 600;
                    color: #64748b;
                    transition: all 0.3s;
                    white-space: nowrap;
                }

                .tab:hover {
                    color: var(--royal-gold);
                    background: rgba(212, 175, 55, 0.05);
                }

                .tab.active {
                    color: var(--royal-gold);
                    background: white;
                    border-bottom: 3px solid var(--royal-gold);
                }

                .tab-content {
                    padding: 2.5rem;
                }

                .settings-section h2 {
                    font-size: 1.75rem;
                    color: #1a1a1a;
                    margin-bottom: 0.5rem;
                }

                .section-desc {
                    color: #64748b;
                    margin-bottom: 2rem;
                }

                .settings-section h3 {
                    font-size: 1.25rem;
                    color: #1a1a1a;
                    margin: 2rem 0 1rem;
                }

                .form-group {
                    margin-bottom: 1.5rem;
                }

                .form-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                }

                label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                    color: #444;
                }

                .image-upload-wrapper {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .file-input-box {
                    background: #f1f5f9;
                    padding: 12px;
                    border-radius: 8px;
                    border: 1px solid #e2e8f0;
                }

                .file-input-box input[type="file"] {
                    font-size: 0.9rem;
                    color: #64748b;
                }

                input[type="text"],
                input[type="email"],
                input[type="password"],
                input[type="number"],
                textarea {
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    font-size: 1rem;
                    font-family: inherit;
                    transition: border-color 0.3s;
                }

                input:focus,
                textarea:focus {
                    outline: none;
                    border-color: var(--royal-gold);
                }

                textarea {
                    resize: vertical;
                }

                small {
                    display: block;
                    margin-top: 0.5rem;
                    color: #64748b;
                    font-size: 0.875rem;
                }

                .checkbox-group label {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    cursor: pointer;
                }

                input[type="checkbox"] {
                    width: 20px;
                    height: 20px;
                    cursor: pointer;
                }

                .color-input {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                }

                input[type="color"] {
                    width: 60px;
                    height: 40px;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                }

                .logo-preview {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: #f8fafc;
                    border-radius: 6px;
                }

                .logo-preview img {
                    max-height: 80px;
                    max-width: 200px;
                }

                .alert-info {
                    background: #eff6ff;
                    border-left: 4px solid #3b82f6;
                    padding: 1rem;
                    border-radius: 6px;
                    margin: 1.5rem 0;
                }

                .danger-text {
                    color: #dc2626;
                }

                hr {
                    border: 0;
                    border-top: 1px solid #f1f5f9;
                    margin: 2rem 0;
                }

                .save-btn {
                    background: var(--royal-gold);
                    color: var(--midnight-black);
                    padding: 0.875rem 2rem;
                    border: none;
                    border-radius: 8px;
                    font-weight: 700;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: all 0.3s;
                    margin-top: 1.5rem;
                }

                .save-btn:hover {
                    background: var(--bright-gold);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
                }

                @media (max-width: 768px) {
                    .settings-page {
                        padding: 1rem;
                    }

                    .tab-content {
                        padding: 1.5rem;
                    }

                    .form-row {
                        grid-template-columns: 1fr;
                    }

                    .tabs-nav {
                        overflow-x: scroll;
                    }

                    .tab {
                        padding: 0.875rem 1.25rem;
                        font-size: 0.9rem;
                    }
                }
            `}</style>
        </div>
    );
}
