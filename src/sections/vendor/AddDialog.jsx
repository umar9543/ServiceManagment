import * as Yup from 'yup';
import { useMemo, useCallback, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Input,
  InputAdornment,
  Typography,
} from '@mui/material';

import { LoadingScreen } from 'src/components/loading-screen';

import Iconify from 'src/components/iconify';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,
  RHFAutocomplete,
  RHFUpload,
  RHFUploadBox,
} from 'src/components/hook-form';

import { Get, Post, useAuthFetch } from 'src/api/apibasemethods';
import PropTypes from 'prop-types';
import { json } from 'react-router';

// ----------------------------------------------------------------------

export default function AddDptDialog({ uploadClose, uploadOpen, tableData }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const userData = useMemo(() => JSON.parse(localStorage.getItem('UserData')), []);

  // ---------------------- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX ------------------------

  const NewRoomSchema = Yup.object().shape({
    vendor_name: Yup.string()
      .required('Vendor Name is required')
      .min(3, 'Vendor Name must be at least 3 characters long')
      .max(100, 'Vendor Name must be less than or equal to 100 characters'),
    // .matches(/^[a-zA-Z\s]+$/, 'Vendor Name must only contain letters and spaces'),
  });

  const methods = useForm({
    resolver: yupResolver(NewRoomSchema),
  });
  const authFetch = useAuthFetch();
  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  // ------------------------------------

  const PostRoomData = async (PostData) => {
    try {
      await authFetch('https://192.168.100.37:8080/api/Service/CreateVendor', {
        method: 'POST',
        body: JSON.stringify(PostData),
        headers: { 'Content-Type': 'application/json' },
      }

      ).then(async (res) => {
        enqueueSnackbar( "Vendor  Added ");
        uploadClose();
        reset(); // Only reset after successful submission
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.response?.data, { variant: 'error' });
    }
  };

  const onDptSubmit = handleSubmit(async (data) => {
    if (tableData.some((item) => item.vendorName === data.vendor_name)) {
      enqueueSnackbar('Vendor Name already exists', { variant: 'error' });
      return;
    }
    try {
      const dataToSend = {
        VendorName: data.vendor_name,

      };
      await PostRoomData(dataToSend);
      uploadClose();

    } catch (error) {
      console.error(error);
    }
  });

  const renderLoading = (
    <LoadingScreen
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
      }}
    />
  );
  // -----------------
  const [Locations, setLocation] = useState([])
  const [isLoading, setLoading] = useState(true);
  const ApiGetLocations = useCallback(async () => {
    try {
      const response = await Get(
        `GetAlllocations?orgId=${userData?.userDetails?.orgId}&branchId=${userData?.userDetails?.branchID}`
      );
      setLocation(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [userData?.userDetails?.orgId, userData?.userDetails?.branchID]);
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        ApiGetLocations(),

      ]);
      setLoading(false);
    };
    fetchData();
  }, [ApiGetLocations]);
  return (
    <>
      <Dialog
        open={uploadOpen}
        onClose={() => {
          uploadClose(); // Call the original close function
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontSize: '20px !important' }}>
          <Stack direction="row" alignItems="center">
            <Typography variant="h5" sx={{ flexGrow: 1 }}>
              Add Vendor
            </Typography>

            <IconButton onClick={uploadClose}>
              <Iconify icon="mingcute:close-line" />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <FormProvider methods={methods} onSubmit={onDptSubmit}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              paddingY={3}
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
              }}
            >


              <RHFTextField name="vendor_name" label="Vendor Name" />
            </Box>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                color="primary"
                loading={isSubmitting}
              >
                Save
              </LoadingButton>
            </Stack>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
}

AddDptDialog.propTypes = {
  uploadClose: PropTypes.func,
  uploadOpen: PropTypes.bool,
  tableData: PropTypes.array,
};
