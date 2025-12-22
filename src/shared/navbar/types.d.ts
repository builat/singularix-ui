interface NavbarLinkProps {
  Icon: typeof IconHome2;
  label: string;
  path: string;
  active: boolean;
  onClick?: () => void;
}

type MenuNavItem = {
  Icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  label: string;
  path: string;
};

type NavbarProps = {
  onNavigate: (path: string) => void;
};
