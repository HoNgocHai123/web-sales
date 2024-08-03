// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';


const BudgetEdit = () => {
    const { id } = useParams(); // Get id from URL
    const [DanhMuc, setDanhMuc] = useState('');
    const [SoTien, setSoTien] = useState('');
    const [NgayThang, setNgayThang] = useState(''); // State for date
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBudget = async () => {
            try {
                const docRef = doc(db, 'Budget', id); // Get the budget document
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setDanhMuc(data.DanhMuc);
                    setSoTien(data.SoTien);
                    setNgayThang(data.NgayThang ? data.NgayThang.toDate().toISOString().split('T')[0] : ''); // Set the date in yyyy-mm-dd format
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching budget:', error);
            }
        };

        fetchBudget();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const docRef = doc(db, 'Budget', id); // Update the budget document
            await updateDoc(docRef, {
                DanhMuc,
                SoTien: parseFloat(SoTien),
                NgayThang: new Date(NgayThang) // Convert date to JavaScript Date object
            });
            console.log('Budget updated successfully');
            Swal.fire({
                icon: 'success',
                title: 'Cập Nhật Thành Công',
                showConfirmButton: false,
                timer: 1500
            });
            // After successful update, navigate to budget list page
            navigate('/budgetlist');
        } catch (error) {
            console.error('Error updating budget:', error);
            Swal.fire({
                icon: 'error',
                title: 'Cập Nhật Không Thành Công',
                text: error.message,
            });
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    
                </div>
                <div className="col-md-9 abcl">
                    <div style={styles.body}>
                        <div style={styles.container}>
                            <h3>Chỉnh Sửa Ngân Sách</h3>
                            <form id="budgetForm" onSubmit={handleSubmit}>
                                <div style={styles.formGroup}>
                                    <label htmlFor="categoryName" style={styles.label}>
                                        Tên Danh Mục:
                                    </label>
                                    <input
                                        type="text"
                                        id="categoryName"
                                        name="DanhMuc"
                                        value={DanhMuc}
                                        onChange={(e) => setDanhMuc(e.target.value)}
                                        required
                                        style={styles.inputText}
                                        className="form-control"
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <label htmlFor="date" style={styles.label}>
                                        Ngày Tháng:
                                    </label>
                                    <input
                                        type="date"
                                        id="date"
                                        name="NgayThang"
                                        value={NgayThang}
                                        onChange={(e) => setNgayThang(e.target.value)}
                                        required
                                        style={styles.inputText}
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <label htmlFor="amount" style={styles.label}>
                                        Số Tiền:
                                    </label>
                                    <input
                                        type="number"
                                        id="amount"
                                        name="SoTien"
                                        value={SoTien}
                                        onChange={(e) => setSoTien(e.target.value)}
                                        required
                                        style={styles.inputText}
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <button type="submit" className="btn btn-primary">
                                        Cập Nhật
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    body: {
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f0f0f0",
        padding: "20px",
        marginTop: "-70px",
    },
    container: {
        maxWidth: "900px",
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        margin: "auto",
    },
    formGroup: {
        marginBottom: "20px",
    },
    label: {
        fontWeight: "bold",
        display: "block",
        marginBottom: "5px",
    },
    inputText: {
        width: "100%",
        padding: "10px",
        fontSize: "16px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        boxSizing: "border-box",
    },
    inputSubmit: {
        backgroundColor: "#4CAF50",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "16px",
        width: "100%",
        marginTop: "10px",
    },
};

export default BudgetEdit;
