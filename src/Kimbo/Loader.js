import React from 'react';
import { useSelector } from 'react-redux';
import './Loader.css';

export const Loader = () => {
    const loading = useSelector(state => state.list.loading);

    if (!loading) return null;

    return (
        <div className="loader-overlay">
            <svg version="1.1" id="L9" x="0px" y="0px" viewBox="0 0 100 100">
                <rect x="20" y="50" width="4" height="10" fill="#fff">
                    <animateTransform attributeType="xml"
                        attributeName="transform" type="translate"
                        values="0 0; 0 20; 0 0"
                        begin="0" dur="0.6s" repeatCount="indefinite" />
                </rect>
                <rect x="30" y="50" width="4" height="10" fill="#fff">
                    <animateTransform attributeType="xml"
                        attributeName="transform" type="translate"
                        values="0 0; 0 20; 0 0"
                        begin="0.2s" dur="0.6s" repeatCount="indefinite" />
                </rect>
                <rect x="40" y="50" width="4" height="10" fill="#fff">
                    <animateTransform attributeType="xml"
                        attributeName="transform" type="translate"
                        values="0 0; 0 20; 0 0"
                        begin="0.4s" dur="0.6s" repeatCount="indefinite" />
                </rect>
            </svg>
        </div>
    );
};
