import React from 'react';
import {Container, Col} from 'react-bootstrap'


const Footer = () => {
    return (
        <footer>
            <Container>
                <Col className='text-center py-3'>
                    Copyright &copy; mernshop
                </Col>
            </Container>
        </footer>
    );
};

export default Footer;
