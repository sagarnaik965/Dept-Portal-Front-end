import { Button, Grid } from "@mui/material";
// import ErrorImg from "../assets/img/dribbble_1.gif";

export default function ErrorPage() {
    const handleClick = (e) => {

    }
    return (
        <>
       
            <b><h1 align='center' style={{ color: 'red', fontSize: '40px' }}>PAGE NOT FOUND</h1></b>

            {/* <img src={ErrorImg} width='560px' style={{ marginLeft: 'auto', marginRight: 'auto' }} /> */}
            {/* <h1 align='center' style={{ color: 'green', fontSize: '30px' }}>Look like you're lost</h1>
            <h2 align='center' style={{ color: 'black', fontSize: '20px' }}>the page you are looking for not available!</h2> */}

            <Grid container spacing={1}>
                <Grid item lg={12} align="center" style={{marginBottom:'50%'}}>
                    <Button style={{ marginLeft: 'auto', marginRight: 'auto' }} variant="contained" >

                        {/* <a href=""></a> */}
                        <a href="/adv">Home</a>

                    </Button>

                </Grid>
            </Grid>
            <br></br>
        </>

    )
}