import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav>
      <Link to="/">Accueil</Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        return (
          <span key={to}>
            {' > '}
            <Link to={to}>{value}</Link>
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb; 