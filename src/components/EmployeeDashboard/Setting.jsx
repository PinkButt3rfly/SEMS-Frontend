import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { useState } from 'react';
import axios from 'axios';

const Setting = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [setting, setSetting] = useState({
        userId: user._id,
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSetting((prevSetting) => ({ ...prevSetting, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (setting.newPassword !== setting.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (setting.newPassword.length < 6) {
            setError('Password should be at least 6 characters');
            return;
        }
        
        setLoading(true);

        try {
            const response = await axios.put(
                'https://sems-backend.onrender.com/api/setting/change-password',
                setting,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            if (response.data.success) {
                setError('');
                navigate('/admin-dashboard/employees');
            } else {
                setError(response.data.error || 'An error occurred');
            }
        } catch (error) {
            setError(error.response?.data?.error || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-20 bg-white p-8 rounded-md shadow-md w-full sm:w-96">
            <h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="text-sm font-medium text-gray-800">Old Password</label>
                    <input
                        type="password"
                        name="oldPassword"
                        placeholder="Old Password"
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-800">New Password</label>
                    <input
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-800">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full mt-6 bg-gray-600 hover:bg-pink-800 text-white font-bold py-2 px-4 rounded-md"
                    disabled={loading}
                >
                    {loading ? 'Changing Password...' : 'Change Password'}
                </button>
            </form>
        </div>
    );
};

export default Setting;
