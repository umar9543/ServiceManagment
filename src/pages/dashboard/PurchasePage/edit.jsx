import { useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router';
import { decrypt } from 'src/api/encryption';
import { paths } from 'src/routes/paths';
import { BookingEditView } from 'src/sections/BookingOrder/view';
import PurchaseEditView from 'src/sections/PurchasePage/view/booking-edit-view';
// import BookingOrder from 'src/sections/BookingOrders/BookingOrder';



// ----------------------------------------------------------------------

export default function BookingOrderEditPage() {
  const navigate = useNavigate()
  const param = useParams();
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

      <PurchaseEditView urlData={param}/>
    </>
  );
}
