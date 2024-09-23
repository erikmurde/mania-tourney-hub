import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import { Grid, Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { TourneyLinkDto } from '../../../dto/TourneyLinkDto';

const LinkMenu = ({links}: {links: TourneyLinkDto[]}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    return (  
        <Grid item>
            <Button 
                variant='contained' 
                endIcon={anchorEl ? <KeyboardArrowUp/> : <KeyboardArrowDown/>} 
                onClick={(e) => setAnchorEl(e.currentTarget)}>
                Links
            </Button>
            {links && 
            <Menu 
                open={anchorEl !== null} 
                anchorEl={anchorEl} 
                onClose={() => setAnchorEl(null)}>
                {links.map((link, index) => 
                    <MenuItem 
                        key={index} 
                        sx={{ minWidth: 150 }} 
                        onClick={() => window.open(link.url, '_blank')}>
                        {link.name}
                    </MenuItem>
                )}
            </Menu>}
        </Grid>
    );
}
 
export default LinkMenu;