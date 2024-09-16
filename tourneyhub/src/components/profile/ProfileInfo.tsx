import { Grid, Link, Typography } from '@mui/material';
import { UserDto } from '../../dto/user/UserDto';
import Flag from '../Flag';

const ProfileInfo = ({user}: {user: UserDto}) => {
    return (  
        <Grid container>
            <Grid item height={90} width={90}>
                <img
                    className='avatar'
                    src={user.avatar} 
                    alt={`Profile of ${user.name}`}
                    style={{ borderRadius: 10 }}
                />
            </Grid>
            <Grid item container xs alignItems='center' marginLeft={1}>
                <Grid item xs={12}>
                    <Typography fontSize={20} fontWeight={500}>
                        <Link 
                            href={`https://osu.ppy.sh/users/${user.playerId}`} 
                            target='_blank'
                            color='inherit'
                            underline='hover'
                            >
                            {user.name} #{user.rank}
                        </Link>
                    </Typography>
                </Grid>
                <Flag country={user.country}/>
                <Grid item marginLeft={1}>
                    <Typography fontSize={14}>
                        {user.country.name}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ProfileInfo;