import { useState } from "react";
import "../nav/nav.css";

function Nav() {
    const [activeTab, setActiveTab] = useState('videos');

    return (
        <div className="top-nav d-flex align-items-center">
            <div className="nav-tabs-custom d-flex">
                <button
                    className={`nav-tab ${activeTab === 'videos' ? 'active' : ''}`}
                    onClick={() => setActiveTab('videos')}
                >
                <svg className="tab-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M10 9L15 12L10 15V9Z" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
                </svg>
                    Videos
                </button>
                <button 
                    className={`nav-tab ${activeTab === 'images' ? 'active' : ''}`}
                    onClick={() => setActiveTab('images')}
                >
                    <svg className="tab-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                        <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M21 15L16.5 10.5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                    </svg>
                    Images
                </button>
                <button
                    className={`nav-tab ${activeTab === 'link' ? 'active' : ''}`}
                    onClick={() => setActiveTab('link')}
                >
                    <svg className="tab-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 15L15 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M11 6L11.5 5.5C13.0913 3.90864 15.6501 3.90864 17.2414 5.5V5.5C18.8328 7.09136 18.8328 9.65017 17.2414 11.2414L16.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M13 18L12.5 18.5C10.9086 20.0913 8.34983 20.0913 6.75859 18.5V18.5C5.16724 16.9086 5.16724 14.3498 6.75859 12.75L7.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Link
                </button>
            </div>
        </div>
    );
}

export default Nav;