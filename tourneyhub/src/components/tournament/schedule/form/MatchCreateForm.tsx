import { PlaylistAdd } from '@mui/icons-material';
import { useContext, useEffect, useState } from 'react';
import { ErrorContext, UpdateContext } from '../../../../routes/Root';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import { ADMIN, COMMENTATOR, FUTURE_DATE, HOST, INVALID_DATE, PLAYER, REFEREE, REQUIRED, STREAMER } from '../../../../constants';
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
import LoadingButton from '../../../LoadingButton';

const MatchCreateForm = ({stageId}: {stageId: string}) => {
    const { scheduleUpdate, setScheduleUpdate } = useContext(UpdateContext);
    const { setError } = useContext(ErrorContext);
    const { tourney } = useTourney();

    const [selectValues, setSelectValues] = useState({
        players: [] as UserDtoSimple[] | TeamDtoSimple[],
        referees: [] as UserDtoSimple[],
        streamers: [] as UserDtoSimple[],
        commentators: [] as UserDtoSimple[]
    });
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const isTeam = tourney.minTeamSize > 1;
    const authService = new AuthService();
    const matchService = new MatchService();
    dayjs.extend(utc);

    useEffect(() => {
        if (open) {
            if (isTeam) {
                new TeamService()
                    .getSimpleTeams(tourney.id)
                    .then(teams => initSelection(teams));
            } else {
                authService
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
        const staff = await authService
            .getUsersWithRoles(tourney.id, [HOST, ADMIN, REFEREE, STREAMER, COMMENTATOR], true);
  
        setSelectValues({
            players: participants,
            streamers: getUsersWithRole(staff, [STREAMER]),
            commentators: getUsersWithRole(staff, [COMMENTATOR]),
            referees: getUsersWithRole(staff, [HOST, ADMIN, REFEREE]),
        });
    }

    const onSubmit = async(values: MatchCreateDto) => {
        const response = await matchService.create(values);

        if (matchService.isErrorResponse(response)) {
            return setError(response);
        }
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
            .typeError(INVALID_DATE)
            .required(REQUIRED)
            .min(dayjs.utc(), FUTURE_DATE),
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
            btnProps={{ 
                title: 'Add match', 
                startIcon: <PlaylistAdd/>, 
                sx: { width: 150 }
            }}
            open={open} 
            setOpen={setOpen}
            form={
                <MatchCreateFormView
                    initialValues={initialValues}
                    selectValues={selectValues}
                    validationSchema={validationSchema}
                    onSubmit={async(values) => {
                        setLoading(true);
                        await onSubmit(values);
                        setLoading(false);
                }}/>
            }
            submitBtn={
                <LoadingButton loading={loading} type='submit' form='match-create-form'
                    sx={{ width: 120 }}>
                    Add match
                </LoadingButton>
            }/>
    );
}

export default MatchCreateForm;