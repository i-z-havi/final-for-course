import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, IconButton } from '@mui/material';
import { useLocalStorageUser } from '../../users/providers/UserProvider';
import useUserHook from '../../users/hooks/useUserHook';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ROUTES from '../../routes/routesModel';

export default function AvatarMenu() {
    const [anchorEl, setAnchorEl] = useState()
    const { user } = useLocalStorageUser();
    const { handleLogout } = useUserHook();
    const navigate = useNavigate()

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
                <Avatar src={user.profilePicture} />
            </IconButton>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={() => navigate(ROUTES.EDIT_USER)}>Edit account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    );
}
