import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import ReactDOM from "react-dom";
import { useLocation, BrowserRouter as Router } from "react-router-dom";
import logo from './logo.svg';
import defaultProfileThumbnail from './images/defaultProfileThumbnail.png';
import './App.css';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Radium, {StyleRoot} from 'radium';
import { fadeIn, bounce, bouceOut, bounceIn, rollIn, rubberBand, tada, hinge, jello, flash, flipInX, rotateInDownRight, swing, wobble ,pulse } from 'react-animations';
import { animations, getRandomAnimation } from './animations';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import {profiles, sampleProfiles, getSampleProfilesm, getProfiles, getSampleProfiles} from './profiles';
import Gallery from 'react-grid-gallery';
import { GoogleSpreadsheet } from "google-spreadsheet";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { blue } from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';


require('dotenv').config();

const CLIENT_EMAIL = process.env.CLIENT_EMAIL || process.env.REACT_APP_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.PRIVATE_KEY || process.env.REACT_APP_PRIVATE_KEY;
const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID || "1kHFjC_QusihK3G1bLdHI8dI25R1VZIPWutOzNlNWQls";
const SHEET_ID = process.env.REACT_APP_SHEET_ID || "0";

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
const useStyles = makeStyles({
  root: {
    width: 300,
    minHeight: 300,
    borderRadius: 15,
  },
  media: {
    minHeight: 300,
  },
  gallery: {
    //position: 'absolute',
    // width: '100vw',
    // height: '100vh',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    //backgroundColor: 'rgba(0,0,0,0.5)',
    // zIndex: -1,
    opacity: 0
  }
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
}))(MuiDialogContent);

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Yuan'}
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const getNonRepitionNumbers = (max, size) => {
  let arrayContainer = []; 
  const genNum = Math.floor(Math.random() * Math.floor(max));
  arrayContainer.push(genNum);
  for (let counter = 0; counter < size-1; counter++) { 
      let newGen = Math.floor(Math.random() * Math.floor(max));
      while (arrayContainer.lastIndexOf(newGen) !== -1) {
          newGen = Math.floor(Math.random() * Math.floor(max));
      }
      arrayContainer.push(newGen);
  }
  return arrayContainer;
}

const getRandomProfiles = (profiles, number) => {
  let results = [];
  if(typeof number === 'number' && Array.isArray(profiles)){
    let n = number<=profiles.length? number: profiles.length;
    let indices = getNonRepitionNumbers(profiles.length, n);
    console.log(indices);
    indices.map((i)=>{
        results.push(profiles[i]);
    });
  }
  return results;
}

const getSequentialProfiles = (profiles, index, number) => {
  let results = [];
  if(typeof number === 'number' && Array.isArray(profiles)){
    for(let i=0; i<number; ++i){
      results.push(profiles[index+i]);
    }
  }
  return results;
}

export default function App() {
  return (
    <Router>
      <QueryApp/>
    </Router>
  );
}

function QueryApp() {
  // console.log(process.env.REACT_APP_PRIVATE_KEY);
  // console.log(process.env.REACT_APP_CLIENT_EMAIL);
  // console.log(SPREADSHEET_ID);
  // console.log(SHEET_ID);

  const classes = useStyles();
  const { width, height } = useWindowSize();
  let profileData = [];
  const [galleryImages, setGalleryImages] = useState([]);
  let queryParams = new URLSearchParams(useLocation().search);  
  const [cards, setCards] = useState([]);
  let reformatGoogleDriveUrl = (googleDriveUrl) => {
    let url = googleDriveUrl;
    if(googleDriveUrl=="" || googleDriveUrl==undefined)
      url = defaultProfileThumbnail;
    if(typeof googleDriveUrl === 'string' && googleDriveUrl.indexOf("https://drive.google.com/open?id=")!=-1){
      let id = googleDriveUrl.slice(googleDriveUrl.indexOf("https://drive.google.com/open?id=")+33);
      url = "https://drive.google.com/uc?export=view&id=" + id;
    }
    return url;
  }
  const getProfileCard = (profile = {}) => {
    let result = undefined;
    let id = profile.hasOwnProperty("id")? profile.id: new Date().getMilliseconds().toString();
    let name = profile.hasOwnProperty("name")? profile.name: null;
    let enrol_year = profile.hasOwnProperty("enrol_year")? profile.enrol_year: null;
    let comment = profile.hasOwnProperty("comment")? profile.comment: null;
    let thumbnail = profile.hasOwnProperty("thumbnail")? reformatGoogleDriveUrl(profile.thumbnail): defaultProfileThumbnail;
    let job = profile.hasOwnProperty("job")? profile.job: null;
    if(name!=null){
      result = (
        <Grid item >
          <StyleRoot>
            <div style={getRandomAnimation()}>
              <Card key={id} className={classes.root} >
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={thumbnail}
                    title={name}
                  />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {job}
                    </Typography>
                    <Typography display="inline" gutterBottom variant="h5" component="h2">
                      {name}
                    </Typography>
                    {enrol_year? (
                      <Chip
                        variant="outlined"
                        size="medium"
                        //avatar={<Avatar>M</Avatar>}
                        label={enrol_year}
                        style={{marginBottom: '10px', marginLeft: '5px'}}
                      />
                    ):undefined}
                    <Typography variant="body2" component="p">
                      {comment}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          </StyleRoot>
        </Grid>
      );
    }
    console.log(result);
    return result;
  }

  //load from google sheets
  const readSpreadsheet = async () => {
    try {
      await doc.useServiceAccountAuth({
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY,
      });

      // loads document properties and worksheets
      await doc.loadInfo();
      console.log(doc);
      const sheet = await doc.sheetsById[SHEET_ID];
      const rows = await sheet.getRows();
      let data = [];
      rows.map((r)=>{
        let profile = {
          id: r.id,
          name: r.name,
          enrol_year: r.enrol_year,
          thumbnail: reformatGoogleDriveUrl(r.thumbnail),
          comment: r.comment? `" ${r.comment} "`:r.comment,
          job: r.job
        }
        data.push(profile);
        //console.log(r);
      });
      profileData = data.sort((a, b)=>(a.enrol_year>b.enrol_year)? 1 : -1);

      //load profiles with no submission
      const sheetNumber = "2097732203";
      const unsubmittedSheet = await doc.sheetsById[sheetNumber];
      const unsubmittedRows = await unsubmittedSheet.getRows();
      let profileDict = {};
      profileData.map((d)=>{
        profileDict[d.name] = d;
      });

      unsubmittedRows.map((r)=>{
        // console.log(r);
        if(profileDict[r.name]==undefined){
          profileDict[r.name]={id: r.id, name: r.name, enrol_year: r.enrol_year}
        }
      });      
      profileData = [];
      for(let i=0; i<Object.keys(profileDict).length; ++i){

        profileData.push(profileDict[Object.keys(profileDict)[i]]);
      }
      profileData = profileData.sort((a, b)=>(a.enrol_year>b.enrol_year)? 1 : -1);
      console.log(profileData);

      //load all images to app
      let images = [];
      profileData.map((p)=>{
        let img = new Image();
        img.onload = function() {
          images.push({
            src: p.thumbnail,
            thumbnail: p.thumbnail,
            thumbnailWidth: this.width,
            thumbnailHeight: this.height
          });
        }
        img.src = p.thumbnail;
      });
      console.log(images);
      setGalleryImages(images);
    } catch (e) {
      console.error('Error: ', e);
    }
  }

  const DEFAULT_CARD_NUMBER=2;
  //get profiles from google spread sheet
  useEffect(()=>{
    readSpreadsheet();
    let index = 0;
    const interval = setInterval(()=>{
      console.log("profile from spreadsheet interval");
      let newCards = [];
      let cardNumber = queryParams.get("cn")? parseInt(queryParams.get("cn")):DEFAULT_CARD_NUMBER;
      let profiles = queryParams.get("m")==0? getRandomProfiles(profileData, cardNumber) : getSequentialProfiles(profileData, (index*cardNumber)%profileData.length, cardNumber);
      console.log(profiles);
      if(profiles.length>0){
        profiles.map((p, i)=>{
          console.log(p);
          newCards.push(
            getProfileCard(p)
          );
        });
      }
      index++;
      setCards(newCards);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const [openHelperDialog, setOpenHelperDialog] = useState(true);
  return (
    <div className="App" style={{padding: '30px'}} >
      {queryParams.get("an")==1?
        <Confetti width={width} height={height} style={{position: 'absolute'}}/>:undefined}
      <Grid container justify="center" spacing={5} >
        {cards}
      </Grid>
      {/* <div className={classes.gallery} style={{opacity: queryParams.get("op")? queryParams.get("op"):undefined}}>
        <Gallery id="profiles-gallery" images={galleryImages} rowHeight={20} />
      </div> */}
      {galleryImages.map((p)=>{
        return <img style={{opacity: queryParams.get("op")? queryParams.get("op"):0}} src={p.thumbnail} width={20} height={20}/>
      })}
      <Dialog onClose={(e)=>{setOpenHelperDialog(false)}} aria-labelledby="simple-dialog-title" open={openHelperDialog} style={{padding: '15px'}}>
        <DialogTitle id="simple-dialog-title">User Guide</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" >
            You can define "query parameters" to customise layouts. The following is an example:
          </Typography>
          <Typography variant="body2" style={{marginBottom: '15px'}}>
            <Link href={`${window.location.origin}/?an=1&cn=4`} >
              {`${window.location.origin}/?an=1&cn=4`}
            </Link>
          </Typography>
          <Typography variant="subtitle1" >
            Display Mode (default: m=1)
            <Typography variant="body2" color="textSecondary">
              0: randomly pick profiles
            </Typography>
            <Typography variant="body2" color="textSecondary">
              1: sequentially show profiles
            </Typography>
          </Typography>
          <Divider/>
          <Typography variant="subtitle1" >
            Card Number (default: cn={DEFAULT_CARD_NUMBER})
            <Typography variant="body2" color="textSecondary">
              Number of cards displaying at once. Maximun numbers of cards are displayed when the parameter is greater than the maximum.
            </Typography>
          </Typography>
          <Divider/>
          <Typography variant="subtitle1" >
            Background Animation (default: an=0)
            <Typography variant="body2" color="textSecondary">
              0: no animation
            </Typography>
            <Typography variant="body2" color="textSecondary">
              1: show confetti
            </Typography>
          </Typography>
          <Divider/>
          <Typography variant="subtitle1" >
            Image Gallery Opacity (default: op=0)
            <Typography variant="body2" color="textSecondary">
              Images are all loaded at once when initialising.
              The opacity, valued from 0 to 1, is for show/hide images gallery.
            </Typography>
          </Typography>
        </DialogContent>
      </Dialog>
      <Box pt={4} style={{cursor: 'pointer', position: 'fixed', left: 0, bottom: 0, width: '100%', textAlign: 'center'}} onClick={(e)=>setOpenHelperDialog(!openHelperDialog)}>
        <Copyright />
      </Box>
    </div>
    
    
  );
}