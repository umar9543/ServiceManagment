import { useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { decrypt } from 'src/api/encryption';
import { paths } from 'src/routes/paths';

import PurchaseListView from 'src/sections/PurchasePage/view/booking-view';



// ----------------------------------------------------------------------

export default function BookingOrderViewPage() {
  const navigate = useNavigate()
  const userData = useMemo(() => JSON.parse(localStorage.getItem('UserData')), []);

  // useEffect(() => {
  //   if (userData.roleID !== '1') {
  //     navigate(paths.page403)
  //   }
  // }, [userData, navigate])
  return (
    <>
      <Helmet>
        <title>Service Purchased</title>
      </Helmet>

      <PurchaseListView/>
    </>
  );
}
