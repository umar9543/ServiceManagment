import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import BookingCreateForm from '../booking-new';


// ----------------------------------------------------------------------

export default function BookingNewView() {

    const settings = useSettingsContext();

    return (
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
            <CustomBreadcrumbs
                heading="New Yarn Setup"
                links={[
                    {
                        name: 'Home',
                        href: paths.dashboard.root,
                    },
                    {
                        name: 'Yarn Setup',
                        href: paths.dashboard.bookingOrder.root,
                    },
                    { name: 'New Yarn Setup' },
                ]}
                sx={{
                    mb: { xs: 3, md: 5 },
                }}
            />

            <BookingCreateForm />
        </Container>
    );
}
