import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';

import { LoadingScreen, SplashScreen } from 'src/components/loading-screen';
import useUserData from 'src/routes/hooks/useUserData';


// ----------------------------------------------------------------------

// OVERVIEW
const IndexPage = lazy(() => import('src/pages/dashboard/app'));

// User
const UserAccountPage = lazy(() => import('src/pages/dashboard/user/account'));

// Reports
// const BusinessSummaryOWReportPage = lazy(() => import('src/pages/dashboard/reports/business-summary-ow-report'));
// const BusinessSummaryReportPage = lazy(() => import('src/pages/dashboard/reports/business-summary-report'));
// const CommissionDueReportPage = lazy(() => import('src/pages/dashboard/reports/commission-due-report'));
// const FactoryWIPReportPage = lazy(() => import('src/pages/dashboard/reports/factory-wip-report'));
// const OrderReportPage = lazy(() => import('src/pages/dashboard/reports/order-report'));
// const ShipmentDelayReportPage = lazy(() => import('src/pages/dashboard/reports/shipment-delay-report'));
// const ShipmentHistoryReportPage = lazy(() => import('src/pages/dashboard/reports/shipment-history-report'));
// const ShipmentUpdateReportPage = lazy(() => import('src/pages/dashboard/reports/shipment-update-report'));
// const ShipmentTrackingReportPage = lazy(() => import('src/pages/dashboard/reports/shipment&tracking-report'));
// const WIPReportPage = lazy(() => import('src/pages/dashboard/reports/wip-report'));
// const YearlyCommissionReportPage = lazy(() => import('src/pages/dashboard/reports/yearly-commission-report'));
const PurchaseOrderPage = lazy(() => import('src/pages/dashboard/reports/Booking-Order'));

const BookingViewPage = lazy(() => import('src/pages/dashboard/BookingOrder/view'));
const BookingAddPage = lazy(() => import('src/pages/dashboard/BookingOrder/add'));
const BookingEditPage = lazy(() => import('src/pages/dashboard/BookingOrder/edit'));

const SellViewPage = lazy(() => import('src/pages/dashboard/Services/view'));
const SellAddPage = lazy(() => import('src/pages/dashboard/Services/add'));
const SellEditPage = lazy(() => import('src/pages/dashboard/Services/edit'));


const PurchaseViewPage = lazy(() => import('src/pages/dashboard/PurchasePage/view'));
const PurchaseAddPage = lazy(() => import('src/pages/dashboard/PurchasePage/add'));
const PurchaseEditPage = lazy(() => import('src/pages/dashboard/PurchasePage/edit'));
const VendorListPage = lazy(() => import('src/pages/dashboard/setup/vendor/view'));
const CurrencyListPage = lazy(() => import('src/pages/dashboard/setup/currency/view'));
// ----------------------------------------------------------------------




export const dashboardRoutes = [
  {
    path: 'app',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { element: <IndexPage />, index: true },
      {
        path: 'user',
        children: [
          { element: <UserAccountPage />, index: true },
          { path: 'account', element: <UserAccountPage /> },
        ],
      },
      {
        path: 'setup',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        ),
        children: [
          {
            path: 'vendor',
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <VendorListPage />
              </Suspense>
            ),
          },
          {
            path: 'currency',
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <CurrencyListPage />
              </Suspense>
            ),
          },
          // {
          //   path: 'room',
          //   element: (
          //     <Suspense fallback={<LoadingScreen />}>
          //       <RoomListPage />
          //     </Suspense>
          //   ),
          // },
          // {
          //   path: 'category',
          //   element: (
          //     <Suspense fallback={<LoadingScreen />}>
          //       <CategoryListPage />
          //     </Suspense>
          //   ),
          // },





        ],
      },
      {
        path: 'BookingOrder',
        children: [
          { element: <BookingViewPage />, index: true },
          // { path: 'view', element: <BookingViewPage /> },
          { path: 'add', element: <BookingAddPage /> },
          { path: 'edit/:id', element: <BookingEditPage /> },
        ],
      },
      {
        path: 'Services',
        children: [
          { element: <SellViewPage />, index: true },
          // { path: 'view', element: <SellViewPage /> },
          { path: 'add', element: <SellAddPage /> },
          { path: 'edit/:id', element: <SellEditPage /> },
        ],
      },
      {
        path: 'PurchasePage',
        children: [
          { element: <PurchaseViewPage />, index: true },
          // { path: 'view', element: <PurchaseViewPage /> },
          { path: 'add', element: <PurchaseAddPage /> },
          { path: 'edit/:id', element: <PurchaseEditPage /> },
        ],
      },
    ],
  },
];