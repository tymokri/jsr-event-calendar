import React, {FC, useState} from 'react';
import {Form, Input, Button} from "antd";
import {rules} from "../utils/rules";
import {AuthActionCreators} from "../store/reducers/auth/action-creators";
import {useTapedSelector} from "../hooks/useTapedSelector";
import {useActions} from "../hooks/useActions";
import {useAppDispatch} from "../hooks/useTapedSelector";


const LoginForm: FC = () => {
    const {error, isLoading} = useTapedSelector(state => state.auth);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useActions();
    const dispatch = useAppDispatch();

    const submitHandle = () => {
        login(username, password);
        dispatch(AuthActionCreators.login(username, password));
    };

    return (
        <Form
            onFinish={submitHandle}
        >
            {error && <div style={{color: "red"}}>{error}</div>}
            <Form.Item
                label="Username"
                name="username"
                rules={[rules.required('Please input your username!')]}
            >
                <Input
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[rules.required('Please input your password!')]}
            >
                <Input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type={"password"}
                />
            </Form.Item>

            <Form.Item>
                <Button
                    loading={isLoading}
                    type="primary"
                    htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;