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
          {
            title: t('Setup'),
            icon: ICONS.menuItem,
            path: paths.dashboard.setup.root,

            children: [
              {
                title: t('Vendor'),
                path: paths.dashboard.setup.vendor,
                // icon: ICONS.banking,
              },
              {
                title: t('Currency'),
                path: paths.dashboard.setup.currency,
                // icon: ICONS.banking,
              },
              // {
              //   title: t('Contact'),
              //   path: paths.dashboard.setup.contact,
              //   // icon: ICONS.banking,
              // },
              // {
              //   title: t('Service type'),
              //   path: paths.dashboard.setup.servicetype,
              //   // icon: ICONS.banking,
              // },


            ],
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
            { title: t('Clients'), path: paths.dashboard.bookingOrder.root, icon: ICONS.meeting },
            { title: t('Services'), path: paths.dashboard.Services.root, icon: ICONS.management },
          ]

      },
      // ----------------------------------------------------------------------


    ],
    [t]
  );

  return data;
}
