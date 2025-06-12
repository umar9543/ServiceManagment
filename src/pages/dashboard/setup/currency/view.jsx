import { Helmet } from 'react-helmet-async';
import { CurrencyListView } from 'src/sections/currency/view';

// ----------------------------------------------------------------------

export default function CurrencyListPage() {
  return (
    <>
      <Helmet>
        <title> Currency: List View</title>
      </Helmet>

      <CurrencyListView />
    </>
  );
}
