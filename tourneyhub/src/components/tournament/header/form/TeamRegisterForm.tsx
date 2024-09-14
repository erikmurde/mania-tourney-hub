import { useEffect, useState } from 'react';
import FormDialogBase from '../../dialog/FormDialogBase';
import { TeamCreateDto } from '../../../../dto/team/TeamCreateDto';
import { array, Message, object, Schema, string } from 'yup';
import { IUserDto } from '../../../../dto/user/IUserDto';
import { AuthService } from '../../../../services/authService';
import TeamRegisterFormView from './TeamRegisterFormView';
import { TournamentDto } from '../../../../dto/tournament/TournamentDto';
import { TeamDto } from '../../../../dto/team/TeamDto';
import { INVALID_URL, REQUIRED, URL_REGEX } from '../../../../constants';
import { TeamService } from '../../../../services/teamService';

interface IProps {
    user: IUserDto,
    tourney: TournamentDto,
    openSuccess: () => void
}

const TeamRegisterForm = ({user, tourney, openSuccess}: IProps) => {
    const [open, setOpen] = useState(false);
    const [players, setPlayers] = useState([] as IUserDto[]);
    const [teams, setTeams] = useState([] as TeamDto[]);

    const authService = new AuthService();
    const teamService = new TeamService();

    useEffect(() => {
        if (!open) {
            return;
        }
        authService
            .getAll()
            .then(players => setPlayers(players));
        teamService
            .getSimpleTeams(tourney.id)
            .then(teams => setTeams(teams));
    }, [open, tourney.id]);

    const registerPlayer = async(player: IUserDto) => {
        player.roles.push({
            tournamentId: tourney.id, 
            name: 'player', 
            canRegWithRole: false
        });
        // await authService.edit(player.id, player);
    }

    const registerTeam = async(values: TeamCreateDto) => {
        const team: TeamDto = {
            ...values,
            players: players
                .filter(player => values.players.includes(player.name))
                .map(player => ({ ...player, isCaptain: player.name === user?.name }))
        }
        if (!team.logo) {
            const captain = team.players.find(player => player.isCaptain);
            team.logo = `https://assets.ppy.sh/old-flags/${captain!.country.ISO2}.png`;
        }
        team.players.forEach(player => registerPlayer(player));

        // await new TeamService().create(team);
        // setOpen(false);
        // openSuccess();
    }

    const initialValues: TeamCreateDto = {
        id: '',
        tournamentId: tourney.id,
        name: '',
        logo: '',
        status: 'registered',
        availability: '',
        seeding: 0,
        placement: 0,
        players: [user.name]
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
                string().required(REQUIRED)
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
                    maxTeamSize={tourney.maxTeamSize}
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