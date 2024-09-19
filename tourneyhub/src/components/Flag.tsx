import { Grid, GridProps } from '@mui/material';
import { ICountryDto } from '../dto/ICountryDto';

interface IProps {
    country: ICountryDto,
    props?: GridProps
}

const Flag = ({country, props}: IProps) => {
    
    return (  
        <>
        {country && 
        <Grid item width={30} height={20} xs='auto' {...props}>
            <img
                className='flag' 
                src={`https://assets.ppy.sh/old-flags/${country.iso2}.png`} 
                alt={`Flag of ${country.name}`}/>
        </Grid>}
        </>
    );
}

export default Flag;