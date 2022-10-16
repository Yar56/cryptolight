import React, { FunctionComponent } from 'react';
import { Navbar, Button, Link, Text } from '@nextui-org/react';

interface HeaderProps {
    sticky?: boolean;
}

export const Header: FunctionComponent<HeaderProps> = ({ sticky: isSticky }) => {
    const collapseItems = [
        'Features',
        'Customers',
        'Pricing',
        'Company',
        'Legal',
        'Team',
        'Help & Feedback',
        'Login',
        'Sign Up'
    ];

    return (
        <Navbar
            isBordered
            variant={isSticky ? 'sticky' : 'static'}
            containerCss={{ paddingRight: 25, paddingLeft: 25 }}
        >
            <Navbar.Brand>
                <Navbar.Toggle aria-label="toggle navigation" />
                <div>logo</div>
                <Text b color="inherit" hideIn="xs">
                    Site Name
                </Text>
            </Navbar.Brand>
            <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
                <Navbar.Link href="#">Features</Navbar.Link>
                <Navbar.Link isActive href="#">
                    Customers
                </Navbar.Link>
                <Navbar.Link href="#">Pricing</Navbar.Link>
                <Navbar.Link href="#">Company</Navbar.Link>
            </Navbar.Content>
            <Navbar.Content>
                <Navbar.Link color="inherit" href="#">
                    Login
                </Navbar.Link>
                <Navbar.Item>
                    <Button auto flat as={Link} href="#">
                        Sign Up
                    </Button>
                </Navbar.Item>
            </Navbar.Content>
            <Navbar.Collapse>
                {collapseItems.map((item) => (
                    <Navbar.CollapseItem key={item}>
                        <Link
                            color="inherit"
                            css={{
                                minWidth: '100%'
                            }}
                            href="#"
                        >
                            {item}
                        </Link>
                    </Navbar.CollapseItem>
                ))}
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
