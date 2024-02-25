import { Grid } from '@mui/material';
import { ICountryDto } from '../dto/ICountryDto';

const Flag = ({country}: {country: ICountryDto}) => {
    return (  
        <Grid item width={40} height={20}>
            <img 
                className='flag' 
                src={`https://assets.ppy.sh/old-flags/${country.ISO2}.png`} 
                alt={`Flag of ${country.name}`}/>
        </Grid>
    );
}
 
export default Flag;