import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import BookingEdit from 'src/sections/BookingOrder/BookingOrders/BookingEdit';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthFetch } from 'src/api/apibasemethods';
// import BookingEditForm from '../booking-edit';


// ----------------------------------------------------------------------

export default function BookingEditView({ urlData }) {

    const [selectedBooking, setSelectedBooking] = useState(null);
  const authFetch=useAuthFetch();
  useEffect(() => {
  if (!urlData?.id) return;

  authFetch(`https://192.168.100.37:8080/api/Client/${urlData.id}`)
    .then(res => res.json()) // 🟢 parse the JSON
    .then(data => {
      console.log('Fetched client:', data);
      const formatedData = {
        ...data,
        enrollmentDate: new Date(data.enrollmentDate), // 🟢 fix this line
      };
      setSelectedBooking(formatedData);
    })
    .catch(error => {
      console.error('Error fetching client:', error);
    });
}, [urlData?.id,authFetch]);

console.log(selectedBooking)
    const settings = useSettingsContext();
    return (
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
            <CustomBreadcrumbs
                heading="Clients Information"
                links={[
                    { name: "Home", href: paths.dashboard.root },
                    { name: "Clients", href: paths.dashboard.bookingOrder.root },
                    { name: "Edit", },
                ]}
                sx={{ mb: { xs: 3, md: 5 } }}
            />



            {(selectedBooking !== null ) && <BookingEdit selectedBooking={selectedBooking}  urlData={urlData} />}

        </Container>
    );
}

BookingEditView.propTypes = {
    urlData: PropTypes.any,
}