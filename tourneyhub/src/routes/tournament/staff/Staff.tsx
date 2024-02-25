import { Button, Grid, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { IUserDto } from '../../../dto/IUserDto';
import { AuthService } from '../../../services/authService';
import { useParams } from 'react-router-dom';
import StaffGroup from '../../../components/tournament/staff/StaffGroup';
import { COMMENTATOR, GFX, HOST, MAPPER, MAPPOOLER, PLAYTESTER, REFEREE, SHEETER, STREAMER } from '../../../constants';
import { Description, PersonAdd } from '@mui/icons-material';

const Staff = () => {
    const { id } = useParams();
    const [staff, setStaff] = useState([] as IUserDto[]);

    useEffect(() => {
        if (id) {
            new AuthService()
                .getStaff(id)
                .then(staff => setStaff(staff));
        }
    }, [id]);

    const getStaff = (role: string) => {
        return staff.filter(user => 
            user.roles
                .map(role => role.name)
                .includes(role));
    }

    const hosts = getStaff(HOST);
    const mappoolers = getStaff(MAPPOOLER);
    const mappers = getStaff(MAPPER);
    const playtesters = getStaff(PLAYTESTER);
    const referees = getStaff(REFEREE);
    const streamers = getStaff(STREAMER);
    const commentators = getStaff(COMMENTATOR);
    const sheeters = getStaff(SHEETER);
    const gfx = getStaff(GFX);

    return (
        <Grid container direction='column' rowSpacing={2}>
            <Grid item>
                <Paper elevation={2} sx={{ paddingBottom: 2, paddingLeft: 5 }}>
                    <Typography variant='h3' fontSize={36} height={80} lineHeight={2}>
                        General
                    </Typography>
                    <Button variant='contained' sx={{ marginRight: 1 }} startIcon={<Description/>}>
                        Staff applications
                    </Button>
                    <Button variant='contained' startIcon={<PersonAdd/>}>
                        Invite staff
                    </Button>
                </Paper>
            </Grid>
            {hosts.length > 0 && <StaffGroup name='Hosts' staff={hosts}/>}
            {mappoolers.length > 0 && <StaffGroup name='Mappoolers' staff={mappoolers}/>}
            {mappers.length > 0 && <StaffGroup name='Mappers' staff={mappers}/>}
            {playtesters.length > 0 && <StaffGroup name='Playtesters' staff={playtesters}/>}
            {referees.length > 0 && <StaffGroup name='Referees' staff={referees}/>}
            {streamers.length > 0 && <StaffGroup name='Streamers' staff={streamers}/>}
            {commentators.length > 0 && <StaffGroup name='Commentators' staff={commentators}/>}
            {sheeters.length > 0 && <StaffGroup name='Sheeters' staff={sheeters}/>}
            {gfx.length > 0 && <StaffGroup name='Graphic Designers' staff={gfx}/>}
        </Grid>
    );
}

export default Staff;