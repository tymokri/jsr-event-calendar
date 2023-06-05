import React, {FC} from 'react';
import {Layout, Menu, Row} from "antd";
import {useTapedSelector} from "../hooks/useTapedSelector";
import {useActions} from "../hooks/useActions";


const Navbar: FC = () => {
    const {isAuth, user} = useTapedSelector(state => state.auth);
    const {logout} = useActions();

    const redirectBack = () => {
        logout();
    };

    return (
        <Layout.Header>
            <Row justify="end">
                {isAuth ?
                    <>
                        <div
                            style={{color: 'white'}}
                        >
                            {user.username}
                        </div>
                        <Menu theme="dark" mode="horizontal" selectable={false}>
                            <Menu.Item
                                onClick={redirectBack}
                                key={1}
                            >
                                Back
                            </Menu.Item>
                        </Menu>
                    </>
                    :
                    <>
                        <div
                            style={{color: 'white'}}
                        >
                            Registration
                        </div>

                        <Menu
                            theme="dark"
                            mode="horizontal"
                            selectable={false}
                            items={new Array(1).fill(null).map((_, index) => {
                                const key = index + 1;
                                return {
                                    key,
                                    label: 'Login'
                                };
                            })}
                            style={{width: 100}}
                        />
                    </>
                }
            </Row>
        </Layout.Header>
    );
};

export default Navbar;