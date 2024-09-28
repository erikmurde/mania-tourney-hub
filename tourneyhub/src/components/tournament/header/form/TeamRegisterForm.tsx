import { useContext, useEffect, useState } from 'react';
import FormDialogBase from '../../dialog/FormDialogBase';
import { TeamCreateDto } from '../../../../dto/team/TeamCreateDto';
import { array, object, Schema, string } from 'yup';
import { UserDto } from '../../../../dto/user/UserDto';
import { AuthService } from '../../../../services/authService';
import TeamRegisterFormView from './TeamRegisterFormView';
import { TournamentDto } from '../../../../dto/tournament/TournamentDto';
import { TeamDto } from '../../../../dto/team/TeamDto';
import { INVALID_URL, REQUIRED, URL_REGEX } from '../../../../constants';
import { TeamService } from '../../../../services/teamService';
import { TournamentService } from '../../../../services/tournamentService';
import { AuthContext } from '../../../../routes/Root';

interface IProps {
    user: UserDto,
    tourney: TournamentDto,
    openSuccess: () => void
}

const TeamRegisterForm = ({user, tourney, openSuccess}: IProps) => {
    const { updateUser } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [players, setPlayers] = useState([] as UserDto[]);
    const [teams, setTeams] = useState([] as TeamDto[]);

    const authService = new AuthService();
    const teamService = new TeamService();
    const tourneyService = new TournamentService();

    useEffect(() => {
        if (open) {
            authService
                .getAll()
                .then(players => setPlayers(
                    players.filter(player => tourneyService.isValidUser(player, tourney))
                ));
            teamService
                .getTeams(tourney.id)
                .then(teams => setTeams(teams));
        }
    }, [open, tourney.id]);

    const canRegister = (id: string) => {
        const player = players.find(player => player.id.toString() === id)!;
        const roles = player.roles.filter(role => role.tournamentId === tourney.id);

        return roles.every(role => role.canRegWithRole);
    }

    const registerTeam = async(values: TeamCreateDto) => {
        await teamService.create({
            ...values, logo: !values.logo ? authService.getLogo(user.country) : values.logo
        });
        updateUser();
        setOpen(false);
        openSuccess();
    }

    const initialValues: TeamCreateDto = {
        tournamentId: tourney.id,
        name: '',
        logo: '',
        availability: '',
        players: [user.id]
    };

    const validationSchema: Schema = object({
        name: string()
            .required(REQUIRED)
            .test(
                'duplicateName', 
                'Team already exists', 
                name => teams.every(team => team.name.toUpperCase() !== name.toUpperCase())
            ),
        logo: string()
            .matches(URL_REGEX, INVALID_URL),
        availability: string()
            .required(REQUIRED),
        players: array()
            .of(
                string()
                .required(REQUIRED)
                .test(
                    'validPlayer', 
                    'Already staffing or playing', 
                    player => canRegister(player)
                )
            )
            .min(tourney.minTeamSize, `Need at least ${tourney.minTeamSize} players`)
            .test(
                'duplicatePlayer', 
                'Players must be unique', 
                players => new Set(players).size === players!.length
            )
    });

    return (  
        <FormDialogBase 
            title={`Register for ${tourney.code}`} 
            formName='team-register-form' 
            form={
                <TeamRegisterFormView
                    tourney={tourney}
                    initialValues={initialValues} 
                    selectValues={players}
                    validationShcema={validationSchema} 
                    onSubmit={registerTeam}/>
            } 
            btnProps={{ title: 'Register' }}
            submitActionName='Register'
            open={open} 
            setOpen={setOpen}/>
    );
}
 
export default TeamRegisterForm;