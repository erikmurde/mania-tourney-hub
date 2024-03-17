import { Grid } from '@mui/material';
import { ICountryDto } from '../dto/ICountryDto';

interface IProps {
    country: ICountryDto,
    marginTop?: number
}

const Flag = ({country, marginTop}: IProps) => {
    return (  
        <>
        {country && 
        <Grid item width={30} height={20} xs='auto' marginTop={marginTop ?? 0.5}>
            <img
                className='flag' 
                src={`https://assets.ppy.sh/old-flags/${country.ISO2}.png`} 
                alt={`Flag of ${country.name}`}/>
        </Grid>}
        </>
    );
}

export default Flag;