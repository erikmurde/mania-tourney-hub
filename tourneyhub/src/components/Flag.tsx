import { Grid, GridProps } from '@mui/material';
import { ICountryDto } from '../dto/ICountryDto';
import { AuthService } from '../services/authService';

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
                src={new AuthService().getLogo(country)} 
                alt={`Flag of ${country.name}`}/>
        </Grid>}
        </>
    );
}

export default Flag;