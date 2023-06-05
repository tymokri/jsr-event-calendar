import React, {FC, ReactElement} from 'react';
import {Card, Layout, Row} from "antd";
import LoginForm from "../components/LoginForm";

const Login: FC = (): ReactElement => {
    return (
        <Layout>
            <Row
                justify="center"
                align="middle"
                className="h100"
            >
                <Card>
                    <LoginForm />
                </Card>
            </Row>
        </Layout>
    );
};

export default Login;