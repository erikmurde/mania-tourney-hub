import { Button, Dialog, Divider, Tab, Tabs } from '@mui/material'
import { StyledDialogActions } from '../../components/styled/StyledDialogActions';
import { StyledDialogContent } from '../../components/styled/styledDialogContent';
import TourneyDialogTitle from '../../components/tournament/dialog/TourneyDialogTitle';
import { useContext, useState } from 'react';
import { AuthContext } from '../Root';
import ProfileRoles from '../../components/profile/role/ProfileRoles';
import ProfileApplications from '../../components/profile/application/ProfileApplications';
import ProfileInvites from '../../components/profile/invite/ProfileInvites';
import ProfileInfo from '../../components/profile/ProfileInfo';
import { Edit } from '@mui/icons-material';
import { Schema, number, object, string } from 'yup';
import { IUserDto } from '../../dto/user/IUserDto';
import UserEditFormView from '../../components/profile/form/UserEditFormView';
import { REQUIRED } from '../../constants';
import { AuthService } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

interface IProps {
    open: boolean,
    setOpen: (open: boolean) => void
}

const Profile = ({open, setOpen}: IProps) => {
    const { user } = useContext(AuthContext);
    const [tabId, setTabId] = useState(0);
    const navigate = useNavigate();

    if (!user) {
        return <></>
    }

    const onSubmit = async(values: IUserDto) => {
        await new AuthService().edit(user.id, values);
        setOpen(false);
    }

    const validationSchema: Schema = object({
        discordUsername: string()
            .required(REQUIRED),
        timezone: number()
            .required(REQUIRED)
    });

    const onNavigate = (tournamentId: string) => {
        setOpen(false);
        navigate(`/tournaments/${tournamentId}/information`);
    }

    return (  
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth='sm'>
            <TourneyDialogTitle title='Profile' onClose={() => setOpen(false)}/>
            <StyledDialogContent sx={{ '&::-webkit-scrollbar': {display: 'none'} }}>
                <Tabs value={tabId} onChange={(_, value) => setTabId(value)}>
                    <Tab label='General' value={0}/>
                    <Tab label='Roles' value={1}/>
                    <Tab label='Staff applications' value={2}/>
                    <Tab label='Staff invites' value={3}/>
                </Tabs>
                <Divider sx={{ marginBottom: 1 }}/>
                <ProfileInfo user={user}/>
                <Divider sx={{ marginTop: 1, marginBottom: 2 }}/>
                {tabId === 0 && 
                <UserEditFormView 
                    initialValues={user} 
                    validationSchema={validationSchema} 
                    onSubmit={onSubmit}
                />}
                {tabId === 1 && <ProfileRoles user={user}/>}
                {tabId === 2 && <ProfileApplications userId={user.id} onNavigate={onNavigate}/>}
                {tabId === 3 && <ProfileInvites userId={user.id} onNavigate={onNavigate}/>}
            </StyledDialogContent>
            <StyledDialogActions>
                {tabId === 0 && 
                <Button variant='contained' type='submit' form='user-edit-form' startIcon={<Edit/>}>
                    Save
                </Button>}
            </StyledDialogActions>
        </Dialog>
    );
}

export default Profile;