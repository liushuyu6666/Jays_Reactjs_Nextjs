'use client';

import Image from 'next/image';
import Input from '../../components/Input';
import { useEffect, useState } from 'react';

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [message, setMessage] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [isValid, setIsValid] = useState({
        username: true,
        email: true,
        password: true,
        confirmPassword: true,
    });

    useEffect(() => {
        // Validate confirm password
        if (
            formData.password.length > 0 &&
            formData.confirmPassword.length > 0
        ) {
            if (formData.confirmPassword !== formData.password) {
                setMessage({
                    ...message,
                    confirmPassword: 'Passwords mismatch!',
                });
                setIsValid({
                    ...isValid,
                    confirmPassword: false,
                });
            } else {
                setMessage({
                    ...message,
                    confirmPassword: 'Passwords match.',
                });
                setIsValid({
                    ...isValid,
                    confirmPassword: true,
                });
            }
        }
    }, [formData]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputId = event.target.id;
        const inputValue = event.target.value;

        setFormData({
            ...formData,
            [inputId]: inputValue,
        });

        // Validate username, email and password.
        if (["username", "email", "password"].includes(inputId) && inputValue.length > 0) {
            setMessage({
                ...message,
                [inputId]: '',
            });
            setIsValid({
                ...isValid,
                [inputId]: true,
            });
        }
    };

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (formData.username.length === 0) {
            setMessage({
                ...message,
                username: 'Username should not be empty!',
            });
            setIsValid({
                ...isValid,
                username: false,
            });
            return;
        }

        if (formData.email.length === 0) {
            setMessage({
                ...message,
                email: 'Email address should not be empty!',
            });
            setIsValid({
                ...isValid,
                email: false,
            });
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setMessage({
                ...message,
                confirmPassword: 'Passwords mismatch!',
            });
            setIsValid({
                ...isValid,
                confirmPassword: false,
            });
            return;
        }

        if (formData.password.length === 0) {
            setMessage({
                ...message,
                password: 'Password should not be empty!',
            });
            setIsValid({
                ...isValid,
                password: false,
            });
            return;
        }

        // Perform registration logic here
        console.log(formData);
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Image
                    src="/next.svg"
                    alt="Vercel Logo"
                    className="mx-auto h-10 w-auto"
                    width={100}
                    height={24}
                    priority
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Set up your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                    <Input
                        label="Username"
                        name="username"
                        id="username"
                        autoComplete="username"
                        value={formData.username}
                        type="text"
                        message={message.username}
                        isValid={isValid.username}
                        handleChange={handleChange}
                    />
                    <Input
                        label="Email address"
                        name="email"
                        id="email"
                        autoComplete="email"
                        value={formData.email}
                        type="email"
                        message={message.email}
                        isValid={isValid.email}
                        handleChange={handleChange}
                    />
                    <Input
                        label="Password"
                        name="password"
                        id="password"
                        autoComplete="password"
                        value={formData.password}
                        type="password"
                        message={message.password}
                        isValid={isValid.password}
                        handleChange={handleChange}
                    />
                    <Input
                        label="Confirm password"
                        name="confirm_password"
                        id="confirmPassword"
                        autoComplete="password"
                        value={formData.confirmPassword}
                        type="password"
                        message={message.confirmPassword}
                        isValid={isValid.confirmPassword}
                        handleChange={handleChange}
                    />

                    <div>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
