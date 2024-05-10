import React, {FC} from 'react';
import NavLink from "@/components/navbar/NavLink";
import {IRoute, PrivateRoutes, PublicRoutes,} from "@/configs/router";

interface NavLinkListProps {
  isAuthenticated: boolean;
}

const NavLinkList: FC<NavLinkListProps> = ({ isAuthenticated }) => {
  const navLinkMapped = (link: IRoute) => (
    <NavLink key={link.title} path={link.path}>{link.title}</NavLink>
  );
  
  return (
    <>
      {
        isAuthenticated ? PrivateRoutes.map(navLinkMapped) : PublicRoutes.map(navLinkMapped)
      }
    </>
  );
};

export default NavLinkList;