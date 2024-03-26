import { Grid, Link, Typography } from '@mui/material';
import { IUserDto } from '../../dto/user/IUserDto';
import Flag from '../Flag';

const ProfileInfo = ({user}: {user: IUserDto}) => {
    return (  
        <Grid container>
            <Grid item height={90} width={90}>
                <img
                    className='avatar'
                    src={user.avatar} 
                    alt={`Profile image of ${user.name}`}
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
                <Flag country={user.country} marginTop={0}/>
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