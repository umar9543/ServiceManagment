import { paramCase } from 'src/utils/change-case';

import { _id, _postTitles } from 'src/_mock/assets';

// ----------------------------------------------------------------------

const MOCK_ID = _id[1];

const MOCK_TITLE = _postTitles[2];

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/app',
};

// ----------------------------------------------------------------------

export const paths = {

  page403: '/403',
  page404: '/404',
  page500: '/500',

  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    user: {
      account: `${ROOTS.DASHBOARD}/user/account`,
    },
    reports: {
      root: `${ROOTS.DASHBOARD}/reports`,
      // BusinessSummaryOWReport: {
      //   root: `${ROOTS.DASHBOARD}/reports/business-summary-order-wise-report`,
      // },
      // BusinessSummaryReport: {
      //   root: `${ROOTS.DASHBOARD}/reports/business-summary-report`,
      // },
      // CommissionDueReport: {
      //   root: `${ROOTS.DASHBOARD}/reports/commission-due-report`,
      // },
      // FactoryWIPReport: {
      //   root: `${ROOTS.DASHBOARD}/reports/factory-wip-report`,
      // },
      // OrderReport: {
      //   root: `${ROOTS.DASHBOARD}/reports/order-report`,
      // },
      // ShipmentDelayReport: {
      //   root: `${ROOTS.DASHBOARD}/reports/shipment-delay-report`,
      // },
      // ShipmentHistoryReport: {
      //   root: `${ROOTS.DASHBOARD}/reports/shipment-history-report`,
      // },
      // ShipmentUpdateReport: {
      //   root: `${ROOTS.DASHBOARD}/reports/shipment-update-report`,
      // },
      // ShipmentTrackingReport: {
      //   root: `${ROOTS.DASHBOARD}/reports/shipment-tracking-report`,
      // },
      // WIPReport: {
      //   root: `${ROOTS.DASHBOARD}/reports/wip-report`,
      // },
      // YearlyCommissionReport: {
      //   root: `${ROOTS.DASHBOARD}/reports/yearly-commission-report`,
      // },
      PurchaseOrderReport: {
        root: `${ROOTS.DASHBOARD}/reports/Booking-Order`,
      },
    },
    bookingOrder:{
      root: `${ROOTS.DASHBOARD}/BookingOrder`,
      add:  `${ROOTS.DASHBOARD}/BookingOrder/add`,
      edit:(id) =>`${ROOTS.DASHBOARD}/BookingOrder/edit/${id}`
    },
    Services:{
      root: `${ROOTS.DASHBOARD}/Services`,
      add:  `${ROOTS.DASHBOARD}/Services/add`,
      edit:(id) =>`${ROOTS.DASHBOARD}/Services/edit/${id}`
    },
     PurchasePage:{
      root: `${ROOTS.DASHBOARD}/PurchasePage`,
      add:  `${ROOTS.DASHBOARD}/PurchasePage/add`,
      edit:(id) =>`${ROOTS.DASHBOARD}/PurchasePage/edit/${id}`
    },
  },
};
