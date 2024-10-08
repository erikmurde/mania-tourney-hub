import { Grid, TextField } from '@mui/material';
import { TourneyFilters } from '../../../domain/TourneyFilters';

interface IProps {
    filters: TourneyFilters,
    setFilters: (filters: TourneyFilters) => void
}

const TournamentFilters = ({filters, setFilters}: IProps) => {
    return (  
        <Grid container rowSpacing={2} columnSpacing={1.5}>
            <Grid item xs={4}>
                <TextField fullWidth name='name' label='Name' size='small'
                    value={filters.name}
                    onChange={(e) => setFilters({...filters, name: e.target.value})}
                />
            </Grid>
            <Grid item xs={2}>
                <TextField fullWidth name='minRank' label='Min. player rank' type='number' size='small'
                    value={filters.minPlayerRank}
                    placeholder='Any'
                    onChange={(e) => setFilters({...filters, minPlayerRank: e.target.value})}
                />
            </Grid>
            <Grid item xs={2}>
                <TextField fullWidth name='maxRank' label='Max. player rank' type='number' size='small'
                    value={filters.maxPlayerRank}
                    placeholder='Any'
                    onChange={(e) => setFilters({...filters, maxPlayerRank: e.target.value})}
                />
            </Grid>
            <Grid item xs={3.5}/>
            <Grid item xs={2}>
                <TextField fullWidth name='minKeys' label='Min. keycount' type='number' size='small'
                    value={filters.minKeys}
                    placeholder='Any'
                    onChange={(e) => setFilters({...filters, minKeys: e.target.value})}
                />
            </Grid>
            <Grid item xs={2}>
                <TextField fullWidth name='maxKeys' label='Max. keycount' type='number' size='small'
                    value={filters.maxKeys}
                    placeholder='Any'
                    onChange={(e) => setFilters({...filters, maxKeys: e.target.value})}
                />
            </Grid>
            <Grid item xs={2}>
                <TextField fullWidth name='minTeamSize' label='Min. team size' type='number' size='small'
                    value={filters.minTeamSize}
                    placeholder='Any'
                    onChange={(e) => setFilters({...filters, minTeamSize: e.target.value})}
                />
            </Grid>
            <Grid item xs={2}>
                <TextField fullWidth name='maxTeamSize' label='Max. team size' type='number' size='small'
                    value={filters.maxTeamSize}
                    placeholder='Any'
                    onChange={(e) => setFilters({...filters, maxTeamSize: e.target.value})}
                />
            </Grid>
        </Grid>
    );
}

export default TournamentFilters;