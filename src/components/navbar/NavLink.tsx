import React, {FC, ReactNode} from 'react';
import {Link} from "@chakra-ui/next-js";


interface NavLinkProps {
  children: ReactNode;
  path: string;
}

const NavLink: FC<NavLinkProps> = ({ children, path }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: 'gray.200',
    }}
    href={path}>
    {children}
  </Link>
);

export default NavLink;