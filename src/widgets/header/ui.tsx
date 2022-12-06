import React, { FunctionComponent } from 'react';
import { Navbar, Button, Link, Text, Spacer } from '@nextui-org/react';
import { events, ModalType } from '../../processes/modalBehavior';

interface HeaderProps {
    sticky?: boolean;
}

export const Header: FunctionComponent<HeaderProps> = ({ sticky: isSticky }) => {
    const collapseItems = ['Features', 'Customers', 'Pricing', 'Company', 'Legal', 'Team', 'Help & Feedback'];

    const handleAuthClick = () => events.switchModal({ modalType: ModalType.AUTH, isOpen: true });

    return (
        <Navbar
            isBordered
            variant={isSticky ? 'sticky' : 'static'}
            containerCss={{ paddingRight: 25, paddingLeft: 25 }}
        >
            <Navbar.Brand>
                <Navbar.Toggle aria-label="toggle navigation" />
                <Spacer y={2} />
                <Text
                    b
                    color="inherit"
                    hideIn="xs"
                    css={{
                        textGradient: 'to right, #121FCF 32%, #CF1512 100%'
                    }}
                >
                    CryptoLight
                </Text>
            </Navbar.Brand>
            <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
                {/*<Navbar.Link href="#">Features</Navbar.Link>*/}
                {/*<Navbar.Link isActive href="#">*/}
                {/*    Customers*/}
                {/*</Navbar.Link>*/}
                {/*<Navbar.Link href="#">Pricing</Navbar.Link>*/}
                {/*<Navbar.Link href="#">Company</Navbar.Link>*/}
            </Navbar.Content>
            <Navbar.Content>
                <Navbar.Item>
                    <Button auto color="gradient" ghost onClick={handleAuthClick}>
                        Вход
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
