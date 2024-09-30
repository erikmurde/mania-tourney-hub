import { PlaylistAdd } from '@mui/icons-material';
import { useContext, useEffect, useState } from 'react';
import { UpdateContext } from '../../../../routes/Root';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import { ADMIN, COMMENTATOR, HOST, PLAYER, REFEREE, REQUIRED, STREAMER } from '../../../../constants';
import { Schema, object, date, string, array } from 'yup';
import { AuthService } from '../../../../services/authService';
import { UserDtoSimple } from '../../../../dto/user/UserDtoSimple';
import { MatchCreateDto } from '../../../../dto/schedule/match/MatchCreateDto';
import { MatchService } from '../../../../services/matchService';
import { TeamDtoSimple } from '../../../../dto/team/TeamDtoSimple';
import { useTourney } from '../../../../routes/tournament/TournamentHeader';
import FormDialogBase from '../../dialog/FormDialogBase';
import MatchCreateFormView from './views/MatchCreateFormView';
import { TeamService } from '../../../../services/teamService';

const MatchCreateForm = ({stageId}: {stageId: string}) => {
    const { tourney } = useTourney();
    const { scheduleUpdate, setScheduleUpdate } = useContext(UpdateContext);

    const [selectValues, setSelectValues] = useState({
        players: [] as UserDtoSimple[] | TeamDtoSimple[],
        referees: [] as UserDtoSimple[],
        streamers: [] as UserDtoSimple[],
        commentators: [] as UserDtoSimple[]
    });
    const [open, setOpen] = useState(false);

    const isTeam = tourney.minTeamSize > 1;
    const service = new AuthService();
    dayjs.extend(utc);

    useEffect(() => {
        if (open) {
            if (isTeam) {
                new TeamService()
                    .getSimpleTeams(tourney.id)
                    .then(teams => initSelection(teams));
            } else {
                service
                    .getUsersWithRoles(tourney.id, [PLAYER])
                    .then(players => initSelection(players));
            }
        };
    }, [tourney.id, open]);

    const getUsersWithRole = (staff: UserDtoSimple[], roles: string[]) => {
        return staff.filter(user => 
            user.roles.some(userRole => roles.includes(userRole))
        );
    }

    const initSelection = async(participants: UserDtoSimple[] | TeamDtoSimple[]) => {
        const staff = await service
            .getUsersWithRoles(tourney.id, [HOST, ADMIN, REFEREE, STREAMER, COMMENTATOR], true);
  
        setSelectValues({
            players: participants,
            streamers: getUsersWithRole(staff, [STREAMER]),
            commentators: getUsersWithRole(staff, [COMMENTATOR]),
            referees: getUsersWithRole(staff, [HOST, ADMIN, REFEREE]),
        });
    }

    const onSubmit = async(values: MatchCreateDto) => {
        await new MatchService().create(values);
        setScheduleUpdate(scheduleUpdate + 1);
        setOpen(false);
    }

    const validationSchema: Schema = object({
        code: string()
            .required(REQUIRED),
        player1Id: string()
            .required(REQUIRED),
        player2Id: string()
            .required(REQUIRED)
            .when('player1Id', (player1Id, schema) => {
                return schema.test({
                    test: player2Id => player1Id.toString() !== player2Id,
                    message: `${isTeam ? 'Teams' : 'Players'} must be different`
                })
            }),
        time: date()
            .typeError('Invalid date format')
            .required(REQUIRED)
            .min(dayjs.utc(), 'Must be in the future'),
        commentatorIds: array()
            .of(string())
            .max(2, 'Maximum 2 commentators')
    });

    const initialValues: MatchCreateDto = {
        stageId: stageId,
        teams: tourney.minTeamSize > 1,
        code: '',
        time: dayjs.utc(),
        player1Id: '',
        player2Id: '',
        refereeId: '',
        streamerId: '',
        commentatorIds: []
    }

    return (  
        <FormDialogBase 
            title={'Schedule new match'} 
            formName={'match-create-form'} 
            btnProps={{ 
                title: 'Add match', 
                startIcon: <PlaylistAdd/>, 
                sx: { width: 150 }
            }} 
            submitActionName={'Schedule'}
            open={open} 
            setOpen={setOpen}
            form={
                <MatchCreateFormView
                    initialValues={initialValues}
                    selectValues={selectValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}/>
            }/>
    );
}

export default MatchCreateForm;