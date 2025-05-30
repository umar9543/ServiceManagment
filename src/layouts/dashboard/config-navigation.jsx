import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';

import SvgColor from 'src/components/svg-color';


// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  management: icon('ic_management'),
  meeting: icon('ic_meeting'),
  complain: icon('ic_complain'),
  database: icon('ic_database'),
  assignment: icon('ic-assignment'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useTranslate();
  const userData = useMemo(() => JSON.parse(localStorage.getItem('UserData')), []);


  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: t('overview'),
        items: [
          {
            title: t('Dashboard'),
            path: paths.dashboard.root,
            icon: ICONS.dashboard,
          },
        ],
      },

      // MANAGEMENT
      // ----------------------------------------------------------------------
      {
        /* eslint-disable no-nested-ternary */
        subheader: t('Application'),
        items:
          //  (userData.roleID === '1') ?
          [
            { title: t('Clients'), path: paths.dashboard.bookingOrder.root, icon: ICONS.booking },
           
          ]
        // :
        // [
        //   // {
        //   //   title: t('Reports'),
        //   //   path: paths.dashboard.reports.root,
        //   //   icon: ICONS.file,
        //   //   children: [
        //   //     { title: t('WIP Report'), path: paths.dashboard.reports.WIPReport.root },
        //   //     { title: t('Business Summary O/W'), path: paths.dashboard.reports.BusinessSummaryOWReport.root },
        //   //     { title: t('Business Summary'), path: paths.dashboard.reports.BusinessSummaryReport.root },
        //   //     { title: t('Shipment & Tracking'), path: paths.dashboard.reports.ShipmentTrackingReport.root },
        //   //     { title: t('Factory WIP Report'), path: paths.dashboard.reports.FactoryWIPReport.root },
        //   //     { title: t('Shipment History Report'), path: paths.dashboard.reports.ShipmentHistoryReport.root },
        //   //     { title: t('Shipment Delay Report'), path: paths.dashboard.reports.ShipmentDelayReport.root },
        //   //     { title: t('Commission Due Report'), path: paths.dashboard.reports.CommissionDueReport.root },
        //   //     { title: t('Shipment Update Sheet'), path: paths.dashboard.reports.ShipmentUpdateReport.root },
        //   //     { title: t('Yearly Commission Report'), path: paths.dashboard.reports.YearlyCommissionReport.root },
        //   //     { title: t('Order Report'), path: paths.dashboard.reports.OrderReport.root }
        //   //   ],
        //   // },
        // ]
      },

      {
        subheader: t('Application'),
        items: [
          {
            title: t('Services '),
            path: paths.dashboard.root,
            icon: ICONS.assignment,
            children: [
              { title: t('Sell'), path: paths.dashboard.Sell.root },
              { title: t('Purchase'), path: paths.dashboard.PurchasePage.root },


            ]
          },
        ],
      },
     
    ],
    [t]
  );

  return data;
}
