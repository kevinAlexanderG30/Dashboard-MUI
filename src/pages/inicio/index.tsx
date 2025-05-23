import * as React from 'react';
// import type {} from '@mui/x-date-pickers/themeAugmentation';
// import type {} from '@mui/x-charts/themeAugmentation';
// import type {} from '@mui/x-data-grid-pro/themeAugmentation';
// import type {} from '@mui/x-tree-view/themeAugmentation';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from "@/components/AppNavbar";
import Header from "@/components/Header";
import MainGrid from "@/components/MainGrid";
import SideMenu from "@/components/SideMenu";
import AppTheme from "@/shared-theme/AppTheme";

// import {
//     chartsCustomizations,
//     dataGridCustomizations,
//     datePickersCustomizations,
//     treeViewCustomizations,
// } from './theme/customizations';

// const xThemeComponents = {
//     ...chartsCustomizations,
//     ...dataGridCustomizations,
//     ...datePickersCustomizations,
//     ...treeViewCustomizations,
// };

export default function Dashboard(props: { disableCustomTheme?: boolean }) {
    return (
        // themeComponents={xThemeComponents}
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <Box sx={{ display: 'flex' }}>
                <SideMenu />
                <AppNavbar />

                {/* Main content wrapper */}
                <Box
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100vh',
                    }}
                >
                    <Header />

                    {/* Main scrollable content */}
                    <Box
                        component="main"
                        sx={(theme) => ({
                            flexGrow: 1,
                            overflow: 'auto',
                            backgroundColor: theme.vars
                                ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                                : alpha(theme.palette.background.default, 1),
                            px: 3,
                            py: 2,
                        })}
                    >
                        <Stack spacing={2}>
                            <MainGrid />
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </AppTheme>
    );
}