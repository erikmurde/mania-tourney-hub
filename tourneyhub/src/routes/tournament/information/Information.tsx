import { Button, Grid, Paper } from '@mui/material';
import SectionTitle from '../../../components/tournament/SectionTitle';
import { useContext, useEffect, useState } from 'react';
import ReactQuill, { Value } from 'react-quill';
import { useParams } from 'react-router-dom';
import { TournamentService } from '../../../services/tournamentService';
import { ChevronLeft, Edit } from '@mui/icons-material';
import { AuthContext } from '../../Root';
import 'react-quill/dist/quill.snow.css';
import { AuthService } from '../../../services/authService';
import NoItems from '../../../components/tournament/NoItems';
import { useTourney } from '../TournamentHeader';

const COLORS = [
    "#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff",
    "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff",
    "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff",
    "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2",
    "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"
];

const Information = () => {
    const { id } = useParams();
    const { tourney } = useTourney();
    const { user } = useContext(AuthContext);
    const [value, setValue] = useState({} as Value);
    const [edit, setEdit] = useState(false);
    const service = new TournamentService();

    useEffect(() => {
        if (tourney.id) {
            setValue(tourney.information);
        }
    }, [tourney.id]);

    const formats = [
        'header',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'align',
        'list',
        'bullet',
        'link',
        'color',
        'clean',
    ];

    const modules = {
        toolbar: {
            container: [
                [{ header: [2, 3, 4, 5, 6, false] }],
                [{ size: ['small', false, 'large', 'huge'] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ align: ['', 'right', 'center', 'justify'] }],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ color: [...COLORS, '#64B5F6', '#2196F3', '#F6A664', '#ED8F5E'] }],
                ['link'],
                ['clean'],
            ]
        },
        clipboard: {
            matchVisual: true,
        }
    };

    const hasNoContent = (delta: any) => {
        if (Object.keys(delta).length === 0) {
            return true;
        }
        if (delta.ops.length === 0) {
            return true;
        }
        for (let i = 0; i < delta.ops.length; i++) {
            if (delta.ops[i].insert.trim() !== '') {
                return false;
            }
        }
        return true;
    }

    const editInfo = async() => {
        if (id) {
            const tourney = await service.getEntity(id);
            tourney.information = value;
    
            await service.edit(id, tourney);
            setEdit(false);
        }
    }

    const goBack = () => {
        setValue(tourney.information);
        setEdit(false);
    }

    const isHost = id && user && new AuthService().isHost(user, id);

    return (  
        <Paper elevation={2} sx={{ minHeight: 500, paddingBottom: 2 }}>
            <Grid container alignItems='center'>
                <SectionTitle title={edit ? 'Edit information' : 'Information'} xsAuto/>
                <Grid item xs textAlign='end' marginRight={5}>
                    {isHost &&
                    <Button 
                        sx={{ width: 100 }}
                        variant='contained' 
                        startIcon={edit ? <ChevronLeft/> : <Edit/>} 
                        onClick={() => edit ? goBack() : setEdit(true)}
                        >
                        {edit ? 'Back' : 'Edit'}
                    </Button>}
                    {edit && 
                    <Button 
                        sx={{ marginLeft: 1, width: 100 }} 
                        variant='contained' 
                        color='success' 
                        onClick={() => editInfo()}
                        >
                        Save
                    </Button>}
                </Grid>
                <Grid item xs={12} marginLeft={5} marginRight={5}>
                    <ReactQuill
                        className={edit ? 'quill-edit' : 'quill-view'}
                        theme='snow'
                        placeholder={edit ? 'Write about your tournament here...' : ''}
                        readOnly={!edit}
                        formats={formats}
                        modules={modules}
                        value={value}
                        onChange={(content, delta, source, editor) => setValue(editor.getContents())}/>
                </Grid>
            </Grid>
            {!edit && hasNoContent(value) && <NoItems name='information'/>}
        </Paper>
    );
}

export default Information;