import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './monthlybill.css';
import { Link } from 'react-router-dom';
import { jsPDF } from "jspdf";
import "jspdf-autotable";  // Correct import for autoTable

const MonthlyBill = () => {
    const [bills, setBills] = useState([]);
    const storedUserData = JSON.parse(localStorage.getItem('userData'));

    const [form, setForm] = useState({
        roomId: '',
        previousReading: '',
        currentReading: ''
    });
    const [editingBill, setEditingBill] = useState(null);

    useEffect(() => {
        fetchBills();
    }, []);

    const fetchBills = async () => {
        try {
            const response = await axios.get(`http://192.168.31.48:8085/api/monthly-bills/roomId/${storedUserData.id}`);
            setBills(response.data);
        } catch (error) {
            console.error("Error fetching bills:", error);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            form.roomId = storedUserData.id;
            if (editingBill) {
                await axios.put(`http://192.168.31.48:8085/api/monthly-bills/${editingBill.id}`, form);
            } else {
                await axios.post('http://192.168.31.48:8085/api/monthly-bills/post', form);
            }
            fetchBills();
            setForm({ roomId: '', previousReading: '', currentReading: '' });
            setEditingBill(null);
        } catch (error) {
            console.error("Error saving bill:", error);
        }
    };

    const handleEdit = (bill) => {
        setEditingBill(bill);
        setForm({
            roomId: bill.roomId,
            previousReading: bill.previousReading,
            currentReading: bill.currentReading
        });
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://192.168.31.48:8085/api/monthly-bills/${id}`);
            fetchBills();
        } catch (error) {
            console.error("Error deleting bill:", error);
        }
    };

    const openPhonePePayment = (event, amount) => {
        event.preventDefault(); // Prevent page reload or default behavior
        const upiUrl = `upi://pay?pa=atm.debit@ibl&pn=Rushikesh_Janorkar&am=${amount}`;
        window.open(upiUrl, '_blank');  // Open in a new tab or window
    };



    // Updated printTable function to generate PDF for specific bill
    const printTable = (billId) => {
        const bill = bills.find(b => b.id === billId); // Find the specific bill by ID
        if (!bill) {
            console.log('Bill not found');
            return;
        }

        const doc = new jsPDF();
        doc.text('Bill Details', 14, 20);

        // Adding Bill details as table
        doc.autoTable({
            head: [['Label', 'Value']],
            body: [
                ['Room ID', bill.roomId],
                ['Bill Date', new Date(bill.billDate).toLocaleDateString()],
                ['Previous Reading', bill.previousReading],
                ['Current Reading', bill.currentReading],
                ['Total Reading', bill.totalReading],
                ['Total Bill', bill.totalBill]
            ]
        });

        // Save the PDF with a custom filename based on bill ID
        doc.save(`bill_${billId}.pdf`);
    };

    return (
        <div className="App">
            <nav style={{ backgroundColor: "#007bff", color: "white", marginTop: "-50px", padding: "10px", display: "flex", justifyContent: 'end' }}>
                <ol style={{ display: "flex", listStyleType: "none", padding: 0, margin: 0, alignItems: "center" }}>
                    <li style={{ marginLeft: "15px" }}>
                        <Link to="/register" style={{ color: "white", textDecoration: "none" }}>Register</Link>
                    </li>
                    <li>
                        {storedUserData?.username ? `UserName: ${storedUserData.fullName}` : "Guest"}
                    </li>
                    {/* <li style={{ marginLeft: "15px" }}>
                        <img
                            src={`data:image/jpeg;base64,${storedUserData.photo}`}
                            alt="User profile picture" // More descriptive without redundancy
                            style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                        />

                    </li> */}
                </ol>
            </nav>

            <h1>Monthly Bill Management</h1>

            <form onSubmit={handleSubmit} className="bill-form">
                <label>Room ID:</label>
                <input
                    type="number"
                    name="roomId"
                    placeholder="Room ID"
                   // value={storedUserData.id}
                    readOnly
                    required
                />
                <label>Previous Reading:</label>
                <input
                    type="number"
                    name="previousReading"
                    placeholder="Previous Reading"
                    value={form.previousReading}
                    onChange={handleChange}
                    required
                />
                <label>Current Reading:</label>
                <input
                    type="number"
                    name="currentReading"
                    placeholder="Current Reading"
                    value={form.currentReading}
                    onChange={handleChange}
                    required
                />
                <div className="button-group">
                    <button type="submit">
                        {editingBill ? "Update Bill" : "Add Bill"}
                    </button>
                    {editingBill && (
                        <button onClick={() => setEditingBill(null)} type="button">
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <table id="bill-table" className="bill-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Bill Date</th>
                        <th>Previous Reading</th>
                        <th>Current Reading</th>
                        <th>Total Reading</th>
                        <th>Total Bill</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bills.map((bill, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{new Date(bill.billDate).toLocaleDateString()}</td>
                            <td>{bill.previousReading}</td>
                            <td>{bill.currentReading}</td>
                            <td>{bill.totalReading}</td>
                            <td>{bill.totalBill}</td>
                            <td style={{ padding: "10px" }}>
                                <button onClick={() => handleEdit(bill)}>Edit</button>
                                <button style={{ margin: "5px" }} onClick={() => handleDelete(bill.id)}>Delete</button>
                                <button onClick={() => printTable(bill.id)}>Print PDF</button> {/* Print button for specific bill */}
                                <button style={{ margin: "5px" }} onClick={(e) => openPhonePePayment(e, bill.totalBill)}>Pay with UPI</button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MonthlyBill;

