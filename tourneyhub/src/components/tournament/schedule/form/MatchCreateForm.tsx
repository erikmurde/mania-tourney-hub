import { PlaylistAdd } from '@mui/icons-material';
import { useContext, useEffect, useState } from 'react';
import { UpdateContext } from '../../../../routes/Root';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import { ADMIN, COMMENTATOR, HOST, PLAYER, REFEREE, REQUIRED, STREAMER } from '../../../../constants';
import { Schema, object, date, string, array } from 'yup';
import { AuthService } from '../../../../services/authService';
import { UserDtoSimple } from '../../../../dto/user/UserDtoSimple';
import { UserDto } from '../../../../dto/user/UserDto';
import { MatchCreateDto } from '../../../../dto/schedule/MatchCreateDto';
import { MatchDto } from '../../../../dto/schedule/MatchDto';
import { MatchService } from '../../../../services/matchService';
import { TeamDtoSimple } from '../../../../dto/team/TeamDtoSimple';
import { useTourney } from '../../../../routes/tournament/TournamentHeader';
import FormDialogBase from '../../dialog/FormDialogBase';
import MatchCreateFormView from './views/MatchCreateFormView';
import { TeamService } from '../../../../services/teamService';

const MatchCreateForm = ({stageId}: {stageId: number}) => {
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

    const authService = new AuthService();
    dayjs.extend(utc);

    useEffect(() => {
        if (open) {
            if (isTeam) {
                new TeamService()
                    .getTeams(tourney.id)
                    .then(teams => initSelection(teams));
            } else {
                authService
                    .getPlayers(tourney.id)
                    .then(players => initSelection(players));
            }
        };
    }, [tourney.id, open]);

    const getUsersWithRole = (staff: UserDto[], roles: string[]) => {
        return staff.filter(user => 
            user.roles.some(userRole => roles.includes(userRole.name))
        );
    }
    
    const getPlayer = (name: string) => {
        return tourney.minTeamSize > 1 
            ? (selectValues.players as TeamDtoSimple[]).find(player => player.name === name)! 
            : (selectValues.players as UserDtoSimple[]).find(player => player.name === name)! 
    }

    const initSelection = async(participants: UserDtoSimple[] | TeamDtoSimple[]) => {
        const staff = await authService
            .getRoles(tourney.id, [HOST, ADMIN, REFEREE, STREAMER, COMMENTATOR, PLAYER]);
  
        setSelectValues({
            players: participants,
            streamers: getUsersWithRole(staff, [STREAMER]),
            commentators: getUsersWithRole(staff, [COMMENTATOR]),
            referees: getUsersWithRole(staff, [HOST, ADMIN, REFEREE]),
        });
    }

    const onSubmit = async(values: MatchCreateDto) => {
        const match: MatchDto = {
            ...values, 
            player1: getPlayer(values.player1),
            player2: getPlayer(values.player2)
        }
        await new MatchService().create(match);
        setScheduleUpdate(scheduleUpdate + 1);
        setOpen(false);
    }

    const validationSchema: Schema = object({
        code: string()
            .required(REQUIRED),
        player1: string()
            .required(REQUIRED),
        player2: string()
            .required(REQUIRED)
            .when('player1', (player1, schema) => {
                return schema.test({
                    test: player2 => player1.toString() !== player2,
                    message: `${isTeam ? 'Teams' : 'Players'} must be different`
                })
            }),
        time: date()
            .typeError('Invalid date format')
            .required(REQUIRED)
            .min(dayjs.utc(), 'Must be in the future'),
        commentators: array()
            .of(string())
            .max(2, 'Maximum 2 commentators')
    });

    const initialValues: MatchCreateDto = {
        id: 0,
        stageId: stageId,
        code: '',
        time: dayjs.utc(),
        mpLink: '',
        score1: 0,
        score2: 0,
        isDone: false,
        player1: '',
        player2: '',
        referee: '',
        streamer: '',
        commentators: []
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