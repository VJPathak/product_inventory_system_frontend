import React from 'react';
import { Button } from '@/components/ui/Button/Button';
import './Header.scss';

interface HeaderProps {
  onAddProduct: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddProduct }) => {
  return (
    <header className="header">
      <div className="header__content">
        <div className="header__brand">
          <div className="header__logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <rect width="32" height="32" rx="8" fill="currentColor" />
              <path
                d="M10 11H22M10 16H22M10 21H16"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="header__title-group">
            <h1 className="header__title">Product Inventory</h1>
            <span className="header__subtitle">Manage your products efficiently</span>
          </div>
        </div>
        <Button variant="primary" onClick={onAddProduct}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M8 3V13M3 8H13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Add Product
        </Button>
      </div>
    </header>
  );
};
