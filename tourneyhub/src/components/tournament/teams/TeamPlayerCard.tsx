import { Card, CardActionArea, CardMedia, Grid, Typography, useTheme } from '@mui/material';
import { UserCardContent } from '../../styled/UserCardContent';
import { faCrown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Profile from '../../../routes/profile/Profile';
import Flag from '../../Flag';
import { UserDto } from '../../../dto/user/UserDto';

interface IProps {
    player: UserDto,
    isCaptain: boolean,
    isSeparate?: boolean
}

const TeamPlayerCard = ({player, isCaptain, isSeparate}: IProps) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    const height = isSeparate ? 80 : 70;
    const width = isSeparate ? 400 : 'auto';

    return (  
        <Card 
            elevation={12} 
            sx={{ 
                display: 'flex', 
                height: height, 
                width: width
            }}>
            <CardActionArea sx={{ width: height, minWidth: height, height: 1 }} onClick={() => setOpen(true)}>
                <CardMedia
                    className='avatar'
                    image={player.avatar} 
                    title={`Avatar of ${player.name}`}
                />
            </CardActionArea>
            <Profile owner={player} open={open} setOpen={setOpen}/>
            <UserCardContent>
                <Grid container columnSpacing={1} alignItems='center'>
                    <Grid item xs={isCaptain ? 10 : 12}>
                        <Typography>
                            {player.name} {player.rank > 0 ? `#${player.rank}` : ''}
                        </Typography>
                    </Grid>
                    {isCaptain && 
                    <Grid item xs textAlign='end'>
                        <FontAwesomeIcon 
                            icon={faCrown} 
                            color={theme.palette.warning.main} 
                            size='lg'/>
                    </Grid>}
                    {isSeparate && 
                    <>
                    <Flag country={player.country} props={{ marginTop: 0.5 }}/>
                    <Grid item xs={10} marginTop={0.5}>
                        <Typography lineHeight={1.7} fontSize={12} color={theme.palette.text.secondary}>
                            {player.country.name}
                        </Typography>
                    </Grid>
                    </>}
                </Grid>
            </UserCardContent>
        </Card>
    );
}

export default TeamPlayerCard;