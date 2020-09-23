import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
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

export default function App() {
  const classes = useStyles();
  const { width, height } = useWindowSize();

  const [cards, setCards] = useState([]);

  useEffect(() => {
    const interval = setInterval(()=>{
      let newCards = [];

      let profiles = getSampleProfiles(4);
      if(profiles.length>0){
        profiles.map((p, i)=>{
          newCards.push(
            <Grid item >
              <StyleRoot>
                <div style={getRandomAnimation()}>
                  <Card key={i} className={classes.root} >
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        //image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
                        //image="https://drive.google.com/uc?export=view&id=1UXJXN6_xJt_peBuNFv4CPvAlcdCt3mAo"
                        image={p.thumbnails}
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography display="inline" gutterBottom variant="h5" component="h2">
                          {p.name}
                        </Typography>
                        <Chip
                          variant="outlined"
                          size="medium"
                          //avatar={<Avatar>M</Avatar>}
                          label={p.grade}
                          style={{marginBottom: '10px', marginLeft: '5px'}}
                        />
                        <Typography variant="body2" color="textSecondary" component="p">
                          {p.text}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    {/* <CardActions> */}
                      {/* <Button size="small" color="primary">
                        Share
                      </Button>
                      <Button size="small" color="primary">
                        Learn More
                      </Button> */}
                    {/* </CardActions> */}
                  </Card>
                </div>
              </StyleRoot>
            </Grid>
          );
        });
        
      }
      setCards(newCards);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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