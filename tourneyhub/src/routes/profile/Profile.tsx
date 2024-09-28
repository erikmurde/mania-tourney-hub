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
import { UserDto } from '../../dto/user/UserDto';
import UserEditFormView from '../../components/profile/form/UserEditFormView';
import { REQUIRED } from '../../constants';
import { AuthService } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import ForeignProfileInfo from '../../components/profile/ForeignProfileInfo';
import { UserEditDto } from '../../dto/user/UserEditDto';

interface IProps {
    owner: UserDto,
    open: boolean,
    setOpen: (open: boolean) => void
}

const Profile = ({owner, open, setOpen}: IProps) => {
    const { user } = useContext(AuthContext);
    const [tabId, setTabId] = useState(0);
    const navigate = useNavigate();

    const isOwner = user && user.id === owner.id;

    const onSubmit = async(values: UserEditDto) => {
        if (isOwner) {
            owner.discordUsername = values.discordUsername;
            owner.timezone = values.timezone;

            await new AuthService().updateMe(values);
            setOpen(false);
        }
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
            <TourneyDialogTitle divider={false} title='Profile' onClose={() => setOpen(false)}/>
            <StyledDialogContent sx={{ '&::-webkit-scrollbar': {display: 'none'} }}>
                <Tabs value={tabId} onChange={(_, value) => setTabId(value)}>
                    <Tab label='General' value={0}/>
                    <Tab label='Roles' value={1}/>
                    {isOwner ? <Tab label='Staff applications' value={2}/> : []}
                    {isOwner ? <Tab label='Staff invites' value={3}/> : []}
                </Tabs>
                <Divider sx={{ marginBottom: 1 }}/>
                <ProfileInfo user={owner}/>
                <Divider sx={{ marginTop: 1, marginBottom: 2 }}/>
                {tabId === 0 &&
                <>
                {isOwner 
                ?   <UserEditFormView 
                        initialValues={user} 
                        validationSchema={validationSchema} 
                        onSubmit={onSubmit}/>
                :   <ForeignProfileInfo user={owner}/>}
                </>}
                {tabId === 1 && <ProfileRoles user={owner}/>}
                {tabId === 2 && isOwner && 
                <ProfileApplications onNavigate={onNavigate}/>}
                {tabId === 3 && isOwner && 
                <ProfileInvites onNavigate={onNavigate}/>}
            </StyledDialogContent>
            <StyledDialogActions>
                {tabId === 0 && isOwner &&
                <Button variant='contained' type='submit' form='user-edit-form' startIcon={<Edit/>}>
                    Save
                </Button>}
            </StyledDialogActions>
        </Dialog>
    );
}

export default Profile;