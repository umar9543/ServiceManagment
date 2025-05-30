import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    Checkbox,
    Button,
} from "@mui/material";

import Scrollbar from "src/components/scrollbar";
import { Get } from "src/api/apibasemethods";
import { decrypt } from "src/api/encryption";
// import BookingOrder from "./BookingOrder";

const BookingView = () => {
  
  const decryptObjectKeys = (data) => {
    const decryptedData = data.map((item) => {
      const decryptedItem = {};
      Object.keys(item).forEach((key) => {
        decryptedItem[key] = decrypt(item[key]);
      });
      return decryptedItem;
    });
    return decryptedData;
  };



    const userData = useMemo(() => JSON.parse(localStorage.getItem('UserData')), []);
    const UserID=decrypt(userData.UserID);
    const RoleID=decrypt(userData.RoleID);
    const ECPDivistion=decrypt(userData.ECPDivistion);
console.log(UserID,RoleID,ECPDivistion)
    const [data, setData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [datas, setDatas] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        axios.get(`https://localhost:44347/api/BookingPurchase/api/booking?userId=${UserID}&division=${ECPDivistion}`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [UserID,ECPDivistion]);
    console.log("view", data)
    const handleSelectRow = (row) => {
        setSelectedRows((prevSelected) =>
            prevSelected.some((selected) => selected.POID === row.POID)
                ? prevSelected.filter((selected) => selected.POID !== row.POID)
                : [...prevSelected, row]
        );
    };


    // const handleEdit = async (id) => {
    //     try {
    //         const response = await fetch(`https://ssblapi.m5groupe.online:6449/api/BookingPurchase/${id}`);
    //         const bookingData = await response.json();

    //         if (response.ok) {
    //             setSelectedBooking(bookingData); // Set data for editing
    //             setShowForm(true); // Show form on edit click
    //         } else {
    //             console.error("Failed to fetch booking data.");
    //         }
    //     } catch (error) {
    //         console.error("Error fetching booking data:", error);
    //     }
    // };
    return (
        <>

            <Table stickyHeader>
                <Scrollbar>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ minWidth: 150 }}>Booking Ref.NO</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>Merchant</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>Customer</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>Supplier</TableCell>
                            <TableCell sx={{ minWidth: 100, textAlign: 'center' }}>Style No</TableCell>
                            <TableCell sx={{ minWidth: 150, textAlign: 'center' }}>Placement Date</TableCell>
                            <TableCell sx={{ minWidth: 150, textAlign: 'center' }}>Shipment Date</TableCell>
                            <TableCell sx={{ minWidth: 150, textAlign: 'center' }}>Booking Quantity</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>Amount</TableCell>
                            <TableCell sx={{ minWidth: 150, textAlign: 'center' }}>Remaining Qty</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ textAlign: 'center' }}>{row.poNo}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{row.username}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{row.customer}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{row.vendor}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{row.styleNo}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{row.placementDate}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{row.shipmentDate}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{row.pOqty}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{row.amount}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{row.remainingQty}</TableCell>
                                    {/* <TableCell>
                                                <Button variant="contained" color="primary" onClick={() => handleEdit(1560)}>
                                                    Edit
                                                </Button>
                                            </TableCell> */}
                                </TableRow>
                            ))}
                    </TableBody>
                </Scrollbar>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 10));
                    setPage(0);
                }}
            />

        </>
    );
};

export default BookingView;
