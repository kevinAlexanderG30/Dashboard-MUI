import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';

import NavbarBreadcrumbs from './NavbarBreadcrumbs';
import MenuButton from './MenuButton';
import ColorModeIconDropdown from '../shared-theme/ColorModeIconDropdown';
import Search from './Search';

export default function Header() {
    return (
        <AppBar
            position="static"
            color="default"
            elevation={1}
            sx={{
                display: { xs: 'none', md: 'flex' },
                border: '5px solid red',
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', px: 3 }}>
                {/* Left side: Logo + Breadcrumbs */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                        sx={{
                            width: 120,
                            height: 50,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            border: '2px solid red',
                        }}
                    >
                        <Image
                            // src=""
                            alt="Logo"
                            width={500}
                            height={300}
                            style={{ objectFit: 'contain' }}
                            priority
                        />
                    </Box>
                    <NavbarBreadcrumbs />
                </Box>

                {/* Right side: Actions */}
                <Stack direction="row" spacing={1} alignItems="center">
                    <Search />
                    <MenuButton showBadge aria-label="Open notifications">
                        <NotificationsRoundedIcon />
                    </MenuButton>
                    <ColorModeIconDropdown />
                </Stack>
            </Toolbar>
        </AppBar>
    );
}
