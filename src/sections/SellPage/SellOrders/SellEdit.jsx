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
    RHFUploadAvatar,
    RHFAutocomplete,
} from 'src/components/hook-form';
import { useSettingsContext } from "src/components/settings";
import { decrypt } from "src/api/encryption";
import PropTypes from "prop-types";
import { LoadingScreen } from "src/components/loading-screen";



const SellEdit = ({ selectedBooking, urlData }) => {

    function formatDate(isoString) {
        const date = new Date(isoString);
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yy = String(date.getFullYear()).slice(-2);
        return `${dd}/${mm}/${yy}`;
    }

    // Example usage
    const authFetch = useAuthFetch();

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
    const [selectedCertification, setSelectedCertification] = useState(selectedBooking?.b_isCertifications ? 1 : 0 || null);
    const [certificationValues, setCertificationValues] = useState({
        TC: 0,
        GOTS: 0,
        Others: 0
    });
    const handleCertificationChange = (event, newValue) => {
        console.log('newvalue', newValue?.id)
        // const certificationValue = newValue === "Yes" ? 1 : 0;
        setValue("certification", newValue?.id);
        setSelectedCertification(newValue?.id);

        if (newValue?.id === 0) {
            // Reset checkboxes if "No" is selected
            setCertificationValues({ TC: 0, GOTS: 0, Others: 0 });
        }
    };
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCertificationValues((prev) => ({
            ...prev,
            [name]: checked ? 1 : 0, // Set 1 when checked, 0 when unchecked
        }));
    };

    const [toggle, setToggle] = useState(false)
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalMark, setTotalMark] = useState(0); // Initialize with 0



    const [cancelQuantity, setCancelQuantity] = useState(selectedBooking.bookingCancelQty || "");
    // Function to calculate commission


    const userdata = JSON.parse(localStorage.getItem("UserData"))

    const validationSchema = Yup.object().shape({
        // RefNO: Yup.string().required("Reference No is required"),
        // placementDates: Yup.date().required("placementDate is required"),
        // shipmentDateBuyer: Yup.date()
        //     .required("Shipment Date (Buyer) is required")
        //     .min(Yup.ref('placementDates'), "Shipment Date (Buyer) must be after Placement Date"),

        // shipmentDateVendor: Yup.date()
        //     .required("Shipment Date (Vendor) is required")
        //     .min(Yup.ref('placementDates'), "Shipment Date (Vendor) must be after Placement Date"),
        // customer: Yup.object().nullable().required("Customer is required"),
        // brandCustomer: Yup.object().nullable().required("Customer Brand is required"),
        // supplier: Yup.object().nullable().required("Supplier is required"),

        // merchant: Yup.object().nullable().required("Merchant is required"),
        // productPortfolio: Yup.object().nullable().required("Product Portfolio is required"),
        // productCategory: Yup.object().nullable().required("Product Category is required"),
        // productGroup: Yup.object().nullable().required("Product Group is required"),
        // season: Yup.string().required("Season is required"),
        // fabricType: Yup.string().required("Fabric Type is required"),
        // businessManagers: Yup.object().nullable(),
        // Currency: Yup.object().nullable().required("Currency is required"),
        // construction: Yup.string().required("Construction is required"),
        // design: Yup.string().required("Design is required"),
        // transaction: Yup.object().nullable().required("Transaction is required"),
        // lcopt: Yup.object().nullable(),
        // paymentType: Yup.object(),
        // shipmentMode: Yup.object().nullable().required("Shipment Mode is required"),
        // paymentMode: Yup.object().nullable().required("Payment Mode is required"),
        // certification: Yup.string().required("Certification selection is required"),
        // buyerCommissions: Yup.number(),
        // vendorCommissions: Yup.number(),
        // totalMarkups: Yup.number(),
        // comments: Yup.string().nullable(),
        // files: Yup.array().of(
        //     Yup.mixed().test("fileType", "Only PDF files are allowed", file => file?.type === "application/pdf")
        // )
        //     .nullable(),
    });


    const calculateCommission = (commission, totalAmt) => {

        if (!commission || !totalAmt) return 0;
        return ((Math.round((commission * totalAmt) / 100 * 100) / 100).toFixed(2))


    };
    const calculateMark = (commission, totalAmt) => {

        if (!commission || !totalAmt) return 0;
        return Math.round(commission * totalAmt)


    };
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

    const [productPortfolioData, setproductPortfolioData] = useState([]);

    useEffect(() => {
        authFetch("https://192.168.100.37:8080/api/Client/GetAllCompanySize")
            .then(response => response.json())
            .then(data => {
                setproductPortfolioData(data); // ✅ Set the actual data
            })
            .catch(error => console.error("Error fetching customers:", error));
    }, [authFetch]);

    const [loading, setLoading] = useState(true);


    const defaultValues = useMemo(
        () => ({
            companyName: selectedBooking?.companyName || '',
            industry: selectedBooking?.industry || null,
            address: selectedBooking?.address || null,
            contactNumber: selectedBooking?.contactNumber || null,
            contactPerson: selectedBooking?.contactPerson || null,
            email: selectedBooking?.email || null,
            website: selectedBooking?.website || null,
            country: selectedBooking?.country || null,
            enrollmentDate: selectedBooking?.enrollmentDate || null,
            companySizeId: selectedBooking?.companySizeId
                ? productPortfolioData?.find((x) => x.id === selectedBooking.companySizeId)
                : null,
            
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [
            selectedBooking,

            // brandData,

            productPortfolioData,

        ]
    );

    useEffect(() => {
        if (selectedBooking) {
            setLoading(true); // Enable loader
            setTimeout(() => {
                methods.reset(defaultValues); // Reset form with fetched values
                setLoading(false); // Disable loader when data is ready
            }, 2000); // Simulating API delay (replace with actual API call)
        }
    }, [selectedBooking, defaultValues, methods]);

    // console.log("ids", selectedBooking)
    const InsertMstData = async (dataToInsert) => {


        try {
            // ✅ Backend expects `dto.File`

            let res;

            if (selectedBooking) {
                // ✅ Send JSON for UPDATE API (PUT)
                res = await authFetch(`https://192.168.100.37:8080/api/Client/${selectedBooking.id}`, {
                   method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dataToInsert),
                });

                return res.status === 200;
            }
            // eslint-disable-next-line
            else {


                res = await authFetch('https://192.168.100.37:8080/api/Client', {
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

                enqueueSnackbar('Error: POID missing from response', { variant: 'error' });
                return null;
            }
        } catch (error) {
            console.error(`Error creating/updating master data:`, error);
            return null;
        }
    };

    function toUTCISOString(date) {
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString();
    }

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

    const settings = useSettingsContext();
    // console.log("ghfg",customerData?.find((x) => x.customerID === values?.customer?.customerID))
    // console.log("custiemr",values.customer)
    return (
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
            {loading ? (
                // Show Loader while data is being fetched
                <LoadingScreen sx={{ height: { xs: 200, md: 300 } }} />
            ) : (

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
            )}
        </Container >
    );
};
SellEdit.propTypes = {
    selectedBooking: PropTypes.object,

    urlData: PropTypes.any,

}
export default SellEdit;



