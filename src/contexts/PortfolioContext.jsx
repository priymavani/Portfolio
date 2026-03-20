'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
    const [data, setData] = useState({
        skills: [],
        certificates: [],
        hackathons: [],
        profile: null,
        socialLinks: {},
        stats: { github: null, leetcode: null },
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const res = await fetch('/api/portfolio');
                const json = await res.json();
                if (json.success) {
                    // Filter to only show visible items
                    const filteredData = {
                        ...json.data,
                        certificates: (json.data.certificates || []).filter(c => c.visibility !== false),
                        hackathons: (json.data.hackathons || []).filter(h => h.visibility !== false),
                    };
                    setData(filteredData);
                }
            } catch (error) {
                console.error('Failed to fetch portfolio data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPortfolio();
    }, []);

    return (
        <PortfolioContext.Provider value={{ ...data, loading }}>
            {children}
        </PortfolioContext.Provider>
    );
}

export function usePortfolio() {
    const context = useContext(PortfolioContext);
    if (!context) {
        throw new Error('usePortfolio must be used within a PortfolioProvider');
    }
    return context;
}
