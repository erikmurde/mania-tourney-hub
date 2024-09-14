import { Grid, Typography } from '@mui/material';
import { UserDto } from '../../dto/user/UserDto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons'

const ForeignProfileInfo = ({user}: {user: UserDto}) => {
    return (  
        <Grid container direction='column' rowSpacing={1}>
            <Grid item>
                <Typography fontSize={20}>
                    <FontAwesomeIcon icon={faDiscord} style={{ marginRight: 10 }}/>
                    {user.discordUsername}
                </Typography>
            </Grid>
            <Grid item>
                <Typography fontSize={18}>
                    Timezone UTC{user.timezone < 0 ? '-' : '+'}{user.timezone}
                </Typography>
            </Grid>
        </Grid>
    );
}
 
export default ForeignProfileInfo;