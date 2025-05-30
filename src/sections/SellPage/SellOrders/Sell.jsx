import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import {
    Autocomplete, TextField, Grid, Button, Container, Typography, Box, Stepper, Step, StepLabel, Card, FormGroup, FormControlLabel, Checkbox, List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton
} from "@mui/material";
import { Upload } from "src/components/upload";
import { enqueueSnackbar } from "notistack";
import { LoadingButton } from '@mui/lab';
import Stack from '@mui/material/Stack';
import Iconify from "src/components/iconify";
import { paths } from 'src/routes/paths';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
// import UploadFileIcon from "@mui/icons-material/UploadFile";
// import DeleteIcon from "@mui/icons-material/Delete";
import { DatePicker } from "@mui/x-date-pickers";
import { Get, Post, useAuthFetch } from "src/api/apibasemethods";
import FormProvider, {
    RHFSwitch,
    RHFTextField,
    RHFUpload,
    RHFUploadAvatar,
    RHFAutocomplete,
} from 'src/components/hook-form';

import { decrypt } from "src/api/encryption";
import { useSettingsContext } from "src/components/settings";




const Sell = () => {

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
    const UserID = decrypt(userData.userId);
    const RoleID = decrypt(userData.RoleID);
    const ECPDivistion = decrypt(userData.ECPDivistion);
    const certificationOptions = ["Yes", "No"];
    const [selectedCertification, setSelectedCertification] = useState(null);
    const [certificationValues, setCertificationValues] = useState({
        TC: 0,
        GOTS: 0,
        Others: 0
    });
    const settings = useSettingsContext();
    const authFetch = useAuthFetch();

    const [totalAmount, setTotalAmount] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [cancelQuantity, setCancelQuantity] = useState("");


    // Function to calculate commission


    const userdata = JSON.parse(localStorage.getItem("UserData"))



    const validationSchema = Yup.object().shape({


        // companyName: Yup.string()
        //     .required("Company Name is required"),

        // industry: Yup.string()
        //     .required("Industry is required"),

        // companySize: Yup.object()
        //     .nullable()
        //     .required("Company Size is required"),

        // address: Yup.string()
        //     .required("Address is required"),

        // contactNumber: Yup.string()
        //     .required("Contact Number is required"),

        // contactPerson: Yup.string()
        //     .required("Contact Person is required"),

        // email: Yup.string()
        //     .email("Invalid email format")
        //     .required("Email is required"),

        // website: Yup.string().required("Website is required"),

        // country: Yup.string()
        //     .required("Country is required"),

        // enrollmentDate: Yup.date()
        //     .required("Enrollment Date is required"),


    });




    const methods = useForm({
        resolver: yupResolver(validationSchema),

    });

    const {
        reset,
        watch,
        control,
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const values = watch();

    // Sample data for dropdowns


    const [MerchantData, setMerchantData] = useState([]);
    const [productPortfolioData, setproductPortfolioData] = useState([]);
    useEffect(() => {
        authFetch("https://192.168.100.37:8080/api/Client/GetAllCompanySize")
            .then(response => response.json())
            .then(data => {
                setproductPortfolioData(data); // ✅ Set the actual data
            })
            .catch(error => console.error("Error fetching customers:", error));
    }, [authFetch]);




    const [selectedLCOption, setSelectedLCOption] = useState(null);


    const getCookieValue = (name) => {
        const cookie = document.cookie
            .split("; ")
            .find(row => row.startsWith(`${name}=`));
        return cookie ? cookie.split("=")[1] : null;
    };


    function toUTCISOString(date) {
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString();
    }
    const [selectedRows, setSelectedRows] = useState([]);

    const InsertMstData = async (dataToInsert) => {
        try {

            const res = await authFetch('https://192.168.100.37:8080/api/Client', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToInsert),
            });


            if (res.ok) {
                const result = await res.json();
                const { id } = result;

                if (id) {
                    return id;
                }
            }

            enqueueSnackbar("Something went wrong", { variant: "error" });
            return null; // ✅ explicitly return null
        } catch (error) {
            console.error("Error creating master data:", error);
            enqueueSnackbar("Something went wrong", { variant: "error" });
            return null; // ✅ explicitly return null
        }
    };




    // Form submission
    const onSubmit = handleSubmit(async (data) => {


        try {
            console.log("CERTIFICATE", data);

            const mstData = {
                UserId: UserID,
                CompanyName: data.companyName,
                Industry: data.industry,
                CompanySizeId: data.companySize?.id || 1,
                Address: data.address,
                ContactNumber: data.contactNumber,
                ContactPerson: data.contactPerson,
                Email: data.email,
                Website: data.website,
                Country: data.country,
                EnrollmentDate: toUTCISOString(
                    new Date(data?.enrollmentDate || Date.now())
                ),
            };

            console.log('mstData', mstData);

            // ✅ First, call Master API to get POID
            const poid = await InsertMstData(mstData);

            if (!poid) {
                enqueueSnackbar("Something went wrong", { variant: "error" });
                return false; // ✅ Stop if Master API fails
            }
            // ✅ Success message only if both APIs succeed
            enqueueSnackbar("Data Uploaded Successfully", { variant: "success" });
            return true;

        } catch (error) {
            console.error("Error submitting data:", error);
            enqueueSnackbar("Something went wrong", { variant: "error" });
            return false;
        }
    });
    console.log("enrollment", values.enrollmentDate);

    return (
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
            <Box
                display="flex"
                justifyContent="space-between"
            >
                <CustomBreadcrumbs
                    heading="Client Information"
                    links={[
                        { name: "Home", href: paths.dashboard.root },
                        { name: "Client", href: paths.dashboard.Sell.root },
                        { name: "Add", },
                    ]}
                    sx={{ mb: { xs: 3, md: 5 } }}
                />

            </Box>

            <FormProvider methods={methods} onSubmit={onSubmit}>


                <div>
                    <Card sx={{ p: 2 }}>
                        <Typography variant="h5" sx={{ mb: 3 }}>
                            Order Booking Input Form
                        </Typography>
                        <Box
                            rowGap={3}
                            columnGap={2}
                            display="grid"
                            gridTemplateColumns={{
                                xs: "repeat(1, 1fr)",
                                sm: "repeat(1, 1fr)",
                                md: "repeat(3, 1fr)", // 3 items per row
                            }}
                            sx={{ mb: 3 }}
                        >
                            {/* Booking Reference No */}
                            <RHFTextField name="companyName" label="Company Name" />

                            <RHFTextField name="industry" label="Industry" />




                            <RHFAutocomplete
                                name="companySizeId"
                                label="Company Size"
                                options={productPortfolioData}
                                getOptionLabel={(option) => option?.sizeName || ""}
                                value={productPortfolioData?.find((x) => x.id === values?.companySizeId?.id) || null}

                                fullWidth

                            />
                            <RHFTextField name="address" label="Address" fullWidth variant="outlined" />
                            <RHFTextField name="contactNumber" label="Contact Number" fullWidth variant="outlined" />




                            <RHFTextField name="contactPerson" label="Contact Person" fullWidth variant="outlined" />

                            <RHFTextField name="email" label="Email Address" fullWidth variant="outlined" />
                            <RHFTextField name="website" label="Website" fullWidth variant="outlined" />

                            <RHFTextField name="country" label="country" fullWidth variant="outlined" />
                            <Controller
                                name="enrollmentDate"
                                control={control}
                                render={({ field }) => (
                                    <DatePicker
                                        label="enrollmentDate"
                                        format="dd/MM/yyyy"
                                        value={field.value}
                                        onChange={(newValue) => field.onChange(newValue)}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                )}
                            />

                        </Box>
                    </Card>

                </div>


                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </Box>

            </FormProvider>

        </Container >
    );
};

export default Sell;



