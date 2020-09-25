import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import ReactDOM from "react-dom";
import { Link, useLocation, BrowserRouter as Router } from "react-router-dom";
import logo from './logo.svg';
import defaultProfileThumbnail from './images/defaultProfileThumbnail.png';
import './App.css';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import { makeStyles } from '@material-ui/core/styles';
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
    height: 200,
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

export default function App() {
  return (
    <Router>
      <QueryApp/>
    </Router>
  );
}

function QueryApp() {
  const classes = useStyles();
  const { width, height } = useWindowSize();
  let profileData = [];
  let queryParams = new URLSearchParams(useLocation().search);  
  const [cards, setCards] = useState([]);
  const getProfileCard = (profile) => {
    let result = undefined;
    let id = profile.hasOwnProperty("id")? profile.id: new Date().getMilliseconds().toString();
    let name = profile.hasOwnProperty("name")? profile.name: null;
    let enrol_year = profile.hasOwnProperty("enrol_year")? profile.enrol_year: null;
    let comment = profile.hasOwnProperty("comment")? profile.comment: null;
    let reformatGoogleDriveUrl = (googleDriveUrl) => {
      let url = googleDriveUrl;
      if(typeof googleDriveUrl === 'string' && googleDriveUrl.indexOf("https://drive.google.com/open?id=")!=-1){
        let id = googleDriveUrl.slice(googleDriveUrl.indexOf("https://drive.google.com/open?id=")+33);
        url = "https://drive.google.com/uc?export=view&id=" + id;
      }
      return url;
    }
    let thumbnail = profile.hasOwnProperty("thumbnail")? reformatGoogleDriveUrl(profile.thumbnail): defaultProfileThumbnail;
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
                    title="Contemplative Reptile"
                  />
                  <CardContent>
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
                    <Typography variant="body2" color="textSecondary" component="p">
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
      await doc.useServiceAccountAuth(require('./cae-alumni-2020-e336c18fcb02.json'));
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
          thumbnail: r.thumbnail,
          comment: r.comment
        }
        data.push(profile);
        console.log(r);
      });
      profileData = data;
    } catch (e) {
      console.error('Error: ', e);
    }
  }

  //get profiles from google spread sheet
  useEffect(()=>{
    readSpreadsheet();
    const interval = setInterval(()=>{
      console.log("profile from spreadsheet interval");
      let newCards = [];
      let profiles = getRandomProfiles(profileData, queryParams.get("cn")? parseInt(queryParams.get("cn")):4);
      console.log(profiles);
      if(profiles.length>0){
        profiles.map((p, i)=>{
          console.log(p);
          newCards.push(
            getProfileCard(p)
          );
        });
        
      }
      setCards(newCards);
    }, 5000);
    return () => clearInterval(interval);
  }, []);


  //random get from sample profiles
  // useEffect(() => {
  //   const interval = setInterval(()=>{
  //     let newCards = [];
  //     let profiles = getSampleProfiles(4);
  //     if(profiles.length>0){
  //       profiles.map((p, i)=>{
  //         console.log(p);
  //         newCards.push(
  //           getProfileCard(p)
  //         );
  //       });
        
  //     }
  //     setCards(newCards);
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  //load all thumbnails
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {

    if(sampleProfiles.length>0){
      let images = [];
      sampleProfiles.map((p)=>{
        let img = new Image();
        img.onload = function() {
          images.push({
            src: p.thumbnails,
            thumbnail: p.thumbnails,
            thumbnailWidth: this.width,
            thumbnailHeight: this.height
          });
        }
        img.src = p.thumbnails;
      });
      setGalleryImages(images);
    }
  }, []);

  return (
    <div className="App" style={{padding: '30px'}}>
      <Confetti width={width} height={height} style={{position: 'absolute'}}/>
      <Grid container justify="center" spacing={5}>
        {cards}
      </Grid>
      <div className={classes.gallery} >
        <Gallery id="profiles-gallery" images={galleryImages} rowHeight={20}/>
      </div>
      {/* <img style={{opacity: 0.5}} src="https://drive.google.com/uc?export=view&id=1UXJXN6_xJt_peBuNFv4CPvAlcdCt3mAo" width={20} height={20}/> */}
    </div>
    
    
  );
}