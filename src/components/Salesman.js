import React, { useContext, useState, useEffect } from 'react';
import { useOrder } from "../context/OrderContext";
import { useUser } from "../context/UserContext";


const Salesman = () => {
    const { users, setUsers, currentUser } = useUser();
    const [allOrders, setAllOrders] = useState([]);

    useEffect(() => {
        const orders = users.reduce((acc, user) => acc.concat(user.orders || []), []);
        setAllOrders(orders);
    }, [users]);

    const handleDeleteOrder = (orderNumber) => {
        const updatedUsers = users.map(user => {
            // Check if the user has an 'orders' property and it's an array
            if (Array.isArray(user.orders)) {
                return {
                    ...user,
                    orders: user.orders.filter(order => order.orderNumber !== orderNumber)
                };
            }
            // Return the user object as is if no 'orders' property or it's not an array
            return user;
        });
    
        setUsers(updatedUsers);
    };

    if (currentUser && currentUser.role === 'salesman') {

        return (
            <div>
                <h2>All User Orders</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Order Number</th>
                            <th>User</th>
                            <th>Details</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allOrders.map(order => (
                            <tr key={order.orderNumber}>
                                <td>{order.orderNumber}</td>
                                <td>{order.userName}</td> 
                                <td>
                                    <button onClick={() => handleDeleteOrder(order.orderNumber)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    } else {
        return <div>You do not have access to this page.</div>
    }
};

export default Salesman;
